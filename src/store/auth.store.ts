import { create } from "zustand";

import type { TProfileUser } from "@/schemas/auth.schema";

type TAuthState = {
  user: TProfileUser | null;
  setUser: (user: TProfileUser | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create<TAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
