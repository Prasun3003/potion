"use client";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel
        defaultSize={20}
        minSize={15}
        maxSize={30}
        className="hidden md:block"
      >
        <Navigation />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <main className="h-full w-full">
          <div className="h-full max-w-6xl mx-auto p-6">{children}</div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainLayout;
