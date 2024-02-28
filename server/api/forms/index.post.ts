export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = event.context.cosmos;
  const container = client.database("lazars").container("forms");

  const { resource } = await container.items.create({
    id: body.id,
    form: body.form,
  });

  return { response: resource };
});
