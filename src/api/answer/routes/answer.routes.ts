import { Router } from 'express'
/*
    Controllers
*/
import {
 addAnswerController
} from '../controllers/answer.controllers'

import {
    createAnswerValidator
} from '../middlewares/answer.validator'

export const router: Router = Router()

router.post('/', createAnswerValidator, addAnswerController)
