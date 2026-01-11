import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const DashboardHeaderTitle = ({ children, className }: Props) => {
  return (
    <h1
      className={cn(
        "text-granite truncate font-semibold",
        "text-[20px] sm:text-[22px] md:text-[25px]",
        className,
      )}
    >
      {children}
    </h1>
  );
};
