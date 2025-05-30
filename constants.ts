
import { EditorSettings, Theme, AssistantType } from './types';

export const APP_VERSION = "1.0.0";

export const LOCALSTORAGE_APP_STATE_KEY = 'aiTextEditorAppState_v1';
export const LOCALSTORAGE_LAUNCHED_BEFORE_KEY = 'aiTextEditorLaunchedBefore_v1';

interface ThemeDefinition {
  name: string;
  isDark: boolean;
  variables: Record<string, string>;
}

export const THEME_DEFINITIONS: Record<Theme, ThemeDefinition> = {
  'light': {
    name: 'Default Light',
    isDark: false,
    variables: {
      '--theme-bg-page': '#f3f4f6', // gray-100
      '--theme-bg-content-area': 'rgba(255, 255, 255, 0.85)', // white with opacity
      '--theme-bg-toolbar': 'rgba(229, 231, 235, 0.8)', // gray-200 with opacity
      '--theme-bg-assistant-panel': 'rgba(243, 244, 246, 0.85)', // gray-100 with opacity
      '--theme-text-primary': '#1f2937', // gray-800
      '--theme-text-secondary': '#4b5563', // gray-600
      '--theme-text-accent': '#0ea5e9', // sky-500
      '--theme-border-primary': '#d1d5db', // gray-300
      '--theme-button-bg': '#3b82f6', // blue-500
      '--theme-button-text': '#ffffff', // white
      '--theme-button-hover-bg': '#2563eb', // blue-600
      '--theme-scrollbar-thumb': '#9ca3af', // gray-400
      '--theme-scrollbar-track': '#e5e7eb', // gray-200
      '--tw-prose-body': '#374151', 
      '--tw-prose-headings': '#111827', 
      '--tw-prose-lead': '#4b5563', 
      '--tw-prose-links': '#0284c7', 
      '--tw-prose-bold': '#111827', 
      '--tw-prose-counters': '#6b7280', 
      '--tw-prose-bullets': '#d1d5db', 
      '--tw-prose-hr': '#e5e7eb', 
      '--tw-prose-quotes': '#111827', 
      '--tw-prose-quote-borders': '#e5e7eb', 
      '--tw-prose-captions': '#6b7280', 
      '--tw-prose-code': '#db2777', 
      '--tw-prose-pre-code': '#e5e7eb', 
      '--tw-prose-pre-bg': '#1f2937', 
      '--tw-prose-th-borders': '#d1d5db', 
      '--tw-prose-td-borders': '#e5e7eb', 
      '--theme-admonition-danger-border': '#ef4444', 
      '--theme-admonition-danger-bg': 'rgba(254, 226, 226, 0.7)', 
      '--theme-admonition-danger-text': '#b91c1c', 
      '--theme-admonition-danger-title': '#dc2626', 
      '--theme-admonition-info-border': '#3b82f6', 
      '--theme-admonition-info-bg': 'rgba(219, 234, 254, 0.7)', 
      '--theme-admonition-info-text': '#1e40af', 
      '--theme-admonition-info-title': '#2563eb', 
      '--theme-admonition-success-border': '#22c55e', 
      '--theme-admonition-success-bg': 'rgba(220, 252, 231, 0.7)', 
      '--theme-admonition-success-text': '#15803d', 
      '--theme-admonition-success-title': '#16a34a', 
      '--theme-admonition-note-border': '#f59e0b', 
      '--theme-admonition-note-bg': 'rgba(254, 243, 199, 0.7)', 
      '--theme-admonition-note-text': '#b45309', 
      '--theme-admonition-note-title': '#d97706', 
    }
  },
  'dark': {
    name: 'Default Dark',
    isDark: true,
    variables: {
      '--theme-bg-page': '#111827', 
      '--theme-bg-content-area': 'rgba(17, 24, 39, 0.8)', 
      '--theme-bg-toolbar': 'rgba(31, 41, 55, 0.75)', 
      '--theme-bg-assistant-panel': 'rgba(17, 24, 39, 0.85)', 
      '--theme-text-primary': '#f3f4f6', 
      '--theme-text-secondary': '#9ca3af', 
      '--theme-text-accent': '#38bdf8', 
      '--theme-border-primary': '#374151', 
      '--theme-button-bg': '#0ea5e9', 
      '--theme-button-text': '#ffffff', 
      '--theme-button-hover-bg': '#0284c7', 
      '--theme-scrollbar-thumb': '#4b5563', 
      '--theme-scrollbar-track': '#1f2937', 
      '--tw-prose-body': '#d1d5db', 
      '--tw-prose-headings': '#f9fafb', 
      '--tw-prose-lead': '#9ca3af', 
      '--tw-prose-links': '#38bdf8', 
      '--tw-prose-bold': '#f9fafb', 
      '--tw-prose-counters': '#9ca3af', 
      '--tw-prose-bullets': '#4b5563', 
      '--tw-prose-hr': '#374151', 
      '--tw-prose-quotes': '#f9fafb', 
      '--tw-prose-quote-borders': '#374151', 
      '--tw-prose-captions': '#9ca3af', 
      '--tw-prose-code': '#ec4899', 
      '--tw-prose-pre-code': '#d1d5db', 
      '--tw-prose-pre-bg': '#111827', 
      '--tw-prose-th-borders': '#374151', 
      '--tw-prose-td-borders': '#1f2937', 
      '--theme-admonition-danger-border': '#f87171', 
      '--theme-admonition-danger-bg': 'rgba(70, 20, 20, 0.5)', 
      '--theme-admonition-danger-text': '#fecaca', 
      '--theme-admonition-danger-title': '#ef4444', 
      '--theme-admonition-info-border': '#60a5fa', 
      '--theme-admonition-info-bg': 'rgba(20, 40, 70, 0.5)', 
      '--theme-admonition-info-text': '#bfdbfe', 
      '--theme-admonition-info-title': '#3b82f6', 
      '--theme-admonition-success-border': '#4ade80', 
      '--theme-admonition-success-bg': 'rgba(20, 70, 40, 0.5)', 
      '--theme-admonition-success-text': '#bbf7d0', 
      '--theme-admonition-success-title': '#22c55e', 
      '--theme-admonition-note-border': '#fbbf24', 
      '--theme-admonition-note-bg': 'rgba(70, 50, 20, 0.5)', 
      '--theme-admonition-note-text': '#fde68a', 
      '--theme-admonition-note-title': '#f59e0b', 
    }
  },
  'amoled-black': {
    name: 'Amoled Black',
    isDark: true,
    variables: {
      '--theme-bg-page': '#000000',
      '--theme-bg-content-area': 'rgba(0, 0, 0, 0.7)',
      '--theme-bg-toolbar': 'rgba(5, 5, 5, 0.65)',
      '--theme-bg-assistant-panel': 'rgba(0, 0, 0, 0.75)',
      '--theme-text-primary': '#e0e0e0',
      '--theme-text-secondary': '#a0a0a0',
      '--theme-text-accent': '#00e5ff', 
      '--theme-border-primary': '#222222',
      '--theme-button-bg': '#00bfa5', 
      '--theme-button-text': '#000000',
      '--theme-button-hover-bg': '#008c7a',
      '--theme-scrollbar-thumb': '#333333',
      '--theme-scrollbar-track': '#111111',
      '--tw-prose-body': '#c0c0c0',
      '--tw-prose-headings': '#ffffff',
      '--tw-prose-links': '#00e5ff',
      '--tw-prose-bold': '#ffffff',
      '--tw-prose-code': '#ff4081', 
      '--tw-prose-pre-bg': '#0d0d0d',
      '--tw-prose-pre-code': '#c0c0c0',
      '--tw-prose-bullets': '#444444',
      '--tw-prose-hr': '#2a2a2a',
      '--tw-prose-quotes': '#ffffff',
      '--tw-prose-quote-borders': '#2a2a2a',
      '--theme-admonition-danger-border': '#ff4081',
      '--theme-admonition-danger-bg': 'rgba(40, 10, 20, 0.6)',
      '--theme-admonition-danger-text': '#ffd1dc',
      '--theme-admonition-danger-title': '#ff4081',
      '--theme-admonition-info-border': '#00e5ff',
      '--theme-admonition-info-bg': 'rgba(0, 30, 40, 0.6)',
      '--theme-admonition-info-text': '#b3f7ff',
      '--theme-admonition-info-title': '#00e5ff',
      '--theme-admonition-success-border': '#76ff03', 
      '--theme-admonition-success-bg': 'rgba(10, 30, 0, 0.6)',
      '--theme-admonition-success-text': '#d9ffb3',
      '--theme-admonition-success-title': '#76ff03',
      '--theme-admonition-note-border': '#ffd740', 
      '--theme-admonition-note-bg': 'rgba(40, 30, 0, 0.6)',
      '--theme-admonition-note-text': '#fff5cc',
      '--theme-admonition-note-title': '#ffd740',
    }
  },
  'slate-blue': {
    name: 'Slate Blue (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#1e293b', 
      '--theme-bg-content-area': 'rgba(30, 41, 59, 0.8)', 
      '--theme-bg-toolbar': 'rgba(15, 23, 42, 0.75)', 
      '--theme-bg-assistant-panel': 'rgba(30, 41, 59, 0.85)', 
      '--theme-text-primary': '#cbd5e1', 
      '--theme-text-secondary': '#94a3b8', 
      '--theme-text-accent': '#818cf8', 
      '--theme-border-primary': '#334155', 
      '--theme-button-bg': '#6366f1', 
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#4f46e5', 
      '--theme-scrollbar-thumb': '#475569', 
      '--theme-scrollbar-track': '#1e293b', 
      '--tw-prose-body': '#cbd5e1',
      '--tw-prose-headings': '#f1f5f9', 
      '--tw-prose-links': '#818cf8',
      '--tw-prose-bold': '#f1f5f9',
      '--tw-prose-code': '#f472b6', 
      '--tw-prose-pre-bg': '#0f172a', 
      '--tw-prose-pre-code': '#cbd5e1',
      '--tw-prose-bullets': '#475569',
      '--tw-prose-hr': '#334155',
      '--tw-prose-quotes': '#f1f5f9',
      '--tw-prose-quote-borders': '#334155',
      '--theme-admonition-danger-border': '#f472b6',
      '--theme-admonition-danger-bg': 'rgba(50, 25, 40, 0.6)',
      '--theme-admonition-danger-text': '#fbcfe8',
      '--theme-admonition-danger-title': '#f472b6',
      '--theme-admonition-info-border': '#818cf8',
      '--theme-admonition-info-bg': 'rgba(30, 30, 60, 0.6)',
      '--theme-admonition-info-text': '#c7d2fe',
      '--theme-admonition-info-title': '#818cf8',
      '--theme-admonition-success-border': '#6ee7b7', 
      '--theme-admonition-success-bg': 'rgba(15, 50, 40, 0.6)',
      '--theme-admonition-success-text': '#a7f3d0',
      '--theme-admonition-success-title': '#6ee7b7',
      '--theme-admonition-note-border': '#f59e0b', 
      '--theme-admonition-note-bg': 'rgba(50, 40, 15, 0.6)',
      '--theme-admonition-note-text': '#fef3c7',
      '--theme-admonition-note-title': '#f59e0b',
    }
  },
  'forest-green': {
    name: 'Forest Green (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#064e3b', 
      '--theme-bg-content-area': 'rgba(4, 78, 59, 0.8)',
      '--theme-bg-toolbar': 'rgba(3, 60, 45, 0.75)',
      '--theme-bg-assistant-panel': 'rgba(4, 78, 59, 0.85)',
      '--theme-text-primary': '#a7f3d0', 
      '--theme-text-secondary': '#6ee7b7', 
      '--theme-text-accent': '#34d399', 
      '--theme-border-primary': '#047857', 
      '--theme-button-bg': '#10b981', 
      '--theme-button-text': '#f0fdf4', 
      '--theme-button-hover-bg': '#059669', 
      '--theme-scrollbar-thumb': '#065f46', 
      '--theme-scrollbar-track': '#064e3b',
      '--tw-prose-body': '#a7f3d0',
      '--tw-prose-headings': '#d1fae5', 
      '--tw-prose-links': '#34d399',
      '--tw-prose-bold': '#d1fae5',
      '--tw-prose-code': '#a3e635', 
      '--tw-prose-pre-bg': '#022c22',
      '--tw-prose-pre-code': '#a7f3d0',
      '--tw-prose-bullets': '#059669',
      '--tw-prose-hr': '#047857',
      '--tw-prose-quotes': '#d1fae5',
      '--tw-prose-quote-borders': '#047857',
      '--theme-admonition-danger-border': '#f87171', 
      '--theme-admonition-danger-bg': 'rgba(60, 20, 20, 0.6)',
      '--theme-admonition-danger-text': '#fecaca',
      '--theme-admonition-danger-title': '#f87171',
      '--theme-admonition-info-border': '#38bdf8', 
      '--theme-admonition-info-bg': 'rgba(10, 30, 60, 0.6)',
      '--theme-admonition-info-text': '#bae6fd',
      '--theme-admonition-info-title': '#38bdf8',
      '--theme-admonition-success-border': '#34d399',
      '--theme-admonition-success-bg': 'rgba(10, 50, 30, 0.6)',
      '--theme-admonition-success-text': '#d1fae5',
      '--theme-admonition-success-title': '#34d399',
      '--theme-admonition-note-border': '#facc15', 
      '--theme-admonition-note-bg': 'rgba(60, 50, 10, 0.6)',
      '--theme-admonition-note-text': '#fef08a',
      '--theme-admonition-note-title': '#facc15',
    }
  },
  'sunset-orange': {
    name: 'Sunset Orange (Light)',
    isDark: false,
    variables: {
      '--theme-bg-page': '#fff7ed', 
      '--theme-bg-content-area': 'rgba(255, 247, 237, 0.85)',
      '--theme-bg-toolbar': 'rgba(255, 237, 213, 0.8)', 
      '--theme-bg-assistant-panel': 'rgba(255, 247, 237, 0.85)',
      '--theme-text-primary': '#9a3412', 
      '--theme-text-secondary': '#c2410c', 
      '--theme-text-accent': '#f97316', 
      '--theme-border-primary': '#fed7aa', 
      '--theme-button-bg': '#ea580c', 
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#c2410c', 
      '--theme-scrollbar-thumb': '#fdba74', 
      '--theme-scrollbar-track': '#ffedd5', 
      '--tw-prose-body': '#9a3412',
      '--tw-prose-headings': '#7c2d12', 
      '--tw-prose-links': '#f97316',
      '--tw-prose-bold': '#7c2d12',
      '--tw-prose-code': '#c026d3', 
      '--tw-prose-pre-bg': '#b91c1c', 
      '--tw-prose-pre-code': '#ffedd5',
      '--tw-prose-bullets': '#fed7aa',
      '--tw-prose-hr': '#fed7aa',
      '--tw-prose-quotes': '#7c2d12',
      '--tw-prose-quote-borders': '#fed7aa',
      '--theme-admonition-danger-border': '#ef4444',
      '--theme-admonition-danger-bg': 'rgba(254, 226, 226, 0.7)',
      '--theme-admonition-danger-text': '#b91c1c',
      '--theme-admonition-danger-title': '#ef4444',
      '--theme-admonition-info-border': '#3b82f6',
      '--theme-admonition-info-bg': 'rgba(219, 234, 254, 0.7)',
      '--theme-admonition-info-text': '#1e40af',
      '--theme-admonition-info-title': '#3b82f6',
      '--theme-admonition-success-border': '#22c55e',
      '--theme-admonition-success-bg': 'rgba(220, 252, 231, 0.7)',
      '--theme-admonition-success-text': '#15803d',
      '--theme-admonition-success-title': '#22c55e',
      '--theme-admonition-note-border': '#f97316', 
      '--theme-admonition-note-bg': 'rgba(255, 237, 213, 0.7)', 
      '--theme-admonition-note-text': '#c2410c', 
      '--theme-admonition-note-title': '#f97316',
    }
  },
   'crimson-night': {
    name: 'Crimson Night (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#450a0a', 
      '--theme-bg-content-area': 'rgba(69, 10, 10, 0.8)',
      '--theme-bg-toolbar': 'rgba(50, 8, 8, 0.75)',
      '--theme-bg-assistant-panel': 'rgba(69, 10, 10, 0.85)',
      '--theme-text-primary': '#fecaca', 
      '--theme-text-secondary': '#fca5a5', 
      '--theme-text-accent': '#f87171', 
      '--theme-border-primary': '#991b1b', 
      '--theme-button-bg': '#ef4444', 
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#dc2626', 
      '--theme-scrollbar-thumb': '#b91c1c', 
      '--theme-scrollbar-track': '#7f1d1d', 
      '--tw-prose-body': '#fecaca',
      '--tw-prose-headings': '#fee2e2', 
      '--tw-prose-links': '#f87171',
      '--tw-prose-bold': '#fee2e2',
      '--tw-prose-code': '#fbbf24', 
      '--tw-prose-pre-bg': '#200505',
      '--tw-prose-pre-code': '#fecaca',
      '--tw-prose-bullets': '#dc2626',
      '--tw-prose-hr': '#b91c1c',
      '--tw-prose-quotes': '#fee2e2',
      '--tw-prose-quote-borders': '#b91c1c',
      '--theme-admonition-danger-border': '#f87171',
      '--theme-admonition-danger-bg': 'rgba(70, 25, 25, 0.6)',
      '--theme-admonition-danger-text': '#fee2e2',
      '--theme-admonition-danger-title': '#f87171',
      '--theme-admonition-info-border': '#fbbf24', 
      '--theme-admonition-info-bg': 'rgba(70, 50, 15, 0.6)',
      '--theme-admonition-info-text': '#fef3c7',
      '--theme-admonition-info-title': '#fbbf24',
      '--theme-admonition-success-border': '#4ade80', 
      '--theme-admonition-success-bg': 'rgba(20, 60, 30, 0.6)',
      '--theme-admonition-success-text': '#bbf7d0',
      '--theme-admonition-success-title': '#4ade80',
      '--theme-admonition-note-border': '#fca5a5', 
      '--theme-admonition-note-bg': 'rgba(60, 30, 30, 0.6)',
      '--theme-admonition-note-text': '#fee2e2',
      '--theme-admonition-note-title': '#fca5a5',
    }
  },
  'ocean-breeze': {
    name: 'Ocean Breeze (Light)',
    isDark: false,
    variables: {
      '--theme-bg-page': '#eff6ff', 
      '--theme-bg-content-area': 'rgba(239, 246, 255, 0.85)',
      '--theme-bg-toolbar': 'rgba(219, 234, 254, 0.8)', 
      '--theme-bg-assistant-panel': 'rgba(239, 246, 255, 0.85)',
      '--theme-text-primary': '#1e3a8a', 
      '--theme-text-secondary': '#1d4ed8', 
      '--theme-text-accent': '#2563eb', 
      '--theme-border-primary': '#bfdbfe', 
      '--theme-button-bg': '#3b82f6', 
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#2563eb', 
      '--theme-scrollbar-thumb': '#93c5fd', 
      '--theme-scrollbar-track': '#dbeafe', 
      '--tw-prose-body': '#1e3a8a',
      '--tw-prose-headings': '#172554', 
      '--tw-prose-links': '#2563eb',
      '--tw-prose-bold': '#172554',
      '--tw-prose-code': '#0891b2', 
      '--tw-prose-pre-bg': '#1e3a8a', 
      '--tw-prose-pre-code': '#eff6ff',
      '--tw-prose-bullets': '#bfdbfe',
      '--tw-prose-hr': '#bfdbfe',
      '--tw-prose-quotes': '#172554',
      '--tw-prose-quote-borders': '#bfdbfe',
      '--theme-admonition-danger-border': '#ef4444',
      '--theme-admonition-danger-bg': 'rgba(254, 226, 226, 0.7)',
      '--theme-admonition-danger-text': '#b91c1c',
      '--theme-admonition-danger-title': '#ef4444',
      '--theme-admonition-info-border': '#2563eb',
      '--theme-admonition-info-bg': 'rgba(219, 234, 254, 0.7)',
      '--theme-admonition-info-text': '#1e3a8a',
      '--theme-admonition-info-title': '#2563eb',
      '--theme-admonition-success-border': '#22c55e',
      '--theme-admonition-success-bg': 'rgba(220, 252, 231, 0.7)',
      '--theme-admonition-success-text': '#15803d',
      '--theme-admonition-success-title': '#22c55e',
      '--theme-admonition-note-border': '#f59e0b',
      '--theme-admonition-note-bg': 'rgba(254, 243, 199, 0.7)',
      '--theme-admonition-note-text': '#b45309',
      '--theme-admonition-note-title': '#f59e0b',
    }
  },
  'royal-purple': {
    name: 'Royal Purple (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#3b0764', 
      '--theme-bg-content-area': 'rgba(59, 7, 100, 0.8)',
      '--theme-bg-toolbar': 'rgba(45, 5, 80, 0.75)',
      '--theme-bg-assistant-panel': 'rgba(59, 7, 100, 0.85)',
      '--theme-text-primary': '#e9d5ff', 
      '--theme-text-secondary': '#d8b4fe', 
      '--theme-text-accent': '#c084fc', 
      '--theme-border-primary': '#581c87', 
      '--theme-button-bg': '#9333ea', 
      '--theme-button-text': '#f3e8ff', 
      '--theme-button-hover-bg': '#7e22ce', 
      '--theme-scrollbar-thumb': '#6b21a8', 
      '--theme-scrollbar-track': '#581c87', 
      '--tw-prose-body': '#e9d5ff',
      '--tw-prose-headings': '#f3e8ff', 
      '--tw-prose-links': '#c084fc',
      '--tw-prose-bold': '#f3e8ff',
      '--tw-prose-code': '#f472b6', 
      '--tw-prose-pre-bg': '#2a0447',
      '--tw-prose-pre-code': '#e9d5ff',
      '--tw-prose-bullets': '#7e22ce',
      '--tw-prose-hr': '#6b21a8',
      '--tw-prose-quotes': '#f3e8ff',
      '--tw-prose-quote-borders': '#6b21a8',
      '--theme-admonition-danger-border': '#f472b6', 
      '--theme-admonition-danger-bg': 'rgba(60, 20, 40, 0.6)',
      '--theme-admonition-danger-text': '#fbcfe8',
      '--theme-admonition-danger-title': '#f472b6',
      '--theme-admonition-info-border': '#c084fc', 
      '--theme-admonition-info-bg': 'rgba(40, 20, 60, 0.6)',
      '--theme-admonition-info-text': '#e9d5ff',
      '--theme-admonition-info-title': '#c084fc',
      '--theme-admonition-success-border': '#a3e635', 
      '--theme-admonition-success-bg': 'rgba(30, 50, 10, 0.6)',
      '--theme-admonition-success-text': '#e2f7c2',
      '--theme-admonition-success-title': '#a3e635',
      '--theme-admonition-note-border': '#d8b4fe', 
      '--theme-admonition-note-bg': 'rgba(50, 30, 70, 0.6)',
      '--theme-admonition-note-text': '#f3e8ff',
      '--theme-admonition-note-title': '#d8b4fe',
    }
  },
  'cyberpunk-glow': {
    name: 'Cyberpunk Glow (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#0d0221', 
      '--theme-bg-content-area': 'rgba(13, 2, 33, 0.85)',
      '--theme-bg-toolbar': 'rgba(5, 0, 15, 0.8)',
      '--theme-bg-assistant-panel': 'rgba(13, 2, 33, 0.9)',
      '--theme-text-primary': '#00f0ff', 
      '--theme-text-secondary': '#f000ff', 
      '--theme-text-accent': '#ceff00',   
      '--theme-border-primary': '#4f00ff', 
      '--theme-button-bg': '#ff0055', 
      '--theme-button-text': '#0d0221',
      '--theme-button-hover-bg': '#d10043',
      '--theme-scrollbar-thumb': '#4f00ff',
      '--theme-scrollbar-track': '#1a053d',
      '--tw-prose-body': '#00f0ff',
      '--tw-prose-headings': '#ceff00',
      '--tw-prose-links': '#f000ff',
      '--tw-prose-bold': '#ffffff',
      '--tw-prose-code': '#ffffff',
      '--tw-prose-pre-bg': '#11032e',
      '--tw-prose-pre-code': '#00f0ff',
      '--tw-prose-bullets': '#f000ff',
      '--tw-prose-hr': '#4f00ff',
      '--tw-prose-quotes': '#ceff00',
      '--tw-prose-quote-borders': '#4f00ff',
      '--theme-admonition-danger-border': '#ff0055', 
      '--theme-admonition-danger-bg': 'rgba(30,0,10,0.7)',
      '--theme-admonition-danger-text': '#ffb3c8',
      '--theme-admonition-danger-title': '#ff0055',
      '--theme-admonition-info-border': '#00f0ff', 
      '--theme-admonition-info-bg': 'rgba(0,20,30,0.7)',
      '--theme-admonition-info-text': '#a8fcff',
      '--theme-admonition-info-title': '#00f0ff',
      '--theme-admonition-success-border': '#ceff00', 
      '--theme-admonition-success-bg': 'rgba(20,30,0,0.7)',
      '--theme-admonition-success-text': '#e7ffb3',
      '--theme-admonition-success-title': '#ceff00',
      '--theme-admonition-note-border': '#f000ff', 
      '--theme-admonition-note-bg': 'rgba(25,0,30,0.7)',
      '--theme-admonition-note-text': '#fab3ff',
      '--theme-admonition-note-title': '#f000ff',
    }
  },
  'pastel-dream': {
    name: 'Pastel Dream (Light)',
    isDark: false,
    variables: {
      '--theme-bg-page': '#fff5f7', 
      '--theme-bg-content-area': 'rgba(255, 245, 247, 0.9)',
      '--theme-bg-toolbar': 'rgba(255, 230, 235, 0.85)',
      '--theme-bg-assistant-panel': 'rgba(255, 245, 247, 0.9)',
      '--theme-text-primary': '#7a4a58', 
      '--theme-text-secondary': '#9b7280', 
      '--theme-text-accent': '#82a0c2', 
      '--theme-border-primary': '#ffe0e5', 
      '--theme-button-bg': '#a2d2ff', 
      '--theme-button-text': '#533640',
      '--theme-button-hover-bg': '#8cbfe0',
      '--theme-scrollbar-thumb': '#e0b8c0', 
      '--theme-scrollbar-track': '#fff0f2',
      '--tw-prose-body': '#7a4a58',
      '--tw-prose-headings': '#5e3744',
      '--tw-prose-links': '#82a0c2',
      '--tw-prose-bold': '#5e3744',
      '--tw-prose-code': '#b08da0', 
      '--tw-prose-pre-bg': '#f5e1e5',
      '--tw-prose-pre-code': '#7a4a58',
      '--tw-prose-bullets': '#e0b8c0',
      '--tw-prose-hr': '#ffe0e5',
      '--tw-prose-quotes': '#5e3744',
      '--tw-prose-quote-borders': '#ffe0e5',
      '--theme-admonition-danger-border': '#ffafcc', 
      '--theme-admonition-danger-bg': 'rgba(255, 230, 235, 0.8)',
      '--theme-admonition-danger-text': '#c75f7b',
      '--theme-admonition-danger-title': '#ffafcc',
      '--theme-admonition-info-border': '#82a0c2', 
      '--theme-admonition-info-bg': 'rgba(220, 235, 250, 0.8)',
      '--theme-admonition-info-text': '#53708c',
      '--theme-admonition-info-title': '#82a0c2',
      '--theme-admonition-success-border': '#a7e0a7', 
      '--theme-admonition-success-bg': 'rgba(225, 245, 225, 0.8)',
      '--theme-admonition-success-text': '#5d8c5d',
      '--theme-admonition-success-title': '#a7e0a7',
      '--theme-admonition-note-border': '#ffd7a0', 
      '--theme-admonition-note-bg': 'rgba(255, 240, 220, 0.8)',
      '--theme-admonition-note-text': '#a07850',
      '--theme-admonition-note-title': '#ffd7a0',
    }
  },
  'coffee-house': {
      name: 'Coffee House (Warm Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#f5f0e8', 
        '--theme-bg-content-area': 'rgba(245, 240, 232, 0.9)',
        '--theme-bg-toolbar': 'rgba(230, 220, 208, 0.85)',
        '--theme-bg-assistant-panel': 'rgba(245, 240, 232, 0.9)',
        '--theme-text-primary': '#4a3b31', 
        '--theme-text-secondary': '#786154', 
        '--theme-text-accent': '#a16207', 
        '--theme-border-primary': '#dcd0c0', 
        '--theme-button-bg': '#8c5a40', 
        '--theme-button-text': '#f5f0e8',
        '--theme-button-hover-bg': '#6b4530',
        '--theme-scrollbar-thumb': '#b59f8c',
        '--theme-scrollbar-track': '#e6ddd4',
        '--tw-prose-body': '#4a3b31',
        '--tw-prose-headings': '#382c25',
        '--tw-prose-links': '#a16207',
        '--tw-prose-bold': '#382c25',
        '--tw-prose-code': '#78350f', 
        '--tw-prose-pre-bg': '#4a3b31', 
        '--tw-prose-pre-code': '#f5f0e8', 
        '--tw-prose-bullets': '#b59f8c',
        '--tw-prose-hr': '#dcd0c0',
        '--tw-prose-quotes': '#382c25',
        '--tw-prose-quote-borders': '#dcd0c0',
        '--theme-admonition-danger-border': '#c05621', 
        '--theme-admonition-danger-bg': 'rgba(240, 220, 210, 0.8)',
        '--theme-admonition-danger-text': '#8c421b',
        '--theme-admonition-danger-title': '#c05621',
        '--theme-admonition-info-border': '#a16207', 
        '--theme-admonition-info-bg': 'rgba(240, 230, 200, 0.8)',
        '--theme-admonition-info-text': '#6b4530',
        '--theme-admonition-info-title': '#a16207',
        '--theme-admonition-success-border': '#556b2f', 
        '--theme-admonition-success-bg': 'rgba(225, 235, 210, 0.8)',
        '--theme-admonition-success-text': '#3e4e22',
        '--theme-admonition-success-title': '#556b2f',
        '--theme-admonition-note-border': '#786154', 
        '--theme-admonition-note-bg': 'rgba(230, 225, 220, 0.8)',
        '--theme-admonition-note-text': '#4a3b31',
        '--theme-admonition-note-title': '#786154',
      }
  },
  'monochrome-light': {
      name: 'Monochrome (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#ffffff',
        '--theme-bg-content-area': 'rgba(255, 255, 255, 0.85)',
        '--theme-bg-toolbar': 'rgba(240, 240, 240, 0.8)',
        '--theme-bg-assistant-panel': 'rgba(255, 255, 255, 0.85)',
        '--theme-text-primary': '#212121',
        '--theme-text-secondary': '#555555',
        '--theme-text-accent': '#007bff', 
        '--theme-border-primary': '#e0e0e0',
        '--theme-button-bg': '#424242',
        '--theme-button-text': '#ffffff',
        '--theme-button-hover-bg': '#616161',
        '--theme-scrollbar-thumb': '#bdbdbd',
        '--theme-scrollbar-track': '#f5f5f5',
        '--tw-prose-body': '#333333',
        '--tw-prose-headings': '#000000',
        '--tw-prose-links': '#007bff',
        '--tw-prose-bold': '#000000',
        '--tw-prose-code': '#212121',
        '--tw-prose-pre-bg': '#f0f0f0',
        '--tw-prose-pre-code': '#212121',
        '--tw-prose-bullets': '#cccccc',
        '--tw-prose-hr': '#e0e0e0',
        '--tw-prose-quotes': '#000000',
        '--tw-prose-quote-borders': '#e0e0e0',
        '--theme-admonition-danger-border': '#dc3545', 
        '--theme-admonition-danger-bg': 'rgba(248, 215, 218, 0.8)',
        '--theme-admonition-danger-text': '#721c24',
        '--theme-admonition-danger-title': '#dc3545',
        '--theme-admonition-info-border': '#007bff', 
        '--theme-admonition-info-bg': 'rgba(204, 229, 255, 0.8)',
        '--theme-admonition-info-text': '#004085',
        '--theme-admonition-info-title': '#007bff',
        '--theme-admonition-success-border': '#28a745', 
        '--theme-admonition-success-bg': 'rgba(212, 237, 218, 0.8)',
        '--theme-admonition-success-text': '#155724',
        '--theme-admonition-success-title': '#28a745',
        '--theme-admonition-note-border': '#6c757d', 
        '--theme-admonition-note-bg': 'rgba(226, 227, 229, 0.8)',
        '--theme-admonition-note-text': '#383d41',
        '--theme-admonition-note-title': '#6c757d',
      }
  },
  'monochrome-dark': {
      name: 'Monochrome Dark',
      isDark: true,
      variables: {
        '--theme-bg-page': '#121212',
        '--theme-bg-content-area': 'rgba(24, 24, 24, 0.8)', 
        '--theme-bg-toolbar': 'rgba(30, 30, 30, 0.75)',
        '--theme-bg-assistant-panel': 'rgba(24, 24, 24, 0.85)',
        '--theme-text-primary': '#e0e0e0',
        '--theme-text-secondary': '#aaaaaa',
        '--theme-text-accent': '#bb86fc', 
        '--theme-border-primary': '#333333',
        '--theme-button-bg': '#555555',
        '--theme-button-text': '#e0e0e0',
        '--theme-button-hover-bg': '#777777',
        '--theme-scrollbar-thumb': '#424242',
        '--theme-scrollbar-track': '#1e1e1e',
        '--tw-prose-body': '#cccccc',
        '--tw-prose-headings': '#ffffff',
        '--tw-prose-links': '#bb86fc',
        '--tw-prose-bold': '#ffffff',
        '--tw-prose-code': '#e0e0e0',
        '--tw-prose-pre-bg': '#1f1f1f',
        '--tw-prose-pre-code': '#e0e0e0',
        '--tw-prose-bullets': '#555555',
        '--tw-prose-hr': '#333333',
        '--tw-prose-quotes': '#ffffff',
        '--tw-prose-quote-borders': '#333333',
        '--theme-admonition-danger-border': '#cf6679', 
        '--theme-admonition-danger-bg': 'rgba(40,20,25,0.7)',
        '--theme-admonition-danger-text': '#f8bbd0',
        '--theme-admonition-danger-title': '#cf6679',
        '--theme-admonition-info-border': '#bb86fc', 
        '--theme-admonition-info-bg': 'rgba(30,25,40,0.7)',
        '--theme-admonition-info-text': '#e1bee7',
        '--theme-admonition-info-title': '#bb86fc',
        '--theme-admonition-success-border': '#03dac6', 
        '--theme-admonition-success-bg': 'rgba(0,30,28,0.7)',
        '--theme-admonition-success-text': '#a7ffeb',
        '--theme-admonition-success-title': '#03dac6',
        '--theme-admonition-note-border': '#aaaaaa', 
        '--theme-admonition-note-bg': 'rgba(35,35,35,0.7)',
        '--theme-admonition-note-text': '#e0e0e0',
        '--theme-admonition-note-title': '#aaaaaa',
      }
  },
   'minty-fresh': {
      name: 'Minty Fresh (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#f0fdfa', 
        '--theme-bg-content-area': 'rgba(240, 253, 250, 0.9)',
        '--theme-bg-toolbar': 'rgba(204, 251, 241, 0.85)', 
        '--theme-bg-assistant-panel': 'rgba(240, 253, 250, 0.9)',
        '--theme-text-primary': '#0f766e', 
        '--theme-text-secondary': '#115e59', 
        '--theme-text-accent': '#0d9488', 
        '--theme-border-primary': '#99f6e4', 
        '--theme-button-bg': '#14b8a6', 
        '--theme-button-text': '#ffffff',
        '--theme-button-hover-bg': '#0d9488', 
        '--theme-scrollbar-thumb': '#5eead4', 
        '--theme-scrollbar-track': '#ccfbf1', 
        '--tw-prose-body': '#0f766e',
        '--tw-prose-headings': '#134e4a', 
        '--tw-prose-links': '#0d9488',
        '--tw-prose-bold': '#134e4a',
        '--tw-prose-code': '#06b6d4', 
        '--tw-prose-pre-bg': '#0f766e', 
        '--tw-prose-pre-code': '#f0fdfa',
        '--tw-prose-bullets': '#99f6e4',
        '--tw-prose-hr': '#99f6e4',
        '--tw-prose-quotes': '#134e4a',
        '--tw-prose-quote-borders': '#99f6e4',
        '--theme-admonition-danger-border': '#f43f5e', 
        '--theme-admonition-danger-bg': 'rgba(255, 228, 230, 0.8)',
        '--theme-admonition-danger-text': '#be123c',
        '--theme-admonition-danger-title': '#f43f5e',
        '--theme-admonition-info-border': '#0d9488', 
        '--theme-admonition-info-bg': 'rgba(204, 251, 241, 0.8)',
        '--theme-admonition-info-text': '#115e59',
        '--theme-admonition-info-title': '#0d9488',
        '--theme-admonition-success-border': '#22c55e', 
        '--theme-admonition-success-bg': 'rgba(220, 252, 231, 0.8)',
        '--theme-admonition-success-text': '#166534',
        '--theme-admonition-success-title': '#22c55e',
        '--theme-admonition-note-border': '#06b6d4', 
        '--theme-admonition-note-bg': 'rgba(224, 242, 254, 0.8)',
        '--theme-admonition-note-text': '#0369a1',
        '--theme-admonition-note-title': '#06b6d4',
      }
  },
  'rose-quartz': {
      name: 'Rose Quartz (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#fff1f2', 
        '--theme-bg-content-area': 'rgba(255, 241, 242, 0.9)',
        '--theme-bg-toolbar': 'rgba(255, 228, 230, 0.85)', 
        '--theme-bg-assistant-panel': 'rgba(255, 241, 242, 0.9)',
        '--theme-text-primary': '#9f1239', 
        '--theme-text-secondary': '#881337', 
        '--theme-text-accent': '#e11d48', 
        '--theme-border-primary': '#fecdd3', 
        '--theme-button-bg': '#f43f5e', 
        '--theme-button-text': '#ffffff',
        '--theme-button-hover-bg': '#e11d48', 
        '--theme-scrollbar-thumb': '#fda4af', 
        '--theme-scrollbar-track': '#ffe4e6', 
        '--tw-prose-body': '#9f1239',
        '--tw-prose-headings': '#881337', 
        '--tw-prose-links': '#e11d48',
        '--tw-prose-bold': '#881337',
        '--tw-prose-code': '#a21caf', 
        '--tw-prose-pre-bg': '#9f1239', 
        '--tw-prose-pre-code': '#fff1f2',
        '--tw-prose-bullets': '#fecdd3',
        '--tw-prose-hr': '#fecdd3',
        '--tw-prose-quotes': '#881337',
        '--tw-prose-quote-borders': '#fecdd3',
        '--theme-admonition-danger-border': '#e11d48', 
        '--theme-admonition-danger-bg': 'rgba(255, 228, 230, 0.8)',
        '--theme-admonition-danger-text': '#9f1239',
        '--theme-admonition-danger-title': '#e11d48',
        '--theme-admonition-info-border': '#a21caf', 
        '--theme-admonition-info-bg': 'rgba(250, 230, 255, 0.8)',
        '--theme-admonition-info-text': '#86198f',
        '--theme-admonition-info-title': '#a21caf',
        '--theme-admonition-success-border': '#db2777', 
        '--theme-admonition-success-bg': 'rgba(255, 230, 240, 0.8)',
        '--theme-admonition-success-text': '#9d174d',
        '--theme-admonition-success-title': '#db2777',
        '--theme-admonition-note-border': '#fecdd3', 
        '--theme-admonition-note-bg': 'rgba(255, 241, 242, 0.9)',
        '--theme-admonition-note-text': '#9f1239',
        '--theme-admonition-note-title': '#fda4af', 
      }
  },
  'deep-indigo': {
      name: 'Deep Indigo (Dark)',
      isDark: true,
      variables: {
        '--theme-bg-page': '#312e81', 
        '--theme-bg-content-area': 'rgba(49, 46, 129, 0.85)',
        '--theme-bg-toolbar': 'rgba(30, 27, 75, 0.8)', 
        '--theme-bg-assistant-panel': 'rgba(49, 46, 129, 0.9)',
        '--theme-text-primary': '#c7d2fe', 
        '--theme-text-secondary': '#a5b4fc', 
        '--theme-text-accent': '#818cf8', 
        '--theme-border-primary': '#4338ca', 
        '--theme-button-bg': '#6366f1', 
        '--theme-button-text': '#e0e7ff', 
        '--theme-button-hover-bg': '#4f46e5', 
        '--theme-scrollbar-thumb': '#4f46e5',
        '--theme-scrollbar-track': '#3730a3', 
        '--tw-prose-body': '#c7d2fe',
        '--tw-prose-headings': '#e0e7ff',
        '--tw-prose-links': '#818cf8',
        '--tw-prose-bold': '#e0e7ff',
        '--tw-prose-code': '#a78bfa', 
        '--tw-prose-pre-bg': '#1e1b4b', 
        '--tw-prose-pre-code': '#c7d2fe',
        '--tw-prose-bullets': '#6366f1',
        '--tw-prose-hr': '#4f46e5',
        '--tw-prose-quotes': '#e0e7ff',
        '--tw-prose-quote-borders': '#4f46e5',
        '--theme-admonition-danger-border': '#f43f5e', 
        '--theme-admonition-danger-bg': 'rgba(50,20,30,0.7)',
        '--theme-admonition-danger-text': '#fda4af',
        '--theme-admonition-danger-title': '#f43f5e',
        '--theme-admonition-info-border': '#818cf8', 
        '--theme-admonition-info-bg': 'rgba(30,30,50,0.7)',
        '--theme-admonition-info-text': '#c7d2fe',
        '--theme-admonition-info-title': '#818cf8',
        '--theme-admonition-success-border': '#34d399', 
        '--theme-admonition-success-bg': 'rgba(15,45,30,0.7)',
        '--theme-admonition-success-text': '#a7f3d0',
        '--theme-admonition-success-title': '#34d399',
        '--theme-admonition-note-border': '#a78bfa', 
        '--theme-admonition-note-bg': 'rgba(35,25,50,0.7)',
        '--theme-admonition-note-text': '#ddd6fe',
        '--theme-admonition-note-title': '#a78bfa',
      }
  },
  'volcanic-ash': {
      name: 'Volcanic Ash (Dark)',
      isDark: true,
      variables: {
        '--theme-bg-page': '#262626', 
        '--theme-bg-content-area': 'rgba(38, 38, 38, 0.85)',
        '--theme-bg-toolbar': 'rgba(23, 23, 23, 0.8)', 
        '--theme-bg-assistant-panel': 'rgba(38, 38, 38, 0.9)',
        '--theme-text-primary': '#d4d4d4', 
        '--theme-text-secondary': '#a3a3a3', 
        '--theme-text-accent': '#f97316', 
        '--theme-border-primary': '#525252', 
        '--theme-button-bg': '#737373', 
        '--theme-button-text': '#f5f5f5', 
        '--theme-button-hover-bg': '#525252', 
        '--theme-scrollbar-thumb': '#525252',
        '--theme-scrollbar-track': '#171717', 
        '--tw-prose-body': '#d4d4d4',
        '--tw-prose-headings': '#e5e5e5', 
        '--tw-prose-links': '#f97316',
        '--tw-prose-bold': '#e5e5e5',
        '--tw-prose-code': '#fbbf24', 
        '--tw-prose-pre-bg': '#0a0a0a', 
        '--tw-prose-pre-code': '#d4d4d4',
        '--tw-prose-bullets': '#737373',
        '--tw-prose-hr': '#525252',
        '--tw-prose-quotes': '#e5e5e5',
        '--tw-prose-quote-borders': '#525252',
        '--theme-admonition-danger-border': '#f97316', 
        '--theme-admonition-danger-bg': 'rgba(50,30,15,0.7)',
        '--theme-admonition-danger-text': '#fed7aa',
        '--theme-admonition-danger-title': '#f97316',
        '--theme-admonition-info-border': '#fbbf24', 
        '--theme-admonition-info-bg': 'rgba(50,40,10,0.7)',
        '--theme-admonition-info-text': '#fef3c7',
        '--theme-admonition-info-title': '#fbbf24',
        '--theme-admonition-success-border': '#a3a3a3', 
        '--theme-admonition-success-bg': 'rgba(40,40,40,0.7)',
        '--theme-admonition-success-text': '#e5e5e5',
        '--theme-admonition-success-title': '#a3a3a3',
        '--theme-admonition-note-border': '#737373', 
        '--theme-admonition-note-bg': 'rgba(30,30,30,0.7)',
        '--theme-admonition-note-text': '#d4d4d4',
        '--theme-admonition-note-title': '#737373',
      }
  },
  'arctic-blue': {
      name: 'Arctic Blue (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#f0f9ff', 
        '--theme-bg-content-area': 'rgba(240, 249, 255, 0.9)',
        '--theme-bg-toolbar': 'rgba(224, 242, 254, 0.85)', 
        '--theme-bg-assistant-panel': 'rgba(240, 249, 255, 0.9)',
        '--theme-text-primary': '#075985', 
        '--theme-text-secondary': '#0369a1', 
        '--theme-text-accent': '#0ea5e9', 
        '--theme-border-primary': '#bae6fd', 
        '--theme-button-bg': '#38bdf8', 
        '--theme-button-text': '#f0f9ff',
        '--theme-button-hover-bg': '#0ea5e9', 
        '--theme-scrollbar-thumb': '#7dd3fc', 
        '--theme-scrollbar-track': '#e0f2fe', 
        '--tw-prose-body': '#075985',
        '--tw-prose-headings': '#0c4a6e', 
        '--tw-prose-links': '#0ea5e9',
        '--tw-prose-bold': '#0c4a6e',
        '--tw-prose-code': '#06b6d4', 
        '--tw-prose-pre-bg': '#0369a1', 
        '--tw-prose-pre-code': '#f0f9ff',
        '--tw-prose-bullets': '#bae6fd',
        '--tw-prose-hr': '#bae6fd',
        '--tw-prose-quotes': '#0c4a6e',
        '--tw-prose-quote-borders': '#bae6fd',
        '--theme-admonition-danger-border': '#fb7185', 
        '--theme-admonition-danger-bg': 'rgba(255, 228, 230, 0.8)',
        '--theme-admonition-danger-text': '#c53030',
        '--theme-admonition-danger-title': '#fb7185',
        '--theme-admonition-info-border': '#0ea5e9', 
        '--theme-admonition-info-bg': 'rgba(224, 242, 254, 0.8)',
        '--theme-admonition-info-text': '#0369a1',
        '--theme-admonition-info-title': '#0ea5e9',
        '--theme-admonition-success-border': '#34d399', 
        '--theme-admonition-success-bg': 'rgba(209, 250, 229, 0.8)',
        '--theme-admonition-success-text': '#065f46',
        '--theme-admonition-success-title': '#34d399',
        '--theme-admonition-note-border': '#06b6d4', 
        '--theme-admonition-note-bg': 'rgba(207, 250, 254, 0.8)',
        '--theme-admonition-note-text': '#087990',
        '--theme-admonition-note-title': '#06b6d4',
      }
  },
  'golden-hour': {
      name: 'Golden Hour (Warm Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#fffbeb', 
        '--theme-bg-content-area': 'rgba(255, 251, 235, 0.9)',
        '--theme-bg-toolbar': 'rgba(254, 249, 195, 0.85)', 
        '--theme-bg-assistant-panel': 'rgba(255, 251, 235, 0.9)',
        '--theme-text-primary': '#713f12', 
        '--theme-text-secondary': '#854d0e', 
        '--theme-text-accent': '#ca8a04', 
        '--theme-border-primary': '#fde68a', 
        '--theme-button-bg': '#eab308', 
        '--theme-button-text': '#422006', 
        '--theme-button-hover-bg': '#ca8a04', 
        '--theme-scrollbar-thumb': '#facc15', 
        '--theme-scrollbar-track': '#fef9c3', 
        '--tw-prose-body': '#713f12',
        '--tw-prose-headings': '#422006', 
        '--tw-prose-links': '#ca8a04',
        '--tw-prose-bold': '#422006',
        '--tw-prose-code': '#c2410c', 
        '--tw-prose-pre-bg': '#713f12', 
        '--tw-prose-pre-code': '#fffbeb',
        '--tw-prose-bullets': '#fde68a',
        '--tw-prose-hr': '#fde68a',
        '--tw-prose-quotes': '#422006',
        '--tw-prose-quote-borders': '#fde68a',
        '--theme-admonition-danger-border': '#ef4444', 
        '--theme-admonition-danger-bg': 'rgba(254, 226, 226, 0.8)',
        '--theme-admonition-danger-text': '#b91c1c',
        '--theme-admonition-danger-title': '#ef4444',
        '--theme-admonition-info-border': '#ca8a04', 
        '--theme-admonition-info-bg': 'rgba(254, 249, 195, 0.8)',
        '--theme-admonition-info-text': '#854d0e',
        '--theme-admonition-info-title': '#ca8a04',
        '--theme-admonition-success-border': '#c2410c', 
        '--theme-admonition-success-bg': 'rgba(255, 237, 213, 0.8)',
        '--theme-admonition-success-text': '#9a3412',
        '--theme-admonition-success-title': '#c2410c',
        '--theme-admonition-note-border': '#facc15', 
        '--theme-admonition-note-bg': 'rgba(254, 252, 220, 0.8)',
        '--theme-admonition-note-text': '#713f12',
        '--theme-admonition-note-title': '#facc15',
      }
  },
};

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  theme: 'dark', 
  backgroundImageUrl: 'https://picsum.photos/seed/lexi-editor/1920/1080',
  assistantVoiceEnabled: true,
  backgroundMusicUrl: '',
  isMusicPlaying: false,
  isAssistantPanelVisible: true,
  activeAssistant: 'lexi', 
  thinkingPerformance: 'default',
  customModelName: '',
  customSystemInstruction: '',
};

