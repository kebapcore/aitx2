
import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { EditorSettings, PredefinedTheme, ThemeId, AssistantType, ThinkingPerformance, CustomThemeDefinition } from '../types';
import { THEME_DEFINITIONS, PREDEFINED_BACKGROUND_IMAGES, GEMINI_TEXT_MODEL, GEMINI_PRO_MODEL, DEFAULT_EDITOR_SETTINGS } from '../constants';
import { generateCustomThemeAI } from '../services/geminiService'; 
import LoadingSpinner from './LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: EditorSettings;
  onSettingsChange: (newSettings: EditorSettings) => void;
  onExportAllSettings: () => void;
  onImportAllSettings: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefreshThemeAndBackground: () => void;
}

// Helper components defined outside SettingsModal to preserve identity across re-renders

interface SelectFieldComponentProps {
  label: string;
  name: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  helpText?: string;
  id?: string;
}

const SelectFieldComponent: React.FC<SelectFieldComponentProps> = ({label, name, value, onChange, children, helpText, id}) => (
  <div className="mb-4">
    <label htmlFor={id || name} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
      {label}
    </label>
    <select
      id={id || name}
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

interface InputFieldComponentProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  helpText?: string;
  id?: string;
}

const InputFieldComponent: React.FC<InputFieldComponentProps> = ({label, name, value, onChange, placeholder, type = "text", helpText, id}) => (
  <div className="mb-4">
    <label htmlFor={id || name} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id || name}
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

