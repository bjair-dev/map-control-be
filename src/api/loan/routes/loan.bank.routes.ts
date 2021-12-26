import { Router } from 'express'
import { findAllLoanBankController } from '../controllers/loan.bank.controller'
import { findLoanBankValidator } from '../middlewares/loan.bank.validator'
/*
    Controllers
*/


export const router: Router = Router()

router.get('/:id', findLoanBankValidator,findAllLoanBankController)