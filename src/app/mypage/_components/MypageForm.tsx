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

// 🔒 스키마 정의
const mypageSchema = z.object({
  newNickname: z
    .string()
    .nonempty('닉네임을 입력해주세요.')
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(6, '닉네임은 6자 이하이어야 합니다.'),
  newPassword: z
    .string()
    .nonempty('새 비밀번호를 입력해주세요.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      '영문, 숫자, 특수문자 포함 6~20자로 입력해주세요.',
    ),
});

type MypageFormValues = z.infer<typeof mypageSchema>;

const MypageForm = ({
  currentNickname,
  setCurrentNickname,
}: MypageFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MypageFormValues>({
    resolver: zodResolver(mypageSchema),
    mode: 'onChange',
    defaultValues: {
      newNickname: currentNickname,
      newPassword: '',
    },
  });

  useEffect(() => {
    setValue('newNickname', currentNickname);
  }, [currentNickname, setValue]);

  const handleNicknameChange = async (values: MypageFormValues) => {
    if (values.newNickname === currentNickname) {
      console.error('기존 닉네임과 같습니다.');
      return;
    }

    const isSuccess = await updateNickname(values.newNickname);
    if (!isSuccess) {
      console.error('닉네임 변경에 실패했습니다.');
      return;
    }

    setCurrentNickname(values.newNickname);
    reset({ ...values, newNickname: '', newPassword: '' });
  };

  const handlePasswordChange = async (values: MypageFormValues) => {
    const isSuccess = await updatePassword(values.newPassword);
    if (!isSuccess) {
      console.error('비밀번호 변경에 실패했습니다.');
      return;
    }

    reset({ ...values, newNickname: values.newNickname, newPassword: '' });
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
      <div className="w-[500px] flex flex-col gap-2 border p-5 mb-5 rounded-lg">
        <form
          onSubmit={handleSubmit(handleNicknameChange)}
          className="flex items-center gap-2"
        >
          <input
            className="common-input flex-1"
            type="text"
            placeholder="닉네임"
            {...register('newNickname')}
          />
          <button type="submit" className="common-btn w-[140px]">
            닉네임 변경
          </button>
        </form>
        <div className="h-[20px] text-sm leading-[20px]">
          {errors.newNickname && (
            <span className="text-red-500 block">
              {errors.newNickname.message}
            </span>
          )}
        </div>

        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className="flex items-center gap-2"
        >
          <input
            className="common-input flex-1"
            type="password"
            placeholder="새 비밀번호"
            {...register('newPassword')}
          />
          <button type="submit" className="common-btn w-[140px]">
            비밀번호 변경
          </button>
        </form>
        <div className="h-[20px] text-sm leading-[20px]">
          {errors.newPassword && (
            <span className="text-red-500 block">
              {errors.newPassword.message}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="common-btn ml-auto"
      >
        계정 삭제
      </button>
    </div>
  );
};

export default MypageForm;
