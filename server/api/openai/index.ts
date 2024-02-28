import { defineEventHandler } from "h3";
import OpenAI from "openai";

const runtimeConfig = useRuntimeConfig();
const openai = new OpenAI({ apiKey: runtimeConfig.openai.apiKey });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: body.messages,
    model: "gpt-3.5-turbo-1106",
  };

  const completion = await openai.chat.completions.create(params);

  return completion.choices[0]?.message?.content;
});
