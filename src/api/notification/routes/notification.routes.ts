import { Router } from 'express'
/*
    Controllers
*/
import {
  getContentByTypeContentController,
  createNotificationController,
  findAllNotificationsController,
  updateNotificationController,
  removeNotificationController,
} from '../controllers/notification.controller'

import {
  getContentByTypeContentValidator,
  createNotificationValidator,
  listNotificationsValidator,
  deleteNotificationValidator,
} from '../middlewares/notification.validator'

export const router: Router = Router()

router.get('/typecontent/:type_content', getContentByTypeContentValidator, getContentByTypeContentController)
router.post('/', createNotificationValidator, createNotificationController)
router.get('/', listNotificationsValidator, findAllNotificationsController)
router.put('/:notificationId', createNotificationValidator, updateNotificationController)
router.delete('/:notificationId', deleteNotificationValidator, removeNotificationController)
