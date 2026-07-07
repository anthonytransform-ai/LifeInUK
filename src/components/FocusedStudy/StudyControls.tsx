import React from "react";
import { useStudyContext } from "@/context/StudyContext";

interface StudyControlsProps {
  onNext: () => void;
  isEnd: boolean;
  chapterId: string;
}

export default function StudyControls({ onNext, isEnd, chapterId }: StudyControlsProps) {
  const { isEnglish } = useStudyContext();

  const btnText = isEnd 
    ? (isEnglish ? "Finish Chapter" : "完成本章") 
    : (isEnglish ? "Next" : "下一頁");

  return (
    <div className="flex justify-center mt-auto pt-6 border-t border-gray-200">
      <button
        onClick={onNext}
        className="w-full sm:w-auto min-h-[56px] px-12 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-800 text-lg shadow-md flex items-center justify-center gap-2 transition-colors"
      >
        <span>{btnText}</span>
        {!isEnd && (
          <svg xmlns="http://www.0000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        )}
      </button>
    </div>
  );
}
