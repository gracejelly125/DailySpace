'use client';

import React from 'react';

import { Square, SquareCheckBig } from 'lucide-react';

import TodosItem from '@/app/todolist/_components/TodosItem';
import { useTodosMutation } from '@/app/todolist/_hooks/useTodosMutation';
import { useTodosQuery } from '@/app/todolist/_hooks/useTodosQuery';

const TodosList = () => {
  const { data: todos = [], isPending, isError } = useTodosQuery();
  const { deleteTodo, toggleStatus } = useTodosMutation();

  const undoneTodos = todos.filter((todo) => !todo.status);
  const doneTodos = todos.filter((todo) => todo.status);

  const sections = [
    {
      id: 'undone',
      title: '할 일',
      todos: undoneTodos,
      emptyMsg: '할 일이 없습니다.',
      buttonText: <Square size={18} />,
    },
    {
      id: 'done',
      title: '완료된 일',
      todos: doneTodos,
      emptyMsg: '완료된 일이 없습니다.',
      buttonText: <SquareCheckBig size={18} />,
    },
  ];

  if (isPending) return <p className="p-5">로딩 중...</p>;
  if (isError) return <p className="p-5 text-red-500">에러가 발생했습니다.</p>;

  return (
    <>
      {sections.map(({ id, title, todos, emptyMsg, buttonText }) => (
        <section key={id} className="flex flex-col p-5">
          <h2 className="mb-4 text-lg font-bold text-gray-600 ml-2">{title}</h2>

          {todos.length === 0 ? (
            <p className="m-5 text-center text-gray-500">{emptyMsg}</p>
          ) : (
            <ul className="flex flex-wrap gap-5 p-4">
              {todos.map((todo) => (
                <TodosItem
                  key={todo.id}
                  todo={todo}
                  deleteButtonHandler={() => deleteTodo.mutate(todo.id)}
                  cancelButtonHandler={() => toggleStatus.mutate(todo)}
                  buttonText={buttonText}
                />
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
};

export default TodosList;
