import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type TFormFieldProps = {
  id: string;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName,
}: TFormFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
};
