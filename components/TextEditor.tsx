
import React from 'react';
import { ContextMenuItemWithIcon } from '../types';
import ContextMenu from './ContextMenu';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selectedText?: string;
  onTextFormat?: (formatType: string, value: string) => void;
}

const TextEditor = React.forwardRef<HTMLTextAreaElement, TextEditorProps>(
  ({ value, onChange, placeholder, selectedText, onTextFormat }, ref) => {
    const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number; items: ContextMenuItemWithIcon[] } | null>(null);
    const [currentSelection, setCurrentSelection] = React.useState<{ start: number; end: number; text: string } | null>(null);

    const handleContextMenu = (event: React.MouseEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      
      setCurrentSelection({ start, end, text: selectedText });
      
      const contextMenuItems: ContextMenuItemWithIcon[] = [
        { label: 'Bold', action: () => applyFormat('bold'), icon: <BoldIcon /> },
        { label: 'Italic', action: () => applyFormat('italic'), icon: <ItalicIcon /> },
        { label: 'Underline', action: () => applyFormat('underline'), icon: <UnderlineIcon /> },
        { isSeparator: true },
        { label: 'Align Left', action: () => applyFormat('align-left'), icon: <AlignLeftIcon /> },
        { label: 'Align Center', action: () => applyFormat('align-center'), icon: <AlignCenterIcon /> },
        { label: 'Align Right', action: () => applyFormat('align-right'), icon: <AlignRightIcon /> },
        { label: 'Justify', action: () => applyFormat('justify'), icon: <JustifyIcon /> },
        { isSeparator: true },
        { label: 'Font: Inter', action: () => applyFormat('font-inter'), icon: <FontIcon /> },
        { label: 'Font: Roboto', action: () => applyFormat('font-roboto'), icon: <FontIcon /> },
        { label: 'Font: Montserrat', action: () => applyFormat('font-montserrat'), icon: <FontIcon /> },
        { label: 'Font: Poppins', action: () => applyFormat('font-poppins'), icon: <FontIcon /> },
        { label: 'Font: Google Sans', action: () => applyFormat('font-google-sans'), icon: <FontIcon /> },
        { isSeparator: true },
        { label: 'Small Text', action: () => applyFormat('size-small'), icon: <TextSizeIcon /> },
        { label: 'Normal Text', action: () => applyFormat('size-normal'), icon: <TextSizeIcon /> },
        { label: 'Large Text', action: () => applyFormat('size-large'), icon: <TextSizeIcon /> },
        { label: 'Extra Large Text', action: () => applyFormat('size-xl'), icon: <TextSizeIcon /> },
        { isSeparator: true },
        { label: 'Text Color', action: () => applyFormat('color'), icon: <ColorIcon /> },
      ];
      
      setContextMenu({ x: event.clientX, y: event.clientY, items: contextMenuItems });
    };

    const applyFormat = (formatType: string) => {
      if (!currentSelection) return;
      
      const { start, end, text } = currentSelection;
      let formattedText = text;
      
      switch (formatType) {
        case 'bold':
          formattedText = `**${text}**`;
          break;
        case 'italic':
          formattedText = `*${text}*`;
          break;
        case 'underline':
          formattedText = `<u>${text}</u>`;
          break;
        case 'align-left':
          formattedText = `<div style="text-align: left;">${text}</div>`;
          break;
        case 'align-center':
          formattedText = `<div style="text-align: center;">${text}</div>`;
          break;
        case 'align-right':
          formattedText = `<div style="text-align: right;">${text}</div>`;
          break;
        case 'justify':
          formattedText = `<div style="text-align: justify;">${text}</div>`;
          break;
        case 'font-inter':
          formattedText = `<span style="font-family: 'Inter', sans-serif;">${text}</span>`;
          break;
        case 'font-roboto':
          formattedText = `<span style="font-family: 'Roboto', sans-serif;">${text}</span>`;
          break;
        case 'font-montserrat':
          formattedText = `<span style="font-family: 'Montserrat', sans-serif;">${text}</span>`;
          break;
        case 'font-poppins':
          formattedText = `<span style="font-family: 'Poppins', sans-serif;">${text}</span>`;
          break;
        case 'font-google-sans':
          formattedText = `<span style="font-family: 'Google Sans', sans-serif;">${text}</span>`;
          break;
        case 'size-small':
          formattedText = `<span style="font-size: 0.875rem;">${text}</span>`;
          break;
        case 'size-normal':
          formattedText = `<span style="font-size: 1rem;">${text}</span>`;
          break;
        case 'size-large':
          formattedText = `<span style="font-size: 1.25rem;">${text}</span>`;
          break;
        case 'size-xl':
          formattedText = `<span style="font-size: 1.5rem;">${text}</span>`;
          break;
        case 'color':
          const color = prompt('Enter color (hex, rgb, or name):');
          if (color) {
            formattedText = `<span style="color: ${color};">${text}</span>`;
          }
          break;
      }
      
      const newValue = value.substring(0, start) + formattedText + value.substring(end);
      onChange(newValue);
      setContextMenu(null);
      
      if (onTextFormat) {
        onTextFormat(formatType, formattedText);
      }
    };

    return (
      <>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onContextMenu={handleContextMenu}
          placeholder={placeholder || "Start writing your masterpiece..."}
          className="w-full h-full p-6 md:p-8 bg-transparent focus:outline-none resize-none text-base leading-relaxed font-sans selection:bg-sky-500 selection:text-white"
          style={{ color: 'var(--theme-text-primary)' }}
          aria-label="Text Editor"
        />
        {contextMenu && (
          <ContextMenu 
            items={contextMenu.items} 
            xPos={contextMenu.x} 
            yPos={contextMenu.y} 
            onClose={() => setContextMenu(null)} 
          />
        )}
      </>
    );
  }
);

