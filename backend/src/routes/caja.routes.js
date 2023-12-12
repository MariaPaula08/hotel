import { Router } from "express"
import { createCaja, deleteCaja, getCaja, updateCaja } from '../controllers/caja.controller.js'

const router = Router()

router.get('/getCaja', getCaja)
router.post('/createCaja', createCaja)
router.delete('/deleteCaja/:id', deleteCaja)

export default router