
import React, { useState, useRef } from 'react';
import IconButton from './IconButton';
import { TabState, AssistantType, ContextMenuItemWithIcon } from '../types'; 
import TabItem from './TabItem';
import ToolbarDrawer from './ToolbarDrawer'; // Changed from DropdownMenu
import ContextMenu from './ContextMenu';
import PDFExportModal, { PDFExportOptions } from './PDFExportModal';
import { exportToPDF } from '../utils/pdfExport';


interface ToolbarProps {
  onSaveFile: () => void;
  onLoadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExportToMd: () => void; // New prop for .md export
  currentTabContent: string; // Add this prop for PDF export
  isAssistantVoiceEnabled: boolean;
  onToggleAssistantVoice: () => void;
  onClearText: () => void;
  isApiKeySet: boolean;
  onSetDevApiKey: () => void;
  onTogglePreview: () => void;
  isPreviewActive: boolean;
  onOpenSettings: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
  hasMusicUrl?: boolean;

  tabs: TabState[];
  activeTabId: string | null;
  onActivateTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onRenameTab: (tabId: string, newTitle: string) => void;
  onNewTab: (contentType?: 'about' | 'get-started' | 'ai-tools' | 'story' | 'links') => void;

  isAssistantPanelVisible: boolean;
  onToggleAssistantPanel: () => void;
  activeAssistant: AssistantType;
  onToggleAssistant: () => void;
}

const IconWrapper: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className="w-5 h-5" }) => <div className={className}>{children}</div>;

// Main Trigger Icons
const FileMenuIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5-15h16.5" /></svg></IconWrapper>;
const ViewMenuIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.036l-1.41-.513M5.106 17.785l1.153-.96M17.743 7.125l-1.153-.96M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg></IconWrapper>;
const AssistantMenuIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-6.75 3h9m-9 3h9m0-13.5a.75.75 0 01.75.75v12a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-12a.75.75 0 01.75-.75h1.5M9 3.75a.75.75 0 01.75-.75h3.75a.75.75 0 01.75.75V4.5h-5.25V3.75z" /></svg></IconWrapper>;

// Action Icons for Drawers
const SaveIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></IconWrapper>;
const LoadIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg></IconWrapper>;
const TrashIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></IconWrapper>;
const EyeIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>;
const EyeSlashIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.574M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg></IconWrapper>;
const HidePanelIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></IconWrapper>;
const ShowPanelIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></IconWrapper>;
const VoiceOnIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg></IconWrapper>;
const VoiceOffIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l-2.25 2.25M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg></IconWrapper>;
const AssistantSwitchIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-3.741-5.855M12 6A3.75 3.75 0 1015.75 9.75 3.75 3.75 0 0012 6zm-2.25 7.5a9.086 9.086 0 00-3.741.479 3 3 0 004.682 2.72M6.06 18.719a5.971 5.971 0 003.741 5.855" /></svg></IconWrapper>;
const MdExportIcon = () => <IconWrapper><svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5"><path d="M10.44.958c-.255-.255-.678-.255-.933 0L7.97 2.494l2.566 2.566 1.432-1.432c.255-.255.255-.678 0-.933L10.44.958zM3.687 4.313L6.253 6.88 2.688 10.444c-.255.255-.678.255-.933 0l-1.44-1.439c-.255-.255-.255-.678 0-.933L3.687 4.313zM2.56 12.44L.27 10.149l-.001.002L0 10.499v4C0 15.328.672 16 1.5 16h13c.828 0 1.5-.672 1.5-1.5v-4l-.271-.35c0-.001-.001-.001 0-.002L13.44 12.44l-2.565-2.565-2.566 2.565-2.566-2.565L2.56 12.441zM12.03 2.494L9.465 5.06 13.313 1.21c.255-.255.255-.678 0-.933L11.97.958a.66.66 0 00-.932 0l-1.432 1.432L12.03 2.494z"/></svg></IconWrapper>;
const PDFExportIcon = () => <IconWrapper><svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5"><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.089.346z"/></svg></IconWrapper>;


// Other Icons
const SettingsIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 1.985c-.007.379.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 010-1.985c.007-.379-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></IconWrapper>;
const PlayIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg></IconWrapper>;
const PauseIcon = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg></IconWrapper>;
const AddIcon = () => <IconWrapper className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></IconWrapper>;


