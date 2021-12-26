import { Router } from 'express'
/*
    Controllers
*/
import {
  addLoanController, removeLoanController,findOneLoanController,updateLoanController, findAllLoanController
} from '../controllers/loan.controller'
import { createLoanValidator,deleteLoanValidator,getOneLoanValidator ,updateLoanValidator} from '../middlewares/loan.validator'


export const router: Router = Router()

router.get('/',findAllLoanController)
router.get('/:id',getOneLoanValidator,findOneLoanController)
router.post('/', createLoanValidator ,addLoanController)
router.put('/:id', updateLoanValidator ,updateLoanController)

router.delete('/:id',deleteLoanValidator,removeLoanController)
