import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import CategoryForm from './_components/category-form';
import AttachmentForm from './_components/attachment-form';
import ChaptersForm from './_components/chapters-form';
import Banner from '@/components/banner';
import CourseActions from './_components/course-actions';
import GoBack from './_components/goback';
import MyInfoCard from './_components/infocard';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


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

  const isComplete = requiredFields.every(Boolean);

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
            <div className="flex items-center gap-x-2">
              <GoBack />
            </div>
            <h2 className='text-2xl font-medium'>
              {course?.title}
            </h2>
          </div>
          <div className='flex items-center gap-x-4'>
            <Link
              href={`/teacher/courses/${course.id}/`}
            >
              <Button className='bg-emerald-600 text-white hover:bg-emerald-600/80'>
                Edit
              </Button>
            </Link>
            <CourseActions
              disabled={!isComplete}
              courseId={course.id}
              isPublished={course.isPublished}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className='space-y-6 bg-emerald-50 p-6 rounded-lg'>
            <div className='flex items-center gap-x-2'>
              <IconBadge size={'md'} variant={'success'} icon={LayoutDashboard} />
              <h2 className='text-xl'>Course Information</h2>
            </div>
            <MyInfoCard
              cardName="Course Title"
              title={course.title}
              format
            />
            <MyInfoCard
              cardName='Course Description'
              title={course.description!}
              format={false}
            />
            <MyInfoCard
              cardName='Course Image'
              format
              image={course.imageUrl!}
            />

            <CategoryForm
              initialData={course}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id
              }))}
            />

          </div>
          <div className="space-y-6 bg-rose-50 p-6 rounded-lg">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size={'md'} variant={'success'} icon={ListChecks} />
                <h2 className='text-xl'>Course chapters</h2>
              </div>
              <ChaptersForm
                initialData={course}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size={'md'} icon={CircleDollarSign} />
                <h2 className='text-xl'>Course Price.</h2>
              </div>
              <MyInfoCard
                cardName={'Set price'}
                title={formatPrice(course.price!)}
                format
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size={'md'} icon={File} />
                <h2 className='text-xl'>Resources and attachments.</h2>
              </div>
              <AttachmentForm
                initialData={course}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseIdPage