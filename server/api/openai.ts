import { defineEventHandler } from "h3";
import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const completion = await openai.chat.completions.create({
      messages: body.messages,
      model: "gpt-3.5-turbo-1106",
    });
    return { response: completion.choices[0].message.content };
  } catch (error) {
    // Handle any errors here
    return { error: error.message };
  }
});
