'use client';

import React, { useEffect, useState } from 'react';

import MypageForm from '@/app/mypage/_components/MypageForm';
import { fetchUserProfile } from '@/app/mypage/_utils/profile';

const Mypage = () => {
  const [currentNickname, setCurrentNickname] = useState('');

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setCurrentNickname(userProfile?.nickname ?? 'Guest');
      } catch (error) {
        console.error('유저 데이터 불러오기 실패:', error);
        setCurrentNickname('Guest');
      }
    };
    fetchUserProfileImage();
  }, []);

  return (
    <MypageForm
      currentNickname={currentNickname}
      setCurrentNickname={setCurrentNickname}
    />
  );
};

export default Mypage;
