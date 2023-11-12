import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ChapterActions from './[courseId]/chapters/[chapterId]/_components/chapter-actions'



const CoursesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect('/sign-in');
    }

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return (
        <div className='p-6'>
            <div className='flex items-center w-full'>
                <div className="flex flex-col gap-y-2 mb-6">
                    <h1 className='text-2xl font-medium'>My Courses</h1>
                    <p className='text-sm text-slate-600'>Courses created by you.</p>
                </div>
            </div>
            <DataTable columns={columns} data={courses} />
        </div>
    )
}

export default CoursesPage