import React from 'react';
import useTaskStore from '../store/useTaskStore';

const TaskList = () => {
    const { tasks, removeTask, setCurrentTask } = useTaskStore();

    return (
        <div className="mt-20">
            <h2 className="text-white font-bold text-4xl text-center mb-10">Lista de Tareas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-blue-900 text-white rounded-lg shadow-md p-5">
                        <h2 className="font-bold text-lg mb-2">Nombre:</h2>
                        <p className="mb-4 text-xl">{task.name}</p>
                        <h2 className="font-bold text-lg mb-2">Descripción:</h2>
                        <p className="mb-4 text-xl">{task.description}</p>
                        <div className="flex justify-start mt-16">
                            <button className="px-4 mr-5 py-2 text-sm font-bold border border-blue-500 rounded bg-blue-500 text-white" onClick={() => setCurrentTask(task)}>
                                Editar
                            </button>
                            <button className="px-4 py-2 text-sm font-bold border border-red-500 rounded bg-red-500 text-white" onClick={() => removeTask(task._id)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
