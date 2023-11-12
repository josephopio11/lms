"use client";

import { Category } from "@prisma/client";
import {
  FcAutomotive,
  FcBiotech,
  FcCalculator,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcSupport,
  FcSynchronize,
} from "react-icons/fc";
import { IconType } from "react-icons";

interface CategoriesProps {
  items: Category[],
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
  "Technology": FcSupport,
  "Mathematics": FcCalculator,
  "Automotives": FcAutomotive,
  "Biotech": FcBiotech,
  "Hisotry": FcSynchronize,
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div>
      Categories
    </div>
  )
}