'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodo, deleteTodo, toggleStatus } from '@/app/todolist/_utils/todos';
import { Todos } from '@/types/types';

export const useTodosMutation = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (todo: Omit<Todos, 'id' | 'created_at'>) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (todo: Todos) => toggleStatus(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    addTodo: addMutation,
    deleteTodo: deleteMutation,
    toggleStatus: toggleMutation,
  };
};
