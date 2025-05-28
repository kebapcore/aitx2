import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Message, GroundingChunk, AudioAttachment } from '../types';
import LoadingSpinner from './LoadingSpinner';
import IconButton from './IconButton'; 
import useSpeechRecognition from '../hooks/useSpeechRecognition'; 
import GroundingAttribution from './GroundingAttribution';
import { AUDIO_MIME_TYPES_SUPPORTED } from '../constants';
import MusicPlayer from './MusicPlayer'; // Import MusicPlayer

interface SideAssistantPanelProps {
  messages: Message[];
  isTyping: boolean;
  isAssistantVoiceEnabled: boolean;
  onToggleVoice: () => void;
  onSendMessage: (message: string, audioAttachment?: AudioAttachment) => void;
  onApplyAction: (messageId: string) => void;
  onRejectAction: (messageId: string) => void;
  assistantName: string;
  chatPlaceholder: string;
  activeAssistantType: 'lexi' | 'kebapgpt';
  isDarkMode: boolean; // For MusicPlayer styling
  onSetPreviewAsBackgroundMusic: (url: string) => void; // For MusicPlayer preview action
  currentBackgroundMusicUrl?: string; // For MusicPlayer preview state
}

const IconBase: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className="" }) => <div className={`w-5 h-5 ${className}`}>{children}</div>;