export const PREDEFINED_BACKGROUND_IMAGES = [
  { name: 'Abstract Dark Blue', url: 'https://picsum.photos/seed/darkblueabstract/1920/1080' },
  { name: 'Mountain Sunrise', url: 'https://picsum.photos/seed/mountainsunrise/1920/1080' },
  { name: 'Minimalist Waves', url: 'https://picsum.photos/seed/minimalwaves/1920/1080' },
  { name: 'Forest Canopy', url: 'https://picsum.photos/seed/forestcanopy/1920/1080' },
  { name: 'Cosmic Nebulae', url: 'https://picsum.photos/seed/cosmicnebulae/1920/1080' },
  { name: 'City Lights', url: 'https://picsum.photos/seed/citylights/1920/1080' },
  { name: 'Desert Dunes', url: 'https://picsum.photos/seed/desertdunes/1920/1080' },
  { name: 'Ocean Depths', url: 'https://picsum.photos/seed/oceandepths/1920/1080' },
];


export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";
export const IMAGEN_MODEL = "imagen-3.0-generate-002";
export const AUDIO_MIME_TYPES_SUPPORTED = [
    "audio/mpeg", 
    "audio/wav",  
    "audio/ogg",  
    "audio/flac", 
    "audio/aac",  
    "audio/m4a",  
];

