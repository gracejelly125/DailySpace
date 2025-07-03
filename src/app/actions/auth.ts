'use server';

import { SignUpDataType, User } from '@/types/types';
import { adminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';

/* 로그인 */
export const signin = async (
  email: string,
  password: string,
): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};

/* 회원가입 */
export const signup = async (data: SignUpDataType): Promise<void> => {
  const supabase = createClient();

  const { email, password, nickname } = data;

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
    },
  });

  if (signupError) {
    // 이메일 중복 에러 체크
    if (
      signupError.message.toLowerCase().includes('already registered') ||
      signupError.message.toLowerCase().includes('duplicate')
    ) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }
    throw new Error('회원가입에 실패했습니다.');
  }

  const user = signupData.user;

  if (!user || !user.id) {
    throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
  }

  // 사용자 정보를 users 테이블에 저장
  const { error: insertError } = await supabase.from('users').insert({
    id: user.id as string,
    email: user.email as string,
    nickname,
  });

  if (insertError) {
    throw new Error('사용자 정보를 저장하는 데 실패했습니다.');
  }

  await signout();
};

/* 로그아웃 */
export const signout = async (): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

/* 사용자 정보 가져오기 */
export const fetchUser = async (): Promise<User | null> => {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userError || !userData) {
    throw new Error(userError.message || '유저 정보를 가져올 수 없습니다.');
  }

  return userData;
};

/* 회원 탈퇴 */
export const deleteUserFromSupabase = async (): Promise<void> => {
  const supabase = createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);

  if (!session || !session.user) {
    throw new Error('사용자가 로그인하지 않았습니다.');
  }

  const { error } = await adminClient.deleteUser(session.user.id);

  if (error) throw new Error(error.message);
};
