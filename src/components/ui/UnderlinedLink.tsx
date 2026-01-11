import Link, { type LinkProps } from "next/link";

import { cn } from "@/lib/utils";

import { CurvedUnderline } from "@/components/ui/CurvedUnderline";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
};

export const UnderlinedLink = ({
  children,
  className,
  underlineClassName,
  ...props
}: Props) => {
  return (
    <Link
      {...props}
      className={cn(
        "relative inline-flex font-semibold",
        "text-granite transition-colors duration-200",
        "group hover:text-accent-dark focus-visible:text-accent-dark",
        "focus-visible:ring-accent/40 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        className,
      )}
    >
      {children}

      <CurvedUnderline
        className={cn(
          "text-accent",
          "opacity-60 transition-all duration-200 ease-out",
          "group-hover:translate-y-px group-hover:opacity-100",
          "group-focus-visible:translate-y-px group-focus-visible:opacity-100",
          underlineClassName,
        )}
      />
    </Link>
  );
};
