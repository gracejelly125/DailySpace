import React from 'react';

import TodosForm from '@/app/todolist/_components/TodosForm';
import TodosList from '@/app/todolist/_components/TodosList';

const ToDoListPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-center text-2xl font-bold mt-5 text-textBlack">
          To Do List
        </h1>
        <div className="space-y-4">
          <TodosForm />
          <TodosList />
        </div>
      </div>
    </>
  );
};

export default ToDoListPage;
