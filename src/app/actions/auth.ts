'use server';

import { SignUpDataType, User } from '@/types/types';
import { adminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';

/* 회원가입 */
export const signup = async (
  data: SignUpDataType,
): Promise<{
  success: boolean;
  errorType?: 'email' | 'nickname' | 'other';
  message?: string;
}> => {
  const supabase = createClient();

  const { email, password, nickname } = data;

  // 이메일 중복 검사
  const { data: existingEmails, error: emailError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .limit(1);

  if (emailError) {
    return {
      success: false,
      errorType: 'other',
      message: '이메일 중복 검사 중 오류가 발생했습니다.',
    };
  }

  if (existingEmails && existingEmails.length > 0) {
    return {
      success: false,
      errorType: 'email',
      message: '이미 사용 중인 이메일입니다.',
    };
  }

  // 닉네임 중복 검사
  const { data: existingNicknames, error: nicknameError } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .limit(1);

  if (nicknameError) {
    return {
      success: false,
      errorType: 'other',
      message: '닉네임 중복 검사 중 오류가 발생했습니다.',
    };
  }

  if (existingNicknames && existingNicknames.length > 0) {
    return {
      success: false,
      errorType: 'nickname',
      message: '이미 사용 중인 닉네임입니다.',
    };
  }

  // 회원가입
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
    },
  });

  if (signupError) {
    if (
      signupError.message.toLowerCase().includes('already registered') ||
      signupError.message.toLowerCase().includes('duplicate')
    ) {
      return {
        success: false,
        errorType: 'email',
        message: '이미 사용 중인 이메일입니다.',
      };
    }
    return {
      success: false,
      errorType: 'other',
      message: '회원가입에 실패했습니다.',
    };
  }

  const user = signupData.user;

  if (!user || !user.id) {
    return {
      success: false,
      errorType: 'other',
      message: '사용자 정보를 가져오는 데 실패했습니다.',
    };
  }

  // 사용자 정보를 users 테이블에 저장
  const { error: insertError } = await supabase.from('users').insert({
    id: user.id as string,
    email: user.email as string,
    nickname,
  });

  if (insertError) {
    return {
      success: false,
      errorType: 'other',
      message: '사용자 정보를 저장하는 데 실패했습니다.',
    };
  }
  await signout();

  return { success: true };
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
