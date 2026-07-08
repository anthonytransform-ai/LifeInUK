"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface StudyContextType {
  isEnglish: boolean;
  toggleLanguage: () => void;
  progress: Record<string, number>;
  updateProgress: (chapterId: string, pointIndex: number) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.error(`Failed to read ${key}`, e);
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Failed to write ${key}`, e);
  }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedLang = readStorage("lifeinuk_study_lang");
    if (savedLang !== null) {
      setIsEnglish(savedLang === "true");
    }

    const savedProgress = readStorage("lifeinuk_study_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse study progress", e);
      }
    }
  }, []);

  const toggleLanguage = () => {
    setIsEnglish((prev) => {
      const next = !prev;
      writeStorage("lifeinuk_study_lang", next.toString());
      return next;
    });
  };

  const updateProgress = (chapterId: string, pointIndex: number) => {
    setProgress((prev) => {
      const next = { ...prev, [chapterId]: pointIndex };
      writeStorage("lifeinuk_study_progress", JSON.stringify(next));
      return next;
    });
  };

  return (
    <StudyContext.Provider value={{ isEnglish, toggleLanguage, progress, updateProgress }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudyContext() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error("useStudyContext must be used within a StudyProvider");
  }
  return context;
}
