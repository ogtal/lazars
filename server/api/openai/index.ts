import OpenAI from "openai";

const runtimeConfig = useRuntimeConfig();
const openai = new OpenAI({ apiKey: runtimeConfig.openai.key });

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: body.messages,
      model: "gpt-3.5-turbo-1106",
    };

    const completion = await openai.chat.completions.create(params);

    if (!completion.choices[0]?.message?.content) {
      throw new Error("No content returned from OpenAI");
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching OpenAI completion:", error);
  }
});
