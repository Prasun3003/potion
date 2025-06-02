"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { toast } from "sonner";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { CheckCircle, Copy, Globe, Link2, Share, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published!",
      error: "Failed to publish",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Unpublished!",
      error: "Failed to unpublish",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between hover:bg-primary/5"
        >
          <div className="flex items-center gap-x-2">
            <Globe className="h-4 w-4" />
            Publish
          </div>
          {initialData.isPublished && (
            <CheckCircle className="h-4 w-4 text-sky-500" fill="currentColor" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" alignOffset={8}>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 text-sky-500" />
              <p className="text-sm font-medium">This note is live on web</p>
            </div>
            <div className="flex items-center">
              <Input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center gap-x-2">
              <Link2 className="h-4 w-4" />
              <p className="text-xs text-muted-foreground">
                Anyone with the link can view this note
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={onUnpublish}
              disabled={isSubmitting}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4" />
              <p className="text-sm font-medium">Publish this note</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Share className="h-4 w-4" />
              <p className="text-xs text-muted-foreground">
                Share your work with others
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              className="w-full mt-2"
              onClick={onPublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
