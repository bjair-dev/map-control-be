import { Router } from 'express'
import {
  createPackageController,
  deletePackageController,
  findAllPackageController,
  listOfChallengeToUseController,
  listOfTipToUseController,
} from '../controllers/package.controller'
import {
  createPackageValidator,
  deletePackageValidator,
  listAllToUseValidator,
  listPackageValidator,
} from '../middlewares/package.validator'
import {
  listOfVideoToUseController,
  listOfQuestionToUseController,
} from '../controllers/package.controller'
export const router: Router = Router()

router.get('/tips', listAllToUseValidator, listOfTipToUseController)
router.get('/videos', listAllToUseValidator, listOfVideoToUseController)
router.get('/questions', listAllToUseValidator, listOfQuestionToUseController)
router.get('/challenges', listAllToUseValidator, listOfChallengeToUseController)
router.post('/', createPackageValidator, createPackageController)
router.get('/', listPackageValidator, findAllPackageController)
router.delete('/:id', deletePackageValidator, deletePackageController)
