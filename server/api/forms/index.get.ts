export default defineEventHandler(async (event) => {
  const client = event.context.cosmos;
  const container = client.database("lazars").container("forms");

  const querySpec = {
    query: "select * from c",
  };

  const { resources } = await container.items.query(querySpec).fetchAll();

  return { response: resources };
});
