import { DefaultAzureCredential } from "@azure/identity";
import { CosmosClient } from "@azure/cosmos";

interface Form {
  id: string;
  form: string;
}

interface APIResponse {
  payload: Form;
  error?: string;
}

const endpoint = process.env.COSMOS_ENDPOINT || "";
const databaseName = `lazars`;
const containerName = `forms`;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;

  const cosmosClient = new CosmosClient({
    endpoint,
    aadCredentials: new DefaultAzureCredential(),
  });

  const container = await cosmosClient
    .database(databaseName)
    .container(containerName);

  try {
    const { resource } = await container.item(id, id).read();

    const responseData: APIResponse = {
      payload: resource as Form,
    };

    return responseData;
  } catch (error: any) {
    return { error: error.message } as APIResponse;
  }
});
