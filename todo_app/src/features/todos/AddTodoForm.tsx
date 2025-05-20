import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './TodoSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useTheme } from '../../components/contexts/ThemeContext';

const AddTodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Vui lòng nhập nội dung công việc');
      return;
    }
    
    dispatch(addTodo(trimmedText));
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-2">
        <div className="flex">
          <Input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) {
                setError('');
              }
            }}
            placeholder="Thêm công việc mới..."
            className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 mx-4 rounded-r hover:bg-blue-700 transition"
          >
            Thêm
          </Button>
        </div>
        {error && <p className={`${theme === 'dark' ? 'text-red-400' : 'text-red-500'} text-sm transition-colors duration-200`}>{error}</p>}
      </div>
    </form>
  );
};

export default AddTodoForm;