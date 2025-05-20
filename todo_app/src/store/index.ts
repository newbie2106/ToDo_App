import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/TodoSlice';
import notificationsReducer from '../features/notifications/NotificationSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;