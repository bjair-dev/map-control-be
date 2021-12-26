import { Router } from 'express'
/*
    Controllers
*/
import { addAnswerSurveyController
} from '../controllers/answer.survey.controllers'
import { createAnswerValidator } from '../middlewares/answer.validator'

// import {
//     createAnswerValidator
// } from '../middlewares/answer.validator'

export const router: Router = Router()

router.post('/',createAnswerValidator, addAnswerSurveyController)
