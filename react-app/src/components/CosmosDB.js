const { CosmosClient } = require('@azure/cosmos');

const config = require('../config');

const { endpoint } = config;
const { key } = config;
const databaseID = config.database.id;
const issuesContainerId = config.issuesContainer.id;
const newsContainerId = config.newsContainer.id;
const partitionKey = { kind: 'Hash', paths: ['/county'] };
const client = new CosmosClient({ endpoint, key});

export async function createDatabase() {
  // eslint-disable-next-line
  const { database } = await client.databases.createIfNotExists({
    id: databaseID,
  });
}

export async function createContainer(containerIdentifier) {
  // eslint-disable-next-line
  const { container } = await client
    .database(databaseID)
    .containers.createIfNotExists(
      { id: containerIdentifier, partitionKey },
      { offerThroughput: 400 },
    );
}

export async function createNewsItem(itemBody) {
  // eslint-disable-next-line
  const { item } = await client
    .database(databaseID)
    .container(newsContainerId)
    .items.upsert(itemBody);
}

export async function createIssueItem(itemBody) {
  const { item } = await client
    .database(databaseID)
    .container(issuesContainerId)
    .items.upsert(itemBody);
  return item;
}

export async function getNews() {
  const querySpec = {
    query:
      'SELECT {"id":r.id, "county":r.county, "date":r.date, "title":r.title, "content":r.content} AS newsItems FROM root r',
  };
  const { resources: results } = await client
    .database(databaseID)
    .container(newsContainerId)
    .items.query(querySpec)
    .fetchAll();

  return results;
}

export async function getIssues() {
  const querySpec = {
    query:
      'SELECT {"id":r.id, "lat":r.lat, "lng":r.lng, "county":r.county, "time":r.time, "category":r.category, "content":r.content} AS issueItems FROM root r',
  };
  const { resources: results } = await client
    .database(databaseID)
    .container(issuesContainerId)
    .items.query(querySpec)
    .fetchAll();

  return results;
}
