
import React, { useState, useRef, useEffect } from 'react';
import IconButton from './IconButton';

interface ToolbarDrawerItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  disabled?: boolean;
}

interface ToolbarDrawerProps {
  triggerIcon: React.ReactNode;
  triggerLabel: string;
  items: ToolbarDrawerItem[];
}

const ToolbarDrawer: React.FC<ToolbarDrawerProps> = ({ triggerIcon, triggerLabel, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="flex items-center">
      <IconButton 
        icon={triggerIcon} 
        label={triggerLabel} 
        onClick={toggleDrawer} 
        className={`p-2 rounded-md transition-colors duration-150 ease-in-out
                    ${isOpen ? 'bg-black/20 dark:bg-white/20 text-[color:var(--theme-text-accent)]' 
                              : 'text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-primary)] hover:bg-black/10 dark:hover:bg-white/10'}`}
        aria-expanded={isOpen}
        aria-controls={`drawer-${triggerLabel.replace(/\s+/g, '-').toLowerCase()}`}
      />
      {isOpen && (
        <div 
            id={`drawer-${triggerLabel.replace(/\s+/g, '-').toLowerCase()}`}
            className="flex items-center space-x-0.5 ml-1 p-0.5 rounded-md shadow-sm animate-fadeInQuick"
            style={{backgroundColor: 'color-mix(in srgb, var(--theme-bg-toolbar) 90%, var(--theme-border-primary))'}}
            role="toolbar"
        >
          {items.map(item => (
            <IconButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={() => { 
                if (!item.disabled) {
                    item.action(); 
                    setIsOpen(false); 
                }
              }}
              disabled={item.disabled}
              className="p-2 text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-accent)] hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              title={item.label}
            />
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeInQuick {
          from { opacity: 0; transform: translateX(-5px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInQuick {
          animation: fadeInQuick 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ToolbarDrawer;