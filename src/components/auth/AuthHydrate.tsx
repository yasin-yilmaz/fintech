"use client";

import { useEffect } from "react";

import type { TProfileUser } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/auth.store";

type Props = {
  user: TProfileUser | null;
  children: React.ReactNode;
};

export const AuthHydrate = ({ user, children }: Props) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return <>{children}</>;
};
