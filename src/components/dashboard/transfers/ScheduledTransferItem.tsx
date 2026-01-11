import { fmtSigned } from "@/lib/helpers/money";
import { cn } from "@/lib/utils";

import { AvatarImage } from "@/components/ui/AvatarImage";

import type { TTransferItem } from "./scheduledTransfers.types";

type Props = {
  item: TTransferItem;
  className?: string;
  onClick?: () => void;
};

export const ScheduledTransferItem = ({ item, className, onClick }: Props) => {
  return (
    <li className={className}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center justify-between gap-6 px-1 pt-3 pb-3.75 text-left",
          "hover:bg-surface-hover transition-colors",
        )}
      >
        <div className="flex min-w-0 items-center gap-3.75">
          <span className="bg-granite-soft relative size-10 shrink-0 overflow-hidden rounded-full">
            <AvatarImage
              src={item.avatarSrc}
              alt={item.name}
              fill
              className="object-cover"
              sizes="40px"
              fallbackSrc="/images/users/avatar-placeholder.png"
            />
          </span>

          <div className="min-w-0 space-y-2">
            <p className="text-granite line-clamp-1 truncate text-sm font-semibold">
              {item.name}
            </p>
            <p className="text-steel line-clamp-1 truncate text-xs font-medium">
              {item.dateText}
            </p>
          </div>
        </div>

        <div className="text-granite line-clamp-1 shrink-0 text-base font-semibold">
          {fmtSigned(item.amount, item.currency, item.type)}
        </div>
      </button>
    </li>
  );
};
