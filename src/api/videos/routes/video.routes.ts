import { Router } from 'express'
import {
  archivedOrUnArchivedVideoValidator,
  updateVideoValidator,
} from '../middlewares/video.validator'
import {
  archivedVideoController,
  updateVideoController,
} from '../controllers/video.controller'
import {
  createVideoController,
  findAllVideosController,
  deleteVideoController,
} from '../controllers/video.controller'
import {
  createVideoValidator,
  listVideosValidator,
  deleteVideoValidator,
} from '../middlewares/video.validator'

export const router: Router = Router()

router.get('/', listVideosValidator, findAllVideosController)
router.post('/', createVideoValidator, createVideoController)
router.put('/:id', updateVideoValidator, updateVideoController)
router.put('/:id/archived', archivedOrUnArchivedVideoValidator, archivedVideoController)
router.delete('/:id', deleteVideoValidator, deleteVideoController)
