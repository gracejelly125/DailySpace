'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  requestDeleteUser,
  updateNickname,
  updatePassword,
} from '@/app/mypage/_utils/profile';

interface MypageFormProps {
  currentNickname: string;
  setCurrentNickname: React.Dispatch<React.SetStateAction<string>>;
}

// ✅ 각각의 스키마 정의
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

type NicknameFormValues = z.infer<typeof nicknameSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const MypageForm = ({
  currentNickname,
  setCurrentNickname,
}: MypageFormProps) => {
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
  }, [currentNickname, nicknameForm.setValue]);

  const handleNicknameChange = async (values: NicknameFormValues) => {
    if (values.newNickname === currentNickname) {
      console.error('기존 닉네임과 같습니다.');
      return;
    }

    const isSuccess = await updateNickname(values.newNickname);
    if (!isSuccess) {
      console.error('닉네임 변경에 실패했습니다.');
      return;
    }
    alert('닉네임이 변경되었습니다.');
    setCurrentNickname(values.newNickname);
    nicknameForm.reset({ newNickname: '' });
  };

  const handlePasswordChange = async (values: PasswordFormValues) => {
    const isSuccess = await updatePassword(values.newPassword);
    if (!isSuccess) {
      console.error('비밀번호 변경에 실패했습니다.');
      return;
    }
    alert('비밀번호가 변경되었습니다.');
    passwordForm.reset({ newPassword: '' });
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('정말로 계정을 삭제하시겠습니까?');
    if (!confirmed) return;

    const isSuccess = await requestDeleteUser();
    if (!isSuccess) {
      console.error('계정 삭제에 실패했습니다.');
      return;
    }

    window.location.href = '/';
  };

  return (
    <div className="common-form flex flex-col items-center">
      <div className="w-[500px] flex flex-col gap-2 p-5 mb-5">
        {/* 닉네임 변경 폼 */}
        <form
          onSubmit={nicknameForm.handleSubmit(handleNicknameChange)}
          className="flex items-center gap-2"
        >
          <input
            className="common-input flex-1"
            type="text"
            placeholder="닉네임"
            {...nicknameForm.register('newNickname')}
          />
          <button type="submit" className="common-btn w-[140px]">
            닉네임 변경
          </button>
        </form>
        <div className="h-[20px] text-sm leading-[20px]">
          {nicknameForm.formState.errors.newNickname && (
            <span className="text-red-500 block">
              {nicknameForm.formState.errors.newNickname.message}
            </span>
          )}
        </div>

        {/* 비밀번호 변경 폼 */}
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
          className="flex items-center gap-2"
        >
          <input
            className="common-input flex-1"
            type="password"
            placeholder="새 비밀번호"
            {...passwordForm.register('newPassword')}
          />
          <button type="submit" className="common-btn w-[140px]">
            비밀번호 변경
          </button>
        </form>
        <div className="h-[20px] text-sm leading-[20px]">
          {passwordForm.formState.errors.newPassword && (
            <span className="text-red-500 block">
              {passwordForm.formState.errors.newPassword.message}
            </span>
          )}
        </div>
      </div>

      {/* 계정 삭제 버튼 */}
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="common-btn"
      >
        계정 삭제
      </button>
    </div>
  );
};

export default MypageForm;
