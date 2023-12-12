import Habitacion from '../models/habitacion.model.js'

async function createHabitacion(req, res) {
    try {
        const habitacion = new Habitacion(req.body);
        const habitacionStored = await habitacion.save();
        res.status(201).send(habitacionStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear la habitacion" });
        console.log(error)
    }
}

async function getHabitacion(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const habitacions = await Habitacion.paginate({}, options);
        res.status(200).send(habitacions);
    } catch (error) {
        res.status(400).send({ msg: "Error al obtener las habitaciones" });
    }
}

async function updateHabitacion(req, res) {
    const { id } = req.params;
    const habitacionData = req.body;

    try {
        await Habitacion.findByIdAndUpdate({ _id: id }, habitacionData);
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar la habitacion" });
    }
}

async function deleteHabitacion(req, res) {
    const { id } = req.params;

    try {
        await Habitacion.findByIdAndDelete(id);
        res.status(200).send({ msg: "habitacion eliminada" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar la habitacion" });
    }
}

export {
    createHabitacion,
    getHabitacion,
    updateHabitacion,
    deleteHabitacion,
};
