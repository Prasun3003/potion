"use client";

import {
  ChevronsLeft,
  Search,
  Settings,
  Trash,
  FileIcon,
  PlusCircle,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { UserItem } from "./user-item";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { Item } from "./item";
import { api } from "@/convex/_generated/api";
import { useTheme } from "next-themes";
import { TrashBox } from "./trash-box";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";




interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const searchStore = useSearch();
  const settings = useSettings();
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const create = useMutation(api.documents.create);

  const onSearch = () => {
    searchStore.onOpen();
  };

  const onSettings = () => {
    settings.onOpen();  
  };

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
    });
    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created successfully",
      error: "Failed to create note",
    });
  };

  const actionItems: NavItem[] = [
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      onClick: onSettings,
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

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1F1F1F] dark:bg-[#171717]">
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
          onClick={() => setIsCollapsed(!isCollapsed)}
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
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          <div className={cn("px-2", !isCollapsed && "mb-1")}>
            <UserItem collapsed={isCollapsed} />
            <Item
              label="Search"
              icon={<Search className="h-4 w-4" />}
              onClick={onSearch}
              isSearch
            />
            <Item
              onClick={handleCreate}
              label="New Page"
              icon={<PlusCircle className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-1 px-2">
            {actionItems.map((item) => (
              <Item
                key={item.label}
                label={item.label}
                icon={item.icon}
                onClick={item.onClick!}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2">
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
          <div className="px-2">
            {documentItems.map((item) => (
              <Item
                key={item.label}
                label={item.label}
                icon={item.icon}
                onClick={() => router.push(item.href!)}
                active={pathname === item.href}
              />
            ))}
            <div className="mt-2">
              <DocumentList />
              <Item
                label="Add a page"
                icon={<PlusCircle className="h-4 w-4" />}
                onClick={handleCreate}
              />
            <Popover>
                <PopoverTrigger className="w-full mt-4">
                    <Item label="Trash" icon={<Trash className="h-4 w-4" />}/>
                <PopoverContent side={isMobile? "bottom" : "right"}>
                    <TrashBox />
                </PopoverContent>
                </PopoverTrigger>
            </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto p-4">
        <div className="space-y-2">
          <Item
            onClick={toggleTheme}
            label={
              mounted
                ? `Theme: ${
                    theme === "system"
                      ? "System"
                      : theme === "dark"
                      ? "Dark"
                      : "Light"
                  }`
                : "Theme"
            }
            icon={
              mounted ? (
                theme === "system" ? (
                  <Laptop className="h-4 w-4" />
                ) : theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )
              ) : null
            }
          />
          <Item
            onClick={onSettings}
            label="Workspace settings"
            icon={<Settings className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
