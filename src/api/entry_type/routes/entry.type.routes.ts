import { Router } from 'express'
import { findAllEntryTypeController } from '../controllers/entry.type.controller'

export const router: Router = Router()

//*@GET /api/entry-type
router.get('/', findAllEntryTypeController)
