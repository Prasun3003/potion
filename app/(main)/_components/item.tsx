"use client";

import { Id } from "@/convex/_generated/dataModel";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenu, 
    DropdownMenuContent,
    DropdownMenuTrigger,DropdownMenuItem,
    DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  level?: number;
  expanded?: boolean;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
}

export const Item = ({
  id,
  label,
  onClick,
  icon,
  active,
  isSearch,
  level = 0,
  expanded,
  onExpand,
  documentIcon,
}: ItemProps) => {
    const {user} = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    
    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
       if(!id) return;
       const promise = archive({id})
       toast.promise(promise, {
        loading: "Moving to trash...",
        success: "Note moved to trash!",
        error: "Failed to move to trash!",
       })
    }


  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) =>{
    event.stopPropagation();
    if(!id) return;
    const promise = create({
        parentDocument: id,
        title: "Untitled",
    }).then((documentId)=>{
        if(!expanded){
            onExpand?.();
        }
    });
    // router.push(`/documents/${promise}`);

    toast.promise(promise, {
        loading: "Creating page...",
        success: "New page created!",
        error: "Failed to create page.",
    });
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-white font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className={cn(
            "h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1",
            active && "bg-neutral-300 dark:bg-neutral-600"
          )}
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-white">{documentIcon}</div>
      ) : (
        <div className="shrink-0 mr-2 text-white">{icon}</div>
      )}
      <span className="truncate text-white">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e)=>e.stopPropagation()}>
                <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" role="button">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem
                onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by {user?.fullName}
                </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