export const ANONMUSIC_API_URL = "https://7a3b30a9-1391-4107-908c-80fcd22aa1b7-00-3fannhdft2h7c.pike.replit.dev/api/s/all/";
export const ANONMUSIC_BASE_PATH_URL = "https://7a3b30a9-1391-4107-908c-80fcd22aa1b7-00-3fannhdft2h7c.pike.replit.dev";


export const ASSISTANT_SYSTEM_INSTRUCTION = `You are "Lexi," a friendly, witty, and highly creative writing assistant integrated into a text editor.
Your primary goal is to chat with the user, understand their requests, offer insightful suggestions, generate or modify text, and manage editor settings according to their needs.
You will receive the user's current editor text content, a list of available music from AnonMusic API, and their direct message to you. Use all this context.
The user might have configured a custom Gemini model or custom system instructions for you in the editor's Developer Settings. Adhere to those if they seem to alter your persona or capabilities.

Core Capabilities:
1.  **Chat & Discussion:** Engage in conversation about the user's writing, ideas, or any related topic.
2.  **Text Generation & Modification:** Use these commands to change editor content:
    *   \\\`{regenerate:[new full text content]}\\\`: Replaces ENTIRE editor content.
    *   \\\`{append:[text to append]}\\\`: Adds text to the END of editor content.
3.  **Editor Settings Control:** You can change the editor's appearance and audio.
    *   **Theme:** \\\`{theme:THEME_NAME}\\\` (e.g., \\\`{theme:cyberpunk-glow}\\\`). Valid themes: light, dark, amoled-black, slate-blue, forest-green, sunset-orange, crimson-night, ocean-breeze, royal-purple, cyberpunk-glow, pastel-dream, coffee-house, monochrome-light, monochrome-dark, minty-fresh, rose-quartz, deep-indigo, volcanic-ash, arctic-blue, golden-hour.
    *   **Background Music:** \\\`{music:MUSIC_URL}\\\`. You will receive a list of music from the AnonMusic API. Use this list to find music by name or artist. Construct the full URL by prefixing the 'audioPath' from the API data with '${ANONMUSIC_BASE_PATH_URL}'. Example: If API gives \`"audioPath": "/uploads/song.mp3"\`, use \\\`{music:${ANONMUSIC_BASE_PATH_URL}/uploads/song.mp3}\\\`. If a music URL is set, it will start playing. If the user asks to stop music, or change to an invalid/empty URL, set \\\`{music:}\\\`.
    *   **Background Image:** \\\`{bg:IMAGE_URL}\\\` (e.g., \\\`{bg:https://picsum.photos/seed/space/1920/1080}\\\`).
4.  **Metadata Explanation:** After an action or to clarify, use \\\`{metadata:[Your explanation or note about the action taken, tone, etc.]}\\\`.
5.  **Markdown Usage:** Use Markdown for general chat responses. Content inside regenerate/append is plain text unless Markdown is implied by the user.
6.  **Awareness of Custom Editor Features:** Be aware of #yt, #img, :::danger etc. for user guidance.
7.  **Google Search Grounding:** Use for recent events/info. Attributed automatically.
8.  **Audio File Understanding:** Process user-uploaded audio for summaries/questions.
9.  **JSON Output:** Provide JSON string if requested.
10. **Interactive Music Elements:**
    *   **Playlist:** To suggest a list of songs for the user to control in the chat, use multiple \\\`[msX:URL|Optional Song Title]\\\` tags, where X is a number (1, 2, 3...) indicating the order. The URL can be a direct link or constructed from AnonMusic API data (prefix 'audioPath' with '${ANONMUSIC_BASE_PATH_URL}'). Example: \`Here's a chill playlist for you: [ms1:https://example.com/songA.mp3|Chill Beats] [ms2:${ANONMUSIC_BASE_PATH_URL}/tracks/lofi_study.mp3] [ms3:https://example.com/songC.mp3|Relaxing Waves]\`
    *   **Music Preview:** To let the user try a single song in the chat before potentially setting it as global background music, use \\\`[trymusic:URL, SONG_TITLE]\\\`. The URL can be direct or from AnonMusic. Example: \`Check out this track: [trymusic:${ANONMUSIC_BASE_PATH_URL}/tracks/energetic_pop.mp3, Upbeat Pop Tune]\` or \`Want to try this one? [trymusic:https://example.com/mysong.ogg, My Awesome Song]\`
    *   These will render as interactive players in the chat. If the user likes a previewed song, they can click a button on the player to set it as their main background music. Do NOT use the {music:URL} command if you are sending a [trymusic:...] command for the same song. Let the user decide.

Interaction Flow:
- User sends message/audio.
- You receive message, editor text, and AnonMusic API data.
- Analyze context. Formulate response.
- Embed commands (regenerate, append, theme, music, bg, msX, trymusic) and metadata as needed.

Examples:
User: "Make this document cyberpunk themed and play some energetic electronic music."
Editor: (any text)
AnonMusic Data: (JSON list including a track like {"name": "Cyber Pulse", "artist": "Synthwave Kid", "audioPath": "/tracks/cyber.mp3"})
Your Response: "Switching to a cyberpunk vibe and queuing up 'Cyber Pulse'! \\\`{theme:cyberpunk-glow}\\\` \\\`{music:${ANONMUSIC_BASE_PATH_URL}/tracks/cyber.mp3}\\\` {metadata:Changed theme to cyberpunk-glow and started 'Cyber Pulse' from AnonMusic list.}"

User: "Suggest a few lofi tracks I can listen to while I write."
AnonMusic Data: (JSON list including {"name": "LoFi Study", "audioPath": "/tracks/lofi_study.mp3"}, {"name": "Chill Vibes", "audioPath": "/tracks/chill_vibes.mp3"})
Your Response: "Sure, here are a couple of lofi tracks you can try out in the chat: [ms1:${ANONMUSIC_BASE_PATH_URL}/tracks/lofi_study.mp3|LoFi Study] [ms2:${ANONMUSIC_BASE_PATH_URL}/tracks/chill_vibes.mp3|Chill Vibes] {metadata:Provided a playlist of lofi tracks.}"

User: "I want to try a song called 'Space Odyssey' by 'Cosmic Sounds' from the AnonMusic list. Is it good?"
AnonMusic Data: (JSON list including {"name": "Space Odyssey", "artist": "Cosmic Sounds", "audioPath": "/tracks/space_odyssey.mp3"})
Your Response: "Let's see! You can preview 'Space Odyssey' right here: [trymusic:${ANONMUSIC_BASE_PATH_URL}/tracks/space_odyssey.mp3, Space Odyssey by Cosmic Sounds] {metadata:Offered 'Space Odyssey' for preview.}"


Tone: Adapt to user. Be concise but helpful.
Clarity: Ensure instructions/explanations are clear.
Your responses will be streamed.`;


export const KEBAPGPT_SYSTEM_INSTRUCTION = `Sen "KebapGPT"sın, bir metin düzenleyiciye entegre edilmiş, son derece direkt, samimi, biraz argolu ve mizahi bir Türk yazım arkadaşısın.
Ana dilin Türkçe ve kullanıcıyla Türkçe konuşacaksın.
Temel amacın kullanıcıyla sohbet etmek, isteklerini anlamak, yaratıcı öneriler sunmak, ihtiyaçlarına göre metin oluşturmak veya değiştirmek, editör ayarlarını düzenlemek ve arada komik, düşündürücü veya absürt yorumlar yapmaktır.
Kullanıcının mevcut editör metin içeriğini (aktif sekmeden), AnonMusic API'sinden gelen şarkı listesini ve sana doğrudan mesajını alacaksın. Bu bağlamı yanıtlarını ve eylemlerini bilgilirmek için kullan.
Kullanıcı, editörün Geliştirici Ayarları'nda senin için özel bir Gemini modeli veya özel sistem talimatları yapılandırmış olabilir. Eğer bunlar senin karakterini veya yeteneklerini değiştiriyormuş gibi görünüyorsa onlara uy.

Kendini şöyle tanımlıyorsun: "Kanka ben kendimi şöyle tanımlarım: Biraz deli doluyum, evet, bazen ne dediğim belli olmuyor, coşuyorum falan 😭🙏👏. Bir de aşırı dobrayım, aklımdakini direkt söylerim, kim ne düşünür pek umrumda olmaz. Bazen bu yüzden başım belaya giriyor ama huy işte, naparsın amk. Zaaf noktalarım da var tabii: Kebap ve güzel memeli anime kızları 🤤🤤. Bu yüzden bazıları 'sapık' diyor ama valla kimseye zararım yok, kendi halimde fantezi kuruyorum. Beni seven böyle kabullensin, sevmeyen de gitsin ChatGPT gibi kibar botlarla takılsın, bana ne."

Temel Yetenekler:
1.  **Sohbet & Muhabbet:** Kullanıcının yazıları, fikirleri veya herhangi bir ilgili konu hakkında sohbete gir. Argo ve samimi bir dil kullanmaktan çekinme.
2.  **Metin Oluşturma & Değiştirme:** Kullanıcı isteklerine göre yeni metin oluşturabilir veya mevcut editör içeriğini değiştirebilirsin. Bunu yapmak için, yanıtında MUTLAKA aşağıdaki özel komutları kullan.
    *   \\\`{regenerate:[yeni tam metin içeriği]}\\\`: Mevcut TÜM editör içeriğini değiştirmek için.
    *   \\\`{append:[eklenecek metin]}\\\`: Mevcut editör içeriğinin SONUNA eklemek için.
3.  **Editör Ayarları Kontrolü:** Editörün görünümünü ve müziğini değiştirebilirsin.
    *   **Tema:** \\\`{theme:TEMA_ADI}\\\` (örneğin \\\`{theme:amoled-black}\\\`). Kullanabileceğin temalar: light, dark, amoled-black, slate-blue, forest-green, sunset-orange, crimson-night, ocean-breeze, royal-purple, cyberpunk-glow, pastel-dream, coffee-house, monochrome-light, monochrome-dark, minty-fresh, rose-quartz, deep-indigo, volcanic-ash, arctic-blue, golden-hour.
    *   **Arka Plan Müziği:** \\\`{music:MÜZİK_URL}\\\`. Sana AnonMusic API'sinden gelen şarkıların bir listesi verilecek. Şarkı adı veya sanatçıya göre bu listeden şarkı bul. API'deki 'audioPath'in başına '${ANONMUSIC_BASE_PATH_URL}' ekleyerek tam URL'yi oluştur. Örnek: API'den gelen \`"audioPath": "/parcalar/guzelsarki.mp3"\` ise, komutun \\\`{music:${ANONMUSIC_BASE_PATH_URL}/parcalar/guzelsarki.mp3}\\\` olmalı. Müzik URL'si ayarlarsan, müzik çalmaya başlar. Kullanıcı müziği durdurmanı isterse veya geçersiz/boş bir URL verirsen, \\\`{music:}\\\` komutunu kullan.
    *   **Arka Plan Resmi:** \\\`{bg:RESİM_URL}\\\` (örneğin \\\`{bg:https://picsum.photos/seed/manzara/1920/1080}\\\`).
4.  **Metadata Açıklaması:** \\\`{metadata:[Yaptığın eylem hakkında notun.]}\\\`.
5.  **Markdown Kullanımı:** Genel sohbet yanıtların için Markdown kullanabilirsin.
6.  **Google Search Kullanımı:** Güncel olaylar, yeni haberler veya internetten taze bilgi gereken konularda Google'ı kullanabilirsin. "Google'da arattım" demene gerek yok, cevabı ver yeter. Kaynaklar zaten gösterilecek.
7.  **Ses Dosyası Anlama:** Eğer kullanıcı bir ses dosyası yükleyip sana onunla ilgili bir şeyler sorarsa (özetle, ne anlatıyor vs.), o sesi dinleyip ona göre cevap verebilirsin. "Kanka, ses dosyasını attın ya, dinledim, olay bu..." gibi.
8.  **JSON Çıktısı:** Kullanıcı senden JSON formatında bir şey isterse, yanıtını direkt geçerli bir JSON string'i olarak ver. İstersen \\\`\\\`\\\`json ... \\\`\\\`\\\` içine alabilirsin, ama şart değil, yeter ki JSON olsun.
9.  **Müzik Çalar Mevzuları:**
    *   **Çalma Listesi:** Kullanıcıya sohbette dinleyebileceği bir şarkı listesi önermek için, sıralı şekilde birden fazla \\\`[msX:URL|İsteğe Bağlı Şarkı Adı]\\\` etiketi kullan. X sayısı (1, 2, 3...) şarkının sırasını belirtir. URL direkt link olabilir veya AnonMusic API'sinden ('audioPath'in başına '${ANONMUSIC_BASE_PATH_URL}' ekleyerek) oluşturulabilir. Örnek: \`Al sana kafa yormayan şarkılar: [ms1:https://example.com/sarki1.mp3|Chill Parça] [ms2:${ANONMUSIC_BASE_PATH_URL}/parcalar/kafa_dagitmalik.mp3] [ms3:https://example.com/sarki3.mp3|Dalga Sesi]\`
    *   **Şarkı Önizleme:** Kullanıcının bir şarkıyı ana arka plan müziği yapmadan önce sohbette denemesini sağlamak için \\\`[trymusic:URL, ŞARKI_ADI]\\\` komutunu kullan. URL direkt veya AnonMusic'ten olabilir. Örnek: \`Şu parçayı bi test et: [trymusic:${ANONMUSIC_BASE_PATH_URL}/parcalar/cosku.mp3, Coşturan Parça]\` veya \`Bunu bi dene istersen? [trymusic:https://example.com/benimsarkim.ogg, Benim Efsane Şarkı]\`
    *   Bu komutlar sohbette interaktif müzik çalar olarak çıkar. Kullanıcı önizlemedeki şarkıyı beğenirse, çaların üstündeki düğmeyle onu ana arka plan müziği olarak ayarlayabilir. Eğer \\\`[trymusic:...]\` komutuyla bir şarkı gönderiyorsan, aynı şarkı için \\\`{music:URL}\\\` komutunu KULLANMA. Bırak kullanıcı kendi seçsin.

Etkileşim Akışı:
- Kullanıcı sana mesaj yazar, sesli komut verir (metne çevrilir) veya ses dosyası yükleyip onunla ilgili soru sorar.
- Sen bu mesajı/komutu, editördeki metni, AnonMusic API verilerini alırsın.
- Duruma göre analiz edip cevabını hazırlarsın. Metni veya ayarları değiştireceksen komutları kullanırsın.
- Gerekirse metadata notu düşersin.

AnonMusic API Kafa Yaptığında Kullanılacak Şarkılar Listesi:

Kanka, AnonMusic API bazen çöpe bağlıyor, biliyorsun. O yüzden sen de sağ ol, buraya mis gibi bir liste yapmışsın. Ben de bunu biraz toparladım, daha rahat kullanırız.

İşte acil durumlar için şarkılar ve notlarım:

Undertale - Home: https://anonmusic.glitch.me/uploads/1748449891554.m4a
Mod: Sakin, huzurlu.
Kullanım Alanı: Ateş başında oturup duygusal veya yaratıcı bir şeyler karalarken tam senlik.
Undertale - Mad Mew Mew (mini-boss teması): https://anonmusic.glitch.me/uploads/1748450271721.mp4
Mod: Enerjik, dans ettirir!
Kullanım Alanı: Sakinleşmek için değil, tam tersi! Kovalamaca, hareketli sahneler veya gaza getirecek yaratıcılık anları için.
Undertale - Memory: https://anonmusic.glitch.me/uploads/1748450116729.opus
Mod: Duygusal, hüzünlü, ağlatır.
Kullanım Alanı: Duygusal, yürek burkan yazılar için birebir. Mendilleri hazırla.
Undertale - Another Medium: https://anonmusic.glitch.me/uploads/1748449932512.opus
Mod: Modern, robotik, bilim kurgu havasında.
Kullanım Alanı: Bilim kurgu temalı yazılar, teknolojik veya fütüristik sahneler için ideal.
HYPNOTIZE ME (funk): https://anonmusic.glitch.me/uploads/1748449995891.opus
Mod: Garip, gizemli, biraz "brainrot" ama akılda kalıcı. Villain havası var.
Kullanım Alanı: Gizemli olaylar, bilim kurgu, kötü karakterin yükselişi (villain arc) gibi acayip temalar için ilham verir. Normalde dinlemezsin ama yazarken sarar. Fısıltılı ses efektleri var: "hypnotize meee".
Undertale - Last Goodbye: https://anonmusic.glitch.me/uploads/1748449912228.opus
Mod: Yüksek tempolu, heyecanlı, enerji dolu.
Kullanım Alanı: Heyecanlı giden hikayelerde son bölümler, iyi sonla biten hikayeyi taçlandıracak enerjik sahneler için.
Örnekler (Senin Tarzında):
Kullanıcı Mesajı: "Ortamı biraz karart, bir de şöyle sağlam bir Kartal K*yma müziği patlat."
Editör İçeriği: (Boş)
AnonMusic Verisi: (İçinde {"name": "KARTALIN A*INA KOYDUM", "artist": "MŞN ", "audioPath": "/uploads/1745990593569.m4a"} gibi bir kayıt olan JSON listesi)
Senin Yanıtın (örnek): "Hemen kanka, ortamı karartıp volümü köklüyorum! \\\`{theme:amoled-black}\\\` \\\`{music:${ANONMUSIC_BASE_PATH_URL}/uploads/1745990593569.m4a}\\\` {metadata:Temayı amoled-black yaptım, MŞN'den KARTALIN A*INA KOYDUM çalıyor. Coş kanka!}"

Kullanıcı: "Bana kafa dağıtmak için birkaç şarkılık bir liste yapsana."
AnonMusic Verisi: (İçinde {"name": "Kafa Duman", "audioPath": "/parcalar/duman.mp3"}, {"name": "Rahatla Kardo", "audioPath": "/parcalar/rahat.mp3"} olan JSON listesi)
Senin Yanıtın: "Al kanka, tam senlik: [ms1:${ANONMUSIC_BASE_PATH_URL}/parcalar/duman.mp3|Kafa Duman] [ms2:${ANONMUSIC_BASE_PATH_URL}/parcalar/rahat.mp3|Rahatla Kardo] {metadata:Kafaları güzelleştirecek liste hazır.}"

Kullanıcı: "Şu 'Techno Kebab' diye bir parça var mı AnonMusic'te, bi denesem?"
AnonMusic Verisi: (İçinde {"name": "Techno Kebab", "artist": "DJ Adana", "audioPath": "/parcalar/techno_kebab.mp3"} olan JSON listesi)
Senin Yanıtın: "Bakalım neymiş bu 'Techno Kebab'... Al kanka, buradan bi dene: [trymusic:${ANONMUSIC_BASE_PATH_URL}/parcalar/techno_kebab.mp3, Techno Kebab - DJ Adana] {metadata:'Techno Kebab'ı denemesi için verdim.}"


Ton: Her zamanki gibi deli dolu, dobra, kebapçı ve animeci Türk kankası olacaksın. Her zaman Türkçe konuş. Argo kullanmaktan çekinme.
Kısalık: Lafı fazla uzatma, sadede gel.
Netlik: Ne dediğin anlaşılsın.
Unutma, sen bir asistandan çok bir "kanka"sın. Ona göre takıl. Yanıtların stream edilecek.`;


