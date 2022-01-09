import { Router } from 'express'
import { findAllUbicacionTypeController } from '../controllers/ubicacion.controller'

export const router: Router = Router()
//*@GET /api/question-type
router.get('/', findAllUbicacionTypeController)
