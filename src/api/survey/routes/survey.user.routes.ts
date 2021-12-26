import { Router } from 'express'

// import { existsSurvey } from '../validator/survay.custom'
import { findOneSurveyController } from '../controllers/survey.controller'
import { findOneSurveyValidator } from '../middlewares/survey.validator'

export const router: Router = Router()

router.get('/:id', findOneSurveyValidator, findOneSurveyController)
