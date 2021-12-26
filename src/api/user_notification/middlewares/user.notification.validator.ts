import { param } from "express-validator"
import { notExistsUserNotification } from "../validator/user.notification.custom"
import { allValidator } from '../../../shared/express.validator'

export const updateStatusUserNotificationValidator = [
    param('id')
      .isNumeric()
      .withMessage('Tiene que ser un valor numerico')
      .bail()
      .custom(notExistsUserNotification),
    allValidator,
  ]