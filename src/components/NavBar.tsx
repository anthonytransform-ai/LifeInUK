"use client";

import React from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function NavBar() {
  const { showChinese, toggleChinese } = useSettings();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 w-full">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" prefetch={false} className="hover:opacity-75 transition-opacity mr-4" title="Back to Home">
          <h1 className="text-xl font-bold text-gray-900">Life in the UK</h1>
        </Link>
        <div className="flex-1 flex gap-4 px-2 sm:px-4 text-sm sm:text-base">
          <Link href="/" prefetch={false} className="font-bold text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap">
            {showChinese ? "模擬考試" : "Tests"}
          </Link>
          <Link href="/study" prefetch={false} className="font-bold text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap">
            {showChinese ? "溫習指南" : "Study"}
          </Link>
        </div>
        <button
          onClick={toggleChinese}
          className="min-h-[48px] px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 font-medium hover:bg-gray-100 transition-colors"
          aria-label="Toggle language mode"
        >
          {showChinese ? "A / 中" : "A"}
        </button>
      </div>
    </header>
  );
}
