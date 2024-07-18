"use strict";

import { convert } from "url-slug";
import { readFileSync } from "fs";

import { Client } from "@elastic/elasticsearch";
const client = new Client({
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
});

const REPO = process.env.REPO;

if (!REPO) {
  throw new Error(`Environment variable REPO not set.`);
}

const INDEX = convert(REPO);

async function run() {
  await client.indices.delete({
    index: INDEX,
    ignore_unavailable: true,
  });
  await client.indices.create(
    {
      index: INDEX,
      operations: {
        mappings: {
          properties: {
            commit: "text",
            merge: "text",
            author: "text",
            author_email: "text",
            date: "date",
            commit_by: "string",
            commit_by_email: "string",
            commit_by_date: "date",
            message: "string",
            stats: {
              type: "nested",
              properties: {
                files_changed: "number",
                insertions: "number",
                deletions: "number",
                files: "string",
                file_stats: {
                  type: "nested",
                  properties: {
                    name: "string",
                    lines_changed: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
    { ignore: [400] }
  );

  const data = readFileSync("temp/history.json", "utf8");
  const jsonData = JSON.parse(data);

  const dataset = jsonData.map((i) => ({
    ...i,
    date: new Date(i.date),
    commit_by_date: new Date(i.date),
  }));

  const operations = dataset.flatMap((doc) => [
    { index: { _index: INDEX } },
    doc,
  ]);

  const bulkResponse = await client.bulk({ refresh: true, operations });

  if (bulkResponse.errors) {
    const erroredDocuments = [];
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: operations[i * 2],
          document: operations[i * 2 + 1],
        });
      }
    });
    console.log(erroredDocuments);
  }

  const count = await client.count({ index: INDEX });
  console.log(count);
}

run().catch(console.log);
