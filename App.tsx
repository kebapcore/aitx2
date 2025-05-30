
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextEditor from './components/TextEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import SideAssistantPanel from './components/SideAssistantPanel';
import Modal from './components/Modal';
import SettingsModal from './components/SettingsModal';
import ExportProgressModal from './components/ExportProgressModal'; 
import LoadingSpinner from './components/LoadingSpinner';
import IconButton from './components/IconButton'; 
import ContextMenu from './components/ContextMenu';


import { 
    EditorSettings, PredefinedTheme, ThemeId, AiHistoryRecord, Message, 
    LexiActionCommand, SettingsCommand, ParsedAssistantResponse,
    AssistantInteractionRecord, AudioAnalysisRecord, AppState, TabState,
    AssistantType, ThinkingPerformance, AudioAttachment, GroundingChunk,
    MusicPlaylistItem, MusicPreviewItem, ContextMenuItemWithIcon,
    CustomThemeDefinition, FullAppStateForExport, AiTextFile
} from './types';
import { 
    APP_VERSION, DEFAULT_EDITOR_SETTINGS, THEME_DEFINITIONS, 
    LOCALSTORAGE_APP_STATE_KEY, LOCALSTORAGE_LAUNCHED_BEFORE_KEY,
    GET_STARTED_MARKDOWN_CONTENT, ANONMUSIC_API_URL, ANONMUSIC_BASE_PATH_URL,
    ABOUT_PAGE_MARKDOWN_CONTENT, AI_TOOLS_GUIDE_MARKDOWN_CONTENT,
    A_SAMPLE_STORY_MARKDOWN_CONTENT, USEFUL_LINKS_MARKDOWN_CONTENT,
    EXPORT_MD_PROGRESS_MESSAGES, PREDEFINED_BACKGROUND_IMAGES
} from './constants';
import { 
    initializeAi, isAiInitialized, sendMessageToAssistantStream, 
    sendAudioAndPromptToAssistantStream, resetAssistantChat, getMarkdownExportContent 
} from './services/geminiService';
import { GenerateContentResponse } from '@google/genai'; 
import useSpeechSynthesis from './hooks/useSpeechSynthesis';

const parseAssistantResponse = (responseText: string): ParsedAssistantResponse => {
  let processedText = responseText;
  const actionCommandRegex = /\{(regenerate|append):([\s\S]*?)\}/s;
  const settingsCommandRegex = /\{(theme|music|bg):([^\{\}]*?)\}/g; 
  const metadataRegex = /\{metadata:([\s\S]*?)\}/s;
  const musicPlaylistRegex = /\[ms(\d+):(.+?)(?:\|(.+?))?\]/g;
  const musicPreviewRegex = /\[trymusic:(.+?),\s*([^\]]+?)\]/g;

  let actionCommand: LexiActionCommand | null = null;
  const settingsCommands: SettingsCommand[] = [];
  let metadataText: string | null = null;
  const musicPlaylist: MusicPlaylistItem[] = [];
  let musicPreview: MusicPreviewItem | null = null;

  const actionMatch = processedText.match(actionCommandRegex);
  if (actionMatch) {
    actionCommand = {
      type: actionMatch[1] as 'regenerate' | 'append',
      payload: actionMatch[2],
      originalCommandString: actionMatch[0],
    };
    processedText = processedText.replace(actionMatch[0], '');
  }

  let tempTextForSettingsExtraction = responseText; 
  let settingsMatch;
  while ((settingsMatch = settingsCommandRegex.exec(tempTextForSettingsExtraction)) !== null) {
    settingsCommands.push({
      type: settingsMatch[1] as 'theme' | 'music' | 'bg',
      payload: settingsMatch[2],
      originalCommandString: settingsMatch[0],
    });
    if (processedText.includes(settingsMatch[0])) {
        processedText = processedText.replace(settingsMatch[0], '');
    }
  }
  
  const metadataMatch = responseText.match(metadataRegex); 
  if (metadataMatch) {
    metadataText = metadataMatch[1].trim();
    if (processedText.includes(metadataMatch[0])) {
        processedText = processedText.replace(metadataMatch[0], '');
    }
  }

  let playlistMatch;
  while ((playlistMatch = musicPlaylistRegex.exec(responseText)) !== null) {
      musicPlaylist.push({
          id: `ms${playlistMatch[1]}`, 
          url: playlistMatch[2].trim(),
          title: playlistMatch[3] ? playlistMatch[3].trim() : undefined,
      });
      processedText = processedText.replace(playlistMatch[0], '');
  }
  if (musicPlaylist.length > 0) {
    musicPlaylist.sort((a, b) => parseInt(a.id.substring(2)) - parseInt(b.id.substring(2)));
  }

  const previewMatch = musicPreviewRegex.exec(responseText);
  if (previewMatch) {
      musicPreview = { url: previewMatch[1].trim(), title: previewMatch[2].trim() };
      processedText = processedText.replace(previewMatch[0], '');
  }
  
  const displayText = processedText.trim();
  return { 
      displayText, actionCommand, settingsCommands, metadataText,
      musicPlaylist: musicPlaylist.length > 0 ? musicPlaylist : undefined,
      musicPreview: musicPreview || undefined,
    };
};

const createNewTab = (
    activeAssistant: AssistantType,
    title = "Untitled", 
    content = "", 
    type: 'text' = 'text'
): TabState => {
    let introText = `Welcome to your new tab${title !== "Untitled" ? `: "${title}"` : ""}! I'm Lexi. How can I help you here?`;
    if (content) { 
      introText = `This tab "${title}" has been opened. I'm Lexi. How can I help you with this content?`;
    }
    if (activeAssistant === 'kebapgpt') {
        introText = content 
          ? `"${title}" sekmesi açıldı kanka. Ben KebapGPT. Bu içerikle ne yapalım?`
          : `Yeni sekmeye hoş geldin kanka${title !== "Untitled" ? `: "${title}"` : ""}! Ben KebapGPT. Ne lazım koçum?`;
    }

    return {
        id: uuidv4(), title, type, textContent: content,
        assistantMessages: [{ 
            id: `assistant-intro-tab-${Date.now()}`, sender: 'ai', text: introText, 
            timestamp: Date.now(), assistant: activeAssistant,
        }],
        aiHistory: [],
    };
};


