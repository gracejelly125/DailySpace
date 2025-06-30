import React from 'react';

import { Trash2 } from 'lucide-react';

import useDayjs from '@/hooks/useDayjs';
import { Todo } from '@/types/types';

interface TodoItemProps {
  todo: Todo;
  deleteButtonHandler: () => void;
  cancelButtonHandler: () => void;
  buttonText: string | React.JSX.Element;
}

const TodosItem = ({
  todo,
  deleteButtonHandler,
  cancelButtonHandler,
  buttonText,
}: TodoItemProps) => {
  const dayjs = useDayjs();

  return (
    <li className="relative h-[200px] w-[200px] bg-memoBg border border-memoBorder p-4 shadow-md">
      <span
        className="absolute -top-3 left-1/2 text-2xl rotate-[10deg] drop-shadow"
        aria-hidden="true"
      >
        📌
      </span>
      <div className="flex items-center h-full mt-2">
        <div className="mr-3">
          <button onClick={cancelButtonHandler} className="text-warn">
            {buttonText}
          </button>
        </div>

        <div className="flex flex-col space-y-1">
          <p
            className={`font-bold break-words leading-5 ${
              todo.status ? 'text-gray-400 line-through' : 'text-textMain'
            }`}
          >
            {todo.title}
          </p>
          <p
            className={`break-words leading-5 ${
              todo.status ? 'text-gray-400 line-through' : 'text-textSub'
            }`}
          >
            {todo.content}
          </p>
        </div>
      </div>

      <time
        className={`absolute top-8 left-3 text-xs text-textSub ${
          todo.status ? '!text-gray-400 line-through' : ''
        }`}
      >
        {dayjs(todo.created_at).format('YYYY년 M월 D일 dddd')}
      </time>

      <div className="absolute bottom-2 right-3">
        <button onClick={deleteButtonHandler} className="text-warn">
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodosItem;
