'use client';

import Image from 'next/image';

import { useSocialLogin } from '@/hooks/useSocialLogin';

const SocialLogin = () => {
  const { handleSocialLogin } = useSocialLogin();

  return (
    <div className="flex items-center justify-center space-x-6">
      <button
        onClick={() => handleSocialLogin('kakao')}
        className="flex h-12 w-12 items-center justify-center rounded-full"
      >
        <Image
          src="/assets/KakaoLogo.svg"
          alt="카카오 로그인"
          width={100}
          height={100}
        />
      </button>
      <button
        onClick={() => handleSocialLogin('google')}
        className="flex h-12 w-12 items-center justify-center rounded-full"
      >
        <Image
          src="/assets/GoogleLogo.svg"
          alt="구글 로그인"
          width={100}
          height={100}
        />
      </button>
    </div>
  );
};

export default SocialLogin;
