interface Form {
  id: string;
  form: string;
}

interface APIResponse {
  payload: Form;
  error?: string;
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  const client = event.context.cosmos;
  const container = client.database("lazars").container("forms");

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
