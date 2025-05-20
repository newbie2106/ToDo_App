// src/features/todos/TodoList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import type { TodoState } from '../../types/todo.type';
import type { RootState } from '../../store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos as TodoState);

  if (todos.length === 0) {
    return (
      <div className="bg-gray-50 border rounded p-8 text-center">
        <p className="text-gray-500">Bạn chưa có công việc nào. Hãy thêm công việc mới!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;