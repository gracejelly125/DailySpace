import React from 'react';

import Link from 'next/link';

import SignUpForm from '@/app/sign-up/_components/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="text-xl font-bold mx-auto my-5">회원가입</h2>
      <SignUpForm />
      <p className="mt-5 mb-2 mx-auto">이미 계정이 있으신가요?</p>
      <Link className="mx-auto border-b border-red-500 px-1" href="/sign-in">
        로그인
      </Link>
    </div>
  );
};

export default SignUpPage;
