import { useContext } from 'react';
import TaskManagerContext from "../contexts/TaskManagerContext"
interface Task {
  id: string;
  name: string;
  progress: number;
  status: string;
  message?: string;
  size?: number;
}
const useTaskManager = () => {
    const context = useContext(TaskManagerContext);
    if (!context) {
      throw new Error('useTaskManager debe ser usado dentro de TaskManagerProvider');
    }
    const { tasks, dispatch } = context;
  
    // Métodos para interactuar con las tareas
    const addTask = (task: Task) => dispatch({ type: 'ADD_TASK', task });
    const updateTask = (id: string, updates: Partial<Task>) =>
      dispatch({ type: 'UPDATE_TASK', id, updates });
    const removeTask = (id: string) => dispatch({ type: 'REMOVE_TASK', id });
  
    return { tasks, addTask, updateTask, removeTask };
  };
export default useTaskManager;
