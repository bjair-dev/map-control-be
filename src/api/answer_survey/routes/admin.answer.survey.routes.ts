import { Router } from 'express'
/*
    Controllers
*/
import { resultAnswerSurveyController
} from '../controllers/answer.survey.controllers'
import { resultAnswerSurveyValidator } from '../middlewares/answer.validator'

// import {
//     createAnswerValidator
// } from '../middlewares/answer.validator'

export const router: Router = Router()


//SurveyID
router.get('/:id', resultAnswerSurveyValidator,resultAnswerSurveyController)