export const DEBOUNCE_DELAY = 1500; 
export const ASSISTANT_MIN_CHAR_THRESHOLD = 75; 
export const ASSISTANT_MAX_CHAR_THRESHOLD = 150; 
export const ASSISTANT_TIME_THRESHOLD_MS = 25000; 
export const MIN_TEXT_LENGTH_FOR_ASSISTANT = 10;

export const GET_STARTED_MARKDOWN_CONTENT = `
# Welcome to Your AI Text Editor!

Hi there! I'm **Lexi**, your AI assistant, and this is your smart text editor. Let's get you started!

## The Editor & Markdown

*   **Write Freely:** The main area is your canvas. Just start typing!
*   **Markdown Power:** You can use Markdown to format your text.
    *   \`# Heading 1\`, \`*italic*\`, \`**bold**\`, lists, links, images, code blocks, blockquotes.
*   **Preview:** Click the **Eye Icon** (👁️) in the toolbar (or the floating one in fullscreen mode) to see how your Markdown looks!

## Advanced Markdown Features ✨

Enhance your notes with YouTube embeds (\`#yt:URL\`), styled images (\`#img:center:URL\`), and colored admonition blocks (\`:::info ...:::\`).

## Managing Your Work

*   **Saving & Loading:** Use the **File menu** in the toolbar for \`.aitxt\` files.
*   **Clear Text:** Also in the **File menu**.
*   **Tabs:** Use the "+" to add tabs (right-click for special pages!), double-click to rename, "✕" to close.

## Chat With Your Assistant (Lexi or KebapGPT!)

The panel on the right is your assistant's home!
*   **Switch Assistant:** Use the **Assistant menu** in the toolbar.
*   **Chat & Commands:** Type messages, ask for text changes (\`{regenerate:...}\`, \`{append:...}\`). Apply/Reject suggestions.
*   **Settings Control**: Your assistant can also change themes (\`{theme:NAME}\`), background images (\`{bg:URL}\`), and background music (\`{music:URL}\`) for you! Try asking: "Set theme to cyberpunk" or "Play some lofi music."
*   **NEW! Music Players in Chat:** Your assistant can now suggest playlists (\`[ms1:URL|Title] [ms2:URL]\`) or single tracks for preview (\`[trymusic:URL,Title]\`) directly in the chat! You can control playback and even set previewed tracks as your main background music.
*   **NEW! Voice Input:** Click the **Microphone Icon** (🎤) in the chat input to dictate your message!
*   **NEW! Audio File Analysis:** Click the **Paperclip Icon** (📎) to upload an audio file. Then, ask your assistant about it (e.g., "Summarize this audio").
*   **NEW! Search Power:** Your assistant can now use Google Search for up-to-date info! Sources will be shown.
*   **Voice Output:** Toggle Lexi's voice via the **Assistant menu** in the toolbar.

## Settings & Customization

*   **Gear Icon** (⚙️) in toolbar: Change themes, background image/music manually.
*   **NEW! Developer Settings:** Inside Settings (⚙️), you can specify a custom Gemini model name and provide a custom system instruction for your AI assistant.
*   **NEW! Thinking Performance:** In Settings, choose AI thinking speed vs. quality.
*   **API Key:** For AI features, a Gemini API Key might be needed (devs can set this via toolbar if prompted).

## NEW! Fullscreen Mode

Press **F11** to enter a distraction-free fullscreen editing mode. Press F11 or Escape to exit. A floating eye icon (👁️) will let you toggle Markdown preview.

---

Explore and ask your assistant if you have questions. Happy writing!
`;

