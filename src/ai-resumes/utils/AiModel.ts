import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';


const genAI = (apiKey: string) => new GoogleGenerativeAI(apiKey);

export const model = (apiKey: string) => genAI(apiKey).getGenerativeModel({
  model: 'gemini-1.5-flash',
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export const AIChatSession = (apiKey: string) => model(apiKey).startChat({
  generationConfig,
  safetySettings,
  history: [],
});
