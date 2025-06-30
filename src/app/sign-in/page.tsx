import React from 'react';

import SignInForm from '@/app/sign-in/_components/SignInForm';
import SignUpPrompt from '@/app/sign-in/_components/SignUpPrompt';

const SignInPage = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="text-2xl font-bold mx-auto mt-5 text-textBlack">로그인</h2>
      <SignInForm />
      <SignUpPrompt />
    </div>
  );
};

export default SignInPage;
