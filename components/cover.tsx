"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.documents.removeCover);
  const {edgestore} = useEdgeStore();
  const [isLoading, setIsLoading] = useState(false);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }
    if (preview) return;

    try {
      setIsLoading(true);
      await removeCover({
        id: params.documentId as Id<"documents">,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full group",
        !url && "h-[12vh] bg-background hover:bg-muted/50 transition-colors",
        url && "h-[35vh] bg-muted"
      )}
    >
      {!!url && (
        <div className="relative w-full h-full">
          <Image
            src={url}
            fill
            alt="Cover"
            className="object-cover opacity-0 transition-opacity duration-700 ease-in-out"
            onLoadingComplete={(image) => {
              image.classList.remove("opacity-0");
            }}
            priority
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-100 opacity-0" />
        </div>
      )}
      {!url && !preview && (
        <div className="h-full flex items-center justify-center">
          <Button
            onClick={coverImage.onOpen}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        </div>
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-white text-xs"
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-white text-xs"
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};


Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="h-[12vh] w-full" />
  )
}