// Icon components for context menu
const BoldIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h6a4 4 0 014 4 3.5 3.5 0 01-1.5 2.86A4 4 0 0115 14a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v4h5a2 2 0 100-4H5zm0 6v4h6a2 2 0 100-4H5z"/></svg>;
const ItalicIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8 1a1 1 0 000 2h1.5L7 15H5a1 1 0 100 2h6a1 1 0 100-2h-1.5L12 3h2a1 1 0 100-2H8z"/></svg>;
const UnderlineIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 17a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 3a1 1 0 011-1h6a1 1 0 110 2h-1v5a3 3 0 11-6 0V4H6a1 1 0 01-1-1z"/></svg>;
const AlignLeftIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 8a1 1 0 011-1h8a1 1 0 110 2H3a1 1 0 01-1-1zM2 12a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 16a1 1 0 011-1h8a1 1 0 110 2H3a1 1 0 01-1-1z"/></svg>;
const AlignCenterIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM2 12a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM5 16a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"/></svg>;
const AlignRightIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM9 8a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM2 12a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM9 16a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"/></svg>;
const JustifyIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 8a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 12a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 16a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"/></svg>;
const FontIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a1 1 0 000 2h1v10a1 1 0 102 0V5h2V4a1 1 0 000-2H4zM12 3a1 1 0 000 2h1v10a1 1 0 102 0V5h2V4a1 1 0 000-2h-5z"/></svg>;
const TextSizeIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a1 1 0 000 2h1v10a1 1 0 102 0V5h2V4a1 1 0 000-2H4zM12 7a1 1 0 000 2h1v6a1 1 0 102 0V9h1a1 1 0 100-2h-4z"/></svg>;
const ColorIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L3 9l7 7 7-7-7-7zM10 4.414L15.586 10 10 15.586 4.414 10 10 4.414z"/></svg>;
TextEditor.displayName = 'TextEditor';

export default TextEditor;
