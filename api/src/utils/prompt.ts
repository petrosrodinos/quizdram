import * as Settings from '../assets/settings.json';
import * as Format from '../assets/format.json';
import { QuizSettings } from 'src/types/quiz';

const PROMPT = `
create a quiz based on the below settings and below format.each item in the settings/questions array is a question with some settings,so for the below settings you should generate 10 questions with the below information.Your response should be in the format of the format.json file.`;

export const generateQuizPrompt = (settings?: QuizSettings) => {
  return `
        ${PROMPT}
settings:
${JSON.stringify(settings) || JSON.stringify(Settings, null, 4)}

format:
${JSON.stringify(Format, null, 4)}
    `;
};
