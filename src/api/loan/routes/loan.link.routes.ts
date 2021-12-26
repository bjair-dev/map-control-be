import { Router } from 'express'

import {
  addLoanLinkController,
  findOneLoanLinkController,
  findAllLoanLinkController,
  removeLoanLinkController,
} from '../controllers/loan.link.controller'
import {
  createLoanLinkValidator,
  getOneLoanLinkValidator,
  deleteLoanLinkValidator,
} from '../middlewares/loan.link.validator'

export const router: Router = Router()

router.get('/', findAllLoanLinkController)
router.get('/:id', getOneLoanLinkValidator, findOneLoanLinkController)
router.post('/', createLoanLinkValidator, addLoanLinkController)
router.delete('/:id', deleteLoanLinkValidator, removeLoanLinkController)
