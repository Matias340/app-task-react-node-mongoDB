import { create } from 'zustand';
import { fetchTask, createTask, updateTask, deleteTask } from '../api';

const useTaskStore = create((set) => ({
    tasks: [],
    currentTask: null,
    notification: null,

    fetchTasks: async () => {
        try {
            const { data } = await fetchTask();
            set({ tasks: data });
        } catch (error) {
            set({ notification: { message: 'Error al cargar las tareas', type: 'error' } });
        }
    },

    addTask: async (task) => {
        try {
            await createTask(task);
            set((state) => ({ 
                tasks: [...state.tasks, task], 
                notification: { message: 'Tarea creada exitosamente', type: 'success' }
            }));
        } catch (error) {
            set({ notification: { message: 'No se pudo crear la tarea', type: 'error' } });
        }
    },

    updateTask: async (id, updatedTask) => {
        try {
            await updateTask(id, updatedTask);
            set((state) => ({
                tasks: state.tasks.map((task) => (task._id === id ? updatedTask : task)),
                notification: { message: 'Tarea actualizada exitosamente', type: 'success' }
            }));
        } catch (error) {
            set({ notification: { message: 'No se pudo actualizar la tarea', type: 'error' } });
        }
    },

    removeTask: async (id) => {
        try {
            await deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== id),
                notification: { message: 'Tarea eliminada exitosamente', type: 'success' }
            }));
        } catch (error) {
            set({ notification: { message: 'No se pudo eliminar la tarea', type: 'error' } });
        }
    },

    setCurrentTask: (task) => set({ currentTask: task }),
    clearCurrentTask: () => set({ currentTask: null }),
    clearNotification: () => set({ notification: null }),
}));

export default useTaskStore;
