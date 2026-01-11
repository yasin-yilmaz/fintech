import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type TCommonProps = {
  label?: string;
  className?: string;
  iconClassName?: string;
};

type TAsLink = TCommonProps & {
  as?: "link";
} & React.ComponentProps<typeof Link>;

type TAsButton = TCommonProps & {
  as: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = TAsLink | TAsButton;

const baseClass =
  "text-accent-emerald cursor-pointer group hover:text-accent-emerald-hover inline-flex items-center gap-1 text-sm font-semibold";
const iconBaseClass = "size-4 transition-transform group-hover:translate-x-0.5";

export const ViewAllLink = (props: Props) => {
  const {
    label = "View All",
    className,
    iconClassName,
    ...rest
  } = props as Props;

  if (props.as === "button") {
    const btnProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        type={btnProps.type ?? "button"}
        {...btnProps}
        className={cn(baseClass, className)}
      >
        {label}
        <ChevronRight className={cn(iconBaseClass, iconClassName)} />
      </button>
    );
  }

  const linkProps = rest as React.ComponentProps<typeof Link>;

  return (
    <Link {...linkProps} className={cn(baseClass, className)}>
      {label}
      <ChevronRight className={cn(iconBaseClass, iconClassName)} />
    </Link>
  );
};
