"use client";

import { LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}

export const Item = ({ label, onClick, icon }: ItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className="flex items-center gap-x-2 py-2 px-3 text-sm font-medium hover:bg-neutral-600/50 rounded-lg transition-all text-white"
    >
      {icon}
      {label}
    </div>
  );
};
