import { Router } from 'express'
import { createEntryTypeController } from '../controllers/entry.type.controller'
import { createEntryTypeValidator } from '../middlewares/entry.type.validator'

export const router: Router = Router()

//*@POST /api/entry-type
router.post('/', createEntryTypeValidator, createEntryTypeController)

