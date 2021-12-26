import { Router } from 'express'
import { listEntryTagController } from '../controllers/entry.tag.controllers'
import { findAllEntryTagUserValidator } from '../middlewares/entry.tag.middleware'

export const router: Router = Router()
router.get('/:tag_type', findAllEntryTagUserValidator,listEntryTagController)


