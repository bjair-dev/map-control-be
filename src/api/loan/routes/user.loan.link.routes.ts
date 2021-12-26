import { Router } from 'express'

import { findOneLoanLinkController } from '../controllers/loan.link.controller'
import { getOneLoanLinkValidator } from '../middlewares/loan.link.validator'

export const router: Router = Router()

router.get('/:id', getOneLoanLinkValidator, findOneLoanLinkController)
