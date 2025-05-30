
import React from 'react';
import Modal from './Modal'; // Assuming Modal can be reused or a similar base exists

interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressPercentage = Math.max(0, Math.min(100, progress));
  return (
    <div className="w-full bg-[color:var(--theme-border-primary)] rounded-full h-2.5 dark:bg-gray-700 my-3">
      <div
        className="bg-[color:var(--theme-text-accent)] h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progressPercentage}%` }}
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
};

interface ExportProgressModalProps {
  isOpen: boolean;
  progress: number;
  currentStepMessage: string;
}

const ExportProgressModal: React.FC<ExportProgressModalProps> = ({ isOpen, progress, currentStepMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
      <div 
        className="rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out scale-100"
        style={{ backgroundColor: 'var(--theme-bg-assistant-panel)', color: 'var(--theme-text-primary)' }}
      >
        <h2 className="text-xl font-semibold mb-4" style={{color: 'var(--theme-text-accent)'}}>Exporting to Markdown</h2>
        <p className="text-sm mb-2">{currentStepMessage}</p>
        <ProgressBar progress={progress} />
        <p className="text-xs text-right mt-1 opacity-80">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default ExportProgressModal;
