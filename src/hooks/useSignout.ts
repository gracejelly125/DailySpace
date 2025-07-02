'use client';

import { useRouter } from 'next/navigation';

import { signout } from '@/app/actions/auth';
import useAuthStore from '@/store/useAuthStore';

export const useSignout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    await signout();
    clearAuth();
    router.push('/sign-in');
  };

  return { handleLogout };
};
