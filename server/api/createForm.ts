import { DefaultAzureCredential } from "@azure/identity";
import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT;
const databaseName = `lazars`;
const containerName = `forms`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const cosmosClient = new CosmosClient({
    endpoint,
    aadCredentials: new DefaultAzureCredential(),
  });

  const container = await cosmosClient
    .database(databaseName)
    .container(containerName);

  const { resource } = await container.items.create({
    id: body.id,
    form: body.form,
  });

  return { response: resource };
});
