"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 px-4">
      <div className="flex flex-col items-center justify-center max-w-[600px] space-y-8">
        <div className="relative">
          <Image
            src="/images/Chill-Time.png"
            height={300}
            width={300}
            alt="404 Error"
            className="opacity-50"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-6xl font-bold text-primary">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center">Oops! Page Not Found</h1>
        <p className="text-muted-foreground text-center text-lg">
          The page you're looking for seems to have vanished into thin air.
          Let's get you back on track!
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
