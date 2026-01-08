import { cn } from "@/lib/utils";

export const Separator = ({ className }: { className?: string }) => {
  return <div className={cn("h-px w-full bg-[#F2F2F2]", className)} />;
};
