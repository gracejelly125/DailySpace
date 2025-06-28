'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchTodos } from '@/app/todolist/_utils/todos';
import { Todo } from '@/types/types';

export const useTodosQuery = () => {
  return useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};
