import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const HabitacionSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
        unique: true, 
    },
    tipo: {
        type: String,
        required: true,
    },
    capacidad: {
        type: Number,
        required: true,
    },
    precioPorNoche: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        enum: ['Disponible', 'Ocupada', 'Fuera de servicio'],
        default: 'Disponible',
    },
});

HabitacionModel.plugin(mongoosePaginate);

export default mongoose.model('Habitacion', HabitacionSchema);


