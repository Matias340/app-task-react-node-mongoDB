import React, { useState, useEffect } from 'react';
import useTaskStore from '../store/useTaskStore';

const TaskForm = () => {
    const { currentTask, addTask, updateTask, clearCurrentTask } = useTaskStore();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentTask) {
            setName(currentTask.name);
            setDescription(currentTask.description);
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTask) {
            await updateTask(currentTask._id, { name, description });
        } else {
            await addTask({ name, description });
        }
        setName('');
        setDescription('');
        clearCurrentTask();
    };

    return (
        <form className="rounded-md bg-blue-900 mt-20 w-80" onSubmit={handleSubmit}>
            <h2 className="text-white font-bold text-2xl pl-5 pt-5">
                {currentTask ? 'Editar tarea' : 'Crear tarea'}
            </h2>
            <div className="flex pb-5 pt-5 pl-5">
                <input
                    type="text"
                    className="rounded-sm text-xl pl-2 pt-1 pb-1 pr-2 outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre de la tarea"
                    required
                />
            </div>
            <div className="flex pl-5">
                <textarea
                    value={description}
                    className="rounded-sm text-xl pl-2 pt-1 pb-1 pr-6 outline-none"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                    required
                />
            </div>
            <div className="flex pl-5 mt-5 mb-5">
                <button className="mb-5 pl-4 pr-4 pt-1 pb-1 text-xl border border-blue-500 rounded bg-blue-500 text-white font-bold" type="submit">
                    {currentTask ? 'Actualizar' : 'Crear'}
                </button>
                {currentTask && (
                    <button className="ml-5 pl-4 pr-4 mb-5 text-xl rounded bg-red-500 text-white font-bold" type="button" onClick={clearCurrentTask}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
