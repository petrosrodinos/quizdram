import * as Settings from '../assets/settings.json';
import * as Format from '../assets/format.json';
import { QuizSettings } from 'src/types/quiz';

const PROMPT = `
Create a quiz based on the following settings in the specified JSON format.Each item in the questions array
 is a question with its settings.Use the input settings to generate appropriate 
 questions in a json format strictly.The correct answer from the array should start at 0 index.`;

export const generateQuizPrompt = (settings?: QuizSettings) => {
  return `
        ${PROMPT}
settings:
${JSON.stringify(settings) || JSON.stringify(Settings, null, 4)}

format:
${JSON.stringify(Format, null, 4)}
    `;
};
