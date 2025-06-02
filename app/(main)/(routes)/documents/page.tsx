"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner"
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created successfully",
      error: "Failed to create note",
    });
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center max-w-[600px] space-y-8">
        <Image
          src="/images/Chill-Time.png"
          height={300}
          width={300}
          alt="Empty"
          className="dark:hidden"
        />
        <Image
          src="/images/Chill-Time.png"
          height={300}
          width={300}
          alt="Empty"
          className="hidden dark:block"
        />
        <h2 className="text-2xl font-bold text-center">
          Welcome to {user?.firstName}&apos;s Potion
        </h2>
        <p className="text-muted-foreground text-center">
          Create your first note by clicking the button below.
        </p>
        <Button size="lg" onClick={onCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create your first note
        </Button>
      </div>
    </div>
  );
};

export default DocumentsPage;
