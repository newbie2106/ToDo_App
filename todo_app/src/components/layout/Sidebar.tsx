import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { TodoState } from '../../types/todo.type';

const Sidebar: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos as TodoState);
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <aside className="bg-gray-100 dark:bg-gray-700 w-64 p-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4">Thống kê</h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Tổng số công việc:</span>
          <span className="font-medium">{todos.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Đã hoàn thành:</span>
          <span className="font-medium text-green-600 dark:text-green-400">{completedCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Chưa hoàn thành:</span>
          <span className="font-medium text-orange-500 dark:text-orange-300">{pendingCount}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;