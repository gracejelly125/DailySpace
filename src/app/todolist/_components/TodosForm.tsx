'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useTodosMutation } from '@/app/todolist/_hooks/useTodosMutation';
import { getId } from '@/app/todolist/_utils/auth';

type FormValues = {
  title: string;
  content: string;
};

const TodosForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { addTodo } = useTodosMutation();

  const onSubmit = async (data: FormValues) => {
    const userId = await getId();

    if (!userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    addTodo.mutate(
      {
        title: data.title,
        content: data.content,
        status: false,
        user_id: userId,
      },
      {
        onSuccess: () => reset(),
      },
    );
  };

  return (
    <div className="flex flex-col p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="common-form flex flex-wrap justify-center items-center gap-4"
      >
        <div>
          <input
            id="title"
            type="text"
            className="w-full common-input md:w-[300px] text-sm"
            placeholder="제목을 입력해주세요."
            {...register('title', { required: '제목을 입력해주세요.' })}
          />
          {errors.title && (
            <p className="text-warn text-xs mt-1 ml-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="content"
            type="text"
            className="common-input w-full md:w-[300px] text-sm"
            placeholder="내용을 입력해주세요."
            {...register('content', { required: '내용을 입력해주세요.' })}
          />
          {errors.content && (
            <p className="text-warn text-xs mt-1 ml-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <button type="submit" className="common-btn ml-auto">
          📝 New Task
        </button>
      </form>
    </div>
  );
};

export default TodosForm;
