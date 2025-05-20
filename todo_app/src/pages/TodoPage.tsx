import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import AddTodoForm from '../features/todos/AddTodoForm';
import TodoFilter from '../features/todos/TodoFilter';
import type { TodoState } from '../types/todo.type';
import TodoItem from '../features/todos/TodoItem';
import { reorderTodos } from '../features/todos/TodoSlice';
import { useDispatch } from 'react-redux';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import { useTheme } from '../components/contexts/ThemeContext';


type FilterType = 'all' | 'active' | 'completed';

const TodoPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const { todos } = useSelector((state: RootState) => state.todos as TodoState);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const sourceIndex = todos.findIndex((todo) => todo.id === active.id);
      const destinationIndex = todos.findIndex((todo) => todo.id === over.id);
      
      dispatch(reorderTodos({ sourceIndex, destinationIndex }));
    }
  };
  
  const containerClasses = theme === 'dark'
    ? 'bg-gray-800 border border-gray-700 rounded-lg shadow-lg'
    : 'bg-white border border-gray-200 rounded-lg shadow-lg';

  const emptyMessageClasses = theme === 'dark'
    ? 'bg-gray-700 text-gray-300 border-gray-600'
    : 'bg-gray-50 text-gray-500 border-gray-200';
  
  return (
    <div className={`${containerClasses} p-6 transition-colors duration-300`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Quản lý công việc
      </h2>
      
      <AddTodoForm />
      
      <TodoFilter filter={filter} setFilter={setFilter} />
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTodos.map(todo => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTodos.length === 0 ? (
            <div className={`${emptyMessageClasses} border rounded p-8 text-center transition-colors duration-300`}>
              <p>
                {filter === 'all'
                  ? 'Bạn chưa có công việc nào. Hãy thêm công việc mới!'
                  : filter === 'active'
                  ? 'Không có công việc chưa hoàn thành.'
                  : 'Không có công việc đã hoàn thành.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TodoPage;