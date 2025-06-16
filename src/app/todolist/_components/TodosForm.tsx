'use client';

import React from 'react';

import { useForm } from 'react-hook-form';

import { useTodosMutation } from '@/app/todolist/_hooks/useTodosMutation';
import { getId } from '@/app/todolist/_utils/auth';

type FormValues = {
  title: string;
  content: string;
};

const TodosForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { addTodo } = useTodosMutation();

  const onSubmit = async (data: FormValues) => {
    const userId = await getId();

    if (!userId) {
      alert('로그인이 필요합니다.');
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
    <div className="flex flex-col border-b p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="common-form mb-5 flex flex-wrap items-end gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-gray-600">
            제목
          </label>
          <input
            id="title"
            type="text"
            className="common-input w-[300px] text-sm"
            placeholder="제목을 입력해주세요."
            {...register('title', { required: '제목을 입력해주세요.' })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="text-gray-600">
            내용
          </label>
          <input
            id="content"
            type="text"
            className="common-input w-[300px] text-sm"
            placeholder="내용을 입력해주세요."
            {...register('content', { required: '내용을 입력해주세요.' })}
          />
        </div>
        <button type="submit" className="common-btn ml-auto">
          추가
        </button>
      </form>
    </div>
  );
};

export default TodosForm;
