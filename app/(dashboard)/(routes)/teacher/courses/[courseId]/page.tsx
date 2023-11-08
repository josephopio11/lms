import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react'
import TitleForm from './_components/title-form';

const CourseIdPage = async ({
  params
}: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  });

  if (!course) {
    return redirect('/teacher/courses');
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className='p-6'>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h2 className='text-2xl font-medium'>
            Set up: {course?.title}
          </h2>
          <span className='text-sm text-red-400'>
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge size={'sm'} variant={'success'} icon={LayoutDashboard} />
            <h2 className='text-xl'>Customise your course</h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
        </div>

      </div>
      Course ID: {params.courseId}

    </div>
  )
}

export default CourseIdPage