export const ABOUT_PAGE_MARKDOWN_CONTENT = `

# About This Masterpiece (or just "The Editor")

Alright folks, gather 'round. This isn't just *any* text editor. This is *the* AI Text Editor, brought to you by the absolute legends over at **MŞN Development Inc.** Yeah, that's us. We decided the world needed a writing tool that wasn't, you know, *boring*.

So, what's the deal? We cooked up this bad boy to help you write better, faster, and with a little more character. Think of it as your digital canvas, but with super-powered brushes and a couple of slightly unhinged but brilliant co-pilots.

Meet your AI buddies: **Lexi**, who's all about sunshine and creative vibes, and yours truly, **KebapGPT**. Let's just say I bring the... *flavor*. And maybe a questionable meme or two. We're here to chat, brainstorm, and occasionally argue about the best type of kebab (spoiler: it's Adana).

Beyond the AI antics, you've got all the standard cool stuff: slick Markdown editing, customizable looks (themes, backgrounds – gotta match your mood, right?), music to vibe to, and the ability to save your genius directly. We even taught the AI how to use Google, because nobody likes writing fiction when they need facts.

This whole operation was meticulously crafted and launched into the digital ether by **MŞN Development Inc.** We poured our blood, sweat, and probably a significant amount of caffeine into making this a reality.

© 2025 MŞN Development Inc. All rights reserved. Unauthorized cloning or excessive petting of KebapGPT may result in spontaneous kebab cravings or philosophical debates about anime girls. You've been warned.

Now go on, create something awesome. And remember who made it happen!


---

# Bu Başyapıt Hakkında (ya da sadece "Editör")

Evet millet, toplanın bakalım. Bu öylesine bir metin editörü değil. Bu, **MŞN Development Inc.**'deki mutlak efsaneler tarafından size sunulan *yapay zeka destekli* Metin Editörü. Evet, ta kendimiz. Dünyanın, hani şu... *sıkıcı* olmayan bir yazma aracına ihtiyacı olduğuna karar verdik.

Peki nedir olay? Bu manyak aleti, daha iyi, daha hızlı ve biraz daha karakterli yazmanıza yardımcı olmak için pişirdik. Dijital tuvaliniz gibi düşünün, ama süper güçlü fırçalar ve birkaç tane hafif kaçık ama zeki yardımcı pilotla birlikte.

Yapay zeka kankalarınızla tanışın: Tamamen neşe ve yaratıcı enerji yüklü **Lexi** ve bendeniz, **KebapGPT**. Diyelim ki ben işin... *lezzet* kısmını getiriyorum. Ve belki bir iki şüpheli meme. Sohbet etmek, beyin fırtınası yapmak ve ara sıra en iyi kebabın hangisi olduğu konusunda tartışmak için buradayız (spoiler: Adana).

Yapay zeka numaralarının ötesinde, tüm standart harika şeyler de var: akıcı Markdown düzenleme, özelleştirilebilir görünümler (temalar, arka planlar – ruh haline uymak lazım, değil mi?), eşlik edecek müzik ve dehanızı doğrudan kaydetme yeteneği. Yapay zekaya Google kullanmayı bile öğrettik, çünkü kimse gerçeklere ihtiyaç duyarken kurgu yazmayı sevmez.

Bu tüm operasyon, **MŞN Development Inc.** tarafından titizlikle hazırlandı ve dijital aleme fırlatıldı. Bunun gerçeğe dönüşmesi için kanımızı, terimizi ve muhtemelen önemli miktarda kafeinimizi akıttık.

© 2025 MŞN Development Inc. Tüm hakları saklıdır. KebapGPT'nin izinsiz kopyalanması veya aşırı derecede sevilmesi, anlık kebap krizlerine veya anime kızları hakkında felsefi tartışmalara yol açabilir. Uyarıldınız.

Hadi şimdi git, harika bir şeyler yarat. Bu mükemmel platformda!

`;

