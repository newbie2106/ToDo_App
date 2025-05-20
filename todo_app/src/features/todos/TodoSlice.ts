// src/features/todos/TodoSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from '../../utils/localStorage';
import type { Todo, TodoState } from '../../types/todo.type';

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage(),
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; dueDate: string | null }>) => {
      const { text, dueDate } = action.payload;
      const now = new Date().toISOString();
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        dueDate,
        created: now,
        completedAt: null,
      };
      state.todos.push(newTodo);
      saveTodosToLocalStorage(state.todos);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : null;
        saveTodosToLocalStorage(state.todos);
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string; dueDate: string | null }>) => {
      const { id, text, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.dueDate = dueDate;
        saveTodosToLocalStorage(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    reorderTodos: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const todosCopy = [...state.todos];
      const [movedTodo] = todosCopy.splice(sourceIndex, 1); 
      todosCopy.splice(destinationIndex, 0, movedTodo); 
      state.todos = todosCopy; 
      saveTodosToLocalStorage(state.todos); 
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, reorderTodos } = todosSlice.actions;

export default todosSlice.reducer;