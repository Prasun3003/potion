"use client";

import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  Search,
  Settings,
  Trash,
  FileIcon,
} from "lucide-react";
import {  useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const Navigation = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const resetWidth = () => {
    setIsCollapsed(false);
    setIsResetting(true);

    setTimeout(() => setIsResetting(false), 300);
  };

  const collapse = () => {
    setIsCollapsed(true);
    setIsResetting(true);

    setTimeout(() => setIsResetting(false), 300);
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  const actionItems: NavItem[] = [
    {
      label: "New Page",
      icon: <Plus className="h-4 w-4" />,
      onClick: () => {},
    },
    {
      label: "Search",
      icon: <Search className="h-4 w-4" />,
      onClick: () => {},
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      onClick: () => {},
    },
  ];

  const documentItems: NavItem[] = [
    {
      label: "My Documents",
      icon: <FileIcon className="h-4 w-4" />,
      href: "/documents",
    },
    {
      label: "Trash",
      icon: <Trash className="h-4 w-4" />,
      href: "/trash",
    },
  ];

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        if (sizes[0] < 8) {
          collapse();
        }
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={20}
        minSize={8}
        maxSize={40}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed && "min-w-[50px] max-w-[50px]"
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col bg-[#1F1F1F] dark:bg-[#171717]",
            isResetting && "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex items-center justify-between p-4">
            <span
              className={cn(
                "text-xl font-semibold transition-opacity duration-300 text-white",
                isCollapsed && "opacity-0"
              )}
            >
              Potion
            </span>
            <button
              onClick={isCollapsed ? resetWidth : collapse}
              className="h-6 w-6 rounded-sm hover:bg-neutral-600 dark:hover:bg-neutral-800 transition-colors"
            >
              <ChevronsLeft
                className={cn(
                  "h-6 w-6 text-white transition-all",
                  isCollapsed && "rotate-180"
                )}
              />
            </button>
          </div>
          <div className="space-y-2">
            <div className={cn("px-4", !isCollapsed && "mb-1")}>
              <p
                className={cn(
                  "text-sm font-medium transition-opacity duration-300 text-neutral-400",
                  isCollapsed && "hidden"
                )}
              >
                Action Items
              </p>
            </div>
            <div className="space-y-1 px-2">
              {actionItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg hover:bg-neutral-600/50 transition-colors text-white",
                    isCollapsed && "justify-center"
                  )}
                >
                  <div className="shrink-0 text-neutral-400">{item.icon}</div>
                  <span className={cn("ml-2 text-sm", isCollapsed && "hidden")}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className={cn("px-4", !isCollapsed && "mb-1")}>
              <p
                className={cn(
                  "text-sm font-medium transition-opacity duration-300 text-neutral-400",
                  isCollapsed && "hidden"
                )}
              >
                Documents
              </p>
            </div>
            <div className="space-y-1 px-2">
              {documentItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg hover:bg-neutral-600/50 transition-colors text-white",
                    isCollapsed && "justify-center",
                    pathname === item.href && "bg-neutral-600/50"
                  )}
                >
                  <div className="shrink-0 text-neutral-400">{item.icon}</div>
                  <span className={cn("ml-2 text-sm", isCollapsed && "hidden")}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-auto p-4">
            <div
              className={cn(
                "flex items-center gap-x-2",
                isCollapsed && "justify-center"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-neutral-600 text-white">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex flex-col justify-center",
                  isCollapsed && "hidden"
                )}
              >
                <span className="text-sm font-medium line-clamp-1 text-white">
                  {user?.fullName || user?.username}
                </span>
                <span className="text-xs text-neutral-400 line-clamp-1">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="w-2 bg-neutral-800 hover:bg-neutral-700 transition-colors"
      />
      <ResizablePanel minSize={30} defaultSize={80}>
        <nav className="bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground cursor-pointer"
            />
          )}
        </nav>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Navigation;
