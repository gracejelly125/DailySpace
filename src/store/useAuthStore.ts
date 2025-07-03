import { Session } from '@supabase/supabase-js';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createClient } from '@/utils/supabase/client';
import { User } from '@/types/types';


export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  setAuth: (user: User | null, session: Session | null) => void;
  clearAuth: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      session: null,
      setAuth: (user, session) =>
        set(() => ({
          isLoggedIn: !!user,
          user,
          session,
        })),
      clearAuth: () => {
        set(() => ({
          isLoggedIn: false,
          user: null,
          session: null,
        }));
        localStorage.clear(); // 전체 삭제 
        localStorage.removeItem('auth-storage');
      },
      login: async ({ email, password }) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error('로그인에 실패했습니다.');
        }

        if (!data.session || !data.user) {
          throw new Error('로그인된 세션 또는 사용자가 없습니다.');
        }

        // users 테이블에서 추가 사용자 정보 가져오기
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError || !userData) {
          throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
        }

        set(() => ({
          isLoggedIn: true,
          user: userData,
          session: data.session,
        }));
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
