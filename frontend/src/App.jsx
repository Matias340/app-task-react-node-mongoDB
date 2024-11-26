import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { fetchTask } from './api';

const App = () => {
    const [currentTask, setCurrentTask] = useState(null);
    const [tasks, setTasks] = useState([]); // Estado de la lista de tareas
    const [notification, setNotification] = useState(null); // Notificación de éxito o error

    // Cargar la lista de tareas
    const refreshTasks = async () => {
        try {
            const { data } = await fetchTask();
            setTasks(data);
        } catch (error) {
            showNotification('Error al cargar las tareas', 'error');
        }
    };

     // Mostrar notificación
     const showNotification = (message, type) => {
        setNotification({ message, type }); // Guarda el mensaje y el tipo (éxito/error)
        setTimeout(() => setNotification(null), 3000); // Oculta la notificación después de 3 segundos
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
    };

    // Manejar cuando se complete el formulario
    const handleFormFinish = (success, action) => {
        if (success) {
            showNotification(`La tarea ha sido ${action} exitosamente`, 'success');
        } else {
            showNotification(`No se pudo ${action} la tarea`, 'error');
        }
        setCurrentTask(null); // Sale del modo "Editar"
        refreshTasks(); // Actualiza la lista
    };

    return (
        <div className='bg-gray-800'>
            <h1 className='text-white text-4xl text-center pt-10 font-bold'>Gestión de Tareas</h1>
            {/* Notificación */}
            {notification && (
                <div
                    className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white ${
                        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {notification.message}
                </div>
            )}
            <div className='pl-20'>
              <TaskForm currentTask={currentTask} onFinish={handleFormFinish} />
            </div>
            <TaskList onEdit={handleEdit} refreshTasks={refreshTasks} showNotification={showNotification}  />
        </div>
    );
};

export default App;
