import React from 'react';

import Link from 'next/link';

import SignInForm from '@/app/sign-in/_components/SignInForm';

const SignInPage = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="text-2xl font-bold mx-auto mt-5 text-textBlack">로그인</h2>
      <SignInForm />
      <p className="mt-2 mb-2 mx-auto text-textBlack">
        아직 계정이 없으신가요?
      </p>
      <Link
        className="mx-auto border-b-2 border-warn px-1 text-textBlack"
        href="/sign-up"
      >
        회원가입
      </Link>
    </div>
  );
};

export default SignInPage;
