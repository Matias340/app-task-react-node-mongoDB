import React, { useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import useTaskStore from './store/useTaskStore';

const App = () => {
    const { tasks, notification, fetchTasks, clearNotification } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='bg-gray-800'>
            <h1 className='text-white text-4xl text-center pt-10 font-bold'>Gestión de Tareas</h1>
            {notification && (
                <div
                    className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white ${
                        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={clearNotification}
                >
                    {notification.message}
                </div>
            )}
            <div className='pl-20'>
                <TaskForm />
            </div>
            <TaskList />
        </div>
    );
};

export default App;
