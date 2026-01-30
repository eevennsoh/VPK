'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SystemPromptContextType {
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SystemPromptContext = createContext<SystemPromptContextType | undefined>(undefined);

export function SystemPromptProvider({ children }: { children: ReactNode }) {
  const [customPrompt, setCustomPromptState] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    try {
      return localStorage.getItem('rovo-system-prompt') ?? '';
    } catch {
      return '';
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setCustomPrompt = (prompt: string) => {
    setCustomPromptState(prompt);
    localStorage.setItem('rovo-system-prompt', prompt);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SystemPromptContext.Provider value={{ customPrompt, setCustomPrompt, isModalOpen, openModal, closeModal }}>
      {children}
    </SystemPromptContext.Provider>
  );
}

export function useSystemPrompt() {
  const context = useContext(SystemPromptContext);
  if (context === undefined) {
    throw new Error('useSystemPrompt must be used within a SystemPromptProvider');
  }
  return context;
}
