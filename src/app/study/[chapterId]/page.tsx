import React from "react";
import studyGuideData from "@/data/study_guide.json";
import StudyChapterClient from "./StudyChapterClient";

export async function generateStaticParams() {
  return studyGuideData.map((chapter) => ({
    chapterId: chapter.chapterId.toString(),
  }));
}

export default async function StudyChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const resolvedParams = await params;
  const chapterId = resolvedParams.chapterId;
  const chapter = studyGuideData.find((c) => c.chapterId.toString() === chapterId);

  if (!chapter) {
    return <div className="p-8 text-center text-red-500">Chapter not found</div>;
  }

  return <StudyChapterClient chapterId={chapterId} chapter={chapter} />;
}
