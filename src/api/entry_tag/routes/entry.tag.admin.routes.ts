import { Router } from 'express'
import { createEntryTagAdminController } from '../controllers/entry.tag.controllers'
import { addEntryTagAdminValidator } from '../middlewares/entry.tag.middleware'

export const router: Router = Router()
router.post('/',addEntryTagAdminValidator, createEntryTagAdminController)


