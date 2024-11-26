import mongoose from 'mongoose';

// Definir el esquema del modelo
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Exportar el modelo
export default mongoose.model('Task', TaskSchema);
