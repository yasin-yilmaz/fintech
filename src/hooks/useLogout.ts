"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { logout } from "@/lib/api/auth/actions";
import { AuthApiError } from "@/lib/api/auth/errors";

type TOptions = {
  redirectTo?: string;
  onSuccess?: () => void;
  successMessage?: string;
};

export const useLogout = (options?: TOptions) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const doLogout = useCallback(async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const res = await logout();
      console.log("[logout] success:", res);

      toast.success(
        options?.successMessage ?? res.message ?? "Logged out successfully.",
      );

      options?.onSuccess?.();

      router.push(options?.redirectTo ?? "/signin");
      router.refresh();
    } catch (err) {
      if (err instanceof AuthApiError) {
        console.log("[logout] error:", {
          message: err.message,
          code: err.code,
        });
        toast.error(err.message);
        return;
      }

      console.log("[logout] unknown error:", err);
      toast.error("Something went wrong.");
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, options, router]);

  return {
    logout: doLogout,
    isLoggingOut,
  } as const;
};
