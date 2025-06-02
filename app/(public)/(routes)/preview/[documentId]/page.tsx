"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Toolbar } from "@/components/toolbar";
import { useParams } from "next/navigation";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/components/DynamicEditor";
import { useEffect, useState } from "react";

const DocumentIdPage = () => {
  const [content, setContent] = useState("");

  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  useEffect(() => {
    if (document) {
      setContent(document.content || "");
    }
  }, [document]);

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    setContent(content);
    update({
      id: params.documentId as Id<"documents">,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Cover.Skeleton />
        <div className="flex flex-col items-center justify-center max-w-[600px] space-y-8">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return (
      <div className="flex h-full items-center justify-center">
        Document not found
      </div>
    );
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor editable={false} onChange={onChange} initialContent={content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
