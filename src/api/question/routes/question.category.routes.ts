import { Router } from 'express'
import { deleteQuestionCategoryController } from '../controllers/question.category.controller'
import {
  createQuestionCategoryController,
  findAllQuestionCategoriesController,
  updateCategoryController,
} from '../controllers/question.category.controller'
import {
  createQuestionCategoryValidator,
  deleteQuestionCategoryValidator,
  updateQuestionCategoryValidator,
} from '../middlewares/question.category.validator'
export const router: Router = Router()

router.post('/', createQuestionCategoryValidator, createQuestionCategoryController)
router.get('/', findAllQuestionCategoriesController)
router.put('/:id', updateQuestionCategoryValidator, updateCategoryController)
router.delete('/:id', deleteQuestionCategoryValidator, deleteQuestionCategoryController)
