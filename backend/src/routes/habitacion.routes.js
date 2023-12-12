import { Router } from "express"
import { createHabitacion, deleteHabitacion, getHabitacion, updateHabitacion } from '../controllers/habitacion.controller.js'

const router = Router()

router.get('/getHabitacion', getHabitacion)
router.post('/createHabitacion', createHabitacion)
router.delete('/deleteHabitacion/:id', deleteHabitacion)

export default router