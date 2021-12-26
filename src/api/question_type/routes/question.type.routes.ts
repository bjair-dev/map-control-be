import { Router } from 'express'
import { findAllQuestionTypeController } from '../controllers/question.type.controller'

export const router: Router = Router()
//*@GET /api/question-type
router.get('/', findAllQuestionTypeController)
