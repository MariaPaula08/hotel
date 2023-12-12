import { Router } from "express"
import { createHuesped, deleteHuesped, getHuesped, updateHuesped } from '../controllers/huesped.controller.js'

const router = Router()

router.get('/getHuesped', getHuesped)
router.post('/createHuesped', createHuesped)
router.delete('/deleteHuesped/:id', deleteHuesped)

export default router