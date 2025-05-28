
import React, { useState, useEffect, useRef } from 'react';
import { ContextMenuItemWithIcon } from '../types'; // Import the updated type

interface ContextMenuProps {
  items: ContextMenuItemWithIcon[];
  xPos: number;
  yPos: number;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items, xPos, yPos, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedX, setAdjustedX] = useState(xPos);
  const [adjustedY, setAdjustedY] = useState(yPos);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('contextmenu', onClose, true); // Use capture to close on any other context menu attempt

    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      let newX = xPos;
      let newY = yPos;

      if (xPos + menuRect.width > window.innerWidth) {
        newX = window.innerWidth - menuRect.width - 5; // 5px buffer
      }
      if (yPos + menuRect.height > window.innerHeight) {
        newY = window.innerHeight - menuRect.height - 5; // 5px buffer
      }
      setAdjustedX(newX < 0 ? 0 : newX);
      setAdjustedY(newY < 0 ? 0 : newY);
    }


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('contextmenu', onClose, true);
    };
  }, [onClose, xPos, yPos]);

  const menuStyle: React.CSSProperties = {
    position: 'fixed', // Use fixed to ensure it's relative to viewport
    top: `${adjustedY}px`,
    left: `${adjustedX}px`,
    zIndex: 1000,
    minWidth: '200px', // Ensure a minimum width
  };

  return (
    <div
      ref={menuRef}
      style={menuStyle}
      className="bg-[color:var(--theme-bg-toolbar)] text-[color:var(--theme-text-primary)] rounded-md shadow-xl py-1.5 border border-[color:var(--theme-border-primary)] backdrop-blur-md"
      onClick={(e) => e.stopPropagation()} 
    >
      {items.map((item, index) => {
        if (item.isSeparator) {
          return <div key={`sep-${index}`} className="h-px bg-[color:var(--theme-border-primary)] my-1 mx-2 opacity-50" />;
        }
        return (
          <button
            key={item.label}
            onClick={() => {
              if (!item.disabled) {
                item.action();
                onClose();
              }
            }}
            disabled={item.disabled}
            className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-[color:var(--theme-text-accent)] hover:text-[color:var(--theme-button-text)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:bg-[color:var(--theme-text-accent)] focus:text-[color:var(--theme-button-text)]"
          >
            {item.icon && <span className="mr-2.5 w-4 h-4 flex-shrink-0 opacity-80 group-hover:opacity-100">{item.icon}</span>}
            <span className="flex-grow">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;
