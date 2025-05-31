"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BoxReveal } from "@/components/magicui/box-reveal";

const Hero = () => {
  return (
    <div className="pt-12 flex flex-col items-center justify-center relative w-full py-12 md:py-24 bg-gradient-to-b from-background/80 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          {/* Left content */}
          <div className="flex-1 space-y-4 text-center md:text-left max-w-xl pt-12">
            <BoxReveal boxColor="#252525">
              <motion.h2
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Transform Your Ideas Into Reality
              </motion.h2>
            </BoxReveal>
            <BoxReveal boxColor="#252525">
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto md:mx-0">
                    Create, collaborate, and bring your projects to life with our powerful platform
                </p>
            </BoxReveal>
            <BoxReveal boxColor="#252525">
              <motion.div
                className="flex flex-wrap gap-4 justify-center md:justify-start pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition shadow-lg hover:shadow-primary/25">
                  Get Started
                </button>
                <button className="px-6 py-2.5 rounded-full border border-primary/20 hover:bg-primary/10 transition">
                  Learn More
                </button>
              </motion.div>
            </BoxReveal>
          </div>

          {/* Right content - Image */}
          <motion.div
            className="flex-1 relative max-w-md mx-auto md:max-w-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/images/Jumping.png"
                alt="Hero illustration"
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
