import type { IUserInfo } from "@/app/authentication/types/user-types";
import { create } from "zustand";

interface User {
  user: IUserInfo | null;
  accessToken?: string | null;
  setUser: (user: IUserInfo | null) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<User>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logoutUser: () => set({ user: null }),
}));
