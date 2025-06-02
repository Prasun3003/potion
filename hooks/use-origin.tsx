import { useEffect, useState } from "react";

import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover";

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return "";
    }

    return origin;
}