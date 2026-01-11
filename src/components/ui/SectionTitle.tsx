import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  right?: React.ReactNode;
};

export const SectionTitle = ({ children, className, right }: Props) => {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <h2 className="text-granite text-lg font-semibold">{children}</h2>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
};
