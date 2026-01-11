import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"p">;

export const ErrorText = ({ className, ...props }: Props) => {
  return (
    <p
      className={cn("text-xs font-medium text-red-600", className)}
      {...props}
    />
  );
};