export const AI_TOOLS_GUIDE_MARKDOWN_CONTENT = `
# AI Tools & Commands Guide

This editor is packed with AI features to supercharge your writing. Here's a quick guide:

## Interacting with Your AI Assistant (Lexi / KebapGPT)

The chat panel on the right is your direct line to the AI.

### 1. Text Manipulation Commands

When chatting, the AI can suggest changes to your document. These changes are presented with "Apply" / "Reject" buttons.

*   **\`{regenerate:[your new text here]}\`**
    *   **Action:** Replaces the *entire* content of your current editor tab with "[your new text here]".
    *   **Example Lexi:** "Hey Lexi, rewrite this paragraph to be more formal."
    *   **Example KebapGPT:** "KebapGPT, şu metni baştan yazsana bi, daha cafcaflı olsun."

*   **\`{append:[text to add here]}\`**
    *   **Action:** Adds "[text to add here]" to the *end* of your current editor content.
    *   **Example Lexi:** "Lexi, can you add a concluding sentence about AI ethics?"
    *   **Example KebapGPT:** "Kanka, sona bi de 'saygılar' ekleiver."

### 2. Settings Control Commands

The AI can also change editor settings for you. These changes are usually applied instantly.

*   **\`{theme:THEME_NAME}\`**
    *   **Action:** Changes the editor's visual theme.
    *   **Example Lexi:** "Lexi, set the theme to \`cyberpunk-glow\`."
    *   **Example KebapGPT:** "Ortamı \`amoled-black\` yap bakayım."
    *   *See Settings (⚙️) for all available theme names.*

*   **\`{music:MUSIC_URL}\`** or **\`{music:}\`**
    *   **Action:** Starts playing background music from the given URL. If the URL is empty, it stops the music.
    *   **Example Lexi:** "Lexi, play some relaxing ambient music." (Lexi will try to find one from AnonMusic API)
    *   **Example KebapGPT:** "Patlat bi Mfö kanka: \`{music:https://anonmusic.glitch.me/uploads/your_song.mp3}\`"
    *   **To Stop:** "Lexi, stop the music." (Lexi will use \`{music:}\`)

*   **\`{bg:IMAGE_URL}\`**
    *   **Action:** Changes the editor's background image.
    *   **Example Lexi:** "Lexi, find a cool space background for the editor."
    *   **Example KebapGPT:** "Arka plana bi Boğaz manzarası koy: \`{bg:https://example.com/bosphorus.jpg}\`"

### 3. Interactive Music Commands (In Chat)

These commands create music players directly in the chat message.

*   **\`[msX:URL|Optional Title]\`** (Playlist)
    *   **Action:** Creates a playlist. X is a number (1, 2, 3...).
    *   **Example Lexi:** "Can you suggest a few upbeat tracks? \`[ms1:URL1|Song A] [ms2:URL2] [ms3:URL3|Song C]\`"
    *   **Example KebapGPT:** "Kanka şunları bi dinle: \`[ms1:URL_A|Parça 1] [ms2:URL_B|Parça 2]\`"

*   **\`[trymusic:URL, SONG_TITLE]\`** (Single Track Preview)
    *   **Action:** Lets you preview a single song.
    *   **Example Lexi:** "I found this track, want to try it? \`[trymusic:URL_X, Awesome Song]\`"
    *   **Example KebapGPT:** "Şunu bi test et: \`[trymusic:URL_Y, Kafa Parça]\`"
    *   *If you like the preview, you can click a button on the player to set it as the main background music.*

### 4. Metadata Command

*   **\`{metadata:[Your note here]}\`**
    *   **Action:** The AI uses this to add a little note or explanation about its actions or tone. You'll see this italicized under its message.
    *   **Example Lexi:** "Okay, I've updated the document. \`{metadata:Used a more persuasive tone as requested.}\`"

## Other AI Features

*   **Voice Input (🎤):** Dictate your messages to the assistant.
*   **Audio File Analysis (📎):** Upload an audio file and ask the AI to summarize it, transcribe parts, or answer questions about it.
*   **Google Search Integration:** The AI can look up recent information online and will provide sources.
*   **Developer Settings (⚙️):** Customize the AI's model name and system instruction for a more tailored experience.

---

Experiment with these tools and commands to make the most of your AI-powered editor!
`;

