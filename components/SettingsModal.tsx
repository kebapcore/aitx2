
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { EditorSettings, Theme, AssistantType, ThinkingPerformance } from '../types';
import { THEME_DEFINITIONS, PREDEFINED_BACKGROUND_IMAGES, GEMINI_TEXT_MODEL } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: EditorSettings;
  onSettingsChange: (newSettings: EditorSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentSettings, onSettingsChange }) => {
  const [settings, setSettings] = useState<EditorSettings>(currentSettings);
  const [showDevSettings, setShowDevSettings] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(currentSettings); 
      setShowDevSettings(!!(currentSettings.customModelName || currentSettings.customSystemInstruction));
    }
  }, [currentSettings, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
        setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePredefinedBackgroundSelect = (url: string) => {
    setSettings(prev => ({ ...prev, backgroundImageUrl: url }));
  };

  const handleSave = () => {
    onSettingsChange({
      ...settings,
      isMusicPlaying: settings.backgroundMusicUrl ? settings.isMusicPlaying : false, 
    });
    onClose();
  };

  const SelectField: React.FC<{label: string, name: keyof EditorSettings, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode, helpText?: string}> =
    ({label, name, value, onChange, children, helpText}) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2.5 border rounded-md bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)] border-[color:var(--theme-border-primary)] focus:ring-2 focus:ring-[color:var(--theme-text-accent)] focus:border-[color:var(--theme-text-accent)] transition-shadow"
        style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0, 0, 0), 0.1)', color: 'var(--theme-text-primary)'}}
      >
        {children}
      </select>
      {helpText && <p className="text-xs text-[color:var(--theme-text-secondary)] opacity-80 mt-1">{helpText}</p>}
    </div>
  );
  
  const InputField: React.FC<{label: string, name: keyof EditorSettings, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, type?: string, helpText?: string}> = 
    ({label, name, value, onChange, placeholder, type = "text", helpText}) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2.5 border rounded-md bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)] border-[color:var(--theme-border-primary)] focus:ring-2 focus:ring-[color:var(--theme-text-accent)] focus:border-[color:var(--theme-text-accent)] transition-shadow"
        style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0, 0, 0), 0.1)', color: 'var(--theme-text-primary)'}} 
      />
       {helpText && <p className="text-xs text-[color:var(--theme-text-secondary)] opacity-80 mt-1">{helpText}</p>}
    </div>
  );

  const TextAreaField: React.FC<{label: string, name: keyof EditorSettings, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder?: string, rows?: number, helpText?: string}> = 
    ({label, name, value, onChange, placeholder, rows = 3, helpText}) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2.5 border rounded-md bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)] border-[color:var(--theme-border-primary)] focus:ring-2 focus:ring-[color:var(--theme-text-accent)] focus:border-[color:var(--theme-text-accent)] transition-shadow scrollbar-thin scrollbar-thumb-rounded"
        style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0, 0, 0), 0.1)', color: 'var(--theme-text-primary)', scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)"}}
      />
      {helpText && <p className="text-xs text-[color:var(--theme-text-secondary)] opacity-80 mt-1">{helpText}</p>}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editor Settings">
      <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded" style={{ scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)"}}>
        <SelectField label="Theme" name="theme" value={settings.theme} onChange={handleInputChange}>
          {Object.entries(THEME_DEFINITIONS).map(([themeKey, themeDef]) => (
            <option key={themeKey} value={themeKey}>
              {themeDef.name}
            </option>
          ))}
        </SelectField>

        <SelectField label="Active Assistant" name="activeAssistant" value={settings.activeAssistant} onChange={handleInputChange}>
          <option value="lexi">Lexi (Friendly & Creative)</option>
          <option value="kebapgpt">KebapGPT (Direct & Humorous Turkish)</option>
        </SelectField>

        <SelectField 
            label="AI Thinking Performance" 
            name="thinkingPerformance" 
            value={settings.thinkingPerformance} 
            onChange={handleInputChange}
            helpText='"Fastest" mode sets thinking budget to 0 for compatible models like Gemini 2.5 Flash. May impact response quality for complex tasks.'
        >
          <option value="default">Default (Balanced)</option>
          <option value="fastest">Fastest (Lower Quality)</option>
        </SelectField>

        <InputField 
          label="Background Image URL" name="backgroundImageUrl"
          value={settings.backgroundImageUrl} onChange={handleInputChange}
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)" type="url"
        />
        <div className="mb-4">
          <p className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-2">Or select a predefined background:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PREDEFINED_BACKGROUND_IMAGES.map((bg) => (
              <button
                key={bg.name} onClick={() => handlePredefinedBackgroundSelect(bg.url)} title={bg.name}
                className={`p-2 rounded-md border text-xs transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                            ${settings.backgroundImageUrl === bg.url 
                              ? 'border-[color:var(--theme-text-accent)] ring-2 ring-[color:var(--theme-text-accent)] bg-opacity-30' 
                              : 'border-[color:var(--theme-border-primary)] hover:border-[color:var(--theme-text-accent)]'}
                            bg-cover bg-center`}
                style={{ backgroundImage: `url(${bg.url})`, color: 'white', textShadow: '0px 0px 3px black', minHeight: '50px',
                        backgroundColor: settings.backgroundImageUrl === bg.url ? 'var(--theme-button-hover-bg)' : 'var(--theme-button-bg)'}}>
                {bg.name}
              </button>
            ))}
            <button onClick={() => handlePredefinedBackgroundSelect('')}
                    className={`p-2 rounded-md border text-xs transition-colors 
                                ${!settings.backgroundImageUrl ? 'border-[color:var(--theme-text-accent)] ring-2 ring-[color:var(--theme-text-accent)]' : 'border-[color:var(--theme-border-primary)] hover:border-[color:var(--theme-text-accent)]'}
                                bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)]`}>
              No Background
            </button>
          </div>
        </div>

        <InputField 
          label="Background Music URL" name="backgroundMusicUrl"
          value={settings.backgroundMusicUrl || ''} onChange={handleInputChange}
          placeholder="Enter audio URL (e.g., https://example.com/music.mp3)" type="url"
          helpText="Note: Music playback requires browser support for the audio format and URL. Ensure CORS headers are correctly set on the music source if it's from a different domain."
        />

        {/* Developer Settings */}
        <div className="mt-6 pt-4 border-t border-[color:var(--theme-border-primary)]">
            <button onClick={() => setShowDevSettings(!showDevSettings)} className="flex justify-between items-center w-full text-left mb-2 text-md font-semibold text-[color:var(--theme-text-accent)] hover:opacity-80">
                Developer Settings
                <span>{showDevSettings ? '▲' : '▼'}</span>
            </button>
            {showDevSettings && (
                <>
                    <InputField 
                        label="Custom Gemini Model Name" name="customModelName"
                        value={settings.customModelName || ''} onChange={handleInputChange}
                        placeholder={`Default: ${GEMINI_TEXT_MODEL}`}
                        helpText="Specify a custom Gemini model name (e.g., gemini-1.5-flash-latest). Leave blank to use default."
                    />
                    <TextAreaField
                        label="Custom System Instruction" name="customSystemInstruction"
                        value={settings.customSystemInstruction || ''} onChange={handleInputChange}
                        placeholder="Define custom behavior for the AI assistant..."
                        rows={5}
                        helpText="Provide a custom system instruction for the AI. This will override the default instructions for Lexi/KebapGPT if set."
                    />
                </>
            )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-[color:var(--theme-border-primary)]">
        <button onClick={onClose} className="px-4 py-2 rounded-md transition-colors"
                style={{backgroundColor: 'var(--theme-button-bg)', color: 'var(--theme-button-text)', opacity: 0.7}}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.7'}>
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 rounded-md transition-colors"
                style={{backgroundColor: 'var(--theme-button-hover-bg)', color: 'var(--theme-button-text)'}}>
          Save Settings
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
