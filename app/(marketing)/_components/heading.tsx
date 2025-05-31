"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BoxReveal } from "@/components/magicui/box-reveal";

export default function Heading() {
  return (
    <motion.div className="flex flex-col items-center justify-center pt-12">
      
        <section className="w-full  flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
          <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid-pattern" />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <BoxReveal boxColor="#252525">
              <div className="w-24 h-24 relative mb-4">
                <Image
                  src="/logo/reshot-icon-bio-chemical-RLSFJ95Z8T.svg"
                  alt="Potion Logo"
                  width={96}
                  height={96}
                  priority
                  className="animate-float"
                />
              </div>
              </BoxReveal>
             <BoxReveal boxColor="#252525"> <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-text-shimmer">
                Welcome to Potion
              </h1> 
              </BoxReveal>
              {/* <BoxReveal boxColor="#252525"> */}
              {/* <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                Brew your ideas into reality with our powerful platform
              </p> 
              </BoxReveal> */}
            </div>
          </div>
        </section>
      
    </motion.div>
  );
}
