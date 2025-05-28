
import { GoogleGenAI, GenerateContentResponse, Chat, Part, GenerateContentParameters } from "@google/genai";
import { GEMINI_TEXT_MODEL, ASSISTANT_SYSTEM_INSTRUCTION, KEBAPGPT_SYSTEM_INSTRUCTION, AUDIO_MIME_TYPES_SUPPORTED } from '../constants';
import { AssistantType, ThinkingPerformance } from "../types";

let ai: GoogleGenAI | null = null;

const getApiKey = (): string | undefined => {
  // Prefer process.env.API_KEY if available
  const envKey = process.env.API_KEY;
  if (envKey) return envKey;
  
  // Fallback to localStorage for development
  const localKey = localStorage.getItem('GEMINI_API_KEY_DEV');
  if (localKey) return localKey;

  console.warn("API_KEY is not set in process.env or localStorage. Gemini API calls will fail.");
  return undefined;
};


export const initializeAi = (): boolean => {
  const apiKey = getApiKey();
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
    return true;
  }
  return false;
};

export const isAiInitialized = (): boolean => !!ai;

let assistantChat: Chat | null = null;
let currentChatAssistantType: AssistantType | null = null;
let currentChatThinkingPerformance: ThinkingPerformance | null = null;


const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      mimeType: file.type,
      data: await base64EncodedDataPromise,
    },
  };
};

export const startAssistantChat = (
    assistantType: AssistantType, 
    thinkingPerformance: ThinkingPerformance
): Chat | null => {
  if (!ai) {
    console.error("AI service not initialized for chat.");
    return null;
  }

  if (assistantChat && (currentChatAssistantType !== assistantType || currentChatThinkingPerformance !== thinkingPerformance)) {
    assistantChat = null; 
  }
  
  currentChatAssistantType = assistantType;
  currentChatThinkingPerformance = thinkingPerformance;

  if (!assistantChat) {
     const systemInstruction = assistantType === 'kebapgpt' 
        ? KEBAPGPT_SYSTEM_INSTRUCTION 
        : ASSISTANT_SYSTEM_INSTRUCTION;

     const config: GenerateContentParameters['config'] = { // Changed GenerateContentRequest to GenerateContentParameters
        systemInstruction: systemInstruction,
        tools: [{googleSearch: {}}], // Always enable search grounding
     };

     if (thinkingPerformance === 'fastest' && GEMINI_TEXT_MODEL === "gemini-2.5-flash-preview-04-17") {
         config.thinkingConfig = { thinkingBudget: 0 };
     }

     assistantChat = ai.chats.create({
        model: GEMINI_TEXT_MODEL,
        config: config,
     });
  }
  return assistantChat;
};

export const sendMessageToAssistantStream = async (
  fullPromptIncludingContextAndUserMessage: string,
  assistantType: AssistantType,
  thinkingPerformance: ThinkingPerformance
): Promise<AsyncIterable<GenerateContentResponse> | null> => {
  const chat = startAssistantChat(assistantType, thinkingPerformance); 
  if (!chat) return null;

  try {
    return chat.sendMessageStream({ message: fullPromptIncludingContextAndUserMessage });
  } catch (error) {
    console.error(`Error sending message to ${assistantType}:`, error);
    throw error; 
  }
};

export const sendAudioAndPromptToAssistantStream = async (
  audioFile: File,
  userPrompt: string,
  assistantType: AssistantType,
  thinkingPerformance: ThinkingPerformance
): Promise<AsyncIterable<GenerateContentResponse> | null> => {
  if (!ai) {
    console.error("AI service not initialized for audio prompt.");
    return null;
  }
  if (!AUDIO_MIME_TYPES_SUPPORTED.includes(audioFile.type)) {
    console.error(`Unsupported audio MIME type: ${audioFile.type}`);
    throw new Error(`Unsupported audio type. Please use one of: ${AUDIO_MIME_TYPES_SUPPORTED.join(', ')}`);
  }

  try {
    const audioPart = await fileToGenerativePart(audioFile);
    const textPart = { text: userPrompt };
    
    const systemInstruction = assistantType === 'kebapgpt' 
      ? KEBAPGPT_SYSTEM_INSTRUCTION 
      : ASSISTANT_SYSTEM_INSTRUCTION;

    const modelConfig: GenerateContentParameters['config'] = { // Changed GenerateContentRequest to GenerateContentParameters
      systemInstruction: systemInstruction,
      tools: [{googleSearch: {}}], // Enable search grounding here too
    };
    if (thinkingPerformance === 'fastest' && GEMINI_TEXT_MODEL === "gemini-2.5-flash-preview-04-17") {
         modelConfig.thinkingConfig = { thinkingBudget: 0 };
     }

    const contents: GenerateContentParameters['contents'] = { parts: [audioPart, textPart] }; // Changed GenerateContentRequest to GenerateContentParameters
    
    // For multimodal, especially with streaming, it's often better to use generateContentStream directly on the model
    // rather than through a chat session if the audio context is per-message and not for an ongoing conversation about that specific audio.
    // However, to maintain chat history consistency and use existing system prompts, we can try with a chat-like structure.
    // If using chat.sendMessageStream, the history might become complex with multimodal inputs.
    // For simplicity and directness for this specific function:
     return ai.models.generateContentStream({
        model: GEMINI_TEXT_MODEL,
        contents: contents,
        config: modelConfig,
     });

  } catch (error) {
    console.error(`Error sending audio and prompt to ${assistantType}:`, error);
    throw error;
  }
};


export const resetAssistantChat = () => {
  assistantChat = null; 
  currentChatAssistantType = null;
  currentChatThinkingPerformance = null;
};
