import React from 'react';

import { Todo } from '@/types/types';

interface TodoItemProps {
  todo: Todo;
  deleteButtonHandler: () => void;
  cancelButtonHandler: () => void;
  buttonText: string;
}

const TodosItem = ({
  todo,
  deleteButtonHandler,
  cancelButtonHandler,
  buttonText,
}: TodoItemProps) => {
  return (
    <li
      className={`flex items-center rounded-xl border p-4 ${
        !todo.status ? 'border-red-500' : ''
      }`}
    >
      <div className="flex flex-col">
        <h3
          className={`text-lg font-bold ${
            todo.status ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </h3>
        <p
          className={`text-lg ${
            todo.status ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          {todo.content}
        </p>
      </div>

      <div className="ml-auto flex flex-col gap-1">
        <button
          onClick={deleteButtonHandler}
          className="common-btn py-1 text-sm"
        >
          삭제
        </button>
        <button
          onClick={cancelButtonHandler}
          className="common-btn py-1 text-sm"
        >
          {buttonText}
        </button>
      </div>
    </li>
  );
};

export default TodosItem;
