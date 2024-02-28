import { CosmosClient } from "@azure/cosmos";

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig();
  const endpoint = runtimeConfig.cosmos.endpoint;
  const key = runtimeConfig.cosmos.key;
  const client = new CosmosClient({ endpoint, key });

  nitroApp.hooks.hook("request", (event) => {
    event.context.cosmos = client;
  });
});
