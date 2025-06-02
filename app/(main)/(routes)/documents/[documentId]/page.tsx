"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Toolbar } from "@/components/toolbar";
// import { Editor } from "@/components/editor";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
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
    <div className="h-full flex-1 flex flex-col">
      <Toolbar initialData={document} />
    </div>
  );
};

export default DocumentIdPage;
