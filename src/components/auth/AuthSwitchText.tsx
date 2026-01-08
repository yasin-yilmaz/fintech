import type { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

import { UnderlinedLink } from "@/components/ui/UnderlinedLink";

type Props = {
  text: string;
  linkText: React.ReactNode;
  href: LinkProps["href"];
  className?: string;
};

export const AuthSwitchText = ({ text, linkText, href, className }: Props) => {
  return (
    <p className={cn("text-granite-muted pt-2 text-center text-sm", className)}>
      {text} <UnderlinedLink href={href}>{linkText}</UnderlinedLink>
    </p>
  );
};
