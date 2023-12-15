import Reserva from '../models/reserva.model.js'

// Función para calcular el costo del día según el tipo de habitación
function calcularCostoDelDia(tipoDeHabitacion) {
    // Implementa la lógica de cálculo según los tipos de habitación
    // ...

    // Ejemplo:
    if (tipoDeHabitacion === "cabaña") {
        return 360000;
    } else if (tipoDeHabitacion === "jacuzzi") {
        return 500000;
    } else if (tipoDeHabitacion === "casaGrande") {
        return 240000; // o 270000 según la temporada
    } else {
        // Tipo de habitación no reconocido
        return 0;
    }
}

function calcularTotal(costoDelDia, numeroDeHuespedes) {
    return costoDelDia * numeroDeHuespedes;
}

async function createReserva(req, res) {
    try {
        const {
            fechaTomaReserva,
            habitacion,
            tipoDeHabitacion,
            cedulaHuesped,
            nombreDelHuesped,
            correoHuesped,
            numeroDeHuespedes,
            fechaIngreso,
            fechaSalida
        } = req.body;

        // Verificar si ya existe una reserva para esa habitación y fechas
        const existingReserva = await Reserva.findOne({
            habitacion,
            $or: [
                {
                    fechaIngreso: { $lte: fechaIngreso },
                    fechaSalida: { $gte: fechaIngreso }
                },
                {
                    fechaIngreso: { $lte: fechaSalida },
                    fechaSalida: { $gte: fechaSalida }
                },
                {
                    fechaIngreso: { $gte: fechaIngreso },
                    fechaSalida: { $lte: fechaSalida }
                }
            ]
        });

        if (existingReserva) {
            return res.status(400).send({ msg: "Esta habitación ya está reservada para ese período de tiempo." });
        }

        // Calcular el costo del día según el tipo de habitación
        const costoDelDia = calcularCostoDelDia(tipoDeHabitacion);

        // Calcular la duración de la estadía en días
        const unDia = 24 * 60 * 60 * 1000; // Milisegundos en un día
        const tiempoEstadia = Math.abs(new Date(fechaSalida) - new Date(fechaIngreso));
        const diasEstadia = Math.round(tiempoEstadia / unDia);

        // Asegurémonos de que el cálculo del total no sea NaN
        const total = isNaN(costoDelDia) || isNaN(diasEstadia) || isNaN(numeroDeHuespedes) ? 0 : costoDelDia * diasEstadia * numeroDeHuespedes;
        const abono = total * 0.5;

        // Crear la reserva
        const reserva = new Reserva({
            fechaTomaReserva,
            habitacion,
            tipoDeHabitacion,
            cedulaHuesped,
            nombreDelHuesped,
            correoHuesped,
            costoDelDia,
            numeroDeHuespedes,
            saldo: total - abono,
            abono,
            total,
            fechaIngreso,
            fechaSalida,
        });

        // Guardar la reserva
        const reservaStored = await reserva.save();

        // Enviar respuesta
        res.status(201).send(reservaStored);
    } catch (error) {
        console.error(error);
        res.status(400).send({ msg: "Error al crear la reserva" });
    }
}

async function getReservas(req, res) {

    try {
        
        const response = await Reserva.find()

        res.status(200).send({ msg: response })

    } catch (error) {
        res.status(400).send({ msg: "Error al obtener las reservas" });
    }
}

async function updateReserva(req, res) {
    const { id } = req.params;
    const reservaData = req.body;

    try {
        await Reserva.findByIdAndUpdate({ _id: id }, reservaData);
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar la reserva" });
    }
}

async function deleteReserva(req, res) {
    const { id } = req.params;

    try {
        await Reserva.findByIdAndDelete(id);
        res.status(200).send({ msg: "Reserva eliminada" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar la reserva" });
    }
}

export {
    createReserva,
    getReservas,
    updateReserva,
    deleteReserva,
};
