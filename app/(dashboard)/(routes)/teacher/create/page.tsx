'use client'

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  })
})

const CreateCourse = () => {
  const handleCancel = () => {
    var result = confirm("Are you sure you want to cancel?")
    if (result) {
      router.back()
    }
  }
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values)
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created successfully")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='max-w-5xl mx-auto flex flex-col md:items-start md:justify-center h-full p-6'>
      <h1 className='text-2xl font-bold'>Name your course</h1>
      <p className='text-sm text-slate-600'>What would you like to name your course? Don&apos;t worry, you can change this later.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 mt-8'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 'Introduction to Web Development'"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className='font-thin'>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              type='button'
              variant={'secondary'}
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={!isValid || isSubmitting}
              variant={'default'}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateCourse