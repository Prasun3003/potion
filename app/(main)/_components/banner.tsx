"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted successfully",
      error: "Failed to delete note",
    });
  };

  const onRestore = () => {
    const promise = restore({ id: documentId }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored successfully",
      error: "Failed to restore note",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-white p-2 text-sm flex items-center gap-x-2 justify-center relative z-[99998]">
      <p className="font-medium">This page is in trash</p>
      <div className="flex items-center gap-x-2">
        <Button
          size="sm"
          onClick={onRestore}
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Restore page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size="sm"
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
          >
            Delete forever
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
