"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Pencil } from "lucide-react";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({url, preview}: CoverImageProps) => {
    return (
        <div className={cn("relative h-[35vh] w-full group", !url && "h-[12vh]", url && "bg-muted")}>
            {!!url && (
                <Image 
                    src={url}
                    fill
                    alt="Cover"
                    className="object-cover"
                />
            )}
        </div>
    )
}