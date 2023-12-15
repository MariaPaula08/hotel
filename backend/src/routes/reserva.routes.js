import { Router } from "express"
import { createReserva, deleteReserva, getReservas, updateReserva } from '../controllers/reserva.controller.js'

const router = Router()

router.get('/getReservas', getReservas)
router.post('/createReserva', createReserva)
router.delete('/deleteReserva/:id', deleteReserva)

export default router