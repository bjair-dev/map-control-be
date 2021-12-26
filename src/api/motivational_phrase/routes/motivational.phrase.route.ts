import { Router } from 'express'
import { findLatestMotivationalPhraseController } from '../controllers/motivational.phrase.controller'
// import { findAllEntryTagUserValidator } from '../middlewares/entry.tag.middleware'

export const router: Router = Router()
router.get('/',findLatestMotivationalPhraseController)

