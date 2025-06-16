'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchTodos } from '@/app/todolist/_utils/todos';
import { Todos } from '@/types/types';

export const useTodosQuery = () => {
  return useQuery<Todos[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};
