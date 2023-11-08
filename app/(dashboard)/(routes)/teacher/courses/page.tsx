import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CoursesPage = () => {
    return (
        <div className=''>
            <Link href={`/teacher/create`}>
                <Button>Add New Course</Button>
            </Link>
        </div>
    )
}

export default CoursesPage