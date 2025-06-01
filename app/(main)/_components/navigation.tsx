"use client";

import {
  ChevronsLeft,
  Plus,
  Search,
  Settings,
  Trash,
  FileIcon,
} from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { UserItem } from "./user-item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Item } from "./item";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const Navigation = () => {
  const documents = useQuery(api.documents.get);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const onCreatePage = () => {
    router.push("/documents/new");
  };

  const onSearch = () => {
    router.push("/search");
  };

  const onSettings = () => {
    router.push("/settings");
  };

  const actionItems: NavItem[] = [
    {
      label: "Search",
      icon: <Search className="h-4 w-4" />,
      onClick: onSearch,
    },
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
            <Item onClick={()=>{}} label="New Page" icon={<Plus className="h-4 w-4" />}/>
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
        <div className="mt-4 space-y-2">
          <div className={cn("px-4", !isCollapsed && "mb-1")}>
            <p
              className={cn(
                "text-sm font-medium transition-opacity duration-300 text-neutral-400",
                isCollapsed && "hidden"
              )}
            >
             {/* {documents?.map((document)=>(
                <div key={document._id}>
                    {document.title}
                </div>
             ))} */}
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
          {documents?.map((document) => (
            <a
              key={document._id}
              href={`/documents/${document._id}`}
              className={cn(
                "flex items-center w-full p-2 rounded-lg hover:bg-neutral-600/50 transition-colors text-white",
                isCollapsed && "justify-center",
                pathname === `/documents/${document._id}` && "bg-neutral-600/50"
              )}
            >
              <div className="shrink-0 text-neutral-400">
                <FileIcon className="h-4 w-4" />
              </div>
              <span className={cn("ml-2 text-sm", isCollapsed && "hidden")}>
                {document.title}
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
  );
};

export default Navigation;
