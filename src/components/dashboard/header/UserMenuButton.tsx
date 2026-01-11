import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  userName: string;
  avatarUrl?: string | null;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

export const UserMenuButton = ({
  userName,
  avatarUrl,
  onClick,
  className,
  disabled,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-granite bg-surface hover:bg-surface-hover transition-colors disabled:pointer-events-none disabled:opacity-50",
        "flex size-7 items-center justify-center overflow-hidden rounded-full p-0",
        "md:h-12 md:w-auto md:justify-start md:gap-3 md:overflow-visible md:rounded-full md:pr-4.75 md:pl-2",
        className,
      )}
    >
      <span className="relative size-7 overflow-hidden rounded-full bg-zinc-200">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userName}
            fill
            className="object-cover"
            sizes="28px"
          />
        ) : null}
      </span>

      <span className="hidden text-sm font-semibold md:inline">{userName}</span>
      <ChevronDown className="text-steel ml-auto hidden size-4 md:block" />
    </button>
  );
};