const Toolbar: React.FC<ToolbarProps> = ({
  onSaveFile, onLoadFile, onExportToMd, currentTabContent, isAssistantVoiceEnabled, onToggleAssistantVoice,
  onClearText, isApiKeySet, onSetDevApiKey, onTogglePreview, isPreviewActive,
  onOpenSettings, isMusicPlaying, onToggleMusic, hasMusicUrl,
  tabs, activeTabId, onActivateTab, onCloseTab, onRenameTab, onNewTab,
  isAssistantPanelVisible, onToggleAssistantPanel, activeAssistant, onToggleAssistant,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: ContextMenuItemWithIcon[] } | null>(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  const handleLoadClick = () => fileInputRef.current?.click();
  const handlePDFExport = (options: PDFExportOptions) => {
    exportToPDF(currentTabContent, options);
  };

  const fileDrawerItems = [
    { label: 'Save Tab (.aitxt)', action: onSaveFile, icon: <SaveIcon /> },
    { label: 'Load into Tab (.aitxt)', action: handleLoadClick, icon: <LoadIcon /> },
    { label: 'Export to .md', action: onExportToMd, icon: <MdExportIcon /> },
    { label: 'Export as PDF', action: () => setIsPDFModalOpen(true), icon: <PDFExportIcon /> },
    { label: 'Clear Tab Text', action: onClearText, icon: <TrashIcon /> },
  ];

  const viewDrawerItems = [
    { label: isPreviewActive ? 'Show Editor' : 'Show Markdown Preview', action: onTogglePreview, icon: isPreviewActive ? <EyeSlashIcon /> : <EyeIcon /> },
    { label: isAssistantPanelVisible ? 'Hide Assistant Panel' : 'Show Assistant Panel', action: onToggleAssistantPanel, icon: isAssistantPanelVisible ? <HidePanelIcon /> : <ShowPanelIcon /> },
  ];

  const assistantDrawerItems = [
    { label: activeAssistant === 'lexi' ? "Switch to KebapGPT" : "Switch to Lexi", action: onToggleAssistant, icon: <AssistantSwitchIcon /> },
    { label: isAssistantVoiceEnabled ? "Disable Assistant Voice" : "Enable Assistant Voice", action: onToggleAssistantVoice, icon: isAssistantVoiceEnabled ? <VoiceOnIcon /> : <VoiceOffIcon />, disabled: activeAssistant === 'kebapgpt' },
  ];
  
  const handleNewTabContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newTabContextMenuItems: ContextMenuItemWithIcon[] = [
      { label: 'New Blank Tab', action: () => onNewTab() },
      { isSeparator: true },
      { label: 'Open: Get Started', action: () => onNewTab('get-started') },
      { label: 'Open: About Page', action: () => onNewTab('about') },
      { label: 'Open: AI Tools Guide', action: () => onNewTab('ai-tools') },
      { label: 'Open: Sample Story', action: () => onNewTab('story') },
      { label: 'Open: Useful Links', action: () => onNewTab('links') },
    ];
    setContextMenu({ x: event.clientX, y: event.clientY, items: newTabContextMenuItems });
  };

  return (
    <div className="p-1.5 flex items-center shadow-lg backdrop-blur-md relative z-20 flex-wrap" style={{backgroundColor: 'var(--theme-bg-toolbar)'}}>
      {/* Drawer Menus */}
      <div className="flex items-center space-x-1 md:space-x-0.5 mr-1">
        <ToolbarDrawer triggerIcon={<FileMenuIcon />} triggerLabel="File Actions" items={fileDrawerItems} />
        <ToolbarDrawer triggerIcon={<ViewMenuIcon />} triggerLabel="View Actions" items={viewDrawerItems} />
        <ToolbarDrawer triggerIcon={<AssistantMenuIcon />} triggerLabel="Assistant Actions" items={assistantDrawerItems} />
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept=".aitxt" onChange={onLoadFile} />

      {/* Tab Bar */}
      <div className="flex-grow flex items-center overflow-x-auto scrollbar-thin scrollbar-thumb-[color:var(--theme-scrollbar-thumb)] scrollbar-track-[color:var(--theme-scrollbar-track)] scrollbar-thumb-rounded min-w-0 h-[44px]">
        {tabs.map((tab) => (
          <TabItem key={tab.id} tab={tab} isActive={tab.id === activeTabId} onActivate={onActivateTab} onClose={onCloseTab} onRename={onRenameTab} />
        ))}
        <div onContextMenu={handleNewTabContextMenu}>
            <IconButton
                icon={<AddIcon />}
                label="New Tab (right-click for options)"
                onClick={() => onNewTab()}
                className="ml-1 text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-accent)] hover:bg-black/10 dark:hover:bg-white/10 p-2"
                title="New Tab (right-click for special pages)"
            />
        </div>
      </div>
      
      {/* Right-aligned buttons */}
      <div className="flex items-center space-x-1 md:space-x-1.5 ml-auto pl-2">
        {!isApiKeySet && (
           <button
            onClick={onSetDevApiKey}
            className="px-3 py-1.5 text-xs bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Set API Key
          </button>
        )}
        
        {hasMusicUrl && onToggleMusic && (
          <IconButton 
            onClick={onToggleMusic} 
            icon={isMusicPlaying ? <PauseIcon /> : <PlayIcon />} 
            label={isMusicPlaying ? "Pause Music" : "Play Music"} 
            className="text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-accent)] hover:bg-black/10 dark:hover:bg-white/10"
          />
        )}
        <IconButton onClick={onOpenSettings} icon={<SettingsIcon />} label="Settings" className="text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-accent)] hover:bg-black/10 dark:hover:bg-white/10" />
      </div>
      {contextMenu && (
        <ContextMenu items={contextMenu.items} xPos={contextMenu.x} yPos={contextMenu.y} onClose={() => setContextMenu(null)} />
      )}
      <PDFExportModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        onExport={handlePDFExport}
        content={currentTabContent}
      />
    </div>
  );
};

export default Toolbar;
