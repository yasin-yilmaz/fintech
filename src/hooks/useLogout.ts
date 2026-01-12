"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { logout } from "@/lib/api/auth/actions";

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

    setIsLoggingOut(true);
    try {
      const res = await logout();

      if (!res.ok) {
        toast.error(res.message || "Logout failed.");
        router.push(options?.redirectTo ?? "/signin");
        router.refresh();
        return;
      }

      console.log("[logout] success:", res.data);

      toast.success(
        options?.successMessage ?? res.message ?? "Logged out successfully.",
      );

      options?.onSuccess?.();

      router.push(options?.redirectTo ?? "/signin");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, options, router]);

  return {
    logout: doLogout,
    isLoggingOut,
  } as const;
};
