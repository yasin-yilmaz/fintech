import * as React from "react";

import { cn } from "@/lib/utils";

import { ErrorText } from "@/components/ui/ErrorText";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type TFormFieldProps = {
  id: string;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  className?: string;
  inputClassName?: string;

  // ✅ new
  error?: string;
  inputProps?: React.ComponentProps<"input">;
};

export const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName,
  error,
  inputProps,
}: TFormFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        error={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />

      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
};
