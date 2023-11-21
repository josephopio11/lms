"use client"

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChaptersListProps {
  items: Chapter[];
}

const ChaptersList = ({
  items,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {chapters.map((chapter, index) => (
        <div className={cn("flex flex-row items-center justify-between py-2", !chapter.isPublished && "bg-pink-500/10", chapter.isFree && "bg-purple-500/10")}>
          <p className="font-bold text-xl">
            {chapter.title}
          </p>
          <div className="flex flex-row gap-2">
            {chapter.isFree && (
              <Badge className="bg-purple-500">
                Free
              </Badge>
            )}
            <Badge
              className={cn("bg-red-500", chapter.isPublished && "bg-green-500")}
            >
              {chapter.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      ))}
    </>
  )
}

export default ChaptersList