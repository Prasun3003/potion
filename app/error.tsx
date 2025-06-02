"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src="/Loading-Time.png" alt="Error" width={100} height={100} />
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-sm text-gray-500">Something went wrong</p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
    )
}