import { DefaultAzureCredential } from "@azure/identity";
import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT;
const databaseName = `lazars`;
const containerName = `forms`;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const cosmosClient = new CosmosClient({
    endpoint,
    aadCredentials: new DefaultAzureCredential(),
  });

  const querySpec = {
    query: "select * from c",
  };

  const container = await cosmosClient
    .database(databaseName)
    .container(containerName);

  const { resources } = await container.items.query(querySpec).fetchAll();

  return { response: resources };
});
