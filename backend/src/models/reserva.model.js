import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const ReservaSchema = new mongoose.Schema({
    fechaTomaReserva: {
        type: Date,
        required: true,
    },
    habitacion: {
        type: String,
        required: true,
    },
    tipoDeHabitacion: {
        type: String,
        required: true,
    },
    cedulaHuesped: {
        type: String,
        required: true,
    },
    nombreDelHuesped: {
        type: String,
        required: true,
    },
    correoHuesped: {
        type: String,
        required: true,
    },
    costoDelDia: {
        type: Number, 
        required: true,
    },
    numeroDeHuespedes: {
        type: Number,
        required: true,
    },
    saldo: {
        type: Number,
        default: 0,
    },
    abono: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    fechaIngreso: {
        type: Date,
        required: true,
    },
    fechaSalida: {
        type: Date,
        required: true,
    },
});

ReservaSchema.plugin(mongoosePaginate);

export default mongoose.model('Reserva', ReservaSchema);


