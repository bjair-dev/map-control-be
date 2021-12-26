import { Router } from 'express'
import {
  deleteChallengeController,
  updateChallengeController,
} from '../controllers/challenge.controller'
import { updateChallengeValidator } from '../middlewares/challenge.validator'
import {
  archivedChallengeController,
  createChallengeController,
  findAllChallengeController,
} from '../controllers/challenge.controller'
import {
  archivedOrUnArchivedChallengeValidator,
  createChallengeValidator,
  deleteChallengeValidator,
  listChallengeValidator,
} from '../middlewares/challenge.validator'
export const router: Router = Router()

router.post('/', createChallengeValidator, createChallengeController)
router.get('/', listChallengeValidator, findAllChallengeController)
router.put(
  '/:id/archived',
  archivedOrUnArchivedChallengeValidator,
  archivedChallengeController
)
router.put('/:id', updateChallengeValidator, updateChallengeController)
router.delete('/:id', deleteChallengeValidator, deleteChallengeController)