const VoiceOnIcon = () => ( <IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /> </svg></IconBase> );
const VoiceOffIcon = () => ( <IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l-2.25 2.25M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /> </svg></IconBase> );
const SendIcon = () => ( <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"> <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /> </svg></IconBase> );
const MicIcon = () => ( <IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c.621 0 1.19-.026 1.747-.073V9.75A2.25 2.25 0 0012 7.5S9.75 7.5 9.75 9.75v4.677A4.502 4.502 0 0012 15z" /></svg></IconBase>);
const MicRecordingIcon = () => ( <IconBase className="text-red-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M8.25 4.5A.75.75 0 019 4.5v.75a.75.75 0 01-1.5 0V4.5A.75.75 0 018.25 4.5zM9.75 3A.75.75 0 0110.5 3v.75a.75.75 0 01-1.5 0V3A.75.75 0 019.75 3zm2.25-.75A.75.75 0 0112.75 3v.75a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm1.5.75A.75.75 0 0115 3v.75a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm.75 1.5a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zM15.75 6a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6.75a.75.75 0 01.75-.75zm.75 1.5a.75.75 0 01.75.75V9a.75.75 0 01-1.5 0V8.25a.75.75 0 01.75-.75zm-.75 5.175V12a.75.75 0 011.5 0v1.425a.75.75 0 01-1.5 0zM12.75 18v.75a.75.75 0 01-1.5 0V18a.75.75 0 011.5 0zm-1.5-.75V18a.75.75 0 00-1.5 0v-.75a.75.75 0 001.5 0zm-1.5-1.5V15a.75.75 0 01-1.5 0v1.5a.75.75 0 011.5 0zm-1.5-1.125a.75.75 0 01-1.5 0V12a.75.75 0 011.5 0v.375zm-1.5-1.125A.75.75 0 016 12v-.75a.75.75 0 011.5 0v.75a.75.75 0 01-1.5 0zM6 9A.75.75 0 016.75 9V6.75a.75.75 0 011.5 0V9A.75.75 0 016 9zm.75-3A.75.75 0 006 6.75V9a.75.75 0 001.5 0V6.75A.75.75 0 006.75 6zM12 6.75A2.25 2.25 0 0114.25 9v3.75a2.25 2.25 0 01-4.5 0V9A2.25 2.25 0 0112 6.75z" clipRule="evenodd" /></svg></IconBase>);
const PaperClipIcon = () => (<IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3.375 3.375 0 1118.375 7.39l-7.693 7.693a2.25 2.25 0 01-3.182-3.182l5.522-5.522" /></svg></IconBase>);
const AudioFileIcon = () => (<IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M4.863 8.288a18.316 18.316 0 017.204-2.081m0 0a18.298 18.298 0 007.203 2.081m-7.203-2.081v15.838M3 9.838A19.263 19.263 0 0112 5.25c2.093 0 4.106.323 5.982.921m-11.045 6.516A19.272 19.272 0 0012 18.75c2.093 0 4.106-.323 5.982-.921m-17.024-5.364A19.263 19.263 0 010 9.838M24 9.838a19.263 19.263 0 00-5.982-4.921" /></svg></IconBase>);
const XCircleIcon = () => (<IconBase className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" /></svg></IconBase>);

 
const SideAssistantPanel: React.FC<SideAssistantPanelProps> = ({ 
    messages, 
    isTyping, 
    isAssistantVoiceEnabled, 
    onToggleVoice,
    onSendMessage,
    onApplyAction,
    onRejectAction,
    assistantName,
    chatPlaceholder,
    activeAssistantType,
    isDarkMode,
    onSetPreviewAsBackgroundMusic,
    currentBackgroundMusicUrl,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState('');
  const [previewingMessageId, setPreviewingMessageId] = useState<string | null>(null);
  const [attachedAudio, setAttachedAudio] = useState<AudioAttachment | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const { 
    isListening, 
    transcript, 
    error: sttError, 
    isSupported: sttSupported, 
    startListening, 
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setUserInput(prev => prev + (prev ? ' ' : '') + transcript);
      resetTranscript(); // Reset transcript after appending to avoid re-appending
    }
  }, [transcript, resetTranscript]);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.sender === 'ai' || isTyping) {
            const container = scrollableContainerRef.current;
            if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 200) { 
                scrollToBottom();
                 setShowScrollButton(false);
            } else {
                if (lastMessage.sender === 'ai') setShowScrollButton(true);
            }
        } else if (lastMessage.sender === 'user') {
            scrollToBottom(); 
        }
    } else {
        scrollToBottom('auto');
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (container) {
      const handleScroll = () => {
        const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50; 
        setShowScrollButton(!isScrolledToBottom);
      };
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSendMessage = () => {
    const messageToSend = userInput.trim();
    if (messageToSend || attachedAudio) {
      onSendMessage(messageToSend, attachedAudio ?? undefined);
      setUserInput('');
      setAttachedAudio(null);
      if (isListening) stopListening();
    }
  };

  const togglePreview = (messageId: string) => {
    setPreviewingMessageId(prevId => prevId === messageId ? null : messageId);
  }

  const handleMicClick = () => {
    if (!sttSupported) {
        alert("Speech recognition is not supported by your browser.");
        return;
    }
    if (isListening) {
      stopListening();
    } else {
      setUserInput(prev => prev.trim() ? prev + ' ' : ''); // Add space if there's existing text
      startListening(activeAssistantType === 'kebapgpt' ? 'tr-TR' : 'en-US');
    }
  };

  const handleAudioFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!AUDIO_MIME_TYPES_SUPPORTED.includes(file.type)) {
        alert(`Unsupported audio file type: ${file.name} (${file.type}).\nPlease use one of: ${AUDIO_MIME_TYPES_SUPPORTED.join(', ')}`);
        return;
      }
      // ~50MB limit for base64 conversion in browser reasonably
      if (file.size > 50 * 1024 * 1024) {
          alert(`Audio file ${file.name} is too large (max 50MB).`);
          return;
      }
      setAttachedAudio({ file, name: file.name, type: file.type });
    }
    if (event.target) event.target.value = ''; // Reset file input
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center flex-shrink-0" style={{borderColor: 'var(--theme-border-primary)'}}>
        <h3 className="text-lg font-semibold" style={{color: 'var(--theme-text-accent)'}}>{assistantName}</h3>
        {activeAssistantType === 'lexi' && ( // Only show voice toggle for Lexi for now
            <button
            onClick={onToggleVoice}
            title={isAssistantVoiceEnabled ? `Mute ${assistantName}` : `Unmute ${assistantName}`}
            className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            style={{color: 'var(--theme-text-secondary)', }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--theme-text-accent)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--theme-text-secondary)'}
            aria-label={isAssistantVoiceEnabled ? `Mute ${assistantName}` : `Unmute ${assistantName}`}
            >
            {isAssistantVoiceEnabled ? <VoiceOnIcon /> : <VoiceOffIcon />}
            </button>
        )}
      </div>
      <div ref={scrollableContainerRef} className="flex-grow p-3 md:p-4 space-y-3 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent"
           style={{ scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)"}}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl shadow ${
                msg.sender === 'ai'
                  ? 'bg-sky-600/90 text-white rounded-br-sm' 
                  : 'text-gray-100 rounded-bl-sm' 
              }`}
              style={{ 
                backgroundColor: msg.sender === 'user' ? 'var(--theme-button-bg)' : undefined,
                color: msg.sender === 'user' ? 'var(--theme-button-text)' : undefined,
              }}
            >
              {msg.attachedAudioInfo && (
                <div className="mb-1.5 p-2 rounded-md flex items-center text-xs" style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
                    <AudioFileIcon />
                    <span className="ml-2 truncate">Attached: {msg.attachedAudioInfo.name} ({msg.attachedAudioInfo.type})</span>
                </div>
              )}
              {msg.text && <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>}
              
              {(msg.musicPlaylist || msg.musicPreview) && (
                <MusicPlayer
                    playlist={msg.musicPlaylist}
                    preview={msg.musicPreview}
                    isDarkMode={isDarkMode}
                    onSetPreviewAsBackgroundMusic={onSetPreviewAsBackgroundMusic}
                    currentBackgroundMusicUrl={currentBackgroundMusicUrl}
                />
              )}

              {msg.sender === 'ai' && msg.actionCommand?.type === 'regenerate' && msg.isActionPending && (
                <div className="mt-2">
                  <button
                    onClick={() => togglePreview(msg.id)}
                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors mb-2"
                  >
                    {previewingMessageId === msg.id ? "Hide New Text" : "See New Text"}
                  </button>
                  {previewingMessageId === msg.id && (
                    <pre className="mt-1 p-2 text-xs bg-black/30 rounded-md max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500/50 scrollbar-track-transparent whitespace-pre-wrap break-all" style={{color: 'var(--theme-text-primary)'}}>
                      {msg.actionCommand.payload}
                    </pre>
                  )}
                </div>
              )}

              {msg.metadataText && (
                <p className="text-xs italic mt-1.5 pt-1.5 border-t" style={{color: msg.sender === 'ai' ? 'rgba(255,255,255,0.7)' : 'var(--theme-text-secondary)', borderColor: msg.sender === 'ai' ? 'rgba(255,255,255,0.2)' : 'var(--theme-border-primary)'}}>
                  {msg.assistant === 'kebapgpt' ? 'KebapGPT Notu' : 'Note'}: {msg.metadataText}
                </p>
              )}

              {msg.sender === 'ai' && msg.groundingChunks && msg.groundingChunks.length > 0 && (
                <GroundingAttribution chunks={msg.groundingChunks} />
              )}

              {msg.sender === 'ai' && msg.actionCommand && msg.isActionPending && !msg.isActionApplied && !msg.isActionRejected && (
                <div className="mt-2.5 pt-2 border-t border-white/20 flex space-x-2">
                  <button onClick={() => { onApplyAction(msg.id); if (previewingMessageId === msg.id) setPreviewingMessageId(null); }} className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors">Apply</button>
                  <button onClick={() => { onRejectAction(msg.id); if (previewingMessageId === msg.id) setPreviewingMessageId(null); }} className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors">Reject</button>
                </div>
              )}
               {msg.sender === 'ai' && msg.actionCommand && msg.isActionApplied && (<p className="text-xs text-green-300 mt-1.5 font-medium">✓ Change applied.</p>)}
              {msg.sender === 'ai' && msg.actionCommand && msg.isActionRejected && (<p className="text-xs text-red-300 mt-1.5 font-medium">✗ Change rejected.</p>)}
              <p className="text-xs mt-1.5 text-right" style={{color: msg.sender === 'ai' ? 'rgba(255,255,255,0.6)' : 'color-mix(in srgb, var(--theme-button-text) 70%, transparent)'}}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-2.5 rounded-lg bg-sky-600/90 text-white rounded-br-sm inline-flex items-center space-x-2">
              <LoadingSpinner size="w-4 h-4" color="text-white" />
              <span className="text-sm">{assistantName} is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
         {showScrollButton && !isTyping && (
          <button onClick={() => scrollToBottom()} className="absolute bottom-4 right-4 text-white p-2.5 rounded-full shadow-xl backdrop-blur-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-assistant-panel)]" style={{backgroundColor: 'var(--theme-text-accent)', opacity: 0.8 }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.8'} title="Scroll to bottom" aria-label="Scroll to bottom">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
          </button>
        )}
      </div>
      {sttError && <p className="text-xs text-red-400 px-3 pb-1 text-center">Speech recognition error: {sttError}</p>}
      {attachedAudio && (
        <div className="p-2.5 border-t flex items-center justify-between text-xs" style={{borderColor: 'var(--theme-border-primary)', color: 'var(--theme-text-secondary)'}}>
            <div className="flex items-center min-w-0">
                <AudioFileIcon />
                <span className="ml-2 truncate">Ready to send: {attachedAudio.name}</span>
            </div>
            <IconButton 
                icon={<XCircleIcon/>} 
                label="Remove attached audio" 
                onClick={() => setAttachedAudio(null)} 
                className="p-1 hover:text-red-500"
            />
        </div>
      )}
      <div className="p-2.5 md:p-3 border-t flex items-center space-x-2 flex-shrink-0" style={{borderColor: 'var(--theme-border-primary)'}}>
        <input type="file" accept={AUDIO_MIME_TYPES_SUPPORTED.join(',')} onChange={handleAudioFileSelect} ref={audioInputRef} className="hidden" />
        <IconButton
          icon={<PaperClipIcon/>}
          label="Attach audio file"
          onClick={() => audioInputRef.current?.click()}
          className="p-2"
          style={{ color: 'var(--theme-text-secondary)' }}
          title="Attach audio file (MP3, WAV, OGG, FLAC, AAC)"
        />
        {sttSupported && (
          <IconButton 
            icon={isListening ? <MicRecordingIcon /> : <MicIcon />}
            label={isListening ? "Stop listening" : "Start listening"}
            onClick={handleMicClick}
            className={`p-2 ${isListening ? 'text-red-500' : 'text-[color:var(--theme-text-secondary)]'}`}
            title={isListening ? "Stop voice input" : "Start voice input"}
          />
        )}
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
          placeholder={isListening ? "Listening..." : chatPlaceholder}
          rows={1}
          className="flex-grow p-2.5 rounded-lg focus:outline-none focus:ring-2 resize-none scrollbar-thin scrollbar-track-transparent placeholder-opacity-70"
          style={{ backgroundColor: 'color-mix(in srgb, var(--theme-bg-page) 70%, var(--theme-text-primary) 5%)', color: 'var(--theme-text-primary)', borderColor: 'var(--theme-border-primary)', ringColor: 'var(--theme-text-accent)', '--placeholder-color': 'var(--theme-text-secondary)', scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)"} as React.CSSProperties & {'--placeholder-color': string} } 
          aria-label={chatPlaceholder}
        />
        <style>{`textarea::placeholder { color: var(--placeholder-color); opacity: 0.7; }`}</style>
        <IconButton
          icon={<SendIcon />}
          label="Send message"
          onClick={handleSendMessage}
          disabled={(!userInput.trim() && !attachedAudio) || isTyping}
          className="disabled:cursor-not-allowed"
          style={{ color: ((!userInput.trim() && !attachedAudio) || isTyping) ? 'var(--theme-text-secondary)' : 'var(--theme-text-accent)', opacity: ((!userInput.trim() && !attachedAudio) || isTyping) ? 0.6 : 1, }}
        />
      </div>
    </div>
  );
};

export default SideAssistantPanel;