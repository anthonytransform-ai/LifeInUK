"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStudyContext } from "@/context/StudyContext";
import StudyCard from "@/components/FocusedStudy/StudyCard";
import StudyControls from "@/components/FocusedStudy/StudyControls";

export default function StudyChapterClient({ chapterId, chapter }: { chapterId: string, chapter: any }) {
  const router = useRouter();
  const { progress, updateProgress, isEnglish, toggleLanguage } = useStudyContext();
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedIndex = progress[chapterId] || 0;
    setCurrentIndex(savedIndex);
    setIsLoaded(true);
  }, [chapterId, progress]);

  if (!isLoaded) return <div className="p-8 text-center">Loading...</div>;

  const totalPoints = chapter.points.length;
  if (totalPoints === 0) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">No content found for this chapter.</p>
        <Link href="/study" className="text-blue-600 underline">Back to chapters</Link>
      </div>
    );
  }

  // Ensure index is within bounds
  const safeIndex = Math.min(currentIndex, totalPoints - 1);
  const currentPoint = chapter.points[safeIndex];
  const progressPct = ((safeIndex + 1) / totalPoints) * 100;
  const isEnd = safeIndex === totalPoints - 1;

  const handleNext = () => {
    if (isEnd) {
      // Finished chapter
      router.push("/study");
    } else {
      const nextIdx = safeIndex + 1;
      setCurrentIndex(nextIdx);
      updateProgress(chapterId, nextIdx);
    }
  };

  const chapterTitle = isEnglish ? chapter.title.en : chapter.title.zh;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 w-full flex-1 flex flex-col">
      
      {/* Top Bar */}
      <div className="sticky top-[72px] z-10 bg-[#f9fafb] py-4 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 border-b border-gray-200 sm:border-0 shadow-sm sm:shadow-none">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Link href="/study" className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-1">
              <svg xmlns="http://www.0000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {isEnglish ? "Back" : "返回"}
            </Link>
            <h1 className="text-xl font-bold text-gray-800">
              {isEnglish ? "Lesson" : "單元"} {chapter.chapterId}: {chapterTitle}
            </h1>
          </div>
          
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 font-bold text-gray-700 bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            <span>EN / 繁</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="text-sm font-bold text-gray-600 w-12 text-right">
            {safeIndex + 1}/{totalPoints}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 mb-8">
        <StudyCard point={currentPoint} />
      </div>

      {/* Bottom Controls */}
      <StudyControls onNext={handleNext} isEnd={isEnd} chapterId={chapter.chapterId.toString()} />
      
    </div>
  );
}
