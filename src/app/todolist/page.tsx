import React from 'react';

import TodosForm from '@/app/todolist/_components/TodosForm';
import TodosList from '@/app/todolist/_components/TodosList';

const ToDoListPage = () => {
  return (
    <>
      <div className="flex flex-col p-5">
        <h1 className="text-center mb-6 text-3xl font-bold text-gray-600">
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
