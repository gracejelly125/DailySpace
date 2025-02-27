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
      <div className="w-full p-4 flex flex-col gap-4">
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
        <button className="common-btn my-2" aria-label="로그인">
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
