'use client';

import { Session } from '@supabase/supabase-js';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/useAuthStore';
import { createClient } from '@/utils/supabase/client';

const useCheckAuth = (isReady: boolean) => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!isReady) return;

    const supabase = createClient();

    const checkAuthState = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('세션 정보 가져오기 실패했습니다.:', error.message);
        return;
      }

      if (data.session) {
        const { user, access_token, refresh_token, expires_in, token_type } =
          data.session;

        const nickname =
          user.user_metadata?.nickname ??
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          '익명 사용자';

        setAuth(
          {
            id: user.id,
            email: user.email ?? '',
            nickname: nickname,
            created_at: user.created_at,
          },
          {
            access_token,
            refresh_token,
            expires_in,
            token_type,
            user,
          } as Session,
        );
      } else {
        clearAuth();
      }
    };

    checkAuthState();
  }, [isReady, setAuth, clearAuth, router]);
};

export default useCheckAuth;
