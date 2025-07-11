'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { signout } from '@/app/actions/auth';
import {
  requestDeleteUser,
  updateNickname,
  updatePassword,
} from '@/app/mypage/_utils/profile';
import useAuthStore from '@/store/useAuthStore';

const nicknameSchema = z.object({
  newNickname: z
    .string()
    .nonempty('닉네임을 입력해주세요.')
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(6, '닉네임은 6자 이하이어야 합니다.'),
});

const passwordSchema = z.object({
  newPassword: z
    .string()
    .nonempty('새 비밀번호를 입력해주세요.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      '영문, 숫자, 특수문자 포함 6~20자로 입력해주세요.',
    ),
});

export type NicknameFormValues = z.infer<typeof nicknameSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;

const useMypage = (
  currentNickname: string,
  setCurrentNickname: React.Dispatch<React.SetStateAction<string>>,
) => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const nicknameForm = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
    defaultValues: {
      newNickname: currentNickname,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
    },
  });

  useEffect(() => {
    nicknameForm.setValue('newNickname', currentNickname);
  }, [nicknameForm, currentNickname, nicknameForm.setValue]);

  const handleNicknameChange = async (values: NicknameFormValues) => {
    if (values.newNickname === currentNickname) {
      toast.error('기존 닉네임과 같습니다.');
      return;
    }

    const isSuccess = await updateNickname(values.newNickname);
    if (!isSuccess) {
      toast.error('닉네임 변경에 실패했습니다.');
      return;
    }

    toast.success('닉네임이 변경되었습니다.');
    setCurrentNickname(values.newNickname);
    nicknameForm.reset({ newNickname: '' });
  };

  const handlePasswordChange = async (values: PasswordFormValues) => {
    const isSuccess = await updatePassword(values.newPassword);
    if (!isSuccess) {
      toast.error('비밀번호 변경에 실패했습니다.');
      return;
    }

    toast.success('비밀번호가 변경되었습니다.');
    passwordForm.reset({ newPassword: '' });
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('정말로 계정을 삭제하시겠습니까?');
    if (!confirmed) return;

    const isSuccess = await requestDeleteUser();
    if (!isSuccess) {
      toast.error('계정 삭제에 실패했습니다.');
      return;
    }

    try {
      await signout();
      clearAuth();
      toast.success('계정이 삭제되었습니다.');
      router.replace('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    nicknameForm,
    passwordForm,
    handleNicknameChange,
    handlePasswordChange,
    handleDeleteAccount,
  };
};

export default useMypage;
