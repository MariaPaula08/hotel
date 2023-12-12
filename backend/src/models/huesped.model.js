import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';


const HuespedSchema = new mongoose.Schema({
    cedula: {
        type: String,
        required: true,
        unique: true, 
    },
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true, 
    },
    telefono: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    nacionalidad: {
        type: String,
        required: true,
    },
});

HuespedSchema.plugin(mongoosePaginate);

export default mongoose.model('Huesped', HuespedSchema);

