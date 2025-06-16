import { Todos } from '@/types/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchTodos = async (): Promise<Todos[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Todos[];
};

export const addTodo = async (todo: Omit<Todos, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('todos').insert([todo]);
  if (error) throw error;
  return data;
};

export const deleteTodo = async (id: string) => {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw error;
};

export const toggleStatus = async (todo: Todos) => {
  const newStatus = !todo.status;
  const { error } = await supabase
    .from('todos')
    .update({ status: newStatus })
    .eq('id', todo.id);
  if (error) throw error;
};