const IconWrapperSmall: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className="w-4 h-4" }) => <div className={className}>{children}</div>;
const PasteIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25M6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg></IconWrapperSmall>;
const SelectAllIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" d="M9 4.5h6.75a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25V6.75A2.25 2.25 0 016.75 4.5H9z" /></svg></IconWrapperSmall>;
const TogglePreviewIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapperSmall>;
const ExtendIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m-9 7.5v4.5m0-4.5h4.5m-4.5 0L9 15m11.25 0v4.5m0-4.5h-4.5m4.5 0L15 15" /></svg></IconWrapperSmall>;
const SummarizeIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" /></svg></IconWrapperSmall>;
const MarkdownIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg></IconWrapperSmall>;
const FeedbackIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25V4.5m0 3.75c-.621 0-1.125.504-1.125 1.125v3.75c0 .621.504 1.125 1.125 1.125h.008c.621 0 1.125-.504 1.125-1.125v-3.75c0-.621-.504-1.125-1.125-1.125H12zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></IconWrapperSmall>;
const CopyIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504 1.125 1.125 1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125V7.5m0 4.125c0 .621.504 1.125 1.125 1.125h5.25c.621 0 1.125-.504 1.125-1.125V7.5m-6.375 1.5H6.75" /></svg></IconWrapperSmall>;
const CutIcon = () => <IconWrapperSmall><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.167 2.167 0 01-2.434 2.434m0 0a2.167 2.167 0 01-2.434-2.434m2.434 2.434L9 12m6-3.75l-1.536.887M16.152 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm-1.536.887a2.167 2.167 0 01-2.434 2.434m0 0a2.167 2.167 0 01-2.434-2.434m2.434 2.434L15 12M9 12l6 3.75m-6-3.75L3 15.75M9 12l6-3.75m-6 3.75L3 8.25" /></svg></IconWrapperSmall>;
const EyeIcon = () => <div className="w-5 h-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>;
const EyeSlashIcon = () => <div className="w-5 h-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.574M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg></div>;

