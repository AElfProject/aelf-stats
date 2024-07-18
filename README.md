# ES GitHub Stats

## Install

Install Docker, NodeJS and jc (`brew install jc`).

## Export from git

```sh
git clone your-repo-url temp/repo
cd temp/repo
git log --format=fuller --stat | jc --git-log > ../history.json
cd ../../
```

## Import into ES

First, start the dev server: `docker compose up -d`.

```sh
npm install
node import.js
```

## Search

Example: `node search.js`.

Edit and change the name in [search.js](./search.js) to find other results.

More examples: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/search_examples.html
