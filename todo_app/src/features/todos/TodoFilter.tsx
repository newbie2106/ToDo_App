import React from 'react';
import Button from '../../components/ui/Button';
import { useTheme } from '../../components/contexts/ThemeContext';
type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  const { theme } = useTheme();
  
  // Thêm các lớp style cho dark mode
  const inactiveButtonClasses = theme === 'dark'
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

  return (
    <div className="flex justify-center space-x-4 mb-6">
      <Button
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          filter === 'all'
            ? 'bg-blue-600 text-white'
            : inactiveButtonClasses
        }`}
        onClick={() => setFilter('all')}
      >
        Tất cả
      </Button>
      <Button
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          filter === 'active'
            ? 'bg-blue-600 text-white'
            : inactiveButtonClasses
        }`}
        onClick={() => setFilter('active')}
      >
        Chưa hoàn thành
      </Button>
      <Button
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          filter === 'completed'
            ? 'bg-blue-600 text-white'
            : inactiveButtonClasses
        }`}
        onClick={() => setFilter('completed')}
      >
        Đã hoàn thành
      </Button>
    </div>
  );
};

export default TodoFilter;