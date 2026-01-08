import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  src?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <span
      aria-label="Fintech"
      role="img"
      className={cn(
        "inline-block h-9 w-9",

        "mask-[url('/images/brand/logo.svg')] mask-contain mask-center mask-no-repeat",
        "[-webkit-mask-image:url('/images/brand/logo.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]",

        "bg-zinc-900",
        className,
      )}
    />
  );
};
