
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextEditor from './components/TextEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import SideAssistantPanel from './components/SideAssistantPanel';
import Modal from './components/Modal';
import SettingsModal from './components/SettingsModal';
import LoadingSpinner from './components/LoadingSpinner';

import { 
    AiTextFile, 
    EditorSettings, 
    Theme, 
    AiHistoryRecord, 
    Message, 
    LexiActionCommand, 
    SettingsCommand,
    ParsedAssistantResponse,
    AssistantInteractionRecord,
    AudioAnalysisRecord,
    AppState,
    TabState,
    AssistantType,
    ThinkingPerformance,
    AudioAttachment,
    GroundingChunk,
    ANONMUSIC_BASE_URL
} from './types';
import { 
    APP_VERSION, 
    DEFAULT_EDITOR_SETTINGS,
    THEME_DEFINITIONS, 
    LOCALSTORAGE_APP_STATE_KEY,
    LOCALSTORAGE_LAUNCHED_BEFORE_KEY,
    GET_STARTED_MARKDOWN_CONTENT,
    ANONMUSIC_API_URL,
    ANONMUSIC_BASE_PATH_URL
} from './constants';
import { initializeAi, isAiInitialized, sendMessageToAssistantStream, sendAudioAndPromptToAssistantStream, resetAssistantChat } from './services/geminiService';
import { GenerateContentResponse } from '@google/genai'; 
import useSpeechSynthesis from './hooks/useSpeechSynthesis';

const parseAssistantResponse = (responseText: string): ParsedAssistantResponse => {
  let processedText = responseText;
  const actionCommandRegex = /\{(regenerate|append):([\s\S]*?)\}/s;
  // Regex for settings commands - ensure payload doesn't greedily consume other commands.
  // Match content that is not '{' or '}' until the closing '}'
  const settingsCommandRegex = /\{(theme|music|bg):([^\{\}]*?)\}/g; 
  const metadataRegex = /\{metadata:([\s\S]*?)\}/s;

  let actionCommand: LexiActionCommand | null = null;
  const settingsCommands: SettingsCommand[] = [];
  let metadataText: string | null = null;

  // 1. Extract Action Command
  const actionMatch = processedText.match(actionCommandRegex);
  if (actionMatch) {
    actionCommand = {
      type: actionMatch[1] as 'regenerate' | 'append',
      payload: actionMatch[2],
      originalCommandString: actionMatch[0],
    };
    processedText = processedText.replace(actionMatch[0], '');
  }

  // 2. Extract Settings Commands
  // We need to remove settings commands from processedText as we find them
  // To do this safely, we can build a new string or replace them one by one from the original and update processedText
  let tempTextForSettingsExtraction = responseText; // Use original to find all commands
  let settingsMatch;
  while ((settingsMatch = settingsCommandRegex.exec(tempTextForSettingsExtraction)) !== null) {
    settingsCommands.push({
      type: settingsMatch[1] as 'theme' | 'music' | 'bg',
      payload: settingsMatch[2],
      originalCommandString: settingsMatch[0],
    });
    // Remove this specific found command from processedText if it's there
    if (processedText.includes(settingsMatch[0])) {
        processedText = processedText.replace(settingsMatch[0], '');
    }
  }
  
  // 3. Extract Metadata
  // Match metadata on the potentially already modified processedText (if metadata is not part of action/settings payload)
  // Or better, match on original and remove if still present in processedText
  const metadataMatch = responseText.match(metadataRegex); 
  if (metadataMatch) {
    metadataText = metadataMatch[1].trim();
    if (processedText.includes(metadataMatch[0])) {
        processedText = processedText.replace(metadataMatch[0], '');
    }
  }
  
  const displayText = processedText.trim();

  return { displayText, actionCommand, settingsCommands, metadataText };
};


const createNewTab = (
    activeAssistant: AssistantType,
    title = "Untitled", 
    content = "", 
    type: 'text' = 'text'
): TabState => {
    let introText = `Welcome to your new tab${title !== "Untitled" ? `: "${title}"` : ""}! I'm Lexi. How can I help you here?`;
    if (activeAssistant === 'kebapgpt') {
        introText = `Yeni sekmeye hoş geldin kanka${title !== "Untitled" ? `: "${title}"` : ""}! Ben KebapGPT. Ne lazım koçum?`;
    }

    return {
        id: uuidv4(),
        title,
        type,
        textContent: content,
        assistantMessages: [{ 
            id: `assistant-intro-tab-${Date.now()}`, 
            sender: 'ai', 
            text: introText, 
            timestamp: Date.now(),
            assistant: activeAssistant,
        }],
        aiHistory: [],
    };
};

