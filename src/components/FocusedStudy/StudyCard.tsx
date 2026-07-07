import React from "react";
import { useStudyContext } from "@/context/StudyContext";

interface Point {
  id: string;
  questionId: string;
  text: {
    en: string;
    zh: string;
  };
}

interface StudyCardProps {
  point: Point;
}

export default function StudyCard({ point }: StudyCardProps) {
  const { isEnglish } = useStudyContext();

  const titleText = isEnglish ? "KEY LEARNING POINT" : "重點學習內容";

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-6 h-full min-h-[50vh]">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{titleText}</h2>
      </div>
      
      <div 
        className="flex-1 font-sans leading-relaxed text-justify text-gray-900 text-lg"
        lang={isEnglish ? "en" : "zh-HK"}
      >
        {isEnglish ? point.text.en : point.text.zh}
      </div>

      <div className="flex justify-center items-center opacity-30 mt-auto pt-6">
        {/* Simple book icon placeholder */}
        <svg xmlns="http://www.0000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
      </div>
    </div>
  );
}
