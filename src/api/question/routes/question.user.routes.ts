import { Router } from 'express'
import { ListOneQuestionController } from '../controllers/question.controller'

import { findOneQuestionValidator } from '../middlewares/question.validator'

export const router: Router = Router()

//users
router.get('/:questionId', ListOneQuestionController)