interface TextAreaFieldComponentProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  helpText?: string;
  id?: string;
}
const TextAreaFieldComponent: React.FC<TextAreaFieldComponentProps> = ({label, name, value, onChange, placeholder, rows = 3, helpText, id}) => (
  <div className="mb-4">
    <label htmlFor={id || name} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
      {label}
    </label>
    <textarea
      id={id || name}
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


const SettingsModal: React.FC<SettingsModalProps> = ({ 
    isOpen, onClose, currentSettings, onSettingsChange,
    onExportAllSettings, onImportAllSettings, onRefreshThemeAndBackground
}) => {
  const [settings, setSettings] = useState<EditorSettings>(currentSettings);
  const [showDevSettings, setShowDevSettings] = useState(false);
  const [aiThemePrompt, setAiThemePrompt] = useState('');
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);
  const [aiThemeError, setAiThemeError] = useState<string | null>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSettings(currentSettings); 
      setShowDevSettings(!!(currentSettings.customModelName || currentSettings.customSystemInstruction));
      setAiThemePrompt('');
      setAiThemeError(null);
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

  const handleGenerateThemeWithAI = async () => {
    if (!aiThemePrompt.trim()) {
      setAiThemeError("Lütfen bir tema açıklaması girin.");
      return;
    }
    setIsGeneratingTheme(true);
    setAiThemeError(null);
    try {
      const newThemeData = await generateCustomThemeAI(aiThemePrompt);
      if (newThemeData) {
        const newCustomTheme: CustomThemeDefinition = {
          id: uuidv4(),
          name: newThemeData.name || `AI Theme ${ (settings.customThemes?.length || 0) + 1}`,
          isDark: newThemeData.isDark,
          variables: newThemeData.variables,
        };
        setSettings(prev => ({
          ...prev,
          customThemes: [...(prev.customThemes || []), newCustomTheme],
          theme: newCustomTheme.id, // Automatically select the new theme
        }));
        setAiThemePrompt(''); // Clear prompt on success
      } else {
        setAiThemeError("Yapay zeka geçerli bir tema oluşturamadı.");
      }
    } catch (error) {
      console.error("AI Theme generation error:", error);
      setAiThemeError(`Tema oluşturulurken hata: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  const handleDeleteCustomTheme = (themeIdToDelete: string) => {
    setSettings(prev => {
      const updatedCustomThemes = (prev.customThemes || []).filter(ct => ct.id !== themeIdToDelete);
      let newActiveTheme = prev.theme;
      if (prev.theme === themeIdToDelete) {
        newActiveTheme = DEFAULT_EDITOR_SETTINGS.theme; // Fallback to default
      }
      return {
        ...prev,
        customThemes: updatedCustomThemes,
        theme: newActiveTheme,
      };
    });
  };
  
  const thinkingPerformanceHelpText = `"Default": Uses ${GEMINI_TEXT_MODEL} (Flash) with standard thinking. 
"Fastest": Uses ${GEMINI_TEXT_MODEL} (Flash) with thinkingBudget=0 (may reduce quality). 
"Advanced": Uses ${GEMINI_PRO_MODEL} (Pro) for higher quality responses (may be slower); thinkingConfig is omitted.`;


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editor Settings">
      <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded" style={{ scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)"}}>
        
        <div className="mb-4 p-3 border border-[color:var(--theme-border-primary)] rounded-md" style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0,0,0), 0.05)'}}>
          <h4 className="text-md font-semibold text-[color:var(--theme-text-primary)] mb-2">Tema & Görünüm</h4>
          <SelectFieldComponent
            label="Aktif Tema" 
            name="themeSelection" 
            id="settings-theme-selection"
            value={settings.theme} 
            onChange={(e) => setSettings(prev => ({...prev, theme: e.target.value}))}
          >
            <optgroup label="Hazır Temalar">
              {Object.entries(THEME_DEFINITIONS).map(([themeKey, themeDef]) => (
                <option key={themeKey} value={themeKey}>
                  {themeDef.name}
                </option>
              ))}
            </optgroup>
            {(settings.customThemes && settings.customThemes.length > 0) && (
              <optgroup label="Özel Temalarınız">
                {settings.customThemes.map((customTheme) => (
                  <option key={customTheme.id} value={customTheme.id}>
                    {customTheme.name} (AI)
                  </option>
                ))}
              </optgroup>
            )}
          </SelectFieldComponent>
          {(settings.customThemes && settings.customThemes.length > 0) && (
            <div className="mb-3 pl-1">
              <p className="text-xs text-[color:var(--theme-text-secondary)] mb-1">Özel temaları yönet:</p>
              <ul className="max-h-24 overflow-y-auto text-xs">
                {settings.customThemes.map(ct => (
                  <li key={ct.id} className="flex justify-between items-center py-0.5">
                    <span>{ct.name}</span>
                    <button onClick={() => handleDeleteCustomTheme(ct.id)} className="text-red-500 hover:text-red-400 p-0.5 text-xs">Sil</button>
                  </li>
                ))}
              </ul>
            </div>
          )}


          <InputFieldComponent
            label="Arka Plan Resmi URL" name="backgroundImageUrl"
            id="settings-background-image-url"
            value={settings.backgroundImageUrl} onChange={handleInputChange}
            placeholder="Resim URL'si girin (örn: https://example.com/image.jpg)" type="url"
          />
          <div className="mb-2">
            <p className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-2">Veya hazır bir arka plan seçin:</p>
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
                Arka Plan Yok
              </button>
            </div>
          </div>
          <button
              onClick={() => { onRefreshThemeAndBackground(); onClose(); }}
              className="w-full mt-3 px-3 py-2 text-sm rounded-md transition-colors"
              style={{backgroundColor: 'var(--theme-button-bg)', color: 'var(--theme-button-text)', opacity: 0.85}}
              onMouseOver={e => e.currentTarget.style.opacity = '1'}
              onMouseOut={e => e.currentTarget.style.opacity = '0.85'}
          >
             Rastgele Tema & Arka Plan Ata (Yenile)
          </button>
        </div>

        <div className="mb-4 p-3 border border-[color:var(--theme-border-primary)] rounded-md" style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0,0,0), 0.05)'}}>
            <h4 className="text-md font-semibold text-[color:var(--theme-text-primary)] mb-2">Yapay Zeka Tema Oluşturucu</h4>
            <TextAreaFieldComponent
                label="Tema Açıklaması"
                name="aiThemePrompt" 
                id="settings-ai-theme-prompt"
                value={aiThemePrompt}
                onChange={(e) => setAiThemePrompt(e.target.value)}
                placeholder="Örn: Kahve içerken iyi giden, koyu turuncu tonlarda bir tema..."
                rows={2}
                helpText="Yapay zekanın sizin için bir tema oluşturmasını isteyin."
            />
            {isGeneratingTheme && <div className="flex justify-center my-2"><LoadingSpinner size="w-6 h-6"/></div>}
            {aiThemeError && <p className="text-xs text-red-400 my-1.5">{aiThemeError}</p>}
            <button
                onClick={handleGenerateThemeWithAI}
                disabled={isGeneratingTheme || !aiThemePrompt.trim()}
                className="w-full px-3 py-2 text-sm rounded-md transition-colors disabled:opacity-60"
                style={{backgroundColor: 'var(--theme-button-hover-bg)', color: 'var(--theme-button-text)'}}
            >
                {isGeneratingTheme ? 'Oluşturuluyor...' : 'Yapay Zeka ile Tema Oluştur'}
            </button>
        </div>


        <SelectFieldComponent label="Aktif Asistan" name="activeAssistant" id="settings-active-assistant" value={settings.activeAssistant} onChange={handleInputChange}>
          <option value="lexi">Lexi (Dost canlısı & Yaratıcı)</option>
          <option value="kebapgpt">KebapGPT (Direkt & Mizahi Türkçe)</option>
        </SelectFieldComponent>

        <SelectFieldComponent
            label="Yapay Zeka Düşünme Performansı" 
            name="thinkingPerformance" 
            id="settings-thinking-performance"
            value={settings.thinkingPerformance} 
            onChange={handleInputChange}
            helpText={thinkingPerformanceHelpText}
        >
          <option value="default">Varsayılan (Dengeli)</option>
          <option value="fastest">En Hızlı (Düşük Kalite)</option>
          <option value="advanced">Gelişmiş (Yüksek Kalite - Yavaş)</option>
        </SelectFieldComponent>

        <InputFieldComponent
          label="Arka Plan Müzik URL" name="backgroundMusicUrl"
          id="settings-background-music-url"
          value={settings.backgroundMusicUrl || ''} onChange={handleInputChange}
          placeholder="Ses URL'si girin (örn: https://example.com/music.mp3)" type="url"
          helpText="Not: Müzik çalma, tarayıcının ses formatını ve URL'yi desteklemesini gerektirir. Farklı bir alan adından ise CORS başlıklarının doğru ayarlandığından emin olun."
        />

        {/* Developer Settings */}
        <div className="mt-6 pt-4 border-t border-[color:var(--theme-border-primary)]">
            <button onClick={() => setShowDevSettings(!showDevSettings)} className="flex justify-between items-center w-full text-left mb-2 text-md font-semibold text-[color:var(--theme-text-accent)] hover:opacity-80">
                Geliştirici Ayarları
                <span>{showDevSettings ? '▲' : '▼'}</span>
            </button>
            {showDevSettings && (
                <>
                    <InputFieldComponent
                        label="Özel Gemini Model Adı" name="customModelName"
                        id="settings-custom-model-name"
                        value={settings.customModelName || ''} onChange={handleInputChange}
                        placeholder={`Varsayılan performans ayarıyla belirlenir`}
                        helpText="Özel bir Gemini model adı belirtin. Bu, Düşünme Performansı tarafından seçilen modeli geçersiz kılacaktır."
                    />
                    <TextAreaFieldComponent
                        label="Özel Sistem Talimatı" name="customSystemInstruction"
                        id="settings-custom-system-instruction"
                        value={settings.customSystemInstruction || ''} onChange={handleInputChange}
                        placeholder="Yapay zeka asistanı için özel davranış tanımlayın..."
                        rows={5}
                        helpText="Yapay zeka için özel bir sistem talimatı sağlayın. Ayarlanırsa Lexi/KebapGPT için varsayılan talimatları geçersiz kılar."
                    />
                </>
            )}
        </div>
        {/* Data Management Section */}
        <div className="mt-6 pt-4 border-t border-[color:var(--theme-border-primary)]">
            <h4 className="text-md font-semibold text-[color:var(--theme-text-primary)] mb-3">Veri Yönetimi</h4>
            <div className="space-y-2">
                <button
                    onClick={onExportAllSettings}
                    className="w-full px-3 py-2 text-sm rounded-md transition-colors"
                    style={{backgroundColor: 'var(--theme-button-bg)', color: 'var(--theme-button-text)', opacity: 0.8}}
                    onMouseOver={e => e.currentTarget.style.opacity = '1'}
                    onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
                >
                    Tüm Ayarları Dışa Aktar (.settings)
                </button>
                <input type="file" ref={importFileRef} className="hidden" accept=".settings" onChange={onImportAllSettings} />
                <button
                    onClick={() => importFileRef.current?.click()}
                    className="w-full px-3 py-2 text-sm rounded-md transition-colors"
                    style={{backgroundColor: 'var(--theme-button-bg)', color: 'var(--theme-button-text)', opacity: 0.8}}
                    onMouseOver={e => e.currentTarget.style.opacity = '1'}
                    onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
                >
                    Ayarları İçe Aktar (.settings)
                </button>
            </div>
        </div>

      </div>

      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-[color:var(--theme-border-primary)]">
        <button onClick={onClose} className="px-4 py-2 rounded-md transition-colors"
                style={{backgroundColor: 'var(--theme-button-bg)', color: 'var(--theme-button-text)', opacity: 0.7}}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.7'}>
          İptal
        </button>
        <button onClick={handleSave} className="px-4 py-2 rounded-md transition-colors"
                style={{backgroundColor: 'var(--theme-button-hover-bg)', color: 'var(--theme-button-text)'}}>
          Ayarları Kaydet
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
