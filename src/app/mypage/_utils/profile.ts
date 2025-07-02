import { getId } from '@/app/todolist/_utils/auth';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchUserProfile = async () => {
  const userId = await getId();
  if (!userId) {
    console.error('유저 ID를 가져올 수 없습니다.');
    return;
  }

  const { data, error } = await supabase
    .from('users')
    .select('nickname')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('유저 정보 불러오기 실패:', error);
    return;
  }

  return data;
};

// 닉네임 변경
export const updateNickname = async (newNickname: string) => {
  const userId = await getId();
  if (!userId) {
    console.error('유저 ID를 가져올 수 없습니다.');
    return false;
  }

  const { error } = await supabase
    .from('users')
    .update({ nickname: newNickname })
    .eq('id', userId);

  if (error) {
    console.error('이미 사용 중인 닉네임입니다.', error);
    return false;
  }

  return true;
};

// 계정 삭제
export const requestDeleteUser = async () => {
  const userId = await getId();
  if (!userId) {
    console.error('유저 ID를 가져올 수 없습니다.');
    return false;
  }

  try {
    const response = await fetch('/api/delete-user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('계정 삭제 실패:', errorData?.error || response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('계정 삭제 요청 중 오류 발생:', error);
    return false;
  }
};

// 비밀번호 변경
export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.error('현재 비밀번호와 다른 비밀번호를 입력해주세요.');
    return false;
  }

  return true;
};
