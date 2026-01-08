import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

const AuthHeader = ({ title, subtitle, className }: Props) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-granite text-3xl leading-none font-semibold">
        {title}
      </h1>
      {subtitle && <p className="text-granite-muted text-base">{subtitle}</p>}
    </div>
  );
};

export default AuthHeader;
