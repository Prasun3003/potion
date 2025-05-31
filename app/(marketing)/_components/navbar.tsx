"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { BoxReveal } from "@/components/magicui/box-reveal";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 left-0 right-0 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="flex items-center justify-between container mx-auto px-4 h-16 max-w-6xl">
        <BoxReveal boxColor="#252525">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo/reshot-icon-bio-chemical-RLSFJ95Z8T.svg"
                alt="Potion Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-lg">Potion</span>
          </Link>
        </BoxReveal>

        {/* Navigation Links */}
        <BoxReveal boxColor="#252525">
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              About
            </Link>
          </nav>
        </BoxReveal>

        {/* Actions */}
        <BoxReveal boxColor="#252525">
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="hidden md:flex items-center gap-4">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <ModeToggle />
          </div>
        </BoxReveal>
      </div>
    </div>
  );
};

export default Navbar;
