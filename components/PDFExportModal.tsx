import React, { useState } from 'react';
import Modal from './Modal';

interface PDFExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: PDFExportOptions) => void;
  content: string;
}

export interface PDFExportOptions {
  orientation: 'portrait' | 'landscape';
  background: {
    type: 'color' | 'image' | 'theme';
    value: string;
  };
  fontSize: number;
  fontFamily: string;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const PDFExportModal: React.FC<PDFExportModalProps> = ({ isOpen, onClose, onExport, content }) => {
  const [options, setOptions] = useState<PDFExportOptions>({
    orientation: 'portrait',
    background: { type: 'theme', value: '' },
    fontSize: 12,
    fontFamily: 'Inter',
    margins: { top: 20, right: 20, bottom: 20, left: 20 }
  });

  const [customColor, setCustomColor] = useState('#ffffff');
  const [customImageUrl, setCustomImageUrl] = useState('');

  const handleExport = () => {
    let finalOptions = { ...options };
    
    if (options.background.type === 'color') {
      finalOptions.background.value = customColor;
    } else if (options.background.type === 'image') {
      finalOptions.background.value = customImageUrl;
    }
    
    onExport(finalOptions);
    onClose();
  };

  const fontOptions = [
    'Inter', 'Roboto', 'Montserrat', 'Poppins', 'Google Sans', 
    'Product Sans', 'Open Sans', 'Lato', 'Source Sans Pro'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export as PDF">
      <div className="space-y-4">
        {/* Orientation */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-text-primary)' }}>
            Orientation
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="portrait"
                checked={options.orientation === 'portrait'}
                onChange={(e) => setOptions(prev => ({ ...prev, orientation: e.target.value as 'portrait' | 'landscape' }))}
                className="mr-2"
              />
              Portrait
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="landscape"
                checked={options.orientation === 'landscape'}
                onChange={(e) => setOptions(prev => ({ ...prev, orientation: e.target.value as 'portrait' | 'landscape' }))}
                className="mr-2"
              />
              Landscape
            </label>
          </div>
        </div>

        {/* Background */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-text-primary)' }}>
            Background
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="theme"
                checked={options.background.type === 'theme'}
                onChange={(e) => setOptions(prev => ({ ...prev, background: { ...prev.background, type: e.target.value as 'color' | 'image' | 'theme' } }))}
                className="mr-2"
              />
              Match website theme
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="color"
                checked={options.background.type === 'color'}
                onChange={(e) => setOptions(prev => ({ ...prev, background: { ...prev.background, type: e.target.value as 'color' | 'image' | 'theme' } }))}
                className="mr-2"
              />
              Solid color
              {options.background.type === 'color' && (
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="ml-2 w-8 h-8 rounded border"
                />
              )}
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="image"
                checked={options.background.type === 'image'}
                onChange={(e) => setOptions(prev => ({ ...prev, background: { ...prev.background, type: e.target.value as 'color' | 'image' | 'theme' } }))}
                className="mr-2"
              />
              Background image
            </label>
            {options.background.type === 'image' && (
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full p-2 border rounded mt-1"
                style={{ 
                  backgroundColor: 'var(--theme-bg-page)', 
                  color: 'var(--theme-text-primary)',
                  borderColor: 'var(--theme-border-primary)'
                }}
              />
            )}
          </div>
        </div>

        {/* Font Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-text-primary)' }}>
              Font Family
            </label>
            <select
              value={options.fontFamily}
              onChange={(e) => setOptions(prev => ({ ...prev, fontFamily: e.target.value }))}
              className="w-full p-2 border rounded"
              style={{ 
                backgroundColor: 'var(--theme-bg-page)', 
                color: 'var(--theme-text-primary)',
                borderColor: 'var(--theme-border-primary)'
              }}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-text-primary)' }}>
              Font Size (pt)
            </label>
            <input
              type="number"
              value={options.fontSize}
              onChange={(e) => setOptions(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
              min="8"
              max="72"
              className="w-full p-2 border rounded"
              style={{ 
                backgroundColor: 'var(--theme-bg-page)', 
                color: 'var(--theme-text-primary)',
                borderColor: 'var(--theme-border-primary)'
              }}
            />
          </div>
        </div>

        {/* Margins */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-text-primary)' }}>
            Margins (mm)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Top"
              value={options.margins.top}
              onChange={(e) => setOptions(prev => ({ 
                ...prev, 
                margins: { ...prev.margins, top: parseInt(e.target.value) || 0 }
              }))}
              className="p-2 border rounded text-sm"
              style={{ 
                backgroundColor: 'var(--theme-bg-page)', 
                color: 'var(--theme-text-primary)',
                borderColor: 'var(--theme-border-primary)'
              }}
            />
            <input
              type="number"
              placeholder="Right"
              value={options.margins.right}
              onChange={(e) => setOptions(prev => ({ 
                ...prev, 
                margins: { ...prev.margins, right: parseInt(e.target.value) || 0 }
              }))}
              className="p-2 border rounded text-sm"
              style={{ 
                backgroundColor: 'var(--theme-bg-page)', 
                color: 'var(--theme-text-primary)',
                borderColor: 'var(--theme-border-primary)'
              }}
            />
            <input
              type="number"
              placeholder="Bottom"
              value={options.margins.bottom}
              onChange={(e) => setOptions(prev => ({ 
                ...prev, 
                margins: { ...prev.margins, bottom: parseInt(e.target.value) || 0 }
              }))}
              className="p-2 border rounded text-sm"
              style={{ 
                backgroundColor: 'var(--theme-bg-page)', 
                color: 'var(--theme-text-primary)',
                borderColor: 'var(--theme-border-primary)'
              }}
            />
            <input
              type="number"
              placeholder="Left"
              value={options.margins.left}
              onChange={(e) => setOptions(prev => ({ 
                ...prev, 
                margins: { ...prev.margins, left: parseInt(e.target.value) || 0 }
              }))}
              className="p-2 border rounded text-sm"
              style={{ 
                backgroundColor: 'var(--theme-bg-page)', 
                color: 'var(--theme-text-primary)',
                borderColor: 'var(--theme-border-primary)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md transition-colors"
          style={{
            backgroundColor: 'var(--theme-button-bg)',
            color: 'var(--theme-button-text)',
            opacity: 0.7
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-md transition-colors"
          style={{
            backgroundColor: 'var(--theme-button-hover-bg)',
            color: 'var(--theme-button-text)'
          }}
        >
          Export PDF
        </button>
      </div>
    </Modal>
  );
};

export default PDFExportModal;