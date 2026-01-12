import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  icon: React.ElementType;
  isPrimary?: boolean;
  className?: string;
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  isPrimary = false,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "group min-h-26.25 rounded-[10px] px-5 py-6",
        "transition-transform duration-200 ease-out will-change-transform",
        "hover:-translate-y-0.5",
        "focus-within:-translate-y-0.5",
        isPrimary ? "bg-granite-dark" : "bg-surface-2",
        isPrimary
          ? "hover:shadow-lg hover:shadow-black/20"
          : "hover:shadow-lg hover:shadow-black/10",
        className,
      )}
    >
      <div className="flex items-center gap-3.75">
        <div
          className={cn(
            "grid size-10.5 place-items-center rounded-full",
            "transition-transform duration-200 ease-out",
            "group-focus-within:scale-[1.06] group-hover:scale-[1.06]",
            isPrimary ? "bg-granite-mid" : "bg-surface-warm",
          )}
        >
          <Icon
            className={cn(
              "size-5 transition-transform duration-200 ease-out",
              "group-focus-within:scale-[1.04] group-hover:scale-[1.04]",
              isPrimary ? "text-accent" : "text-granite-dark",
            )}
          />
        </div>

        <div className="min-w-0 space-y-2.5">
          <p className="text-steel line-clamp-1 text-sm">{title}</p>
          <p
            className={cn(
              "mt-1 line-clamp-1 text-[26px] leading-none font-semibold",
              isPrimary ? "text-white" : "text-granite",
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
