
import React from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onContextMenu?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
}

const TextEditor = React.forwardRef<HTMLTextAreaElement, TextEditorProps>(
  ({ value, onChange, placeholder, onContextMenu }, ref) => {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onContextMenu={onContextMenu}
        placeholder={placeholder || "Start writing your masterpiece..."}
        className="w-full h-full p-6 md:p-8 bg-transparent focus:outline-none resize-none text-base leading-relaxed font-sans selection:bg-sky-500 selection:text-white"
        style={{ color: 'var(--theme-text-primary)' }}
        aria-label="Text Editor"
      />
    );
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
