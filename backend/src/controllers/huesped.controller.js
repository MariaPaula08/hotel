import Huesped from '../models/huesped.model.js'

async function createHuesped(req, res) {
    try {
        const huesped = new Huesped(req.body);
        const huespedStored = await huesped.save();
        res.status(201).send(huespedStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear la huesped" });
        console.log(error)
    }
}

async function getHuesped(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const huespeds = await Huesped.paginate({}, options);
        res.status(200).send(huespeds);
    } catch (error) {
        res.status(400).send({ msg: "Error al obtener las huespeds" });
    }
}

async function updateHuesped(req, res) {
    const { id } = req.params;
    const huespedData = req.body;

    try {
        await Huesped.findByIdAndUpdate({ _id: id }, huespedData);
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar la huesped" });
    }
}

async function deleteHuesped(req, res) {
    const { id } = req.params;

    try {
        await Huesped.findByIdAndDelete(id);
        res.status(200).send({ msg: "huesped eliminada" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar la huesped" });
    }
}

export {
    createHuesped,
    getHuesped,
    updateHuesped,
    deleteHuesped,
};
