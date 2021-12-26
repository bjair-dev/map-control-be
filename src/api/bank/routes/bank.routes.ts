import { Router } from 'express'
/*
    Controllers
*/
import {
  addBankController,
  findBanksController,
  removeBankController,
  updateBankController,
  findOneBankController,
  updateBankImageController,
} from '../controllers/bank.controller'

/*
    Validators
*/
import {
  createBankValidator,
  deleteBankValidator,
  getOneBankValidator,
  updateBankImageValidator,
  updateBankValidator,
} from '../middlewares/bank.validator'

export const router: Router = Router()

router.get('/', findBanksController)
router.get('/:id', getOneBankValidator, findOneBankController)
router.post('/', createBankValidator, addBankController)
router.delete('/:id', deleteBankValidator, removeBankController)
router.put('/:id', updateBankValidator, updateBankController)
router.put('/:id/image', updateBankImageValidator, updateBankImageController)
