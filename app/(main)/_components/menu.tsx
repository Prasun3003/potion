"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Copy, File, MenuIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onArchive = () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document archived",
      error: "Failed to archive document",
    });
    router.push("/documents");
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Failed to restore document",
    });
    router.push("/documents");
  };

  const handleRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted",
      error: "Failed to delete document",
    });
    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-full w-full justify-start flex items-center gap-x-2"
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuLabel>
          <span className="font-medium">Document Options</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onArchive} className="cursor-pointer">
          <Trash className="h-4 w-4 mr-2" />
          Move to trash
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="h-10 w-10" />
  )
}
