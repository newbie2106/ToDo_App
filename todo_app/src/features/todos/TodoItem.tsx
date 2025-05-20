// src/features/todos/TodoItem.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '../../types/todo.type';
import { deleteTodo, editTodo, toggleTodo } from './TodoSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useTheme } from '../../components/contexts/ThemeContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      setError('Nội dung công việc không được trống');
      return;
    }

    dispatch(editTodo({ id: todo.id, text: trimmedText }));
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setError('');
  };

  const itemBackground = theme === 'dark'
    ? todo.completed ? 'bg-gray-700' : 'bg-gray-800'
    : todo.completed ? 'bg-gray-50' : 'bg-white';

  const completedTextClasses = theme === 'dark'
    ? 'line-through text-gray-400'
    : 'line-through text-gray-500';

  const normalTextClasses = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-900';

  const editingBackground = theme === 'dark'
    ? 'bg-gray-800'
    : 'bg-white';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded p-4 mb-2 transition-colors duration-200 ${itemBackground} ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <Input
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
              if (e.target.value.trim()) {
                setError('');
              }
            }}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
            autoFocus
          />
          {error && (
            <p className={`${theme === 'dark' ? 'text-red-400' : 'text-red-500'} text-sm`}>{error}</p>
          )}
          <div className={`flex space-x-2 sticky bottom-0 ${editingBackground} py-2`}>
            <Button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 transition"
            >
              Lưu
            </Button>
            <Button
              onClick={handleCancel}
              className={`${
                theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
              } px-3 py-1 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition`}
            >
              Hủy
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          {/* Vùng bên trái (70%) - hiển thị icon kéo, checkbox và text */}
          <div className="flex items-center space-x-3 w-[70%]">
            {/* Chỉ icon kéo được gắn listeners để xử lý kéo thả */}
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab select-none p-1"
              title="Kéo thả để thay đổi thứ tự"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <rect y="3" width="20" height="2" rx="1"></rect>
                <rect y="9" width="20" height="2" rx="1"></rect>
                <rect y="15" width="20" height="2" rx="1"></rect>
              </svg>
            </div>

            {/* Checkbox không bị ảnh hưởng bởi listeners kéo thả */}
            <Input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
            />
            <span
              className={`flex-1 ${
                todo.completed ? completedTextClasses : normalTextClasses
              } select-text`}
              onClick={handleEdit}
              style={{ cursor: 'pointer' }}
              title="Click để sửa"
            >
              {todo.text}
            </span>
          </div>

          {/* Vùng bên phải (30%) - không kéo thả */}
          <div className="flex space-x-2 w-[30%] justify-end">
            <Button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
            >
              Sửa
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 transition"
            >
              Xóa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;