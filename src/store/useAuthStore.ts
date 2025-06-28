import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/types';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    { name: 'auth-storage' },
  ),
);
