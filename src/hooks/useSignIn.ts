"use client"

import { useAuth } from '@/providers/AuthProvider';
import { SignInDataType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signinSchema = z.object({
  email: z
    .string()
    .nonempty('아이디를 입력해주세요.')
    .email('이메일 형식으로 입력해주세요.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

const useSignIn = () => {
    const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setValue('email', localStorage.getItem('user_email') || '');
  }, [setValue]);

  const onSubmit = async (values: SignInDataType) => {
    try {
      await login(values);
      window.location.href = '/';
    } catch (error) {
        console.error('로그인 중 오류가 발생했습니다:', error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useSignIn;