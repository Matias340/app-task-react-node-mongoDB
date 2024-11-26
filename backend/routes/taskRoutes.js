import express from 'express';
import {
    createTask,
    getTask,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// Rutas CRUD
router.post('/', createTask); // Crear
router.get('/', getTask); // Obtener todos
router.get('/:id', getTaskById); // Obtener por ID
router.put('/:id', updateTask); // Actualizar
router.delete('/:id', deleteTask); // Eliminar

export default router;
