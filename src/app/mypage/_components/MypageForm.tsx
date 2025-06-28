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
    <div className="common-form flex flex-col items-center">
      <div className="common-box !max-w-sm">
        {/* 닉네임 변경 폼 */}
        <form
          onSubmit={nicknameForm.handleSubmit(handleNicknameChange)}
          className="flex items-start"
        >
          <InputField
            id="newNickname"
            register={nicknameForm.register}
            error={nicknameForm.formState.errors.newNickname?.message}
          />
          <button type="submit" className="common-btn !px-6 ml-auto mt-1">
            닉네임 변경
          </button>
        </form>

        {/* 비밀번호 변경 폼 */}
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
          className="flex items-start"
        >
          <InputField
            id="newPassword"
            type="password"
            register={passwordForm.register}
            error={passwordForm.formState.errors.newPassword?.message}
          />
          <button type="submit" className="common-btn ml-auto mt-1">
            비밀번호 변경
          </button>
        </form>
      </div>

      {/* 계정 삭제 버튼 */}
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="common-btn mt-20"
      >
        계정 삭제 😭
      </button>
    </div>
  );
};

export default MypageForm;
