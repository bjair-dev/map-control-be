import { Router } from 'express'
import {
  findAllQuestionController,
  createQuestionController,
  updateQuestionController,
  archivedQuestionController,
  deleteQuestionController,
  updateImageQuestionController,
} from '../controllers/question.controller'
import {
  createQuestionValidator,
  updateQuestionValidator,
  listQuestionValidator,
  archivedOrUnArchivedQuestionValidator,
  deleteQuestionValidator,
  updateImageQuestionValidator,
} from '../middlewares/question.validator'

export const router: Router = Router()

router.get('/', listQuestionValidator, findAllQuestionController)
router.post('/', createQuestionValidator, createQuestionController)
router.put('/:questionId', updateQuestionValidator, updateQuestionController)
router.put('/:questionId/archived', archivedOrUnArchivedQuestionValidator, archivedQuestionController)
router.put('/:questionId/image', updateImageQuestionValidator, updateImageQuestionController)
router.delete('/:questionId', deleteQuestionValidator, deleteQuestionController)
