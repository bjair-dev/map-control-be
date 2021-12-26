import { Router } from 'express'
import {
  createUserChallengeController,
  updateAceptadoChallengeController,
  updateCompletadoChallengeController,
  findMedalsUser,
} from '../controllers/user.challenge.controller'

export const router: Router = Router()

router.put('/acepted/:challengeId', updateAceptadoChallengeController)
router.put('/completed/:challengeId', updateCompletadoChallengeController)
router.get('/medals', findMedalsUser)
