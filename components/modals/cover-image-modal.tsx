"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "../upload/single-image";
import { UploaderProvider, type UploadFn } from "../upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import * as React from 'react';
import { useState } from "react";

export const CoverImageModal = () => {
    const params = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();
    const update = useMutation(api.documents.update);
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    });
    const coverImage = useCoverImage();

    const uploadFn = React.useCallback<UploadFn>(
        async ({ file, onProgressChange, signal }) => {
            if (!document) return { url: "" };
            
            setIsSubmitting(true);
            try {
                const res = await edgestore.publicFiles.upload({
                    file,
                    signal,
                    onProgressChange,
                });

                await update({
                    id: params.documentId as Id<"documents">,
                    title: document.title,
                    coverImage: res.url,
                });

                coverImage.onClose();
                return res;
            } catch (error) {
                setIsSubmitting(false);
                throw error;
            }
        },
        [document, edgestore, update, params.documentId, coverImage]
    );

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <SingleImageDropzone
                        className="w-full outline-none"
                        disabled={isSubmitting}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 4 // 4MB
                        }}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    );
};
