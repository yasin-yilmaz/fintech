"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { ErrorText } from "@/components/ui/ErrorText";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { PasswordToggleButton } from "../ui/PasswordToggleButton";

type TFormFieldProps = {
  id: string;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  className?: string;
  inputClassName?: string;

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
  const isPassword = type === "password";

  const [showPassword, setShowPassword] = useState(false);
  const effectiveType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  const isDisabled = Boolean(inputProps?.disabled);

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Label htmlFor={id}>{label}</Label>

      <div className={cn("relative", isPassword && "flex items-center")}>
        <Input
          id={id}
          type={effectiveType}
          placeholder={placeholder}
          className={cn(isPassword && "pr-11", inputClassName)}
          error={Boolean(error)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />

        {isPassword ? (
          <PasswordToggleButton
            isVisible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            disabled={isDisabled}
          />
        ) : null}
      </div>

      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
};
