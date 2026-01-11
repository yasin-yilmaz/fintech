import { cn } from "@/lib/utils";

type Props = {
  "aria-label": string;
  icon: React.ElementType;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;

  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "solid";
};

export const IconButton = ({
  icon: Icon,
  type = "button",
  size = "md",
  variant = "ghost",
  className,
  ...props
}: Props) => {
  const sizeClass =
    size === "sm" ? "size-8" : size === "lg" ? "size-10" : "size-9";

  const variantClass =
    variant === "solid"
      ? "bg-surface-hover text-granite"
      : "text-steel hover:bg-surface-hover hover:text-granite";

  return (
    <button
      type={type}
      className={cn(
        "grid cursor-pointer place-items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50",
        sizeClass,
        variantClass,
        className,
      )}
      {...props}
    >
      <Icon className="size-5" />
    </button>
  );
};
