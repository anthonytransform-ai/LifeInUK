"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import studyGuideData from "@/data/study_guide.json";
import { useStudyContext } from "@/context/StudyContext";
import BilingualText from "@/components/BilingualText";

export default function StudyIndexPage() {
  const { progress, isEnglish, toggleLanguage } = useStudyContext();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEnglish ? "Study Guide" : "溫習指南"}
        </h1>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 font-bold text-gray-700 bg-white hover:bg-gray-100 transition-colors shadow-sm"
        >
          <span>EN / 繁</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {studyGuideData.map((chapter) => {
          const total = chapter.points.length;
          const current = progress[chapter.chapterId.toString()] || 0;
          const progressPct = total === 0 ? 0 : Math.round((current / total) * 100);

          return (
            <Link href={`/study/${chapter.chapterId}`} key={chapter.chapterId}>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-800 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      {chapter.chapterId}
                    </div>
                    <div>
                      {/* Bilingual Title */}
                      <BilingualText 
                        text={chapter.title} 
                        enClassName={`text-lg font-bold ${isEnglish ? "text-gray-900" : "text-gray-500"}`}
                        zhClassName={`text-lg font-bold ${isEnglish ? "text-gray-500" : "text-gray-900"}`}
                      />
                    </div>
                  </div>
                  <div className="text-gray-500 font-medium whitespace-nowrap">
                    {current} / {total}
                  </div>
                </div>

                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-300" 
                    style={{ width: `${progressPct}%` }} 
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
