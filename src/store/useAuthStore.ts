import { Session } from '@supabase/supabase-js';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/types';
import { createClient } from '@/utils/supabase/client';

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
        localStorage.clear();
        localStorage.removeItem('auth-storage');
      },
      login: async ({ email, password }) => {
        const supabase = createClient();

        // users 테이블에서 이메일 존재 여부 확인
        const { data: userExists, error: checkError } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single();

        if (checkError || !userExists) {
          throw new Error('존재하지 않는 아이디입니다.');
        }

        // 이메일 존재하면 로그인 시도
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          const msg = error.message.toLowerCase();
          if (
            msg.includes('invalid login credentials') ||
            msg.includes('invalid password')
          ) {
            throw new Error('비밀번호가 틀렸습니다.');
          } else {
            throw new Error('로그인에 실패했습니다.');
          }
        }

        if (!data.session || !data.user) {
          throw new Error('로그인된 세션 또는 사용자가 없습니다.');
        }

        // 추가 사용자 정보 가져오기
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
