import { Router } from 'express'
import {
  createTipCategoryController,
  deleteTipCategoryController,
  findAllTipCategoriesController,
  updateTipCategoryController,
} from '../controllers/noticia.category.controller'
import {
  createTipCategoryValidator,
  deleteTipCategoryValidator,
  updateTipCategoryValidator,
} from '../middlewares/noticia.category.validator'

export const router: Router = Router()

router.post('/', createTipCategoryValidator, createTipCategoryController)
router.get('/', findAllTipCategoriesController)
router.put('/:id', updateTipCategoryValidator, updateTipCategoryController)
router.delete('/:id', deleteTipCategoryValidator, deleteTipCategoryController)
