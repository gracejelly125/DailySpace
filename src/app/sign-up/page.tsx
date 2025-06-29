import React from 'react';

import Link from 'next/link';

import SignUpForm from '@/app/sign-up/_components/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="text-2xl font-bold mx-auto mt-5 text-textBlack">
        회원가입
      </h2>
      <SignUpForm />
      <p className="mt-2 mb-2 mx-auto text-textBlack">
        이미 계정이 있으신가요?
      </p>
      <Link
        className="mx-auto border-b-2 border-warn px-1 text-textBlack"
        href="/sign-in"
      >
        로그인
      </Link>
    </div>
  );
};

export default SignUpPage;
