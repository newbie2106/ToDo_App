import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './TodoSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import DatePicker from '../../components/ui/DatePicker';
import { useTheme } from '../../components/contexts/ThemeContext';

const AddTodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Hàm trợ giúp để lấy giá trị mặc định cho ngày hết hạn (hiện tại + 1 ngày)
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format yyyy-MM-ddThh:mm
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Vui lòng nhập nội dung công việc');
      return;
    }
    
    dispatch(addTodo({ 
      text: trimmedText, 
      dueDate: dueDate || null 
    }));
    setText('');
    setDueDate('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
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
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
          {error && <p className={`${theme === 'dark' ? 'text-red-400' : 'text-red-500'} text-sm transition-colors duration-200`}>{error}</p>}
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <DatePicker
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={getMinDateTime()}
              label="Ngày hết hạn (không bắt buộc)"
              className="w-full"
            />
          </div>
          
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition self-end h-10"
          >
            Thêm
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;