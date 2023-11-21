import { IconBadge } from '@/components/icon-badge'
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface InfoCardProps {
  variant?: "default" | "success";
  label: string;
  numberOfItems: number;
  icon: LucideIcon;
}

const InfoCard = ({
  variant = "default",
  label,
  numberOfItems,
  icon: Icon
}: InfoCardProps) => {
  return (
    <div className='border rounded-md flex items-center gap-x-2 p-3'>
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className='text-gray-500 text-sm'>
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
}

export default InfoCard