const getRandomThemeAndBackground = (): { theme: PredefinedTheme, backgroundImageUrl: string } => {
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const availablePredefinedThemes = Object.keys(THEME_DEFINITIONS) as PredefinedTheme[];
    
    let suitableThemes = availablePredefinedThemes.filter(
        (themeKey) => THEME_DEFINITIONS[themeKey].isDark === systemPrefersDark
    );
    if (suitableThemes.length === 0) { 
        suitableThemes = availablePredefinedThemes;
    }
    const randomTheme = suitableThemes[Math.floor(Math.random() * suitableThemes.length)] || DEFAULT_EDITOR_SETTINGS.theme as PredefinedTheme;

    const randomBgIndex = Math.floor(Math.random() * PREDEFINED_BACKGROUND_IMAGES.length);
    const randomBackgroundUrl = PREDEFINED_BACKGROUND_IMAGES[randomBgIndex]?.url || DEFAULT_EDITOR_SETTINGS.backgroundImageUrl;
    
    return { theme: randomTheme, backgroundImageUrl: randomBackgroundUrl };
};


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
  const textEditorRef = useRef<HTMLTextAreaElement>(null); 
  const [isFullScreenMode, setIsFullScreenMode] = useState<boolean>(false);

  const [editorContextMenu, setEditorContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    items: ContextMenuItemWithIcon[];
  } | null>(null);

  const [isExportingMd, setIsExportingMd] = useState<boolean>(false);
  const [exportMdProgress, setExportMdProgress] = useState<number>(0);
  const [exportMdMessage, setExportMdMessage] = useState<string>('');


  useEffect(() => {
    if (initializeAi()) setIsApiKeySet(true);
    else {
        const devKey = localStorage.getItem('GEMINI_API_KEY_DEV');
        if (devKey && initializeAi()) setIsApiKeySet(true); 
    }
    loadStateFromLocalStorage();
    setIsLoadingState(false);
    
    const handleGlobalClick = () => {
        if (editorContextMenu?.visible) {
            setEditorContextMenu(null);
        }
    };
    window.addEventListener('click', handleGlobalClick);

    return () => {
        window.removeEventListener('click', handleGlobalClick);
    };
  }, [editorContextMenu?.visible]);


  const handleTogglePreview = useCallback(() => setIsMarkdownPreviewActive(prev => !prev), []);
  const handleToggleAssistant = useCallback(() => setAppState(prev => prev ? { ...prev, editorSettings: { ...prev.editorSettings, activeAssistant: prev.editorSettings.activeAssistant === 'lexi' ? 'kebapgpt' : 'lexi' }, ...(() => { resetAssistantChat(); return {}; })() } : null), []);
  const handleToggleAssistantPanelVisibility = useCallback(() => setAppState(prev => prev ? { ...prev, editorSettings: { ...prev.editorSettings, isAssistantPanelVisible: !(prev.editorSettings.isAssistantPanelVisible ?? true) } } : null), []);
  
  const handleAddNewTab = useCallback((contentType?: 'about' | 'get-started' | 'ai-tools' | 'story' | 'links') => {
    setAppState(prev => {
      if (!prev) return null;
      let title = "Untitled";
      let content = "";
      switch (contentType) {
          case 'about': title = "About"; content = ABOUT_PAGE_MARKDOWN_CONTENT; break;
          case 'get-started': title = "Get Started"; content = GET_STARTED_MARKDOWN_CONTENT; break;
          case 'ai-tools': title = "AI Tools Guide"; content = AI_TOOLS_GUIDE_MARKDOWN_CONTENT; break;
          case 'story': title = "Sample Story"; content = A_SAMPLE_STORY_MARKDOWN_CONTENT; break;
          case 'links': title = "Useful Links"; content = USEFUL_LINKS_MARKDOWN_CONTENT; break;
      }
      const newTab = createNewTab(prev.editorSettings.activeAssistant, title, content);
      resetAssistantChat(); 
      return { ...prev, tabs: [...prev.tabs, newTab], activeTabId: newTab.id };
    });
  }, []);


  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
        const activeEl = document.activeElement as HTMLElement;
        const isAnyInputFocused = activeEl && (
            activeEl.tagName === 'INPUT' ||
            activeEl.tagName === 'TEXTAREA' ||
            activeEl.isContentEditable 
        );

        if (event.key === 'Escape') {
            if (isAnyInputFocused && typeof activeEl.blur === 'function') {
                activeEl.blur();
                event.preventDefault();
                return; 
            }
            if (isFullScreenMode) {
                setIsFullScreenMode(false);
                event.preventDefault();
            }
            if (editorContextMenu?.visible) {
                setEditorContextMenu(null);
                event.preventDefault();
            }
            return;
        }

        if (event.key === 'F11') {
            event.preventDefault();
            setIsFullScreenMode(prev => !prev);
            return;
        }

        if (isAnyInputFocused) {
            return; 
        }

        switch (event.key.toUpperCase()) {
            case 'R':
                event.preventDefault();
                handleTogglePreview();
                break;
            case 'A':
                event.preventDefault();
                handleToggleAssistant();
                break;
            case 'S':
                event.preventDefault();
                handleToggleAssistantPanelVisibility();
                break;
            case 'T':
                event.preventDefault();
                handleAddNewTab();
                break;
        }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [
      isFullScreenMode, 
      editorContextMenu?.visible, 
      handleTogglePreview, 
      handleToggleAssistant, 
      handleToggleAssistantPanelVisibility, 
      handleAddNewTab
    ]);

  const mergeSettings = (loadedSettings: Partial<EditorSettings>, defaultSettings: EditorSettings): EditorSettings => {
    const validThinkingPerformances: ThinkingPerformance[] = ['default', 'fastest', 'advanced'];
    const merged: EditorSettings = {
        ...defaultSettings,
        ...loadedSettings,
        theme: (loadedSettings.theme && (THEME_DEFINITIONS[loadedSettings.theme as PredefinedTheme] || (loadedSettings.customThemes || []).find(ct => ct.id === loadedSettings.theme))) 
               ? loadedSettings.theme 
               : defaultSettings.theme,
        activeAssistant: (loadedSettings.activeAssistant && ['lexi', 'kebapgpt'].includes(loadedSettings.activeAssistant)) 
                         ? loadedSettings.activeAssistant 
                         : defaultSettings.activeAssistant,
        thinkingPerformance: (loadedSettings.thinkingPerformance && validThinkingPerformances.includes(loadedSettings.thinkingPerformance))
                             ? loadedSettings.thinkingPerformance
                             : defaultSettings.thinkingPerformance,
        customModelName: loadedSettings.customModelName || '',
        customSystemInstruction: loadedSettings.customSystemInstruction || '',
        customThemes: loadedSettings.customThemes || [],
        isAssistantPanelVisible: loadedSettings.isAssistantPanelVisible ?? defaultSettings.isAssistantPanelVisible,
        assistantVoiceEnabled: loadedSettings.assistantVoiceEnabled ?? defaultSettings.assistantVoiceEnabled,
    };
    return merged;
  };


  const loadStateFromLocalStorage = () => {
    const storedAppState = localStorage.getItem(LOCALSTORAGE_APP_STATE_KEY);
    if (storedAppState) {
      try {
        const parsedState = JSON.parse(storedAppState) as AppState;
         if (parsedState.tabs && parsedState.editorSettings) {
            setAppState({
                ...parsedState,
                editorSettings: mergeSettings(parsedState.editorSettings, DEFAULT_EDITOR_SETTINGS)
            });
        } else loadDefaultState();
      } catch (e) {
        console.error("Failed to parse stored app state, resetting:", e);
        localStorage.removeItem(LOCALSTORAGE_APP_STATE_KEY);
        loadDefaultState();
      }
    } else loadDefaultState();
  };
  
 const loadDefaultState = (triggeredByRefresh = false) => {
    const launchedBefore = localStorage.getItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY);
    let initialSettings = { ...DEFAULT_EDITOR_SETTINGS };

    if (!launchedBefore || triggeredByRefresh) {
        const {theme: randomTheme, backgroundImageUrl: randomBackgroundUrl} = getRandomThemeAndBackground();
        initialSettings.theme = randomTheme;
        initialSettings.backgroundImageUrl = randomBackgroundUrl;
        initialSettings.isMusicPlaying = false;
        if (!launchedBefore) localStorage.setItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY, 'true');
    }

    const defaultAssistant = initialSettings.activeAssistant;
    const getStartedTab = createNewTab(defaultAssistant, "Get Started", GET_STARTED_MARKDOWN_CONTENT);
    
    setAppState({
        tabs: [getStartedTab],
        activeTabId: getStartedTab.id,
        editorSettings: initialSettings,
    });
};

  const handleRefreshThemeAndBackground = () => {
    setAppState(prev => {
        if (!prev) return null;
        const {theme: randomTheme, backgroundImageUrl: randomBackgroundUrl} = getRandomThemeAndBackground();
        return {
            ...prev,
            editorSettings: {
                ...prev.editorSettings,
                theme: randomTheme,
                backgroundImageUrl: randomBackgroundUrl,
            }
        }
    });
  }

  useEffect(() => {
    if (appState && !isLoadingState) {
      localStorage.setItem(LOCALSTORAGE_APP_STATE_KEY, JSON.stringify(appState));
    }
  }, [appState, isLoadingState]);

  useEffect(() => {
    if (appState?.editorSettings) {
      const settings = appState.editorSettings;
      let themeDefToApply: CustomThemeDefinition | { name: string, isDark: boolean, variables: Record<string, string> } | undefined;

      if (THEME_DEFINITIONS[settings.theme as PredefinedTheme]) {
        themeDefToApply = THEME_DEFINITIONS[settings.theme as PredefinedTheme];
      } else {
        themeDefToApply = (settings.customThemes || []).find(ct => ct.id === settings.theme);
      }
      
      if (!themeDefToApply) { // Fallback if theme ID is invalid
        console.warn(`Theme with ID "${settings.theme}" not found, falling back to default.`);
        themeDefToApply = THEME_DEFINITIONS[DEFAULT_EDITOR_SETTINGS.theme as PredefinedTheme];
        // Optionally update appState to reflect this fallback
        // setAppState(prev => prev ? {...prev, editorSettings: {...prev.editorSettings, theme: DEFAULT_EDITOR_SETTINGS.theme}} : null);
      }
      
      Object.keys(THEME_DEFINITIONS).forEach(k => document.documentElement.classList.remove(`theme-${k}`));
      (settings.customThemes || []).forEach(ct => document.documentElement.classList.remove(`theme-${ct.id}`));

      document.documentElement.classList.add(`theme-${settings.theme}`);
      document.documentElement.classList.toggle('dark', themeDefToApply.isDark);
      
      const styleEl = document.getElementById('dynamic-theme-styles');
      if (styleEl) {
        let css = `:root.theme-${settings.theme} {\n`;
        for (const [v, val] of Object.entries(themeDefToApply.variables)) css += `  ${v}: ${val};\n`;
        css += `}\n`;
        if (themeDefToApply.variables['--theme-scrollbar-thumb'] && themeDefToApply.variables['--theme-scrollbar-track']) {
            css += `.theme-${settings.theme} ::-webkit-scrollbar { width: 8px; height: 8px; }
                    .theme-${settings.theme} ::-webkit-scrollbar-track { background: var(--theme-scrollbar-track); border-radius: 4px; }
                    .theme-${settings.theme} ::-webkit-scrollbar-thumb { background: var(--theme-scrollbar-thumb); border-radius: 4px; }
                    .theme-${settings.theme} ::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--theme-scrollbar-thumb) 80%, #fff 20%); }`;
        }
        styleEl.textContent = css;
      }

      document.body.style.backgroundImage = settings.backgroundImageUrl ? `url('${settings.backgroundImageUrl}')` : '';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.transition = 'background-image 0.5s ease-in-out';
      
      if (audioRef.current) {
        if (settings.backgroundMusicUrl && settings.backgroundMusicUrl !== audioRef.current.src) {
            audioRef.current.src = settings.backgroundMusicUrl; audioRef.current.load();
        } else if (!settings.backgroundMusicUrl && audioRef.current.src) {
            audioRef.current.pause(); audioRef.current.src = "";
        }
        if (settings.isMusicPlaying && settings.backgroundMusicUrl && audioRef.current.paused) audioRef.current.play().catch(e => console.warn("Music autoplay prevented:", e));
        else if ((!settings.isMusicPlaying || !settings.backgroundMusicUrl) && !audioRef.current.paused) audioRef.current.pause();
        audioRef.current.loop = true;
      }
    }
  }, [appState?.editorSettings]);

  const handleSettingsChange = (newSettings: EditorSettings) => {
    setAppState(prev => {
        if (!prev) return null;
        if (prev.editorSettings.activeAssistant !== newSettings.activeAssistant ||
            prev.editorSettings.thinkingPerformance !== newSettings.thinkingPerformance ||
            prev.editorSettings.customModelName !== newSettings.customModelName ||
            prev.editorSettings.customSystemInstruction !== newSettings.customSystemInstruction ||
            prev.editorSettings.theme !== newSettings.theme // Reset chat if theme changed, as custom themes might have different IDs.
            ) {
            resetAssistantChat();
        }
        return { ...prev, editorSettings: newSettings };
    });
  };

  const handleToggleAssistantVoice = () => setAppState(prev => prev ? { ...prev, editorSettings: { ...prev.editorSettings, assistantVoiceEnabled: !prev.editorSettings.assistantVoiceEnabled && (() => { if (prev.editorSettings.assistantVoiceEnabled) cancelSpeech(); return true; })() } } : null);
  const handleToggleMusic = () => setAppState(prev => prev ? { ...prev, editorSettings: { ...prev.editorSettings, isMusicPlaying: !prev.editorSettings.isMusicPlaying } } : null);
  const handleSetPreviewAsBackgroundMusic = (url: string) => setAppState(prev => prev ? { ...prev, editorSettings: { ...prev.editorSettings, backgroundMusicUrl: url, isMusicPlaying: true } } : null);

  const handleActivateTab = useCallback((tabId: string) => setAppState(prev => (prev && prev.activeTabId !== tabId) ? { ...prev, activeTabId: tabId, ...(() => { resetAssistantChat(); return {}; })() } : prev), []);
  const handleCloseTab = useCallback((tabIdToClose: string) => setAppState(prev => {
    if (!prev) return null;
    const remainingTabs = prev.tabs.filter(tab => tab.id !== tabIdToClose);
    if (remainingTabs.length === 0) {
      const newTab = createNewTab(prev.editorSettings.activeAssistant);
      resetAssistantChat(); return { ...prev, tabs: [newTab], activeTabId: newTab.id };
    }
    let newActiveId = prev.activeTabId;
    if (prev.activeTabId === tabIdToClose) {
      const idx = prev.tabs.findIndex(t => t.id === tabIdToClose);
      newActiveId = remainingTabs[Math.max(0, idx - 1)]?.id || remainingTabs[0]?.id;
      if (newActiveId) resetAssistantChat();
    }
    return { ...prev, tabs: remainingTabs, activeTabId: newActiveId };
  }), []);
  const handleRenameTab = useCallback((tabId: string, newTitle: string) => setAppState(prev => prev ? { ...prev, tabs: prev.tabs.map(t => t.id === tabId ? { ...t, title: newTitle } : t) } : null), []);
  
  const activeTab = appState?.tabs.find(tab => tab.id === appState.activeTabId);
  const handleActiveTabContentChange = (newContent: string) => setAppState(prev => prev && prev.activeTabId ? { ...prev, tabs: prev.tabs.map(t => t.id === prev.activeTabId ? { ...t, textContent: newContent } : t) } : prev);
  const updateActiveTabAiHistory = useCallback((newRecord: AiHistoryRecord) => setAppState(prev => prev && prev.activeTabId ? { ...prev, tabs: prev.tabs.map(t => t.id === prev.activeTabId ? { ...t, aiHistory: [...t.aiHistory, newRecord] } : t) } : prev), []);

  const handleSendAssistantMessage = async (userMessageText: string, audioAttachment?: AudioAttachment) => {
    if ((!userMessageText.trim() && !audioAttachment) || !isApiKeySet || !appState || !activeTab) {
        setErrorMessage("Cannot send: API key, state, tab, or message/audio missing."); return;
    }
    const currentAssistant = appState.editorSettings.activeAssistant;
    const thinkingPerformance = appState.editorSettings.thinkingPerformance;
    const editorSettingsForAI = appState.editorSettings;

    const newUserMessage: Message = { id: `user-${uuidv4()}`, sender: 'user', text: userMessageText, timestamp: Date.now(), attachedAudioInfo: audioAttachment ? { name: audioAttachment.name, type: audioAttachment.type } : undefined };
    setAppState(prev => prev ? { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? {...t, assistantMessages: [...t.assistantMessages, newUserMessage]} : t) } : null);
    setIsAssistantTyping(true); setErrorMessage(null);

    let musicApiContext = "";
    try {
        const res = await fetch(ANONMUSIC_API_URL);
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const jsonData = await res.json();
                musicApiContext = `\n\nAvailable Music (use for requests, prefix 'audioPath' with "${ANONMUSIC_BASE_PATH_URL}"):\n---\n${JSON.stringify(jsonData)}\n---\n`;
            } else {
                musicApiContext = `\n\n(Could not fetch music list: Expected JSON but received ${contentType || 'unknown content type'}. Status: ${res.status})\n`;
            }
        } else {
            musicApiContext = `\n\n(Could not fetch music list: Server responded with status ${res.status} - ${res.statusText})\n`;
        }
    } catch (e) {
        let errorDetail = e instanceof Error ? e.message : String(e);
        if (e instanceof SyntaxError) { 
            errorDetail = "Failed to parse music data as JSON. " + errorDetail;
        }
        musicApiContext = `\n\n(Error fetching music: ${errorDetail})\n`;
    }

    const fullPrompt = `User's text:\n---\n${activeTab.textContent.trim()||"(empty)"}\n---\n${musicApiContext}\nUser's message: "${userMessageText}"`;
    let fullResponseText = ""; let accumulatedGroundingChunks: GroundingChunk[] = [];
    const assistantMessageId = `ai-${uuidv4()}`;
    const placeholderMsg: Message = { id: assistantMessageId, sender: 'ai', text: '', timestamp: Date.now(), isActionPending: false, assistant: currentAssistant };
    setAppState(prev => prev ? { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? {...t, assistantMessages: [...t.assistantMessages, placeholderMsg]} : t) } : null);

    try {
        let stream = audioAttachment 
            ? await sendAudioAndPromptToAssistantStream(audioAttachment.file, userMessageText, currentAssistant, thinkingPerformance, editorSettingsForAI)
            : await sendMessageToAssistantStream(fullPrompt, currentAssistant, thinkingPerformance, editorSettingsForAI);

        if (stream) {
            for await (const chunk of stream) { 
                fullResponseText += chunk.text;
                if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) accumulatedGroundingChunks.push(...chunk.candidates[0].groundingMetadata.groundingChunks);
                setAppState(prev => prev ? { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? { ...t, assistantMessages: t.assistantMessages.map(m => m.id === assistantMessageId ? {...m, text: fullResponseText, groundingChunks: [...accumulatedGroundingChunks] } : m) } : t) } : null);
            }
            const parsed = parseAssistantResponse(fullResponseText);
            if (parsed.settingsCommands.length > 0) {
                setAppState(prev => {
                    if (!prev) return null;
                    let newSettings = { ...prev.editorSettings }; let criticalChange = false;
                    parsed.settingsCommands.forEach(cmd => {
                        const themePayloadId = cmd.payload as ThemeId;
                        if (cmd.type === 'theme' && (THEME_DEFINITIONS[themePayloadId as PredefinedTheme] || (newSettings.customThemes || []).find(ct => ct.id === themePayloadId)) ) { 
                            if (newSettings.theme !== themePayloadId) {newSettings.theme = themePayloadId; criticalChange=true;} 
                        }
                        else if (cmd.type === 'music') { if (newSettings.backgroundMusicUrl !== cmd.payload.trim()) newSettings.backgroundMusicUrl = cmd.payload.trim(); newSettings.isMusicPlaying = !!cmd.payload.trim(); }
                        else if (cmd.type === 'bg') { if (newSettings.backgroundImageUrl !== cmd.payload) newSettings.backgroundImageUrl = cmd.payload; }
                    });
                    if (criticalChange) resetAssistantChat();
                    return { ...prev, editorSettings: newSettings };
                });
            }
            setAppState(prev => prev ? { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? { ...t, assistantMessages: t.assistantMessages.map(m => m.id === assistantMessageId ? { ...m, text: parsed.displayText || (parsed.actionCommand ? `${currentAssistant==='kebapgpt'?'KebapGPT değişiklik öneriyor.':'Lexi suggests a change.'}` : (parsed.settingsCommands.length>0?`${currentAssistant==='kebapgpt'?'Ayarlar güncellendi!':'Settings updated!'}`:(parsed.musicPlaylist||parsed.musicPreview?'':`(${currentAssistant==='kebapgpt'?'KebapGPT bir şey demedi':'Empty response'})`))), actionCommand: parsed.actionCommand, settingsCommands: parsed.settingsCommands.length > 0 ? parsed.settingsCommands : null, metadataText: parsed.metadataText, isActionPending: !!parsed.actionCommand, assistant: currentAssistant, groundingChunks: accumulatedGroundingChunks.length > 0 ? [...accumulatedGroundingChunks] : undefined, musicPlaylist: parsed.musicPlaylist, musicPreview: parsed.musicPreview } : m) } : t) } : null);
            if (currentAssistant === 'lexi' && appState.editorSettings.assistantVoiceEnabled && ttsSupported && parsed.displayText.trim()) speak(parsed.displayText);
            
            const historyBase = { userMessage: userMessageText, assistantResponse: fullResponseText, timestamp: Date.now(), assistant: currentAssistant };
            if (audioAttachment) updateActiveTabAiHistory({ type: 'audioAnalysis', ...historyBase, userPrompt: userMessageText, audioFileName: audioAttachment.name } as AudioAnalysisRecord);
            else updateActiveTabAiHistory({ type: 'assistant', ...historyBase, editorSnapshot: activeTab.textContent, actionTaken: parsed.actionCommand?.type || 'none', settingsApplied: parsed.settingsCommands.length > 0 ? parsed.settingsCommands : undefined, groundingChunks: accumulatedGroundingChunks.length > 0 ? accumulatedGroundingChunks : undefined } as AssistantInteractionRecord);
        }
    } catch (e) {
        const errText = `${currentAssistant==='kebapgpt'?'KebapGPT cevap veremedi':'Lexi error'}: ${e instanceof Error ? e.message : String(e)}`;
        setAppState(prev => prev ? { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? { ...t, assistantMessages: t.assistantMessages.map(m => m.id === assistantMessageId ? {...m, text: errText, isActionPending: false, assistant: currentAssistant } : m) } : t) } : null);
        setErrorMessage(errText);
    } finally { setIsAssistantTyping(false); }
  };

  const handleApplyLexiAction = (messageId: string) => setAppState(prev => {
    if (!prev || !activeTab) return prev;
    const tab = prev.tabs.find(t => t.id === activeTab.id); if (!tab) return prev;
    const msg = tab.assistantMessages.find(m => m.id === messageId); if (!msg || !msg.actionCommand) return prev;
    const { type, payload } = msg.actionCommand;
    let newContent = tab.textContent;
    if (type === 'regenerate') newContent = payload; else if (type === 'append') newContent += payload;
    return { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? { ...t, textContent: newContent, assistantMessages: t.assistantMessages.map(m => m.id === messageId ? { ...m, isActionPending: false, isActionApplied: true } : m) } : t) };
  });
  const handleRejectLexiAction = (messageId: string) => setAppState(prev => prev && activeTab ? { ...prev, tabs: prev.tabs.map(t => t.id === activeTab.id ? { ...t, assistantMessages: t.assistantMessages.map(m => m.id === messageId ? { ...m, isActionPending: false, isActionRejected: true } : m) } : t) } : null);

  const handleSaveFile = () => { 
    if (!appState || !activeTab) return;
    const fileData: AiTextFile = { version: APP_VERSION, activeTabContent: activeTab.textContent, activeTabAiHistory: activeTab.aiHistory, activeTabAssistantMessages: activeTab.assistantMessages, editorSettings: appState.editorSettings };
    const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `editor-doc-${activeTab.title.replace(/\s+/g, '_')}-${Date.now()}.aitxt`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files?.[0];
    if (file && appState && activeTab) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string) as AiTextFile;
          if (parsed.version && parsed.activeTabContent !== undefined && parsed.editorSettings) {
            setAppState(prev => {
                if (!prev || !prev.activeTabId) return prev;
                const loadedSettings = mergeSettings(parsed.editorSettings, DEFAULT_EDITOR_SETTINGS);
                
                let loadedMsgs = (parsed.activeTabAssistantMessages && parsed.activeTabAssistantMessages.length > 0) ? parsed.activeTabAssistantMessages : [];
                if (loadedMsgs.length === 0) {
                    let intro = `File loaded. I'm ${loadedSettings.activeAssistant === 'lexi' ? 'Lexi' : 'KebapGPT'}. Ready?`;
                    loadedMsgs = [{ id: `load-intro-${uuidv4()}`, sender: 'ai', text: intro, timestamp: Date.now(), assistant: loadedSettings.activeAssistant }];
                }
                return { ...prev, editorSettings: loadedSettings, tabs: prev.tabs.map(t => t.id === prev.activeTabId ? { ...t, textContent: parsed.activeTabContent, aiHistory: parsed.activeTabAiHistory || [], assistantMessages: loadedMsgs } : t) };
            });
            resetAssistantChat(); setErrorMessage(null);
          } else setErrorMessage('Invalid .aitxt file.');
        } catch (err) { setErrorMessage(`Load failed: ${err instanceof Error ? err.message : String(err)}`); }
      };
      reader.readAsText(file); event.target.value = ''; 
    }
  };

  const handleClearText = () => { 
    if (activeTab && window.confirm(`Clear text in tab "${activeTab.title}"?`)) {
      setAppState(prev => {
          if (!prev || !prev.activeTabId) return prev;
          const assistant = prev.editorSettings.activeAssistant;
          const msg = assistant === 'kebapgpt' ? "Sayfayı sildim. Hadi yeni bişiler karalayalım!" : "Editor cleared. Let's start fresh!";
          return { ...prev, tabs: prev.tabs.map(t => t.id === prev.activeTabId ? { ...t, textContent: '', assistantMessages: [...t.assistantMessages, { id: `clear-${uuidv4()}`, sender: 'ai', text: msg, timestamp: Date.now(), assistant }] } : t) };
      });
      resetAssistantChat();
    }
  };

  const handleSetDevApiKey = () => {
    if (devApiKeyInput.trim()) {
      localStorage.setItem('GEMINI_API_KEY_DEV', devApiKeyInput.trim()); setIsDevApiKeyLoading(true);
      if (initializeAi()) { setIsApiKeySet(true); setIsApiKeyModalOpen(false); setDevApiKeyInput(''); setErrorMessage(null); }
      else setErrorMessage("API Key invalid or service init failed.");
      setIsDevApiKeyLoading(false);
    } else setErrorMessage("Enter API Key.");
  };

  const handleTextEditorContextMenu = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    if (!textEditorRef.current) return;

    const textarea = textEditorRef.current;
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    const items: ContextMenuItemWithIcon[] = [];

    if (selection) {
        items.push({ label: "Copy", action: () => navigator.clipboard.writeText(selection).catch(err => console.error("Copy failed:", err)), icon: <CopyIcon /> });
        items.push({ label: "Cut", action: () => {
            navigator.clipboard.writeText(selection).then(() => {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newContent = textarea.value.substring(0, start) + textarea.value.substring(end);
                handleActiveTabContentChange(newContent);
                setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start; }, 0);
            }).catch(err => console.error("Cut failed:", err));
        }, icon: <CutIcon /> });
    }

    items.push({ label: "Paste", action: () => {
        navigator.clipboard.readText().then(textToPaste => {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newContent = textarea.value.substring(0, start) + textToPaste + textarea.value.substring(end);
            handleActiveTabContentChange(newContent);
            setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + textToPaste.length; }, 0);
        }).catch(err => console.error("Paste failed:", err));
    }, icon: <PasteIcon /> });
    
    if (!selection) {
        items.push({ label: "Select All", action: () => {
            textEditorRef.current?.select();
        }, icon: <SelectAllIcon /> });
    }

    items.push({ isSeparator: true });
    items.push({ label: "Toggle Preview/Edit", action: handleTogglePreview, icon: <TogglePreviewIcon /> });
    items.push({ isSeparator: true });

    items.push({ label: "Extend", action: () => handleSendAssistantMessage("Hey, can you develop and extend my text further in line with the context?"), icon: <ExtendIcon /> });
    items.push({ label: "Summarize", action: () => handleSendAssistantMessage("Hey, find the most important parts of this text, cut out unimportant and unnecessary parts, and summarize and rewrite it perfectly."), icon: <SummarizeIcon /> });
    items.push({ label: "Markdownize", action: () => handleSendAssistantMessage("Hey, can you enhance my text visually with styles and existing markdowns? In short, organize it by adding markdowns, spaces, etc."), icon: <MarkdownIcon /> });
    items.push({ label: "Get Feedback", action: () => handleSendAssistantMessage("Hey, what do you think of my text? Can you give detailed feedback on its good and bad aspects, and how it can be improved?"), icon: <FeedbackIcon /> });

    setEditorContextMenu({ visible: true, x: event.clientX, y: event.clientY, items });
  };

  const handleExportToMd = async () => {
    if (!appState || !activeTab || !isApiKeySet) {
        setErrorMessage("Cannot export: API key, application state, or active tab missing.");
        return;
    }
    setIsExportingMd(true);
    try {
        setExportMdMessage(EXPORT_MD_PROGRESS_MESSAGES.INITIALIZING); setExportMdProgress(0);
        
        await new Promise(resolve => setTimeout(resolve, 300)); 
        setExportMdMessage(EXPORT_MD_PROGRESS_MESSAGES.AI_PROCESSING); setExportMdProgress(10);

        const markdownContent = await getMarkdownExportContent(activeTab.textContent);
        
        setExportMdMessage(EXPORT_MD_PROGRESS_MESSAGES.OPTIMIZING); setExportMdProgress(70);
        await new Promise(resolve => setTimeout(resolve, 300)); 

        setExportMdMessage(EXPORT_MD_PROGRESS_MESSAGES.PREPARING_FILE); setExportMdProgress(90);
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeTab.title.replace(/\s+/g, '_') || 'document'}.md`;
        
        await new Promise(resolve => setTimeout(resolve, 300));
        setExportMdMessage(EXPORT_MD_PROGRESS_MESSAGES.DOWNLOADING); setExportMdProgress(100);

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        await new Promise(resolve => setTimeout(resolve, 500)); 

    } catch (error) {
        console.error("Error exporting to Markdown:", error);
        setErrorMessage(`Markdown export failed: ${error instanceof Error ? error.message : String(error)}`);
        await new Promise(resolve => setTimeout(resolve, 2000)); 
    } finally {
        setIsExportingMd(false);
        setExportMdProgress(0);
        setExportMdMessage('');
    }
  };
  
  const handleExportAllSettings = () => {
    if (!appState) {
        setErrorMessage("Uygulama durumu dışa aktarmak için yüklenemedi.");
        return;
    }
    // Use FullAppStateForExport type which includes all necessary top-level fields
    const exportData: AppState = { ...appState }; 

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-text-editor-all-settings-${Date.now()}.settings`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setErrorMessage("Tüm ayarlar başarıyla dışa aktarıldı.");
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const handleImportAllSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        if (!window.confirm("UYARI: Tüm ayarları içe aktarmak, mevcut tüm sekmelerinizi, içeriklerinizi ve ayarlarınızı GÜNCEL dosyadakilerle değiştirecektir. Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?")) {
            if (event.target) event.target.value = ''; // Reset file input
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const fileContent = e.target?.result as string;
                const parsedState = JSON.parse(fileContent) as AppState; // Use AppState for direct import

                // Basic validation: check for essential top-level keys
                if (parsedState.tabs && parsedState.editorSettings && parsedState.activeTabId !== undefined) {
                    localStorage.setItem(LOCALSTORAGE_APP_STATE_KEY, fileContent);
                    localStorage.setItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY, 'true'); // Ensure it doesn't trigger first launch logic
                    window.location.reload(); // Easiest way to apply all settings cleanly
                } else {
                    setErrorMessage("Geçersiz .settings dosyası. Gerekli yapı eksik.");
                }
            } catch (err) {
                setErrorMessage(`Ayarlar içe aktarılırken hata oluştu: ${err instanceof Error ? err.message : String(err)}`);
            }
        };
        reader.readAsText(file);
        if (event.target) event.target.value = ''; // Reset file input
    }
  };


  if (isLoadingState || !appState || !activeTab) {
    return <div className="flex items-center justify-center h-screen" style={{backgroundColor: 'var(--theme-bg-page, #111827)'}}><LoadingSpinner size="w-16 h-16" color="text-sky-500" /></div>;
  }
  
  let currentThemeDef: CustomThemeDefinition | { name: string, isDark: boolean, variables: Record<string, string> } | undefined;
  if (THEME_DEFINITIONS[appState.editorSettings.theme as PredefinedTheme]) {
    currentThemeDef = THEME_DEFINITIONS[appState.editorSettings.theme as PredefinedTheme];
  } else {
    currentThemeDef = (appState.editorSettings.customThemes || []).find(ct => ct.id === appState.editorSettings.theme);
  }
  if (!currentThemeDef) {
    currentThemeDef = THEME_DEFINITIONS[DEFAULT_EDITOR_SETTINGS.theme as PredefinedTheme];
  }
  
  const activeAssistantType = appState.editorSettings.activeAssistant;
  const assistantName = activeAssistantType === 'kebapgpt' ? 'KebapGPT' : 'Lexi Assistant';
  const chatPlaceholder = activeAssistantType === 'kebapgpt' ? 'KebapGPT\'ye yaz...' : 'Chat with Lexi...';

  const mainContentAreaClasses = `flex-1 flex flex-col backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden min-w-0 h-full transition-all duration-300 ease-in-out ${isFullScreenMode ? 'max-w-full' : 'max-w-7xl'}`;

  return (
    <div className={`flex flex-col h-screen min-h-screen font-sans transition-colors duration-300 overflow-hidden theme-${appState.editorSettings.theme} ${currentThemeDef.isDark ? 'dark' : ''} ${isFullScreenMode ? 'app-fullscreen' : ''}`}>
      <audio ref={audioRef} loop />
      {!isFullScreenMode && (
        <Toolbar
            tabs={appState.tabs} activeTabId={appState.activeTabId} onActivateTab={handleActivateTab}
            onCloseTab={handleCloseTab} onRenameTab={handleRenameTab} onNewTab={handleAddNewTab}
            onSaveFile={handleSaveFile} onLoadFile={handleLoadFile} onExportToMd={handleExportToMd}
            isAssistantVoiceEnabled={appState.editorSettings.assistantVoiceEnabled} onToggleAssistantVoice={handleToggleAssistantVoice}
            onClearText={handleClearText} isApiKeySet={isApiKeySet} onSetDevApiKey={() => setIsApiKeyModalOpen(true)}
            onTogglePreview={handleTogglePreview} isPreviewActive={isMarkdownPreviewActive}
            onOpenSettings={() => setIsSettingsModalOpen(true)} isMusicPlaying={appState.editorSettings.isMusicPlaying}
            onToggleMusic={handleToggleMusic} hasMusicUrl={!!appState.editorSettings.backgroundMusicUrl}
            isAssistantPanelVisible={appState.editorSettings.isAssistantPanelVisible ?? true}
            onToggleAssistantPanel={handleToggleAssistantPanelVisibility} activeAssistant={activeAssistantType}
            onToggleAssistant={handleToggleAssistant}
        />
      )}

      {errorMessage && !isFullScreenMode && (
        <div className="absolute top-[calc(theme(spacing.16)+theme(spacing.2))] left-1/2 -translate-x-1/2 z-30 p-3 bg-red-600/90 text-white text-sm rounded-md shadow-lg backdrop-blur-sm">
          {errorMessage} <button onClick={() => setErrorMessage(null)} className="ml-4 font-bold hover:text-red-200">✕</button>
        </div>
      )}
       {!isApiKeySet && !localStorage.getItem('GEMINI_API_KEY_DEV') && !isFullScreenMode && (
         <div className="absolute top-[calc(theme(spacing.16)+theme(spacing.2))] left-1/2 -translate-x-1/2 z-30 p-3 bg-yellow-500/90 text-black text-sm rounded-md shadow-lg backdrop-blur-sm">
            Gemini API Key not found. AI features disabled. 
            <button onClick={() => setIsApiKeyModalOpen(true)} className="ml-2 underline font-semibold hover:text-yellow-800">Set Dev API Key</button>
        </div>
       )}

      <main className={`flex-grow flex items-center justify-center overflow-hidden relative transition-all duration-300 ease-in-out ${isFullScreenMode ? 'p-0' : 'p-4 md:p-6 lg:p-8'}`} style={{ color: 'var(--theme-text-primary)'}}>
        <div className={`flex w-full h-full ${isFullScreenMode ? '' : 'max-w-screen-2xl'}`}> {/* Max width adjusted */}
            <div className={mainContentAreaClasses} style={{backgroundColor: 'var(--theme-bg-content-area)' }}>
                {isMarkdownPreviewActive 
                    ? <MarkdownPreview markdownText={activeTab.textContent} /> 
                    : <TextEditor 
                        ref={textEditorRef} 
                        value={activeTab.textContent} 
                        onChange={handleActiveTabContentChange}
                        onContextMenu={handleTextEditorContextMenu} 
                      />
                }
            </div>
            
            {(appState.editorSettings.isAssistantPanelVisible ?? true) && !isFullScreenMode && (
                <div className="w-full md:w-[360px] lg:w-[420px] h-full ml-4 md:ml-6 backdrop-blur-lg shadow-2xl rounded-xl hidden md:flex flex-col overflow-hidden" style={{backgroundColor: 'var(--theme-bg-assistant-panel)' }}>
                   <SideAssistantPanel 
                    messages={activeTab.assistantMessages} isTyping={isAssistantTyping} 
                    isAssistantVoiceEnabled={appState.editorSettings.assistantVoiceEnabled && ttsSupported && activeAssistantType === 'lexi'}
                    onToggleVoice={handleToggleAssistantVoice} onSendMessage={handleSendAssistantMessage}
                    onApplyAction={handleApplyLexiAction} onRejectAction={handleRejectLexiAction}
                    assistantName={assistantName} chatPlaceholder={chatPlaceholder} activeAssistantType={activeAssistantType}
                    isDarkMode={currentThemeDef.isDark} onSetPreviewAsBackgroundMusic={handleSetPreviewAsBackgroundMusic}
                    currentBackgroundMusicUrl={appState.editorSettings.backgroundMusicUrl} />
                </div>
            )}
        </div>
        {isFullScreenMode && (
            <IconButton
                icon={isMarkdownPreviewActive ? <EyeSlashIcon /> : <EyeIcon />}
                label={isMarkdownPreviewActive ? "Show Editor" : "Show Preview"}
                onClick={handleTogglePreview}
                className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[color:var(--theme-bg-toolbar)] text-[color:var(--theme-text-accent)] shadow-lg hover:bg-opacity-80 transition-all"
                title={isMarkdownPreviewActive ? "Switch to Editor" : "Switch to Markdown Preview"}
            />
        )}
      </main>
      
      {editorContextMenu?.visible && (
        <ContextMenu 
          items={editorContextMenu.items}
          xPos={editorContextMenu.x}
          yPos={editorContextMenu.y}
          onClose={() => setEditorContextMenu(null)}
        />
      )}

      <Modal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} title="Set Gemini API Key (Dev)">
        <p className="text-sm mb-3 text-gray-300">Stored in localStorage. Production should use env var.</p>
        <input type="password" value={devApiKeyInput} onChange={(e) => setDevApiKeyInput(e.target.value)} placeholder="Enter Gemini API Key"
               className="w-full p-3 border rounded-md bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"/>
        {isDevApiKeyLoading && <div className="flex justify-center my-3"><LoadingSpinner /></div>}
         <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setIsApiKeyModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500">Cancel</button>
            <button onClick={handleSetDevApiKey} disabled={isDevApiKeyLoading || !devApiKeyInput.trim()} className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-60">Save</button>
        </div>
      </Modal>

      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        currentSettings={appState.editorSettings} 
        onSettingsChange={handleSettingsChange}
        onExportAllSettings={handleExportAllSettings}
        onImportAllSettings={handleImportAllSettings}
        onRefreshThemeAndBackground={handleRefreshThemeAndBackground}
      />
      <ExportProgressModal 
        isOpen={isExportingMd} 
        progress={exportMdProgress} 
        currentStepMessage={exportMdMessage}
      />
    </div>
  );
};

export default App;
