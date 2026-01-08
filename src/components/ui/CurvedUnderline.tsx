import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const CurvedUnderline = ({ className }: Props) => {
  return (
    <svg
      width="45"
      height="8"
      viewBox="0 0 45 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2",
        className,
      )}
      aria-hidden="true"
    >
      <path
        d="M0.901001 6.5C7.47045 1.56444 34.4948 -1.70074 43.901 6.49999"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
};
