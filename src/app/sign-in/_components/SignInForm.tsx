'use client';

import InputField from '@/components/auth/InputField';
import useSignIn from '@/hooks/useSignIn';

const SignInForm = () => {
  const { handleSubmit, register, onSubmit, errors } = useSignIn();

  return (
    <form
      className="common-form flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="common-box">
        <InputField
          id="email"
          label="아이디"
          register={register}
          error={errors.email?.message}
        />
        <InputField
          id="password"
          label="비밀번호"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <button className="common-btn !py-3 my-2" aria-label="로그인">
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
