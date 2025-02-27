import { Tables } from '@/types/supabase';

export type User = Tables<'users'>;

export type Todos = Tables<'todos'>;

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
  