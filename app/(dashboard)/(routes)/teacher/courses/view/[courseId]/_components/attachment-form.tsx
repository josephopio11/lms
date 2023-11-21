'use client';

import { File } from "lucide-react";
import { Attachment, Course } from "@prisma/client";
import Link from "next/link";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
}

const AttachmentForm = ({
  initialData,
}: AttachmentFormProps) => {

  return (
    <div className="mt-6 border bg-gray-100 rounded-md p-4">
      <div className="text-xs uppercase font-light">
        Course attachments
      </div>
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
              <Link
                href={attachment.url}
                download
                target="_blank"
                key={attachment.id}
                className="flex items-center p-3 w-full bg-sky-100 border-sky-900 border rounded-md text-sky-700"
              >
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="text-xs line-clamp-1">{attachment.name}</p>
              </Link>
            ))}
          </div>
        )}
      </>
    </div>
  )
}

export default AttachmentForm