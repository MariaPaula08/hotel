import Caja from '../models/caja.model.js'

async function createCaja(req, res) {
    try {
        const caja = new Caja(req.body);
        const cajaStored = await caja.save();
        res.status(201).send(cajaStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear el caja" });
        console.log(error)
    }
}

async function getCaja(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const cajas = await Caja.paginate({}, options);
        res.status(200).send(cajas);
    } catch (error) {
        res.status(400).send({ msg: "Error al obtener las cajas" });
    }
}

async function updateCaja(req, res) {
    const { id } = req.params;
    const cajaData = req.body;

    try {
        await Caja.findByIdAndUpdate({ _id: id }, cajaData);
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar la caja" });
    }
}

async function deleteCaja(req, res) {
    const { id } = req.params;

    try {
        await Caja.findByIdAndDelete(id);
        res.status(200).send({ msg: "Caja eliminada" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar la caja" });
    }
}

export {
    createCaja,
    getCaja,
    updateCaja,
    deleteCaja,
};
