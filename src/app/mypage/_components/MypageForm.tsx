'use client';

import React, { useEffect, useState } from 'react';

import {
  requestDeleteUser,
  updateNickname,
  updatePassword,
} from '@/app/mypage/_utils/profile';

interface MypageFormProps {
  currentNickname: string;
  setCurrentNickname: React.Dispatch<React.SetStateAction<string>>;
}

const MypageForm = ({
  currentNickname,
  setCurrentNickname,
}: MypageFormProps) => {
  const [newNickname, setNewNickname] = useState(currentNickname);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    setNewNickname(currentNickname);
  }, [currentNickname]);

  const handleNicknameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newNickname || newNickname === currentNickname) {
      console.error('변경할 닉네임을 입력해주세요!');
      return;
    }

    if (newNickname.length < 2) {
      console.error('2자 이상의 닉네임을 입력해주세요!');
      return;
    }

    const isSuccess = await updateNickname(newNickname);
    if (!isSuccess) {
      console.error('닉네임 변경에 실패했습니다.');
      return;
    }

    setCurrentNickname(newNickname);
    setNewNickname('');
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword) {
      console.error('새 비밀번호를 입력해주세요!');
      return;
    }

    const isSuccess = await updatePassword(newPassword);
    if (!isSuccess) {
      console.error('비밀번호 변경에 실패했습니다.');
      return;
    }

    setNewPassword('');
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
        <form className="flex justify-between" onSubmit={handleNicknameChange}>
          <input
            className="common-input"
            type="text"
            value={newNickname}
            placeholder="닉네임"
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <button type="submit" className="common-btn">
            닉네임 변경
          </button>
        </form>
        <form className="flex justify-between" onSubmit={handlePasswordChange}>
          <input
            className="common-input"
            type="password"
            value={newPassword}
            placeholder="새 비밀번호"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit" className="common-btn">
            비밀번호 변경
          </button>
        </form>
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
