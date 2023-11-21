'use client';

import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import ChaptersList from "./chapters-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
}

const ChaptersForm = ({
  initialData,
}: ChaptersFormProps) => {
  return (
    <div className="mt-6 bg-white/50 rounded-md p-4">
      <div className="text-xs uppercase font-light">
        Course chapters
      </div>
      <div className={cn(
        "text-sm mt-2",
        !initialData.chapters.length && "text-slate-500 italic"
      )}>
        {!initialData.chapters.length && "No chapters yet."}
        <ChaptersList
          items={initialData.chapters || []}
        />
      </div>
    </div>
  )
}

export default ChaptersForm