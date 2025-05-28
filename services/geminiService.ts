
import { GoogleGenAI, GenerateContentResponse, Chat, Part, GenerateContentParameters } from "@google/genai";
import { GEMINI_TEXT_MODEL, ASSISTANT_SYSTEM_INSTRUCTION, KEBAPGPT_SYSTEM_INSTRUCTION, AUDIO_MIME_TYPES_SUPPORTED } from '../constants';
import { AssistantType, ThinkingPerformance, EditorSettings } from "../types";

let ai: GoogleGenAI | null = null;

const getApiKey = (): string | undefined => {
  const envKey = process.env.API_KEY;
  if (envKey) return envKey;
  
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
let currentChatModelName: string | null = null;
let currentChatSystemInstruction: string | null = null;


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

const getEffectiveModelName = (editorSettings?: EditorSettings): string => {
    return editorSettings?.customModelName?.trim() || GEMINI_TEXT_MODEL;
}

const getEffectiveSystemInstruction = (assistantType: AssistantType, editorSettings?: EditorSettings): string => {
    if (editorSettings?.customSystemInstruction?.trim()) {
        return editorSettings.customSystemInstruction;
    }
    return assistantType === 'kebapgpt' 
        ? KEBAPGPT_SYSTEM_INSTRUCTION 
        : ASSISTANT_SYSTEM_INSTRUCTION;
}

export const startAssistantChat = (
    assistantType: AssistantType, 
    thinkingPerformance: ThinkingPerformance,
    editorSettings?: EditorSettings // Pass current editor settings
): Chat | null => {
  if (!ai) {
    console.error("AI service not initialized for chat.");
    return null;
  }

  const effectiveModelName = getEffectiveModelName(editorSettings);
  const effectiveSystemInstruction = getEffectiveSystemInstruction(assistantType, editorSettings);

  if (assistantChat && 
      (currentChatAssistantType !== assistantType || 
       currentChatThinkingPerformance !== thinkingPerformance ||
       currentChatModelName !== effectiveModelName ||
       currentChatSystemInstruction !== effectiveSystemInstruction
      )
  ) {
    assistantChat = null; 
  }
  
  currentChatAssistantType = assistantType;
  currentChatThinkingPerformance = thinkingPerformance;
  currentChatModelName = effectiveModelName;
  currentChatSystemInstruction = effectiveSystemInstruction;

  if (!assistantChat) {
     const config: GenerateContentParameters['config'] = {
        systemInstruction: effectiveSystemInstruction,
        tools: [{googleSearch: {}}], 
     };

     if (thinkingPerformance === 'fastest' && effectiveModelName === "gemini-2.5-flash-preview-04-17") {
         config.thinkingConfig = { thinkingBudget: 0 };
     }

     assistantChat = ai.chats.create({
        model: effectiveModelName,
        config: config,
     });
  }
  return assistantChat;
};

export const sendMessageToAssistantStream = async (
  fullPromptIncludingContextAndUserMessage: string,
  assistantType: AssistantType,
  thinkingPerformance: ThinkingPerformance,
  editorSettings?: EditorSettings
): Promise<AsyncIterable<GenerateContentResponse> | null> => {
  const chat = startAssistantChat(assistantType, thinkingPerformance, editorSettings); 
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
  thinkingPerformance: ThinkingPerformance,
  editorSettings?: EditorSettings
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
    
    const effectiveModelName = getEffectiveModelName(editorSettings);
    const effectiveSystemInstruction = getEffectiveSystemInstruction(assistantType, editorSettings);

    const modelConfig: GenerateContentParameters['config'] = {
      systemInstruction: effectiveSystemInstruction,
      tools: [{googleSearch: {}}], 
    };
    if (thinkingPerformance === 'fastest' && effectiveModelName === "gemini-2.5-flash-preview-04-17") {
         modelConfig.thinkingConfig = { thinkingBudget: 0 };
     }

    const contents: GenerateContentParameters['contents'] = { parts: [audioPart, textPart] }; 
    
     return ai.models.generateContentStream({
        model: effectiveModelName,
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
  currentChatModelName = null;
  currentChatSystemInstruction = null;
};
