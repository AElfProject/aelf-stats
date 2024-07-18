const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
});

async function findAuthor(authorName) {
  try {
    const result = await client.search({
      index: "commits",
      query: {
        match: {
          commit_by: authorName,
        },
      },
    });

    // const count = result.body.aggregations.message_count.value;
    console.log(JSON.stringify(result.hits.hits.map((i) => i._source.message)));
  } catch (error) {
    console.error("Error searching for messages:", error);
  }
}

findAuthor("name");
