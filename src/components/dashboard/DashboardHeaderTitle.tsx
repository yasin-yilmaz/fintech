import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const DashboardHeaderTitle = ({ children, className }: Props) => {
  return (
    <h1 className={cn("text-granite text-[25px] font-semibold", className)}>
      {children}
    </h1>
  );
};
