import { Router } from 'express'
import {
  createVideoCategoryController,
  deleteVideoCategoryController,
  findAllVideoCategoriesController,
  updateVideoCategoryController,
} from '../controllers/video.category.controller'
import {
  createVideoCategoryValidator,
  deleteVideoCategoryValidator,
  updateVideoCategoryValidator,
} from '../middlewares/video.category.validator'

export const router: Router = Router()

router.post('/', createVideoCategoryValidator, createVideoCategoryController)
router.get('/', findAllVideoCategoriesController)
router.put('/:id', updateVideoCategoryValidator, updateVideoCategoryController)
router.delete('/:id', deleteVideoCategoryValidator, deleteVideoCategoryController)
