import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import TitleForm from './_components/title-form';
import DescriptionForm from './_components/description-form';
import ImageForm from './_components/image-form';
import CategoryForm from './_components/category-form';
import PriceForm from './_components/price-form';
import AttachmentForm from './_components/attachment-form';
import ChaptersForm from './_components/chapters-form';
import Banner from '@/components/banner';
import CourseActions from './_components/course-actions';

const CourseIdPage = async ({
  params
}: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        }
      },
      attachments: {
        orderBy: {
          createdAt: 'desc'
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
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
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const conditionalFormat = () => {
    if (completedFields === totalFields) {
      return 'text-sm text-green-400'
    } else {
      return 'text-sm text-red-400'
    }
  }

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant={"warning"}
          label="This course is not published yet. It will not be visible to the students."
        />
      )}
      <div className='p-6'>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h2 className='text-2xl font-medium'>
              Set up: {course?.title}
            </h2>
            <span className={conditionalFormat()}>
              Complete all fields {completionText}
            </span>
          </div>
          <div>
            <CourseActions
              disabled={!isComplete}
              courseId={course.id}
              isPublished={course.isPublished}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge size={'md'} variant={'success'} icon={LayoutDashboard} />
              <h2 className='text-xl'>Customise your course</h2>
            </div>
            <TitleForm
              initialData={course}
              courseId={course.id}
            />
            <DescriptionForm
              initialData={course}
              courseId={course.id}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size={'md'} variant={'success'} icon={ListChecks} />
                <h2 className='text-xl'>Course chapters</h2>
              </div>
              <ChaptersForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size={'md'} icon={CircleDollarSign} />
                <h2 className='text-xl'>Sell your course.</h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size={'md'} icon={File} />
                <h2 className='text-xl'>Resources and attachments.</h2>
              </div>
              <AttachmentForm
                initialData={course}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseIdPage