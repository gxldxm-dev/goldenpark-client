import { createContext } from 'react';

interface Task {
    id: string;
    name: string;
    progress: number;
    status: string;
    size?: number;
  }

type TaskAction =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; id: string; updates: Partial<Task> }
  | { type: 'REMOVE_TASK'; id: string };

const TaskManagerContext = createContext<{
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
} | null>(null);

export default TaskManagerContext;
