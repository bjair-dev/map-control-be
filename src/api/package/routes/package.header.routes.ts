import { Router } from 'express'
import { createPackageHeaderDatesValidator } from '../middlewares/package.header.validator'
import {
  createPackageHeaderNumberController,
  deletePackageHeaderController,
  findAllPackageHeaderController,
  createPackageHeaderDateController,
} from '../controllers/package.header.controller'
import {
  createPackageHeaderValidator,
  deletePackageHeaderValidator,
  listPackageHeaderValidator,
} from '../middlewares/package.header.validator'

export const router: Router = Router()

router.post('/numbers', createPackageHeaderValidator, createPackageHeaderNumberController)
router.post(
  '/dates',
  createPackageHeaderDatesValidator,
  createPackageHeaderDateController
)
router.get('/', listPackageHeaderValidator, findAllPackageHeaderController)
router.delete('/:id', deletePackageHeaderValidator, deletePackageHeaderController)
