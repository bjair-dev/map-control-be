import { Router } from 'express'
import { deleteSurveyContentController } from '../controllers/survey.content.controller'
import { deleteSurveyContentValidator } from '../middlewares/survey.content.validator'
import { archivedSurveyController } from '../controllers/survey.controller'
import { archivedOrUnArchivedSurveyValidator } from '../middlewares/survey.validator'
import {
  updateSurveyController,
  deleteSurveyController,
} from '../controllers/survey.controller'
import {
  updateSurveyValidator,
  deleteSurveyValidator,
} from '../middlewares/survey.validator'
import {
  createSurveyController,
  findAllSurveyController,
} from '../controllers/survey.controller'
import {
  createSurveyValidator,
  listSurveyValidator,
} from '../middlewares/survey.validator'
import {
  createSurveyContentController,
  updateSurveyContentController,
} from '../controllers/survey.content.controller'
import {
  updateSurveyContentValidator,
  createSurveyContentValidator,
} from '../middlewares/survey.content.validator'
export const router: Router = Router()

router.get('/', listSurveyValidator, findAllSurveyController)
router.post('/', createSurveyValidator, createSurveyController)
router.post('/content', createSurveyContentValidator, createSurveyContentController)
router.put('/:id', updateSurveyValidator, updateSurveyController)
router.put('/:id/content', updateSurveyContentValidator, updateSurveyContentController)
router.delete('/:id', deleteSurveyValidator, deleteSurveyController)
router.delete('/:id/content', deleteSurveyContentValidator, deleteSurveyContentController)
router.put('/:id/archived', archivedOrUnArchivedSurveyValidator, archivedSurveyController)
