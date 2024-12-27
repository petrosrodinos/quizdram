const OpenAI = require('openai');
require('dotenv').config();

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askOpenAI = async (prompt: string) => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: {
        type: 'json_object',
      },
    });

    const result = response.choices[0].message.content;
    return result;
  } catch (e) {
    return e.message;
  }
};
