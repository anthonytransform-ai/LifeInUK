"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface StudyContextType {
  isEnglish: boolean;
  toggleLanguage: () => void;
  progress: Record<string, number>;
  updateProgress: (chapterId: string, pointIndex: number) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("lifeinuk_study_lang");
    if (savedLang !== null) {
      setIsEnglish(savedLang === "true");
    }

    const savedProgress = localStorage.getItem("lifeinuk_study_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse study progress", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleLanguage = () => {
    setIsEnglish((prev) => {
      const next = !prev;
      localStorage.setItem("lifeinuk_study_lang", next.toString());
      return next;
    });
  };

  const updateProgress = (chapterId: string, pointIndex: number) => {
    setProgress((prev) => {
      const next = { ...prev, [chapterId]: pointIndex };
      localStorage.setItem("lifeinuk_study_progress", JSON.stringify(next));
      return next;
    });
  };

  // Prevent hydration mismatch by not rendering children until localStorage is read
  if (!isLoaded) return null;

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
