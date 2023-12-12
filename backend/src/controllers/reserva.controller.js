import Reserva from '../models/reserva.model.js'

async function createReserva(req, res) {
    try {
        const reserva = new Reserva(req.body);
        const reservaStored = await reserva.save();
        res.status(201).send(reservaStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear la reserva" });
        console.log(error)
    }
}

async function getReserva(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const reservas = await Reserva.paginate({}, options);
        res.status(200).send(reservas);
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
    getReserva,
    updateReserva,
    deleteReserva,
};
