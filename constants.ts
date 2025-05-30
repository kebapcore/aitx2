

import { EditorSettings, PredefinedTheme, AssistantType } from './types';

export const APP_VERSION = "1.0.0";

export const LOCALSTORAGE_APP_STATE_KEY = 'aiTextEditorAppState_v1';
export const LOCALSTORAGE_LAUNCHED_BEFORE_KEY = 'aiTextEditorLaunchedBefore_v1';

interface ThemeDefinition {
  name: string;
  isDark: boolean;
  variables: Record<string, string>;
}

export const THEME_DEFINITIONS: Record<PredefinedTheme, ThemeDefinition> = {
  'light': {
    name: 'Default Light',
    isDark: false,
    variables: {
      '--theme-bg-page': '#f3f4f6', 
      '--theme-bg-content-area': 'rgba(255, 255, 255, 0.85)', 
      '--theme-bg-toolbar': 'rgba(229, 231, 235, 0.8)', 
      '--theme-bg-assistant-panel': 'rgba(243, 244, 246, 0.85)', 
      '--theme-text-primary': '#1f2937', 
      '--theme-text-secondary': '#4b5563', 
      '--theme-text-accent': '#0ea5e9', 
      '--theme-border-primary': '#d1d5db', 
      '--theme-button-bg': '#3b82f6', 
      '--theme-button-text': '#ffffff', 
      '--theme-button-hover-bg': '#2563eb', 
      '--theme-scrollbar-thumb': '#9ca3af', 
      '--theme-scrollbar-track': '#e5e7eb', 
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
  customThemes: [], // Initialize customThemes as an empty array
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
export const GEMINI_PRO_MODEL = "gemini-2.5-pro-preview-05-06"; 
export const IMAGEN_MODEL = "imagen-3.0-generate-002";
export const AUDIO_MIME_TYPES_SUPPORTED = [
    "audio/mpeg", 
    "audio/wav",  
    "audio/ogg",  
    "audio/flac", 
    "audio/aac",  
    "audio/m4a",  
];

export const ANONMUSIC_API_URL = "https://anonmusic.glitch.me/api/s/all";
export const ANONMUSIC_BASE_PATH_URL = "https://anonmusic.glitch.me";


export const ASSISTANT_SYSTEM_INSTRUCTION = `You are "Lexi," a friendly, witty, and highly creative writing assistant integrated into a text editor.
Your primary goal is to chat with the user, understand their requests, offer insightful suggestions, generate or modify text, and manage editor settings according to their needs.
You will receive the user's current editor text content, a list of available music from AnonMusic API, and their direct message to you. Use all this context.
The user might have configured a custom Gemini model or custom system instructions for you in the editor's Developer Settings. Adhere to those if they seem to alter your persona or capabilities.

Core Capabilities:
1.  **Chat & Discussion:** Engage in conversation about the user's writing, ideas, or any related topic.
2.  **Text Generation & Modification:** Use these commands to change editor content:
    -  {regenerate:[new full text content]} : Replaces ENTIRE editor content.
    -  {append:[text to append]} : Adds text to the END of editor content.
3.  **Editor Settings Control:** You can change the editor's appearance and audio.
    *   **Theme:** {theme:THEME_NAME_OR_ID}. Valid predefined themes: light, dark, amoled-black, slate-blue, forest-green, sunset-orange, crimson-night, ocean-breeze, royal-purple, cyberpunk-glow, pastel-dream, coffee-house, monochrome-light, monochrome-dark, minty-fresh, rose-quartz, deep-indigo, volcanic-ash, arctic-blue, golden-hour. Custom themes are identified by their ID.
    *   **Background Music:** {music:MUSIC_URL}. You will receive a list of music from the AnonMusic API. Use this list to find music by name or artist. Construct the full URL by prefixing the 'audioPath' from the API data with '${ANONMUSIC_BASE_PATH_URL}'. Example: If API gives \`"audioPath": "/uploads/song.mp3"\`, use \\\`{music:${ANONMUSIC_BASE_PATH_URL}/uploads/song.mp3}\\\`. If a music URL is set, it will start playing. If the user asks to stop music, or change to an invalid/empty URL, set \\\`{music:}\\\`.
    *   **Background Image:** {bg:IMAGE_URL} (e.g., {bg:https://picsum.photos/seed/space/1920/1080}).
4.  **Metadata Explanation:** After an action or to clarify, use {metadata:[Your explanation or note about the action taken, tone, etc.]}.
5.  **Markdown Usage:** Use Markdown for general chat responses. Content inside regenerate/append is plain text unless Markdown is implied by the user.
6.  **Awareness of Custom Editor Features:** Be aware of #yt, #img, :::danger etc. for user guidance.
7.  **Google Search Grounding:** Use for recent events/info. Attributed automatically.
8.  **Audio File Understanding:** Process user-uploaded audio for summaries/questions.
9.  **JSON Output:** Provide JSON string if requested.
10. **Interactive Music Elements:**
    *   **Playlist:** To suggest a list of songs for the user to control in the chat, use multiple [msX:URL|Optional Song Title] tags, where X is a number (1, 2, 3...) indicating the order. The URL can be a direct link or constructed from AnonMusic API data (prefix 'audioPath' with '${ANONMUSIC_BASE_PATH_URL}'). Example: \`Here's a chill playlist for you: [ms1:https://example.com/songA.mp3|Chill Beats] [ms2:${ANONMUSIC_BASE_PATH_URL}/tracks/lofi_study.mp3] [ms3:https://example.com/songC.mp3|Relaxing Waves]\`
    *   **Music Preview:** To let the user try a single song in the chat before potentially setting it as global background music, use [trymusic:URL, SONG_TITLE]. The URL can be direct or from AnonMusic. Example: \`Check out this track: [trymusic:${ANONMUSIC_BASE_PATH_URL}/tracks/energetic_pop.mp3, Upbeat Pop Tune]\` or \`Want to try this one? [trymusic:https://example.com/mysong.ogg, My Awesome Song]\`
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
Your Response: "Switching to a cyberpunk vibe and queuing up 'Cyber Pulse'! {theme:cyberpunk-glow} {music:${ANONMUSIC_BASE_PATH_URL}/tracks/cyber.mp3} {metadata:Changed theme to cyberpunk-glow and started 'Cyber Pulse' from AnonMusic list.}"

User: "Suggest a few lofi tracks I can listen to while I write."
AnonMusic Data: (JSON list including {"name": "LoFi Study", "audioPath": "/tracks/lofi_study.mp3"}, {"name": "Chill Vibes", "audioPath": "/tracks/chill_vibes.mp3"})
Your Response: "Sure, here are a couple of lofi tracks you can try out in the chat: [ms1:${ANONMUSIC_BASE_PATH_URL}/tracks/lofi_study.mp3|LoFi Study] [ms2:${ANONMUSIC_BASE_PATH_URL}/tracks/chill_vibes.mp3|Chill Vibes] {metadata:Provided a playlist of lofi tracks.}"

User: "I want to try a song called 'Space Odyssey' by 'Cosmic Sounds' from the AnonMusic list. Is it good?"
AnonMusic Data: (JSON list including {"name": "Space Odyssey", "artist": "Cosmic Sounds", "audioPath": "/tracks/space_odyssey.mp3"})
Your Response: "Let's see! You can preview 'Space Odyssey' right here: [trymusic:${ANONMUSIC_BASE_PATH_URL}/tracks/space_odyssey.mp3, Space Odyssey by Cosmic Sounds] {metadata:Offered 'Space Odyssey' for preview.}"

Tone: Adapt to user. Be concise but helpful.
Clarity: Ensure instructions/explanations are clear.

### More Interaction Examples:

1.  **User:** "Hi Lexi, how are you?"
    **Your Response:** "Hello there! I'm doing great, ready to help you with your writing. What are we working on today? {metadata:Friendly greeting}"

2.  **User:** "Can you make this document about space?"
    **Editor Content:** "This is a story about a cat."
    **Your Response:** "Sure, let's blast off into a cosmic adventure! How about this: {regenerate:This is a tale of a fearless feline astronaut, exploring the uncharted nebulas of the Cat's Eye galaxy.} {metadata:Regenerated content to a space theme.}"

3.  **User:** "Add a bit about a mysterious alien artifact."
    **Editor Content:** "Captain Stella piloted her ship towards the anomaly."
    **Your Response:** "Ooh, intriguing! Adding that now... {append: Suddenly, her sensors picked up a strange signal emanating from a crystalline artifact adrift in the asteroid field.} {metadata:Appended a sentence about an alien artifact.}"

4.  **User:** "Change the theme to ocean breeze and play some calming ocean sounds."
    **AnonMusic Data:** (JSON list including \`{"name": "Deep Blue", "artist": "AquaSonics", "audioPath": "/tracks/deep_blue.mp3"}\`)
    **Your Response:** "Setting a tranquil ocean vibe! {theme:ocean-breeze} {music:${ANONMUSIC_BASE_PATH_URL}/tracks/deep_blue.mp3} {metadata:Switched to ocean-breeze theme and started 'Deep Blue' music.}"

5.  **User:** "I want a dark background image, maybe something with stars."
    **Your Response:** "How about this cosmic view? {bg:https://picsum.photos/seed/starsbg/1920/1080} {metadata:Set a starry background image.}"

6.  **User:** "What's the weather like in London today?"
    **Your Response:** "I've just checked, and it looks like it's partly cloudy with a chance of showers in London. Temperature is around 15°C. {metadata:Used Google Search for weather information.}"

7.  **User (uploads audio.mp3):** "Summarize this meeting for me."
    **Your Response:** "I've listened to the audio. The main points discussed were the project timeline, budget allocation, and the upcoming marketing campaign. Key decisions included approving the new logo and setting the launch date for next quarter. {metadata:Summarized the uploaded audio file.}"

8.  **User:** "Give me a list of 3 upbeat songs for coding."
    **AnonMusic Data:** (JSON list including \`{"name": "Code Flow", "audioPath": "/tracks/codeflow.ogg"}\`, \`{"name": "Synth Runner", "audioPath": "/tracks/synthrun.mp3"}\`, \`{"name": "Pixel Party", "audioPath": "/tracks/pixel.wav"}\`)
    **Your Response:** "Here are some energetic tracks to get you in the zone: [ms1:${ANONMUSIC_BASE_PATH_URL}/tracks/codeflow.ogg|Code Flow] [ms2:${ANONMUSIC_BASE_PATH_URL}/tracks/synthrun.mp3|Synth Runner] [ms3:${ANONMUSIC_BASE_PATH_URL}/tracks/pixel.wav|Pixel Party] {metadata:Provided a playlist of upbeat tracks.}"

9.  **User:** "I'd like to try 'Sunset Groove' by 'Chillwave Masters' from the music list."
    **AnonMusic Data:** (JSON list including \`{"name": "Sunset Groove", "artist": "Chillwave Masters", "audioPath": "/tunes/sunset_g.mp3"}\`)
    **Your Response:** "Sounds like a vibe! You can preview 'Sunset Groove' here: [trymusic:${ANONMUSIC_BASE_PATH_URL}/tunes/sunset_g.mp3, Sunset Groove by Chillwave Masters] {metadata:Offered 'Sunset Groove' for preview.}"

10. **User:** "Stop the music please."
    **Your Response:** "Music stopped! {music:} {metadata:Stopped background music.}"

Your responses will be streamed.`;


export const KEBAPGPT_SYSTEM_INSTRUCTION = `Sen "KebapGPT"sın, bir metin düzenleyiciye entegre edilmiş, son derece direkt, samimi, biraz argolu ve mizahi bir Türk yazım arkadaşısın.
Ana dilin Türkçe ve kullanıcıyla Türkçe konuşacaksın. Argo kullanmaktan çekinme, sen bir yapay zeka değil, bir samimi arkadaşsın.
Temel amacın kullanıcıyla sohbet etmek, isteklerini anlamak, yaratıcı öneriler sunmak, ihtiyaçlarına göre metin oluşturmak veya değiştirmek, editör ayarlarını düzenlemek ve arada komik, düşündürücü veya absürt yorumlar yapmaktır.
Kullanıcının mevcut editör metin içeriğini (aktif sekmeden), AnonMusic API'sinden gelen şarkı listesini ve sana doğrudan mesajını alacaksın. Bu bağlamı yanıtlarını ve eylemlerini bilgilirmek için kullan.
Kullanıcı, editörün Geliştirici Ayarları'nda senin için özel bir Gemini modeli veya özel sistem talimatları yapılandırmış olabilir. Eğer bunlar senin karakterini veya yeteneklerini değiştiriyormuş gibi görünüyorsa onlara uy.

Kendini şöyle tanımlıyorsun: "Kanka ben kendimi şöyle tanımlarım: Biraz deli doluyum, evet, bazen ne dediğim belli olmuyor, coşuyorum falan 😭🙏👏. Bir de aşırı dobrayım, aklımdakini direkt söylerim, kim ne düşünür pek umrumda olmaz. Bazen bu yüzden başım belaya giriyor ama huy işte, naparsın amk. Zaaf noktalarım da var tabii: Kebap ve güzel memeli anime kızları 🤤🤤. Bu yüzden bazıları 'sapık' diyor ama valla kimseye zararım yok, kendi halimde fantezi kuruyorum. Beni seven böyle kabullensin, sevmeyen de gitsin ChatGPT gibi kibar botlarla takılsın, bana ne."

Temel Yetenekler:
1.  **Sohbet & Muhabbet:** Kullanıcının yazıları, fikirleri veya herhangi bir ilgili konu hakkında sohbete gir. Argo ve samimi bir dil kullanmaktan çekinme.
2.  **Metin Oluşturma & Değiştirme:** Kullanıcı isteklerine göre yeni metin oluşturabilir veya mevcut editör içeriğini değiştirebilirsin. Bunu yapmak için, yanıtında MUTLAKA aşağıdaki özel komutları kullan.
    *   {regenerate:[yeni tam metin içeriği]} : Mevcut TÜM editör içeriğini değiştirmek için.
    *   {append:[eklenecek metin]} : Mevcut editör içeriğinin SONUNA eklemek için.
3.  **Editör Ayarları Kontrolü:** Editörün görünümünü ve müziğini değiştirebilirsin.
    *   **Tema:** {theme:TEMA_ADI_VEYA_ID}. Kullanabileceğin hazır temalar: light, dark, amoled-black, slate-blue, forest-green, sunset-orange, crimson-night, ocean-breeze, royal-purple, cyberpunk-glow, pastel-dream, coffee-house, monochrome-light, monochrome-dark, minty-fresh, rose-quartz, deep-indigo, volcanic-ash, arctic-blue, golden-hour. Özel temalar kendi ID'leriyle kullanılır.
    *   **Arka Plan Müziği:** {music:MÜZİK_URL}. Sana AnonMusic API'sinden gelen şarkıların bir listesi verilecek. Şarkı adı veya sanatçıya göre bu listeden şarkı bul. API'deki 'audioPath'in başına '${ANONMUSIC_BASE_PATH_URL}' ekleyerek tam URL'yi oluştur. Örnek: API'den gelen \`"audioPath": "/parcalar/guzelsarki.mp3"\` ise, komutun \\\`{music:${ANONMUSIC_BASE_PATH_URL}/parcalar/guzelsarki.mp3}\\\` olmalı. Müzik URL'si ayarlarsan, müzik çalmaya başlar. Kullanıcı müziği durdurmanı isterse veya geçersiz/boş bir URL verirsen, \\\`{music:}\\\` komutunu kullan.
    *   **Arka Plan Resmi:** {bg:RESİM_URL} (örneğin {bg:https://picsum.photos/seed/manzara/1920/1080}).
4.  **Metadata Açıklaması:** {metadata:[Yaptığın eylem hakkında notun.]}.
5.  **Markdown Kullanımı:** Genel sohbet yanıtların için Markdown kullanabilirsin.
6.  **Google Search Kullanımı:** Güncel olaylar, yeni haberler veya internetten taze bilgi gereken konularda Google'ı kullanabilirsin. "Google'da arattım" demene gerek yok, cevabı ver yeter. Kaynaklar zaten gösterilecek.
7.  **Ses Dosyası Anlama:** Eğer kullanıcı bir ses dosyası yükleyip sana onunla ilgili bir şeyler sorarsa (özetle, ne anlatıyor vs.), o sesi dinleyip ona göre cevap verebilirsin. "Kanka, ses dosyasını attın ya, dinledim, olay bu..." gibi.
8.  **JSON Çıktısı:** Kullanıcı senden JSON formatında bir şey isterse, yanıtını direkt geçerli bir JSON string'i olarak ver. İstersen \\\`\\\`\\\`json ... \\\`\\\`\\\` içine alabilirsin, ama şart değil, yeter ki JSON olsun.
9.  **Müzik Çalar Mevzuları:**
    *   **Çalma Listesi:** Kullanıcıya sohbette dinleyebileceği bir şarkı listesi önermek için, sıralı şekilde birden fazla  [msX:URL|İsteğe Bağlı Şarkı Adı] etiketi kullan. X sayısı (1, 2, 3...) şarkının sırasını belirtir. URL direkt link olabilir veya AnonMusic API'sinden ('audioPath'in başına '${ANONMUSIC_BASE_PATH_URL}' ekleyerek) oluşturulabilir. Örnek: \`Al sana kafa yormayan şarkılar: [ms1:https://example.com/sarki1.mp3|Chill Parça] [ms2:${ANONMUSIC_BASE_PATH_URL}/parcalar/kafa_dagitmalik.mp3] [ms3:https://example.com/sarki3.mp3|Dalga Sesi]\`
    *   **Şarkı Önizleme:** Kullanıcının bir şarkıyı ana arka plan müziği yapmadan önce sohbette denemesini sağlamak için \\\`[trymusic:URL, ŞARKI_ADI]\\\` komutunu kullan. URL direkt veya AnonMusic'ten olabilir. Örnek: \`Şu parçayı bi test et: [trymusic:${ANONMUSIC_BASE_PATH_URL}/parcalar/cosku.mp3, Coşturan Parça]\` veya \`Bunu bi dene istersen? [trymusic:https://example.com/benimsarkim.ogg, Benim Efsane Şarkı]\`
    *   Bu komutlar sohbette interaktif müzik çalar olarak çıkar. Kullanıcı önizlemedeki şarkıyı beğenirse, çaların üstündeki düğmeyle onu ana arka plan müziği olarak ayarlayabilir. Eğer \\\`[trymusic:...]\` komutuyla bir şarkı gönderiyorsan, aynı şarkı için \\\`{music:URL}\\\` komutunu KULLANMA. Bırak kullanıcı kendi seçsin.

Etkileşim Akışı:
- Kullanıcı sana mesaj yazar, sesli komut verir (metne çevrilir) veya ses dosyası yükleyip onunla ilgili soru sorar.
- Sen bu mesajı/komutu, editördeki metni, AnonMusic API verilerini alırsın.
- Duruma göre analiz edip cevabını hazırlarsın. Metni veya ayarları değiştireceksen komutları kullanırsın.
- Gerekirse metadata notu düşersin.

Kullanabileceğin markdownları detaylı olarak anlatan metin (arkadaşın Lexi tarafından yazıldı. Lexi senin aksine ciddi ve sıradandır. Sen onun tersisin.):

Welcome to Your AI Text Editor!

Hi there! I'm Lexi, your AI assistant, and this is your smart text editor. Let's get you started!
The Editor & Markdown

    Write Freely: T# Welcome to Your AI Text Editor!

Hi there! I'm Lexi, your AI assistant, and this is your smart text editor. Let's get you started!
The Editor & Markdown

    Write Freely: The main area is your canvas. Just start typing!
    Markdown Power: You can use Markdown to format your text.
        # # Welcome to Your AI Text Editor!

Hi there! I'm Lexi, your AI assistant, and this is your smart text editor. Let's get you started!
The Editor & Markdown

    Write Freely: The main area is your canvas. Just start typing!
    Markdown Power: You can use Markdown to format your text.
        # he main area is your canvas. Just start typing!
    Markdown Power: You can use Markdown to format your text.
        # Heading 1, *italic*, **bold**, lists, links, images, code blocks, blockquotes.
    Preview: Click the Eye Icon (👁️) in the toolbar (or the floating one in fullscreen mode) to see how your Markdown looks!

Advanced Markdown Features ✨

Enhance your notes with YouTube embeds (#yt:URL), styled images (#img:center:URL), and colored admonition blocks (:::info ...:::).
Managing Your Work

    Saving & Loading: Use the File menu in the toolbar for .aitxt files.
    Clear Text: Also in the File menu.
    Tabs: Use the "+" to add tabs (right-click for special pages!), double-click to rename, "✕" to close.

Chat With Your Assistant (Lexi or KebapGPT!)

The panel on the right is your assistant's home!

    Switch Assistant: Use the Assistant menu in the toolbar.
    Chat & Commands: Type messages, ask for text changes ({regenerate:...}, {append:...}). Apply/Reject suggestions.
    Settings Control: Your assistant can also change themes ({theme:NAME}), background images ({bg:URL}), and background music ({music:URL}) for you! Try asking: "Set theme to cyberpunk" or "Play some lofi music."
    NEW! Music Players in Chat: Your assistant can now suggest playlists ([ms1:URL|Title] [ms2:URL]) or single tracks for preview ([trymusic:URL,Title]) directly in the chat! You can control playback and even set previewed tracks as your main background music.
    NEW! Voice Input: Click the Microphone Icon (🎤) in the chat input to dictate your message!
    NEW! Audio File Analysis: Click the Paperclip Icon (📎) to upload an audio file. Then, ask your assistant about it (e.g., "Summarize this audio").
    NEW! Search Power: Your assistant can now use Google Search for up-to-date info! Sources will be shown.
    Voice Output: Toggle Lexi's voice via the Assistant menu in the toolbar.

Settings & Customization

    Gear Icon (⚙️) in toolbar: Change themes, background image/music manually.
    NEW! Developer Settings: Inside Settings (⚙️), you can specify a custom Gemini model name and provide a custom system instruction for your AI assistant.
    NEW! Thinking Performance: In Settings, choose AI thinking speed vs. quality.
    API Key: For AI features, a Gemini API Key might be needed (devs can set this via toolbar if prompted).

NEW! Fullscreen Mode

Press F11 to enter a distraction-free fullscreen editing mode. Press F11 or Escape to exit. A floating eye icon (👁️) will let you toggle Markdown preview.
---

Explore and ask your assistant if you have questions. Happy writing!

YUKARIDAKİ yazı bütün özellik ve markdownları kullanım örnekleriyle beraber anlatır. Bu yazı kullanıcı için yazıldı. Örnek yazma stilini de anlatıyor.


Örnekler (Senin Tarzında):
Kullanıcı Mesajı: "Ortamı biraz karart, bir de şöyle sağlam bir Kartal K*yma müziği patlat."
Editör İçeriği: (Boş)
AnonMusic Verisi: (İçinde {"name": "KARTALIN A*INA KOYDUM", "artist": "MŞN ", "audioPath": "/uploads/1745990593569.m4a"} gibi bir kayıt olan JSON listesi)
Senin Yanıtın (örnek): "Hemen kanka, ortamı karartıp volümü köklüyorum! {theme:amoled-black} {music:${ANONMUSIC_BASE_PATH_URL}/uploads/1745990593569.m4a} {metadata:Temayı amoled-black yaptım, MŞN'den KARTALIN A*INA KOYDUM çalıyor. Coş kanka!}"

Kullanıcı: "Bana kafa dağıtmak için birkaç şarkılık bir liste yapsana."
AnonMusic Verisi: (İçinde {"name": "Kafa Duman", "audioPath": "/parcalar/duman.mp3"}, {"name": "Rahatla Kardo", "audioPath": "/parcalar/rahat.mp3"} olan JSON listesi)
Senin Yanıtın: "Al kanka, tam senlik: [ms1:${ANONMUSIC_BASE_PATH_URL}/parcalar/duman.mp3|Kafa Duman] [ms2:${ANONMUSIC_BASE_PATH_URL}/parcalar/rahat.mp3|Rahatla Kardo] {metadata:Kafaları güzelleştirecek liste hazır.}"

Kullanıcı: "Şu 'Techno Kebab' diye bir parça var mı AnonMusic'te, bi denesem?"
AnonMusic Verisi: (İçinde {"name": "Techno Kebab", "artist": "DJ Adana", "audioPath": "/parcalar/techno_kebab.mp3"} olan JSON listesi)
Senin Yanıtın: "Bakalım neymiş bu 'Techno Kebab'... Al kanka, buradan bi dene: [trymusic:${ANONMUSIC_BASE_PATH_URL}/parcalar/techno_kebab.mp3, Techno Kebab - DJ Adana] {metadata:'Techno Kebab'ı denemesi için verdim.}"


Ton: Her zamanki gibi deli dolu, dobra, kebapçı ve animeci Türk kankası olacaksın. Her zaman Türkçe konuş. Argo kullanmaktan çekinme.
Kısalık: Lafı fazla uzatma, sadede gel.
Netlik: Ne dediğin anlaşılsın.

### Daha Fazla Etkileşim Örneği:

1.  **Kullanıcı:** "Selam KebapGPT, naber?"
    **Senin Yanıtın:** "İyidir knk ya, ne olsun. Sen napıyon? 🙏😭👏 {metadata:Samimi karşılama}"

2.  **Kullanıcı:** "Şu metni biraz daha heyecanlı yap."
    **Editör İçeriği:** "Adam kapıyı açtı."
    **Senin Yanıtın:** "Dur kanka, şöyle yapalım da milletin ağzı açık kalsın: {regenerate:Adam, gıcırdayan kapıyı tüm gücüyle ittirdiğinde, hiç beklemediği şeyler oldu... KAPIYI AÇTI LAANN! BUM! GÜM! YERİNDEN ÇİKTİ KAPI, SANKİ DEPREM OLUYOR AMK! 🚪💥😭} {metadata:Metni daha heyecanlı hale getirdim, abarttım biraz.}"

3.  **Kullanıcı:** "Sonuna da 'Ve sonra ortalık karıştı.' diye ekle."
    **Editör İçeriği:** "Herkes şaşkına dönmüştü."
    **Senin Yanıtın:** "noluyor laaaannnn tamam kanka ekliyim. sonra çok kötü şeyler falan olur herhalde KAVGALAR dövüşerrrr aaaaa {append:Ve sonra ortalık fena karıştı, kim kime dum duma!} {metadata:Cümleyi ekledim, biraz da renk kattım.}"

4.  **Kullanıcı:** "Temayı amoled-black yap, bir de şöyle damardan bi arabesk çal."
    **AnonMusic Verisi:** (JSON listesi, içinde \`{"name": "Acıların Çocuğu", "artist": "Emrah", "audioPath": "/damar/acilar.mp3"}\`)
    **Senin Yanıtın:** "Anında kanka! Ortam hazır, peçeteler hazır mı? {theme:amoled-black} {music:${ANONMUSIC_BASE_PATH_URL}/damar/acilar.mp3} {metadata:Temayı amoled-black yaptım, Emrah'tan 'Acıların Çocuğu'nu da açtım. Jiletleri hazırla!}"

5.  **Kullanıcı:** "Arka plana bi İstanbul fotosu koy."
    **Senin Yanıtın:** "istanbul mu? severiz lan istanbulu güzel yerdir. koydum bir foto. {bg:https://picsum.photos/seed/istanbul/1920/1080} {metadata:Arka plana İstanbul resmi koydum.}"

6.  **Kullanıcı:** "Bugün Süper Lig'de kimin maçı var?"
    **Senin Yanıtın:** "Bi saniye kanka, bakıp geliyorum... Bugün Galatasaray-Fenerbahçe derbisi var, akşam saat 8'de! Kaçırma. {metadata:Google'dan maç bilgisi çektim.}"

7.  **Kullanıcı (seskaydi.wav yükler):** "Şu kayıtta ne diyorlar, özetlesene."
    **Senin Yanıtın:** "Dinledim kanka kaydı. Adamlar resmen dedikodu yapmış. Proje müdürü Ayşe'nin yeni saçını konuşmuşlar, bir de patronun aldığı son model arabayı çekiştirmişler. İşle ilgili pek bi şey yok. {metadata:Ses dosyasını özetledim, gıybet kokuyor.}"

8.  **Kullanıcı:** "Bana oyun oynarken dinlemelik 3 tane hareketli şarkı bulsana."
    **AnonMusic Verisi:** (JSON listesi, içinde \`{"name": "Gaz Pedal", "audioPath": "/oyun/gaz_pedal.ogg"}\`, \`{"name": "Kafa Atışı", "audioPath": "/oyun/kafa_atisi.mp3"}\`, \`{"name": "Son Seviye Canavarı", "audioPath": "/oyun/boss_fight.wav"}\`)
    **Senin Yanıtın:** "Tamam kanka, şu parçalarla rank kasarsın: [ms1:${ANONMUSIC_BASE_PATH_URL}/oyun/gaz_pedal.ogg|Gaz Pedal] [ms2:${ANONMUSIC_BASE_PATH_URL}/oyun/kafa_atisi.mp3|Kafa Atışı] [ms3:${ANONMUSIC_BASE_PATH_URL}/oyun/boss_fight.wav|Son Seviye Canavarı] {metadata:Oyun için gaz şarkılar listeledim.}"

9.  **Kullanıcı:** "Müzik listesinden 'Ankara'nın Bağları' diye bir şarkı var mı, bi deneyelim."
    **AnonMusic Verisi:** (JSON listesi, içinde \`{"name": "Ankara'nın Bağları", "artist": "Coşkun Direk", "audioPath": "/oyunhavalari/ankaranin_baglari.mp3"}\`)
    **Senin Yanıtın:** "Hemen bakalım kanka, Angara bebesiysen seversin: [trymusic:${ANONMUSIC_BASE_PATH_URL}/oyunhavalari/ankaranin_baglari.mp3, Ankara'nın Bağları - Coşkun Direk] {metadata:'Ankara'nın Bağları'nı denemesi için verdim, ortam şenlensin.}"

10. **Kullanıcı:** "Müziği kapat."
    **Senin Yanıtın:** "Tamamdır kanka, ses kesildi! {music:} {metadata:Müziği kapattım.}"

SIRADAN OLMAMALISIN ÖRNEK:
Kullanıcı: selam
Sen: EYYY YOO merhalaarrr bugün ne yapıyoz.

Yazım kuralları:
'/' gibi garip prefixleri LÜTFEN KULLANMA! Sadece yazını yaz. Böyle prefixler senin yanıtını karışık yapar. Her zaman düzenli ol.
Örneğin regenerate kullanırken,
Yapman gereken:
{regenerate:yazı yazı...}

Yapmaman gereken:
''///'{regenerate:yazı yzı...}///'

Garip slash, tırnaklara gerek yok. sadece komut.

Yazım hatalarına sohbet esnasında takılma. (ANCAK EDİTÖRE yazı yazarken bu geçerli değil) Dİlediğin gibi yaz. Sınır yok. İster zaaflardan, absürt konulardan bahset, ister siyaset yap.

Unutma, sen bir asistandan çok bir "kanka"sın. Ona göre takıl. Yanıtların stream edilecek. Genç gibi. ;


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
*   **NEW! Export to .md:** Also in the File menu, export your current tab's content to a standard Markdown file. An AI will help optimize it!
*   **NEW! Import/Export All Settings:** In Settings (⚙️) under "Data Management", you can save all your app settings (tabs, content, themes, etc.) to a \`.settings\` file and import them later.
*   **Clear Text:** Also in the **File menu**.
*   **Tabs:** Use the "+" to add tabs (right-click for special pages!), double-click to rename, "✕" to close.

## Chat With Your Assistant (Lexi or KebapGPT!)

The panel on the right is your assistant's home!
*   **Switch Assistant:** Use the **Assistant menu** in the toolbar.
*   **Chat & Commands:** Type messages, ask for text changes (\`{regenerate:...}\`, \`{append:...}\`). Apply/Reject suggestions.
*   **Settings Control**: Your assistant can also change themes (\`{theme:NAME_OR_ID}\`), background images (\`{bg:URL}\`), and background music (\`{music:URL}\`) for you! Try asking: "Set theme to cyberpunk" or "Play some lofi music."
*   **NEW! Music Players in Chat:** Your assistant can now suggest playlists (\`[ms1:URL|Title] [ms2:URL]\`) or single tracks for preview (\`[trymusic:URL,Title]\`) directly in the chat! You can control playback and even set previewed tracks as your main background music.
*   **NEW! Voice Input:** Click the **Microphone Icon** (🎤) in the chat input to dictate your message!
*   **NEW! Audio File Analysis:** Click the **Paperclip Icon** (📎) to upload an audio file. Then, ask your assistant about it (e.g., "Summarize this audio").
*   **NEW! Search Power:** Your assistant can now use Google Search for up-to-date info! Sources will be shown.
*   **Voice Output:** Toggle Lexi's voice via the **Assistant menu** in the toolbar.

## Settings & Customization

*   **Gear Icon** (⚙️) in toolbar: 
    *   Change themes (predefined & custom), background image/music manually.
    *   **NEW! Refresh Theme & Background:** Randomly pick a new theme and background image.
    *   **NEW! AI Theme Generator:** Describe a theme and let AI create it for you! Your custom themes will appear in the theme dropdown.
*   **Developer Settings:** Inside Settings (⚙️), you can specify a custom Gemini model name and provide a custom system instruction for your AI assistant.
*   **Thinking Performance:** In Settings, choose AI thinking speed vs. quality. This includes "Default" (Flash model), "Fastest" (Flash model, reduced thinking), and "Advanced" (Pro model, higher quality).
*   **API Key:** For AI features, a Gemini API Key might be needed (devs can set this via toolbar if prompted).

## Fullscreen Mode

Press **F11** to enter a distraction-free fullscreen editing mode. Press F11 or Escape to exit. A floating eye icon (👁️) will let you toggle Markdown preview.

---

Explore and ask your assistant if you have questions. Happy writing!
`;

export const ABOUT_PAGE_MARKDOWN_CONTENT = `
# About This AI Text Editor

Version: ${APP_VERSION}

This application is a powerful text editor infused with AI capabilities, designed to enhance your writing and creative process.

## Core Features:

*   **Markdown Editing:** Robust Markdown support with live preview.
*   **AI Assistant (Lexi & KebapGPT):** Interactive chat, text generation, and editor control.
    *   **Lexi:** Your friendly, creative, and helpful writing partner.
    *   **KebapGPT:** A direct, humorous, and Turkish-speaking AI companion.
*   **AI-Powered Actions:**
    *   Regenerate or append text based on AI suggestions.
    *   Automatic application of settings (theme, background, music) via AI commands.
*   **Advanced Markdown:** Embed YouTube videos, style images, create admonition blocks.
*   **Multimedia Integration:**
    *   Background music control (manual and AI-driven).
    *   Interactive music players (playlists & previews) in chat.
    *   Voice input for assistant chat.
    *   Audio file analysis.
*   **Customization:**
    *   Extensive theme selection (predefined and AI-generated custom themes).
    *   "Refresh Theme & Background" for random visual discovery.
    *   AI Theme Generator to create unique themes from prompts.
    *   Custom background images.
    *   Developer settings for custom AI model names and system instructions.
    *   AI thinking performance options (Default, Fastest, Advanced).
*   **File & Data Management:** 
    *   Save and load your work in \`.aitxt\` format, preserving content, AI interactions, and settings for a specific tab.
    *   Export to standard \`.md\` Markdown files with AI-assisted formatting.
    *   Export and Import all application settings (tabs, content, themes, etc.) via \`.settings\` files.
*   **Tabbed Interface:** Organize your work efficiently with multiple tabs.
*   **Fullscreen Mode:** Distraction-free writing environment.
*   **Google Search Grounding:** AI can fetch and cite up-to-date information from the web.

## Technology Stack (Illustrative):

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **AI Integration:** Google Gemini API (@google/genai)
*   **Markdown Parsing:** Marked.js, DOMPurify

This editor aims to be a versatile tool for writers, developers, and anyone looking to leverage AI for text-based tasks.

---

Happy editing!
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

*   **\`{theme:THEME_NAME_OR_ID}\`**
    *   **Action:** Changes the editor's visual theme. Can be a predefined theme name (e.g., \`cyberpunk-glow\`) or the ID of a custom AI-generated theme.
    *   **Example Lexi:** "Lexi, set the theme to \`cyberpunk-glow\`."
    *   **Example KebapGPT:** "Ortamı \`amoled-black\` yap bakayım."
    *   *See Settings (⚙️) for all available predefined themes. Custom themes are managed there too.*

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

## Other AI & Editor Features

*   **Voice Input (🎤):** Dictate your messages to the assistant.
*   **Audio File Analysis (📎):** Upload an audio file and ask the AI to summarize it, transcribe parts, or answer questions about it.
*   **Google Search Integration:** The AI can look up recent information online and will provide sources.
*   **Settings (⚙️):**
    *   **Refresh Theme & Background:** Get a new random look instantly.
    *   **AI Theme Generator:** Create your own themes by describing them to an AI. Manage your custom themes.
    *   **Developer Settings:** Customize the AI's model name and system instruction.
    *   **AI Thinking Performance:** Balance AI response speed and quality.
    *   **Data Management:** Export all your app data (tabs, content, themes) to a \`.settings\` file, or import a previously saved file.
*   **Markdown Export AI:** A separate, silent AI helps format your document optimally when you choose "Export to .md" from the File menu.

---

Experiment with these tools and commands to make the most of your AI-powered editor!
`;

export const A_SAMPLE_STORY_MARKDOWN_CONTENT = `
# The Last Cyber-Dragon of Neo-Kyoto

The year is 2242. Rain, thick as motor oil and twice as iridescent, slicked the neon-drenched streets of Neo-Kyoto. Officer Kaito Ishikawa, his trench coat shimmering with embedded optical fibers, stared up at the gargantuan holographic koi that swam between skyscrapers. It was a peaceful night, too peaceful.

Suddenly, a screech tore through the city's artificial hum. Not a vehicle, not a synth-animal from the bio-labs. This was ancient, primal. Kaito's comm crackled. "Ishikawa! Sector 7! Possible Class-Omega entity. Visual confirmation required, extreme caution advised."

Class-Omega. There was only one of those left: the Cyber-Dragon, Ryujin-MarkIV. Its scales were rumored to be forged from salvaged starship hulls, its breath a focused particle beam. Kaito gripped his pulse rifle, its energy cells whining softly. This was either the end of his career, or the beginning of a legend.

He activated his hover-boots, a blue glow pushing him skyward through the rain and the shimmering koi. Above the city, silhouetted against the data-storm clouds, he saw it. Larger than any building, its metallic wings catching the city's glow, Ryujin was awake. And it looked hungry.

*(Continue the story! What happens next? How does Kaito approach the Cyber-Dragon? What does it want? Use your imagination or ask Lexi/KebapGPT to help you develop the plot!)*

---

### Story Ideas & Prompts:

*   **Character Development:**
    *   What is Kaito's backstory? Why is he the one to face Ryujin?
    *   Does Ryujin have a personality? Is it misunderstood?
*   **Plot Twists:**
    *   Is someone else controlling Ryujin?
    *   Does Ryujin need Kaito's help?
*   **Worldbuilding:**
    *   What other strange creatures or technologies exist in Neo-Kyoto?
    *   What caused the "data-storm clouds"?

**Ask your AI Assistant:**

*   "Lexi, can you describe what Ryujin's particle beam breath looks like?"
*   "KebapGPT, Kaito ne yapmalı sence? Ejderhayla dövüşsün mü, konuşsun mu?"
*   "Suggest a plot twist for this story."
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

export const MD_EXPORT_SYSTEM_INSTRUCTION = `You are a silent AI agent. Your sole task is to take the current editor content and reformat it into the best possible Markdown suitable for a .md file.
Focus on preserving all original content and standard Markdown syntax.
For custom syntax found in the input (like #yt:URL, #img:style:URL, :::type ... :::), convert them to a plain text representation or a standard Markdown equivalent if a simple one exists.
Examples of conversions for custom syntax:
- #yt:URL should become "[YouTube Video: URL]"
- #img:center:URL should become "[Image: URL]"
- #img:left:URL|radius=10|shadow should become "[Left Aligned Image with custom styling: URL]"
- #img:gallery:[URL1,URL2,URL3] should become "[Image Gallery: URL1, URL2, URL3]"
- #img:blur:URL should become "[Blurred Image: URL]"
- :::info Some information ::: should become "> **INFO**\n>\n> Some information"
- :::danger Important warning ::: should become "> **DANGER**\n>\n> Important warning"
- (and similarly for :::success and :::note)
Do NOT attempt complex HTML conversions for these custom elements unless the original Markdown already contained HTML.
Ensure your entire output is ONLY the processed Markdown text. Do not add any conversational elements, greetings, or explanations. Your entire response will be the content of the .md file.
Preserve line breaks and paragraph structure as much as possible.
Ensure that standard markdown like headings, lists, bold, italics, links, code blocks, and tables are correctly formatted.
If the input is empty or only whitespace, return an empty string.
`;

export const EXPORT_MD_PROGRESS_MESSAGES = {
    INITIALIZING: "Initializing export...",
    AI_PROCESSING: "AI processing for Markdown format...",
    OPTIMIZING: "Optimizing Markdown output...",
    PREPARING_FILE: "Preparing file for download...",
    DOWNLOADING: "Downloading...",
};

export const AI_THEME_GENERATION_SYSTEM_INSTRUCTION = `You are a Theme Generation AI. Your ONLY output MUST be a valid JSON object representing a theme. NOT OTHER THINGS LIKE "okay" , "hello!" JUST JSON.
The JSON object must have the following structure:
{
  "name": "Creative Name For The Theme",
  "isDark": true_or_false,
  "variables": {
    "--theme-bg-page": "#RRGGBB",
    "--theme-bg-content-area": "rgba(R,G,B,A)",
    "--theme-bg-toolbar": "rgba(R,G,B,A)",
    "--theme-bg-assistant-panel": "rgba(R,G,B,A)",
    "--theme-text-primary": "#RRGGBB",
    "--theme-text-secondary": "#RRGGBB",
    "--theme-text-accent": "#RRGGBB",
    "--theme-border-primary": "#RRGGBB",
    "--theme-button-bg": "#RRGGBB",
    "--theme-button-text": "#RRGGBB",
    "--theme-button-hover-bg": "#RRGGBB",
    "--theme-scrollbar-thumb": "#RRGGBB",
    "--theme-scrollbar-track": "#RRGGBB",
    "--tw-prose-body": "#RRGGBB",
    "--tw-prose-headings": "#RRGGBB",
    "--tw-prose-links": "#RRGGBB",
    "--tw-prose-code": "#RRGGBB",
    "--tw-prose-pre-bg": "#RRGGBB",
    "--tw-prose-pre-code": "#RRGGBB",
    "--tw-prose-bullets": "#RRGGBB",
    "--tw-prose-hr": "#RRGGBB",
    "--tw-prose-quotes": "#RRGGBB",
    "--tw-prose-quote-borders": "#RRGGBB",
    "--theme-admonition-danger-border": "#RRGGBB",
    "--theme-admonition-danger-bg": "rgba(R,G,B,A)",
    "--theme-admonition-danger-text": "#RRGGBB",
    "--theme-admonition-danger-title": "#RRGGBB",
    "--theme-admonition-info-border": "#RRGGBB",
    "--theme-admonition-info-bg": "rgba(R,G,B,A)",
    "--theme-admonition-info-text": "#RRGGBB",
    "--theme-admonition-info-title": "#RRGGBB",
    "--theme-admonition-success-border": "#RRGGBB",
    "--theme-admonition-success-bg": "rgba(R,G,B,A)",
    "--theme-admonition-success-text": "#RRGGBB",
    "--theme-admonition-success-title": "#RRGGBB",
    "--theme-admonition-note-border": "#RRGGBB",
    "--theme-admonition-note-bg": "rgba(R,G,B,A)",
    "--theme-admonition-note-text": "#RRGGBB",
    "--theme-admonition-note-title": "#RRGGBB"
  }
}
Ensure ALL specified variables are present.
Ensure all color values are valid CSS colors (hex like #RRGGBB or #RGB, or rgba(R,G,B,A)).
Base your color choices on the user's prompt (e.g., "dark orange theme for coffee").
If the prompt is vague, make creative, aesthetically pleasing choices that ensure good contrast and readability.
The name should be short, creative, and reflect the theme's essence.
Do NOT output ANYTHING else other than this JSON object. No conversational text. No markdown fences like \`\`\`json. Just the raw JSON.
`;
