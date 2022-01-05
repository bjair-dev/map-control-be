import { Router } from 'express'
import { updateStatusUserNotificationValidator } from '../../user_notification/middlewares/user.notification.validator'
import { changeStatusUserNotificationController, notificationForUserController } from '../controllers/notification.controller'
/*
    Controllers
*/


export const router: Router = Router()

router.get('/', notificationForUserController)
router.put('/status/:id',updateStatusUserNotificationValidator,changeStatusUserNotificationController)
// router.get('/available',availableNotificationController)