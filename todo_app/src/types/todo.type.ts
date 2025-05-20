export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string | null; 
  created: string; 
  completedAt: string | null; 
}

export interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Định nghĩa loại thông báo
export interface Notification {
  id: string;
  todoId: string;
  todoText: string;
  dueDate: string;
  shown: boolean;
  type: 'soon' | 'very-soon' | 'imminent';
}

export interface NotificationState {
  notifications: Notification[];
}