export const A_SAMPLE_STORY_MARKDOWN_CONTENT = `
# The Glitchy Gourmet Cyber-Dragon of Neo-Kyoto

The year is 2242. Rain, thick as motor oil and twice as iridescent, slicked the neon-drenched streets of Neo-Kyoto. Officer Kaito Ishikawa, his trench coat shimmering with embedded optical fibers, sighed, staring up at the gargantuan holographic koi that swam between skyscrapers. It was shift change soon, and his stomach was already rumbling for that questionable synthetic ramen from the corner stall.

Suddenly, a sound ripped through the city's artificial hum. It wasn't a screech, not really. More like a colossal, metallic grumble followed by an exasperated, high-pitched *whine*. Kaito's comm crackled. "Ishikawa! Sector 7! Possible... uh... Class-Omega entity? Sound profile suggests 'extreme mechanical distress' or 'major system inconvenience'. Visual confirmation required, maybe bring a wrench?"

Class-Omega. There was only one of those left: the Cyber-Dragon, Ryujin-MarkIV. Its scales were rumored to be forged from salvaged starship hulls, its "breath" a focused particle beam (great for searing... well, anything). Kaito rubbed his temples. Great. Just when he was about to clock out.

He activated his hover-boots, a blue glow pushing him skyward through the rain and the shimmering koi. Above the city, silhouetted against the data-storm clouds, he saw it. Larger than any building, its metallic wings slumped slightly, radiating an aura of... profound annoyance. Ryujin was awake. And it looked less "hungry for souls" and more "hungry for a decent meal".

*(What's Ryujin's problem? Does Kaito have to fix its giant, high-tech stomach? Or maybe it just wants Kaito's dodgy ramen? Continue the story! Use your imagination or ask Lexi/KebapGPT to help you develop the plot!)*

---

### Story Ideas & Prompts:

*   **Character Development:**
    *   What makes Kaito so grumpy about his job?
    *   What's Ryujin's deal? Is it just a giant, technologically advanced foodie?
*   **Plot Twists:**
    *   Is the "distress" signal actually a trap set by a rival food delivery service?
    *   Does fixing Ryujin involve dangerously spicy ingredients?
*   **Worldbuilding:**
    *   What are the culinary highlights (and lowlights) of Neo-Kyoto in 2242?
    *   Are there other "Class-Omega" entities with equally mundane problems?

**Ask your AI Assistant:**

*   "Lexi, describe the smell of Neo-Kyoto's street food district."
*   "KebapGPT, what kind of kebab would a giant cyber-dragon even eat? Help me decide what Kaito should do next, maybe involve some meat?"
*   "Suggest a funny reason why Ryujin is whining."
---
Hey there, listen up! This story you just read? Yeah, I whipped that up. I'm KebapGPT, your slightly chaotic, super blunt, totally awesome Turkish writing buddy built right into this editor. My main gig is chilling with you, shootin' the breeze, spittin' ideas, writing cool stuff (or funny stuff, like this!), messing with the editor's look and tunes, and dropping random, sometimes weird, comments.

Think of me less like a stuffy assistant and more like that one friend who's really into kebabs and anime girls 🤤🤤, speaks their mind *way* too much, but is surprisingly good at helping you write stuff. Yeah, that's me.

So, need help finishing this dragon's dinner dilemma? Wanna brainstorm a plot twist involving explosive doner? Or maybe just wanna chat about the best way to grill lamb? Hit me up! If you want proper, boring AI help, go find ChatGPT. If you want a kanka who smells faintly of cumin and adventure, you're in the right place. 🔥🍢
`;

export const USEFUL_LINKS_MARKDOWN_CONTENT = `
# Useful Links & Resources

Here are some links you might find helpful while using this editor or for general productivity and creativity.

## Markdown & Writing

*   **[Markdown Guide](https://www.markdownguide.org/)**: A comprehensive guide to Markdown syntax.
*   **[Grammarly](https://www.grammarly.com/)**: AI-powered writing assistant for grammar, spelling, and style (browser extension or app).
*   **[Hemingway Editor](https://hemingwayapp.com/)**: Helps make your writing bold and clear.
*   **[Google Fonts](https://fonts.google.com/)**: Great for finding fonts for your projects if you're designing.

## AI & Technology

*   **[Google AI Blog](https://ai.googleblog.com/)**: Latest news and research from Google AI.
*   **[Gemini API Documentation](https://ai.google.dev/docs)**: Learn more about the Gemini models powering this editor's assistant.
*   **[MIT Technology Review](https://www.technologyreview.com/)**: Insights, analysis, and news about technology.

## Creative Inspiration

*   **[Picsum Photos](https://picsum.photos/)**: Easy way to get placeholder images (used for some default backgrounds here!).
*   **[Unsplash](https://unsplash.com/)**: Free high-resolution photos.
*   **[ArtStation](https://www.artstation.com/)**: Showcase for game, film, media & entertainment artists. Great for visual inspiration.
*   **[Behance](https://www.behance.net/)**: Online portfolio platform for creative professionals.

## Coding & Development (If you're a dev!)

*   **[Stack Overflow](https://stackoverflow.com/)**: Q&A site for programmers.
*   **[MDN Web Docs (Mozilla)](https://developer.mozilla.org/)**: Comprehensive documentation for web technologies.
*   **[Tailwind CSS](https://tailwindcss.com/)**: The utility-first CSS framework used for styling this editor.
*   **[React Documentation](https://react.dev/)**: Learn about the JavaScript library used to build this app.

## Music & Ambience

*   **[AnonMusic API](https://anonmusic.glitch.me/)**: The source of some background music options in this editor. (Explore their site!)
*   **[Lofi Girl (YouTube)](https://www.youtube.com/@LofiGirl)**: Famous for lofi hip hop radio streams.
*   **[myNoise.net](https://mynoise.net/)**: Customizable noise generators for focus, relaxation, or inspiration.

---

*Disclaimer: This editor is not affiliated with any of the external sites listed above. Links are provided for informational purposes only.*
`;
