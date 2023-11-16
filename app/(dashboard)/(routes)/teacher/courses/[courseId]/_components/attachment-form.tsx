'use client';

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
})

const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachments added");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete attachment. Something went wrong.")
      // console.log(error)
    }
  }

  return (
    <div className="mt-6 border bg-gray-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <div className="text-sx text-muted-foreground mt-4 italic">
              <small>
                No attachments
              </small>
            </div>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-900 border rounded-md text-sky-700"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <Loader2
                      className="h-4 w-4 ml-auto flex-shrink-0 animate-spin"
                    />
                  )}
                  {deletingId !== attachment.id && (
                    <button className="ml-auto flex-shrink-0 cursor-pointer hover:text-red-500 p-1" onClick={() => handleDelete(attachment.id)}>
                      <X
                        className="h-4 w-4 flex-shrink-0 cursor-pointer "
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>

      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) onSubmit({ url: url });
            }}
          />
          <div className="text-sx text-muted-foreground mt-4 italic">
            <small>
              Add anything your students might need to complete the course.
            </small>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentForm