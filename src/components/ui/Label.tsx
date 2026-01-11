import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"label">;

export const Label = ({ className, ...props }: Props) => {
  return (
    <label
      className={cn("text-sm font-medium text-zinc-900", className)}
      {...props}
    />
  );
};
