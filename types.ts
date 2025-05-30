

// New Theme string literal union type
export type PredefinedTheme = 
  | 'light'
  | 'dark'
  | 'amoled-black'
  | 'slate-blue'
  | 'forest-green'
  | 'sunset-orange'
  | 'crimson-night'
  | 'ocean-breeze'
  | 'royal-purple'
  | 'cyberpunk-glow'
  | 'pastel-dream'
  | 'coffee-house'
  | 'monochrome-light'
  | 'monochrome-dark'
  | 'minty-fresh'
  | 'rose-quartz'
  | 'deep-indigo'
  | 'volcanic-ash'
  | 'arctic-blue'
  | 'golden-hour';

export type ThemeId = PredefinedTheme | string; // string for custom theme IDs

export interface CustomThemeDefinition {
  id: string; // UUID
  name: string;
  isDark: boolean;
  variables: Record<string, string>; // Same structure as THEME_DEFINITIONS.variables
}

export type AssistantType = 'lexi' | 'kebapgpt';

export type ThinkingPerformance = 'default' | 'fastest' | 'advanced';

export interface CustomAiProfile {
  id:string;
  name: string;
  modelName: string;
  systemInstruction: string;
}

export interface EditorSettings {
  theme: ThemeId; 
  backgroundImageUrl: string;
  assistantVoiceEnabled: boolean;
  backgroundMusicUrl?: string;
  isMusicPlaying?: boolean;
  isAssistantPanelVisible?: boolean;
  activeAssistant: AssistantType;
  thinkingPerformance: ThinkingPerformance;
  customModelName?: string; 
  customSystemInstruction?: string;
  customThemes?: CustomThemeDefinition[]; // For user-generated themes
}

export interface TextPromptRecord {
  type: 'textGeneration'; 
  prompt: string;
  response: string;
  timestamp: number;
  assistant?: AssistantType; 
}

export interface ImagePromptRecord {
  type: 'imageGeneration';
  prompt: string;
  generatedImageBase64: string;
  timestamp: number;
  assistant?: AssistantType; 
}

export interface AudioAnalysisRecord {
  type: 'audioAnalysis';
  userPrompt: string;
  audioFileName: string;
  assistantResponse: string;
  timestamp: number;
  assistant: AssistantType;
}

export interface AssistantInteractionRecord {
  type: 'assistant';
  userMessage: string; 
  editorSnapshot: string; 
  assistantResponse: string; 
  actionTaken?: string; 
  settingsApplied?: SettingsCommand[];
  timestamp: number;
  assistant: AssistantType;
  audioFileName?: string; 
  groundingChunks?: GroundingChunk[];
}

export interface AiFeedbackRequestRecord {
  type: 'aiFeedback';
  editorSnapshot: string;
  userPrompt: string; 
  assistantResponse: string;
  timestamp: number;
  assistant: AssistantType;
}

export type AiHistoryRecord = TextPromptRecord | ImagePromptRecord | AssistantInteractionRecord | AiFeedbackRequestRecord | AudioAnalysisRecord;

export interface AiTextFile {
  version: string;
  activeTabContent: string;
  activeTabAiHistory: AiHistoryRecord[];
  activeTabAssistantMessages: Message[]; 
  editorSettings: EditorSettings;
  notes?: string;
}

// Used for app state export/import
export interface FullAppStateForExport extends AiTextFile {
    tabs: TabState[];
    activeTabId: string | null;
    // editorSettings is already in AiTextFile
}


export interface LexiActionCommand {
  type: 'regenerate' | 'append'; 
  payload: string; 
  originalCommandString: string;
}

export interface SettingsCommand {
  type: 'theme' | 'music' | 'bg';
  payload: string;
  originalCommandString: string;
}

export interface GroundingChunk {
  web?: {
    uri?: string; 
    title?: string; 
  };
  retrievedContext?: { 
    uri?: string;
    title?: string;
  };
}

export interface AudioAttachment {
  file: File;
  name: string;
  type: string; 
  base64Data?: string; 
}

export interface MusicPlaylistItem {
  id: string; 
  url: string;
  title?: string;
}

export interface MusicPreviewItem {
  url: string;
  title: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai'; 
  text: string; 
  timestamp: number;
  actionCommand?: LexiActionCommand | null; 
  settingsCommands?: SettingsCommand[] | null; 
  metadataText?: string | null; 
  isActionPending?: boolean; 
  isActionApplied?: boolean; 
  isActionRejected?: boolean; 
  assistant?: AssistantType;
  groundingChunks?: GroundingChunk[];
  attachedAudioInfo?: { name: string; type: string }; 
  musicPlaylist?: MusicPlaylistItem[];
  musicPreview?: MusicPreviewItem;
}

export interface ParsedAssistantResponse {
  displayText: string;
  actionCommand: LexiActionCommand | null;
  settingsCommands: SettingsCommand[];
  metadataText: string | null;
  musicPlaylist?: MusicPlaylistItem[];
  musicPreview?: MusicPreviewItem;
}

export interface TabState {
  id: string;
  title: string;
  type: 'text'; 
  textContent: string;
  assistantMessages: Message[];
  aiHistory: AiHistoryRecord[];
}

export interface AppState {
  tabs: TabState[];
  activeTabId: string | null;
  editorSettings: EditorSettings;
}

export interface AnonMusicTrack {
  id: string;
  name: string;
  artist: string;
  audioPath: string; 
  imagePath: string; 
  artistImagePath: string; 
  plays: number;
}

export type ContextMenuItemWithIcon =
  | { isSeparator: true; label?: undefined; action?: undefined; icon?: undefined; disabled?: undefined; }
  | { isSeparator?: false; label: string; action: () => void; icon?: React.ReactNode; disabled?: boolean; };


export const ANONMUSIC_BASE_URL = "https://anonmusic.glitch.me";
