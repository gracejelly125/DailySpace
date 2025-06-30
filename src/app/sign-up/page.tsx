import React from 'react';

import SignInPrompt from '@/app/sign-up/_components/SignInPrompt';
import SignUpForm from '@/app/sign-up/_components/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="text-2xl font-bold mx-auto mt-5 text-textBlack">
        회원가입
      </h2>
      <SignUpForm />
      <SignInPrompt />
    </div>
  );
};

export default SignUpPage;
