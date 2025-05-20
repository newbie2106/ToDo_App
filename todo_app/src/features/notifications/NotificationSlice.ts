import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification, Todo } from '../../types/todo.type';

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      // Kiểm tra xem thông báo đã tồn tại chưa
      const exists = state.notifications.some(
        notification => 
          notification.todoId === action.payload.todoId && 
          notification.type === action.payload.type
      );
      
      if (!exists) {
        state.notifications.push(action.payload);
      }
    },
    markAsShown: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.shown = true;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    // Khi xóa todo, xóa tất cả thông báo liên quan
    clearTodoNotifications: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.todoId !== action.payload);
    },
    // Kiểm tra và tạo thông báo dựa trên danh sách todos
    checkAndCreateNotifications: (state, action: PayloadAction<Todo[]>) => {
      const todos = action.payload;
      const now = new Date();
      
      // Chỉ xem xét các todo chưa hoàn thành và có thời hạn
      const incompleteTodos = todos.filter(todo => !todo.completed && todo.dueDate);
      
      incompleteTodos.forEach(todo => {
        if (!todo.dueDate) return;
        
        const dueDate = new Date(todo.dueDate);
        const diffMs = dueDate.getTime() - now.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);
        
        // Tạo thông báo trước 30 phút
        if (diffMinutes <= 30 && diffMinutes > 15) {
          const notifId = `${todo.id}-soon`;
          const exists = state.notifications.some(n => n.id === notifId);
          
          if (!exists) {
            state.notifications.push({
              id: notifId,
              todoId: todo.id,
              todoText: todo.text,
              dueDate: todo.dueDate,
              shown: false,
              type: 'soon'
            });
          }
        }
        
        // Tạo thông báo trước 15 phút
        if (diffMinutes <= 15 && diffMinutes > 1) {
          const notifId = `${todo.id}-very-soon`;
          const exists = state.notifications.some(n => n.id === notifId);
          
          if (!exists) {
            state.notifications.push({
              id: notifId,
              todoId: todo.id,
              todoText: todo.text,
              dueDate: todo.dueDate,
              shown: false,
              type: 'very-soon'
            });
          }
        }
        
        // Tạo thông báo trước 1 phút
        if (diffMinutes <= 1 && diffMinutes >= 0) {
          const notifId = `${todo.id}-imminent`;
          const exists = state.notifications.some(n => n.id === notifId);
          
          if (!exists) {
            state.notifications.push({
              id: notifId,
              todoId: todo.id,
              todoText: todo.text,
              dueDate: todo.dueDate,
              shown: false,
              type: 'imminent'
            });
          }
        }
      });
    }
  },
});

export const { 
  addNotification, 
  markAsShown, 
  removeNotification, 
  clearAllNotifications, 
  clearTodoNotifications,
  checkAndCreateNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;