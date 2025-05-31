import Image from "next/image";
// import { Marquee } from "@/components/magicui/marquee";
import Heading from "./_components/heading";
import Hero from "./_components/hero";
import Footer from "./_components/footer";

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Header Section */}
      <Heading />

      {/* Hero Section */}
      <Hero />

      {/* Marquee Section */}
      <Footer />
    </main>
  );
}

const features = [
  {
    title: "Lightning Fast",
    description:
      "Built with performance in mind, ensuring your application runs smoothly.",
  },
  {
    title: "Beautiful Design",
    description:
      "Modern and clean design that makes your application stand out.",
  },
  {
    title: "Fully Customizable",
    description: "Easily customize every aspect to match your brand and needs.",
  },
];
