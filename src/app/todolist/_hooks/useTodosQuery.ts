'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchTodos } from '@/app/todolist/_utils/todos';
import { Todo } from '@/types/types';

export const useTodosQuery = (userId: string | null) => {
  return useQuery<Todo[], Error>({
    queryKey: ['todos', userId],
    queryFn: () => fetchTodos(userId!),
    enabled: !!userId,
  });
};
