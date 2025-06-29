'use client';

import InputField from '@/components/auth/InputField';
import useSignUp from '@/hooks/useSignUp';

const SignUpForm = () => {
  const { handleSubmit, register, onSubmit, errors } = useSignUp();

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
        <InputField
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          register={register}
          error={errors.passwordConfirm?.message}
        />
        <InputField
          id="nickname"
          label="닉네임"
          register={register}
          error={errors.nickname?.message}
        />
        <button className="common-btn !py-3 my-2" aria-label="회원가입">
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
