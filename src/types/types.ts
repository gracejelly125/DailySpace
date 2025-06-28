import { Tables } from '@/types/supabase';

export type User = Tables<'users'>;

export type Todo = Tables<'todos'>;

export type Post = Tables<'posts'>;

export type SignInDataType = {
  email: string;
  password: string;
};

export type SignUpDataType = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};
