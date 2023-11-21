'use client';

import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";

interface CategoryFormProps {
  initialData: Course;
  options: { label: string; value: string; }[]
}

const CategoryForm = ({
  initialData,
  options,
}: CategoryFormProps) => {

  const selectedOption = options.find((option) => option.value === initialData.categoryId)

  return (
    <div className="mt-6 border bg-gray-100 rounded-md p-4">
      <div className="text-xs uppercase">
        Course category
      </div>
      <p className={cn(
        "text-sm mt-2",
        !initialData.categoryId && "text-slate-500 italic", initialData.categoryId && "font-bold text-xl"
      )}>
        {selectedOption?.label || "No category"}
      </p>
    </div>
  )
}

export default CategoryForm