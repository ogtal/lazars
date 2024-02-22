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

  const container = await cosmosClient
    .database(databaseName)
    .container(containerName);

  const { resource } = await container.item(query.formId, query.formId).read();

  return { response: resource };
});