async function fetchWithRetries(url: string, retries = 2, initialDelay = 500): Promise<Response> {
  let attempt = 0;
  let delay = initialDelay;
  while (attempt <= retries) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response; // Successful fetch
      }
      // Handle non-ok responses (e.g., 404, 500)
      if (attempt === retries) {
        return response; // Return the last failed response if all retries are exhausted
      }
      console.warn(`AnonMusic API fetch failed (status: ${response.status} ${response.statusText}), attempt ${attempt + 1}/${retries + 1}. Retrying in ${delay}ms...`);
    } catch (error) {
      // Handle network errors (e.g., server down, CORS issue if not caught by browser first as "TypeError")
      if (attempt === retries) {
        throw error; // Rethrow the last error if all retries are exhausted
      }
      console.warn(`AnonMusic API fetch failed (network error), attempt ${attempt + 1}/${retries + 1}. Retrying in ${delay}ms...`, error);
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    attempt++;
    delay *= 2; // Exponential backoff
  }
  // This line should ideally not be reached if the loop logic is correct.
  // It acts as a fallback for an unexpected state.
  throw new Error("AnonMusic API fetch failed after multiple retries (unexpected state).");
}


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [devApiKeyInput, setDevApiKeyInput] = useState<string>('');
  const [isDevApiKeyLoading, setIsDevApiKeyLoading] = useState<boolean>(false);

  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);
  const { speak, cancel: cancelSpeech, isSupported: ttsSupported } = useSpeechSynthesis();
  const [isMarkdownPreviewActive, setIsMarkdownPreviewActive] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (initializeAi()) {
        setIsApiKeySet(true);
    } else {
        const devKey = localStorage.getItem('GEMINI_API_KEY_DEV');
        if (devKey) {
             if (initializeAi()) setIsApiKeySet(true); 
        }
    }

    const storedAppState = localStorage.getItem(LOCALSTORAGE_APP_STATE_KEY);
    if (storedAppState) {
      try {
        const parsedState = JSON.parse(storedAppState) as AppState;
        if (parsedState.tabs && parsedState.editorSettings) {
          const validTheme = THEME_DEFINITIONS[parsedState.editorSettings.theme] 
            ? parsedState.editorSettings.theme 
            : DEFAULT_EDITOR_SETTINGS.theme;
          const validAssistant = ['lexi', 'kebapgpt'].includes(parsedState.editorSettings.activeAssistant)
            ? parsedState.editorSettings.activeAssistant
            : DEFAULT_EDITOR_SETTINGS.activeAssistant;
          const validThinkingPerformance = ['default', 'fastest'].includes(parsedState.editorSettings.thinkingPerformance)
            ? parsedState.editorSettings.thinkingPerformance
            : DEFAULT_EDITOR_SETTINGS.thinkingPerformance;


          setAppState({
            ...parsedState,
            editorSettings: { 
              ...DEFAULT_EDITOR_SETTINGS, 
              ...parsedState.editorSettings,
              theme: validTheme,
              activeAssistant: validAssistant as AssistantType,
              thinkingPerformance: validThinkingPerformance as ThinkingPerformance,
             }
          });
        } else {
          loadDefaultState(); 
        }
      } catch (e) {
        console.error("Failed to parse stored app state, resetting:", e);
        localStorage.removeItem(LOCALSTORAGE_APP_STATE_KEY);
        loadDefaultState();
      }
    } else {
      loadDefaultState();
    }
    setIsLoadingState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDefaultState = () => {
    const launchedBefore = localStorage.getItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY);
    let initialTabs: TabState[];
    let initialActiveTabId: string | null;
    const defaultAssistant = DEFAULT_EDITOR_SETTINGS.activeAssistant;

    if (!launchedBefore) {
      const getStartedTab = createNewTab(defaultAssistant, "Get Started", GET_STARTED_MARKDOWN_CONTENT);
      let getStartedIntro = "Welcome! I'm Lexi. This 'Get Started' guide should help you out. Ask me anything!";
      if (defaultAssistant === 'kebapgpt') {
          getStartedIntro = "Hoş geldin kanka! Ben KebapGPT. Bu 'Başlangıç Rehberi' işini görür. Sor bakalım neymiş derdin!";
      }
      getStartedTab.assistantMessages = [{ 
          id: `assistant-intro-getstarted-${Date.now()}`, 
          sender: 'ai', 
          text: getStartedIntro, 
          timestamp: Date.now(),
          assistant: defaultAssistant,
      }];
      initialTabs = [getStartedTab];
      initialActiveTabId = getStartedTab.id;
      localStorage.setItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY, 'true');
    } else {
      const defaultTab = createNewTab(defaultAssistant);
      initialTabs = [defaultTab];
      initialActiveTabId = defaultTab.id;
    }
    setAppState({
      tabs: initialTabs,
      activeTabId: initialActiveTabId,
      editorSettings: DEFAULT_EDITOR_SETTINGS,
    });
  };

  useEffect(() => {
    if (appState && !isLoadingState) {
      localStorage.setItem(LOCALSTORAGE_APP_STATE_KEY, JSON.stringify(appState));
    }
  }, [appState, isLoadingState]);

  useEffect(() => {
    if (appState?.editorSettings) {
      const settings = appState.editorSettings;
      
      const themeKey = settings.theme;
      const themeDefinition = THEME_DEFINITIONS[themeKey] || THEME_DEFINITIONS[DEFAULT_EDITOR_SETTINGS.theme]; 
      
      Object.keys(THEME_DEFINITIONS).forEach(key => {
        document.documentElement.classList.remove(`theme-${key}`);
      });

      document.documentElement.classList.add(`theme-${themeKey}`);
      document.documentElement.classList.toggle('dark', themeDefinition.isDark);
      
      const styleElement = document.getElementById('dynamic-theme-styles');
      if (styleElement) {
        let cssText = `:root.theme-${themeKey} {\n`;
        for (const [variable, value] of Object.entries(themeDefinition.variables)) {
          cssText += `  ${variable}: ${value};\n`;
        }
        cssText += `}\n`;
        if (themeDefinition.variables['--theme-scrollbar-thumb'] && themeDefinition.variables['--theme-scrollbar-track']) {
            cssText += `
              .theme-${themeKey} ::-webkit-scrollbar { width: 8px; height: 8px; }
              .theme-${themeKey} ::-webkit-scrollbar-track { background: var(--theme-scrollbar-track); border-radius: 4px; }
              .theme-${themeKey} ::-webkit-scrollbar-thumb { background: var(--theme-scrollbar-thumb); border-radius: 4px; }
              .theme-${themeKey} ::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--theme-scrollbar-thumb) 80%, #fff 20%); }
            `;
        }
        styleElement.textContent = cssText;
      }

      if (settings.backgroundImageUrl) {
        document.body.style.backgroundImage = `url('${settings.backgroundImageUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.transition = 'background-image 0.5s ease-in-out';
      } else {
        document.body.style.backgroundImage = '';
      }
      
      if (audioRef.current) {
        if (settings.backgroundMusicUrl && settings.backgroundMusicUrl !== audioRef.current.src) {
            audioRef.current.src = settings.backgroundMusicUrl;
            audioRef.current.load();
        } else if (!settings.backgroundMusicUrl && audioRef.current.src) { // Check if src is not already empty
            audioRef.current.pause(); // Pause before changing src to empty
            audioRef.current.src = "";
        }
        
        if (settings.isMusicPlaying && settings.backgroundMusicUrl && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.warn("Music autoplay prevented:", e));
        } else if ((!settings.isMusicPlaying || !settings.backgroundMusicUrl) && !audioRef.current.paused) {
            audioRef.current.pause();
        }
        audioRef.current.loop = true;
      }
    }
  }, [appState?.editorSettings]);


  const handleSettingsChange = (newSettings: EditorSettings) => {
    setAppState(prev => {
        if (!prev) return null;
        if (prev.editorSettings.activeAssistant !== newSettings.activeAssistant ||
            prev.editorSettings.thinkingPerformance !== newSettings.thinkingPerformance) {
            resetAssistantChat();
        }
        return { ...prev, editorSettings: newSettings };
    });
  };

  const handleToggleAssistantVoice = () => {
    setAppState(prev => {
        if (!prev) return null;
        const newVoiceState = !prev.editorSettings.assistantVoiceEnabled;
        if (!newVoiceState) cancelSpeech();
        return { 
            ...prev, 
            editorSettings: { ...prev.editorSettings, assistantVoiceEnabled: newVoiceState } 
        };
    });
  };

  const handleToggleAssistant = () => {
    setAppState(prev => {
        if (!prev) return null;
        const newAssistant = prev.editorSettings.activeAssistant === 'lexi' ? 'kebapgpt' : 'lexi';
        resetAssistantChat(); 
        return {
            ...prev,
            editorSettings: { ...prev.editorSettings, activeAssistant: newAssistant }
        };
    });
  };

  const handleToggleMusic = () => {
    setAppState(prev => prev ? { 
        ...prev, 
        editorSettings: { ...prev.editorSettings, isMusicPlaying: !prev.editorSettings.isMusicPlaying } 
    } : null);
  };
  const handleTogglePreview = () => setIsMarkdownPreviewActive(prev => !prev);

  const handleToggleAssistantPanelVisibility = () => {
    setAppState(prev => {
        if (!prev) return null;
        return {
            ...prev,
            editorSettings: {
                ...prev.editorSettings,
                isAssistantPanelVisible: !(prev.editorSettings.isAssistantPanelVisible ?? true)
            }
        };
    });
  };


  const handleAddNewTab = useCallback(() => {
    setAppState(prev => {
      if (!prev) return null;
      const newTab = createNewTab(prev.editorSettings.activeAssistant);
      resetAssistantChat(); 
      return {
        ...prev,
        tabs: [...prev.tabs, newTab],
        activeTabId: newTab.id,
      };
    });
  }, []);

  const handleActivateTab = useCallback((tabId: string) => {
    setAppState(prev => {
      if (!prev || prev.activeTabId === tabId) return prev; 
      resetAssistantChat(); 
      return { ...prev, activeTabId: tabId };
    });
  }, []);

  const handleCloseTab = useCallback((tabIdToClose: string) => {
    setAppState(prev => {
      if (!prev) return null;
      const remainingTabs = prev.tabs.filter(tab => tab.id !== tabIdToClose);
      
      if (remainingTabs.length === 0) {
        const newDefaultTab = createNewTab(prev.editorSettings.activeAssistant);
        resetAssistantChat();
        return { ...prev, tabs: [newDefaultTab], activeTabId: newDefaultTab.id };
      }

      let newActiveTabId = prev.activeTabId;
      if (prev.activeTabId === tabIdToClose) {
        const closingTabIndex = prev.tabs.findIndex(tab => tab.id === tabIdToClose);
        newActiveTabId = remainingTabs[Math.max(0, closingTabIndex -1)]?.id || remainingTabs[0]?.id;
        if (newActiveTabId) resetAssistantChat(); 
      }
      return { ...prev, tabs: remainingTabs, activeTabId: newActiveTabId };
    });
  }, []);

  const handleRenameTab = useCallback((tabId: string, newTitle: string) => {
    setAppState(prev => prev ? {
      ...prev,
      tabs: prev.tabs.map(tab => tab.id === tabId ? { ...tab, title: newTitle } : tab),
    } : null);
  }, []);

  const activeTab = appState?.tabs.find(tab => tab.id === appState.activeTabId);

  const handleActiveTabContentChange = (newContent: string) => {
    setAppState(prev => {
      if (!prev || !prev.activeTabId) return prev;
      return {
        ...prev,
        tabs: prev.tabs.map(tab => 
          tab.id === prev.activeTabId ? { ...tab, textContent: newContent } : tab
        ),
      };
    });
  };

  const updateActiveTabAiHistory = useCallback((newRecord: AiHistoryRecord) => {
    setAppState(prev => {
      if (!prev || !prev.activeTabId) return prev;
      return {
        ...prev,
        tabs: prev.tabs.map(tab =>
          tab.id === prev.activeTabId ? { ...tab, aiHistory: [...tab.aiHistory, newRecord] } : tab
        ),
      };
    });
  }, []);

  const handleSendAssistantMessage = async (userMessageText: string, audioAttachment?: AudioAttachment) => {
    if ((!userMessageText.trim() && !audioAttachment) || !isApiKeySet || !appState || !activeTab) {
        setErrorMessage("Cannot send message. API key, app state, active tab, or message/audio content might be missing.");
        return;
    }
    
    const currentAssistant = appState.editorSettings.activeAssistant;
    const thinkingPerformance = appState.editorSettings.thinkingPerformance;

    const newUserMessage: Message = {
        id: `user-${uuidv4()}`,
        sender: 'user',
        text: userMessageText,
        timestamp: Date.now(),
        attachedAudioInfo: audioAttachment ? { name: audioAttachment.name, type: audioAttachment.type } : undefined,
    };

    setAppState(prev => prev ? {
        ...prev,
        tabs: prev.tabs.map(t => t.id === activeTab.id ? {...t, assistantMessages: [...t.assistantMessages, newUserMessage]} : t)
    } : null);

    setIsAssistantTyping(true);
    setErrorMessage(null);

    let musicApiContext = "";
    try {
        const response = await fetchWithRetries(ANONMUSIC_API_URL); 
        if (response.ok) {
            const musicData = await response.json();
            const contextString = Array.isArray(musicData) ? JSON.stringify(musicData) : JSON.stringify([]);
            musicApiContext = `\n\nAvailable Music from AnonMusic API (use these for music requests if applicable, prefix 'audioPath' and 'imagePath' with "${ANONMUSIC_BASE_PATH_URL}"):\n---\n${contextString}\n---\n`;
        } else {
            musicApiContext = `\n\n(Could not fetch music list from AnonMusic API after retries: ${response.status} ${response.statusText})\n`;
        }
    } catch (apiError) {
        console.warn("Error fetching from AnonMusic API after retries:", apiError);
        const errorMessageContent = apiError instanceof Error ? apiError.message : String(apiError);
        musicApiContext = `\n\n(Error fetching music list from AnonMusic API after retries: ${errorMessageContent})\n`;
    }

    const fullPromptForAssistant = `User's current text:\n---\n${activeTab.textContent.trim() || "(empty)"}\n---\n${musicApiContext}\nUser's message: "${userMessageText}"`;
    
    let fullResponseText = "";
    let accumulatedGroundingChunks: GroundingChunk[] = [];
    const assistantMessageId = `ai-${uuidv4()}`;
    
    const placeholderAiMessage: Message = { 
        id: assistantMessageId, 
        sender: 'ai', 
        text: '', 
        timestamp: Date.now(),
        isActionPending: false,
        assistant: currentAssistant,
    };
    setAppState(prev => prev ? {
        ...prev,
        tabs: prev.tabs.map(t => t.id === activeTab.id ? {...t, assistantMessages: [...t.assistantMessages, placeholderAiMessage]} : t)
    } : null);

    try {
        let stream: AsyncIterable<GenerateContentResponse> | null = null;
        if (audioAttachment) {
            stream = await sendAudioAndPromptToAssistantStream(audioAttachment.file, userMessageText, currentAssistant, thinkingPerformance);
        } else {
            stream = await sendMessageToAssistantStream(fullPromptForAssistant, currentAssistant, thinkingPerformance);
        }

        if (stream) {
            for await (const chunk of stream) { 
                const chunkText = chunk.text;
                fullResponseText += chunkText;
                
                const newChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
                if (newChunks) {
                    accumulatedGroundingChunks.push(...newChunks);
                }

                setAppState(prev => prev ? {
                    ...prev,
                    tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                        ...t, 
                        assistantMessages: t.assistantMessages.map(m => 
                            m.id === assistantMessageId ? {...m, text: fullResponseText, groundingChunks: [...accumulatedGroundingChunks] } : m
                        )
                    } : t)
                } : null);
            }

            const { displayText, actionCommand, settingsCommands, metadataText } = parseAssistantResponse(fullResponseText);
            
            // Apply settings commands immediately
            if (settingsCommands.length > 0) {
                setAppState(prev => {
                    if (!prev) return null;
                    let newEditorSettings = { ...prev.editorSettings };
                    let musicChanged = false;
                    let criticalSettingChanged = false;

                    for (const cmd of settingsCommands) {
                        if (cmd.type === 'theme' && THEME_DEFINITIONS[cmd.payload as Theme]) {
                            if (newEditorSettings.theme !== cmd.payload as Theme) {
                                newEditorSettings.theme = cmd.payload as Theme;
                                criticalSettingChanged = true;
                            }
                        } else if (cmd.type === 'music') {
                            const newMusicUrl = cmd.payload.trim();
                            if (newEditorSettings.backgroundMusicUrl !== newMusicUrl) {
                                newEditorSettings.backgroundMusicUrl = newMusicUrl;
                                musicChanged = true;
                            }
                             // Always set isMusicPlaying based on if URL is present, AI implies play by setting URL
                            newEditorSettings.isMusicPlaying = !!newMusicUrl;

                        } else if (cmd.type === 'bg') {
                             if (newEditorSettings.backgroundImageUrl !== cmd.payload) {
                                newEditorSettings.backgroundImageUrl = cmd.payload;
                             }
                        }
                    }
            
                    if (criticalSettingChanged) { // Reset chat if theme (or other critical settings in future) changed
                        resetAssistantChat();
                    }
                    return { ...prev, editorSettings: newEditorSettings };
                });
            }


            setAppState(prev => prev ? {
                ...prev,
                tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                    ...t,
                    assistantMessages: t.assistantMessages.map(m => 
                        m.id === assistantMessageId ? {
                            ...m, 
                            text: displayText || (actionCommand ? `${currentAssistant === 'kebapgpt' ? 'KebapGPT bir değişiklik öneriyor.' : 'Lexi suggests a change.'} You can preview it.` : (settingsCommands.length > 0 ? `${currentAssistant === 'kebapgpt' ? 'Ayarlar güncellendi kanka!' : 'Settings updated!'}` : `(${currentAssistant === 'kebapgpt' ? 'KebapGPT bir şey demedi' : "Assistant's response was empty"})`)),
                            actionCommand, 
                            settingsCommands: settingsCommands.length > 0 ? settingsCommands : null,
                            metadataText,
                            isActionPending: !!actionCommand,
                            assistant: currentAssistant,
                            groundingChunks: accumulatedGroundingChunks.length > 0 ? [...accumulatedGroundingChunks] : undefined,
                        } : m
                    )
                } : t)
            } : null);

            if (currentAssistant === 'lexi' && appState.editorSettings.assistantVoiceEnabled && ttsSupported && displayText.trim()) {
                speak(displayText);
            }
            
            const historyRecordBase = {
                userMessage: userMessageText, // This is the user's textual message
                assistantResponse: fullResponseText,
                timestamp: Date.now(),
                assistant: currentAssistant,
            };

            if (audioAttachment) {
                 updateActiveTabAiHistory({
                    type: 'audioAnalysis',
                    userPrompt: historyRecordBase.userMessage, // Use userMessageText which is the prompt for the audio
                    assistantResponse: historyRecordBase.assistantResponse,
                    timestamp: historyRecordBase.timestamp,
                    assistant: historyRecordBase.assistant,
                    audioFileName: audioAttachment.name,
                 } as AudioAnalysisRecord);
            } else {
                updateActiveTabAiHistory({ 
                    type: 'assistant', 
                    ...historyRecordBase,
                    editorSnapshot: activeTab.textContent, 
                    actionTaken: actionCommand ? actionCommand.type : 'none',
                    settingsApplied: settingsCommands.length > 0 ? settingsCommands : undefined,
                    groundingChunks: accumulatedGroundingChunks.length > 0 ? accumulatedGroundingChunks : undefined,
                } as AssistantInteractionRecord);
            }
        }
    } catch (error) {
        console.error(`${currentAssistant} error:`, error);
        const errorText = `${currentAssistant === 'kebapgpt' ? 'KebapGPT cevap veremedi kanka' : 'Lexi had trouble responding'}: ${error instanceof Error ? error.message : String(error)}`;
        setAppState(prev => prev ? {
            ...prev,
            tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                ...t,
                assistantMessages: t.assistantMessages.map(m => 
                    m.id === assistantMessageId ? {...m, text: errorText, isActionPending: false, assistant: currentAssistant } : m
                )
            } : t)
        } : null);
        setErrorMessage(errorText);
    } finally {
        setIsAssistantTyping(false);
    }
  };

  const handleApplyLexiAction = (messageId: string) => {
    setAppState(prev => {
        if (!prev || !activeTab) return prev;
        const currentTab = prev.tabs.find(t => t.id === activeTab.id);
        if (!currentTab) return prev;

        const message = currentTab.assistantMessages.find(m => m.id === messageId);
        if (!message || !message.actionCommand) return prev;

        const { type, payload } = message.actionCommand;
        let newTextContent = currentTab.textContent;
        if (type === 'regenerate') {
            newTextContent = payload;
        } else if (type === 'append') {
            newTextContent = currentTab.textContent + payload;
        }

        return {
            ...prev,
            tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                ...t,
                textContent: newTextContent,
                assistantMessages: t.assistantMessages.map(m => 
                    m.id === messageId ? { ...m, isActionPending: false, isActionApplied: true } : m
                )
            } : t)
        };
    });
  };

  const handleRejectLexiAction = (messageId: string) => {
     setAppState(prev => {
        if (!prev || !activeTab) return prev;
        return {
            ...prev,
            tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                ...t,
                assistantMessages: t.assistantMessages.map(m => 
                    m.id === messageId ? { ...m, isActionPending: false, isActionRejected: true } : m
                )
            } : t)
        };
    });
  };

  const handleSaveFile = () => { 
    if (!appState || !activeTab) return;
    const fileData: AiTextFile = {
      version: APP_VERSION,
      activeTabContent: activeTab.textContent,
      activeTabAiHistory: activeTab.aiHistory,
      activeTabAssistantMessages: activeTab.assistantMessages, 
      editorSettings: appState.editorSettings,
    };
    const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lexi-doc-${activeTab.title.replace(/\s+/g, '_')}-${Date.now()}.aitxt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files?.[0];
    if (file && appState && activeTab) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsedData = JSON.parse(result) as AiTextFile;
          if (parsedData.version && parsedData.activeTabContent !== undefined && parsedData.editorSettings) {
             const validThemeOnLoad = THEME_DEFINITIONS[parsedData.editorSettings.theme] 
                ? parsedData.editorSettings.theme 
                : DEFAULT_EDITOR_SETTINGS.theme;
            const validAssistantOnLoad = ['lexi', 'kebapgpt'].includes(parsedData.editorSettings.activeAssistant)
                ? parsedData.editorSettings.activeAssistant as AssistantType
                : DEFAULT_EDITOR_SETTINGS.activeAssistant;
            const validThinkingPerformanceOnLoad = ['default', 'fastest'].includes(parsedData.editorSettings.thinkingPerformance)
                ? parsedData.editorSettings.thinkingPerformance as ThinkingPerformance
                : DEFAULT_EDITOR_SETTINGS.thinkingPerformance;


            setAppState(prev => {
                if (!prev || !prev.activeTabId) return prev;
                
                let loadedAssistantMessages: Message[] = (parsedData.activeTabAssistantMessages && parsedData.activeTabAssistantMessages.length > 0)
                    ? parsedData.activeTabAssistantMessages
                    : [];
                
                if (loadedAssistantMessages.length === 0) {
                    let introText = "File loaded into this tab. I'm Lexi, ready to assist!";
                    if (validAssistantOnLoad === 'kebapgpt') {
                        introText = "Dosya yüklendi kanka. Ben KebapGPT, hazırım.";
                    }
                    loadedAssistantMessages = [{ 
                        id: `assistant-intro-load-${uuidv4()}`, 
                        sender: 'ai', 
                        text: introText, 
                        timestamp: Date.now(),
                        assistant: validAssistantOnLoad,
                      }];
                }


                return {
                    ...prev,
                    editorSettings: {
                        ...DEFAULT_EDITOR_SETTINGS, 
                        ...prev.editorSettings, 
                        ...parsedData.editorSettings,
                        theme: validThemeOnLoad,
                        activeAssistant: validAssistantOnLoad,
                        thinkingPerformance: validThinkingPerformanceOnLoad,
                    },
                    tabs: prev.tabs.map(tab => 
                      tab.id === prev.activeTabId ? { 
                          ...tab, 
                          textContent: parsedData.activeTabContent, 
                          aiHistory: parsedData.activeTabAiHistory || [],
                          assistantMessages: loadedAssistantMessages 
                      } : tab
                    ),
                };
            });
            resetAssistantChat(); 
            setErrorMessage(null);
          } else {
            setErrorMessage('Invalid .aitxt file format.');
          }
        } catch (err) {
          setErrorMessage(`Failed to load file: ${err instanceof Error ? err.message : String(err)}`);
        }
      };
      reader.readAsText(file);
      event.target.value = ''; 
    }
  };

  const handleClearText = () => { 
    if (activeTab && window.confirm(`Are you sure you want to clear the text in tab "${activeTab.title}"? This cannot be undone.`)) {
      setAppState(prev => {
          if (!prev || !prev.activeTabId) return prev;
          const currentAssistant = prev.editorSettings.activeAssistant;
          let clearedTextMsg = "Editor cleared for this tab. Let's start something new!";
          if (currentAssistant === 'kebapgpt') {
              clearedTextMsg = "Sayfayı temizledim kanka. Hadi yeni bişiler karalayalım!";
          }
          return {
              ...prev,
              tabs: prev.tabs.map(tab => 
                tab.id === prev.activeTabId ? { 
                    ...tab, 
                    textContent: '',
                    assistantMessages: [...tab.assistantMessages, { 
                        id: `assistant-clear-${uuidv4()}`, 
                        sender: 'ai', 
                        text: clearedTextMsg, 
                        timestamp: Date.now(),
                        assistant: currentAssistant,
                    }]
                } : tab
              ),
          };
      });
      resetAssistantChat();
    }
  };

  const handleSetDevApiKey = () => {
    if (devApiKeyInput.trim()) {
      localStorage.setItem('GEMINI_API_KEY_DEV', devApiKeyInput.trim());
      setIsDevApiKeyLoading(true);
      // Re-initialize AI service with the new key
      if (initializeAi()) {
        setIsApiKeySet(true);
        setIsApiKeyModalOpen(false);
        setDevApiKeyInput('');
        setErrorMessage(null);
      } else {
        setErrorMessage("API Key still invalid or service initialization failed.");
      }
      setIsDevApiKeyLoading(false);
    } else {
        setErrorMessage("Please enter an API Key.");
    }
  };
  
  if (isLoadingState || !appState || !activeTab) {
    return (
      <div className="flex items-center justify-center h-screen" style={{backgroundColor: 'var(--theme-bg-page, #111827)'}}>
        <LoadingSpinner size="w-16 h-16" color="text-sky-500" />
      </div>
    );
  }
  
  const currentThemeDef = THEME_DEFINITIONS[appState.editorSettings.theme] || THEME_DEFINITIONS['dark'];
  const activeAssistantType = appState.editorSettings.activeAssistant;
  const assistantName = activeAssistantType === 'kebapgpt' ? 'KebapGPT' : 'Lexi Assistant';
  const chatPlaceholder = activeAssistantType === 'kebapgpt' ? 'KebapGPT\'ye yaz kanka...' : 'Chat with Lexi...';

  return (
    <div className={`flex flex-col h-screen min-h-screen font-sans transition-colors duration-300 overflow-hidden theme-${appState.editorSettings.theme} ${currentThemeDef.isDark ? 'dark' : ''}`}>
      <audio ref={audioRef} loop />
      <Toolbar
        tabs={appState.tabs}
        activeTabId={appState.activeTabId}
        onActivateTab={handleActivateTab}
        onCloseTab={handleCloseTab}
        onRenameTab={handleRenameTab}
        onNewTab={handleAddNewTab}
        onSaveFile={handleSaveFile}
        onLoadFile={handleLoadFile}
        isAssistantVoiceEnabled={appState.editorSettings.assistantVoiceEnabled}
        onToggleAssistantVoice={handleToggleAssistantVoice}
        onClearText={handleClearText}
        isApiKeySet={isApiKeySet}
        onSetDevApiKey={() => setIsApiKeyModalOpen(true)}
        onTogglePreview={handleTogglePreview}
        isPreviewActive={isMarkdownPreviewActive}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        isMusicPlaying={appState.editorSettings.isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        hasMusicUrl={!!appState.editorSettings.backgroundMusicUrl}
        isAssistantPanelVisible={appState.editorSettings.isAssistantPanelVisible ?? true}
        onToggleAssistantPanel={handleToggleAssistantPanelVisibility}
        activeAssistant={activeAssistantType}
        onToggleAssistant={handleToggleAssistant}
      />

      {errorMessage && (
        <div className="absolute top-[calc(theme(spacing.16)+theme(spacing.2))] left-1/2 -translate-x-1/2 z-30 p-3 bg-red-600/90 text-white text-sm rounded-md shadow-lg backdrop-blur-sm">
          {errorMessage}
          <button onClick={() => setErrorMessage(null)} className="ml-4 font-bold hover:text-red-200">✕</button>
        </div>
      )}
       {!isApiKeySet && !localStorage.getItem('GEMINI_API_KEY_DEV') && (
         <div className="absolute top-[calc(theme(spacing.16)+theme(spacing.2))] left-1/2 -translate-x-1/2 z-30 p-3 bg-yellow-500/90 text-black text-sm rounded-md shadow-lg backdrop-blur-sm">
            Gemini API Key not found. AI features are disabled. 
            <button onClick={() => setIsApiKeyModalOpen(true)} className="ml-2 underline font-semibold hover:text-yellow-800">Set Dev API Key</button>
        </div>
       )}

      <main className="flex-grow flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden relative" style={{ color: 'var(--theme-text-primary)'}}>
        <div className="flex w-full h-full max-w-7xl">
            <div 
              className="flex-1 flex flex-col backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden min-w-0 h-full"
              style={{backgroundColor: 'var(--theme-bg-content-area)' }}
            >
                {isMarkdownPreviewActive ? (
                    <MarkdownPreview markdownText={activeTab.textContent} />
                ) : (
                    <TextEditor value={activeTab.textContent} onChange={handleActiveTabContentChange} />
                )}
            </div>
            
            {(appState.editorSettings.isAssistantPanelVisible ?? true) && (
                <div 
                  className="w-full md:w-[360px] lg:w-[420px] h-full ml-4 md:ml-6 backdrop-blur-lg shadow-2xl rounded-xl hidden md:flex flex-col overflow-hidden"
                  style={{backgroundColor: 'var(--theme-bg-assistant-panel)' }}
                >
                   <SideAssistantPanel 
                    messages={activeTab.assistantMessages} 
                    isTyping={isAssistantTyping} 
                    isAssistantVoiceEnabled={appState.editorSettings.assistantVoiceEnabled && ttsSupported && activeAssistantType === 'lexi'}
                    onToggleVoice={handleToggleAssistantVoice} 
                    onSendMessage={handleSendAssistantMessage}
                    onApplyAction={handleApplyLexiAction}
                    onRejectAction={handleRejectLexiAction}
                    assistantName={assistantName}
                    chatPlaceholder={chatPlaceholder}
                    activeAssistantType={activeAssistantType}
                    />
                </div>
            )}
        </div>
      </main>
      
      <Modal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} title="Set Gemini API Key (For Development)">
        <p className="text-sm mb-3 text-gray-300">This key will be stored in localStorage for development convenience. In production, API_KEY should be an environment variable.</p>
        <input
          type="password"
          value={devApiKeyInput}
          onChange={(e) => setDevApiKeyInput(e.target.value)}
          placeholder="Enter your Gemini API Key"
          className="w-full p-3 border rounded-md bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
        />
        {isDevApiKeyLoading && <div className="flex justify-center my-3"><LoadingSpinner /></div>}
         <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setIsApiKeyModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
            <button onClick={handleSetDevApiKey} disabled={isDevApiKeyLoading || !devApiKeyInput.trim()} className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-60 transition-colors">Save Key</button>
        </div>
      </Modal>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentSettings={appState.editorSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
};

export default App;
