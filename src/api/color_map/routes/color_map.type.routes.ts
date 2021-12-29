import { Router } from 'express'
import { findAllQuestionTypeController } from '../controllers/color_map.controller'

export const router: Router = Router()
//*@GET /api/question-type
router.get('/', findAllQuestionTypeController)
