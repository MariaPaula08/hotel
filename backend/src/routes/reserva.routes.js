import { Router } from "express"
import { createReserva, deleteReserva, getReserva, updateReserva } from '../controllers/reserva.controller.js'

const router = Router()

router.get('/getReserva', getReserva)
router.post('/createReserva', createReserva)
router.delete('/deleteReserva/:id', deleteReserva)

export default router