'use client';

import React from 'react';

import InputField from '@/components/auth/InputField';
import useMypage from '@/hooks/useMypage';

interface MypageFormProps {
  currentNickname: string;
  setCurrentNickname: React.Dispatch<React.SetStateAction<string>>;
}

const MypageForm = ({
  currentNickname,
  setCurrentNickname,
}: MypageFormProps) => {
  const {
    nicknameForm,
    passwordForm,
    handleNicknameChange,
    handlePasswordChange,
    handleDeleteAccount,
  } = useMypage(currentNickname, setCurrentNickname);

  return (
    <div className="common-form flex flex-col items-center mt-2">
      <div className="common-box !p-5">
        {/* 닉네임 변경 폼 */}
        <form
          onSubmit={nicknameForm.handleSubmit(handleNicknameChange)}
          className="flex flex-col md:flex-row items-start gap-2 md:gap-0"
        >
          <InputField
            id="newNickname"
            register={nicknameForm.register}
            error={nicknameForm.formState.errors.newNickname?.message}
          />
          <button
            type="submit"
            className="common-btn md:ml-auto mt-2 md:mt-1 w-full md:w-auto"
          >
            닉네임 변경
          </button>
        </form>

        {/* 비밀번호 변경 폼 */}
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
          className="flex flex-col md:flex-row items-start gap-2 md:gap-0 mt-4"
        >
          <InputField
            id="newPassword"
            type="password"
            register={passwordForm.register}
            error={passwordForm.formState.errors.newPassword?.message}
          />
          <button
            type="submit"
            className="common-btn md:ml-auto mt-2 md:mt-1 w-full md:w-auto"
          >
            비밀번호 변경
          </button>
        </form>
      </div>

      {/* 계정 삭제 버튼 */}
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="warn-btn mt-10"
      >
        계정 삭제 😭
      </button>
    </div>
  );
};

export default MypageForm;
