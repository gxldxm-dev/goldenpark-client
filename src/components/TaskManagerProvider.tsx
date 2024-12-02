import { useReducer, ReactNode } from 'react';
import TaskManagerContext from '../contexts/TaskManagerContext';

interface Task {
  id: string;
  name: string;
  progress: number;
  status: string;
  size?: number;
  message?: string;
}

type TaskAction =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; id: string; updates: Partial<Task> }
  | { type: 'REMOVE_TASK'; id: string };



const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.task];
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.id ? { ...task, ...action.updates } : task
      );
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};
export const TaskManagerProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskManagerContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskManagerContext.Provider>
  );
};