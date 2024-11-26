import Task from '../models/taskModel.js';

// Crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
};

// Obtener todas las tareas
export const getTask = async (req, res) => {
    try {
        const Tasks = await Task.find();
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
    try {
        const Tasks = await Task.findById(req.params.id);
        if (!Tasks) return res.status(404).json({ message: 'tarea no encontrada' });
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'tarea no encontrada' });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
};
