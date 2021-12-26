import { Router } from 'express'
/*
    Controllers
*/
import {
  addLoanTypeController,
  findAllLoanTypeController,
} from '../controllers/loan.type.controller'

import { createLoanTypeValidator } from '../middlewares/loan.type.validator'


export const router: Router = Router()

router.get('/', findAllLoanTypeController)
router.post('/',createLoanTypeValidator,addLoanTypeController)