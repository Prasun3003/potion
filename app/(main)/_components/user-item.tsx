"use client";

import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserItemProps {
  collapsed: boolean;
}

export const UserItem = ({ collapsed }: UserItemProps) => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className={cn(
            "flex items-center gap-x-2 p-2 rounded-lg hover:bg-neutral-600/50 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-neutral-600 text-white">
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col justify-center">
              <span className="text-sm font-medium line-clamp-1 text-white">
                {user?.fullName || user?.username}
              </span>
              <span className="text-xs text-neutral-400 line-clamp-1">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
          )}
          <ChevronsLeftRight
            className={cn(
              "h-4 w-4 text-neutral-400 rotate-0 transition-all",
              collapsed && "hidden"
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-neutral-500">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-neutral-600 text-white">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName || user?.username}&apos;s Potion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-neutral-500"
        >
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
