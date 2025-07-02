'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Square, SquareCheckBig } from 'lucide-react';

import TodosItem from '@/app/todolist/_components/TodosItem';
import { useTodosMutation } from '@/app/todolist/_hooks/useTodosMutation';
import { useTodosQuery } from '@/app/todolist/_hooks/useTodosQuery';
import Loading from '@/components/common/Loading';
import { useAuth } from '@/providers/AuthProvider';

const filterOptions: { id: 'all' | 'undone' | 'done'; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'undone', label: '미완료' },
  { id: 'done', label: '완료' },
];

const TodosList = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const { data: todos = [], isPending, isError } = useTodosQuery(userId!);
  const { deleteTodo, toggleStatus } = useTodosMutation();

  const [filter, setFilter] = useState<'all' | 'undone' | 'done'>('all');

  const undoneTodos = todos.filter((todo) => !todo.status);
  const doneTodos = todos.filter((todo) => todo.status);

  const sections = [
    {
      id: 'undone',
      title: '투두 리스트 🚀',
      todos: undoneTodos,
      emptyMsg: '지금은 비어 있어요. 새 할 일을 추가해보세요! 😉',
      buttonText: <Square size={18} />,
      visible: filter === 'all' || filter === 'undone',
    },
    {
      id: 'done',
      title: '완료 리스트 🏁',
      todos: doneTodos,
      emptyMsg: '시작은 언제나 설레죠. 첫 번째 할 일을 완료해보세요! 😊',
      buttonText: <SquareCheckBig size={18} />,
      visible: filter === 'all' || filter === 'done',
    },
  ];

  if (!userId || isPending) return <Loading />;
  if (isError) return <p className="p-5 text-warn">에러가 발생했습니다.</p>;

  return (
    <div>
      {/* 필터 바 */}
      <div className="relative flex justify-center mb-6">
        <div className="flex gap-2 p-1 border border-primary rounded-full w-fit shadow-md">
          {filterOptions.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="relative px-4 py-2 rounded-full text-sm text-primary"
            >
              {filter === id && (
                <motion.div
                  layoutId="filter-indicator"
                  className="absolute inset-0 z-0 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${filter === id ? 'text-onPrimary' : ''}`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 섹션 렌더링 */}
      {sections
        .filter((section) => section.visible)
        .map(({ id, title, todos, emptyMsg, buttonText }) => (
          <section key={id} className="flex flex-col p-4">
            <h2 className="mb-6 text-lg font-bold ml-2 text-textBlack">
              {title}
            </h2>

            {todos.length === 0 ? (
              <p className="m-5 text-center text-textSub">{emptyMsg}</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 mx-auto">
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
    </div>
  );
};

export default TodosList;
