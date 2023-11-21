"use client"

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'

import React from 'react'

const GoBack = () => {
    const router = useRouter();
    return (
        <button onClick={() => router.back()} className='flex flex-row items-center'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Courses list
        </button>
    )
}

export default GoBack