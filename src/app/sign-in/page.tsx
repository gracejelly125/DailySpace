import React from 'react';

import Link from 'next/link';
import SignInForm from '@/app/sign-in/_components/SignInForm';

const SignInPage = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="text-xl font-bold mx-auto my-5">로그인</h2>
      <SignInForm />
      <p className="mt-5 mb-2 mx-auto">아직 계정이 없으신가요?</p>
      <Link className="mx-auto border-b border-red-500 px-1" href="/sign-up">
        회원가입
      </Link>
    </div>
  );
};

export default SignInPage;
