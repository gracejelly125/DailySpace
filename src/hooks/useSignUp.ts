'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { signup } from '@/app/actions/auth';
import { SignUpDataType } from '@/types/types';

export const signupSchema = z
  .object({
    email: z
      .string()
      .nonempty('아이디를 입력해주세요.')
      .email('이메일 형식으로 입력해주세요.'),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        ),
        '영문, 숫자, 특수문자 포함 6~20자로 입력해주세요.',
      ),
    passwordConfirm: z.string().nonempty('비밀번호를 한 번 더 입력해주세요.'),
    nickname: z
      .string()
      .nonempty('닉네임을 입력해주세요.')
      .min(2, '닉네임은 2글자 이상이어야 합니다.')
      .max(6, '닉네임은 6글자 이하이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const useSignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const onSubmit = async (values: SignUpDataType) => {
    const result = await signup(values);

    if (!result.success) {
      if (result.errorType === 'email') {
        toast.error('이미 사용 중인 이메일입니다.');
      } else if (result.errorType === 'nickname') {
        toast.error('이미 사용 중인 닉네임입니다.');
      } else {
        toast.error(
          result.message ||
            '회원 가입 중 오류가 발생했습니다. 다시 시도해주세요.',
        );
      }
      return;
    }

    toast.success('회원가입에 성공했습니다!');
    router.push('/sign-in');
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useSignUp;
