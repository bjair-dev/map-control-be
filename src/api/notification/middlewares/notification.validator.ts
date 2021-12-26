import { body, query, param } from 'express-validator'
// import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
import { ExistsTypeContentParameter } from '../validator/notification.custom'

export const getContentByTypeContentValidator = [
  param('type_content')
    .isString()
    .withMessage('Tiene que ser una cadena')
    .bail()
    .custom(ExistsTypeContentParameter),
  allValidator,
]

export const createNotificationValidator = [
  body('content_id').isNumeric().withMessage('Se require un numero').bail().optional({ nullable: true }),
  body('content_type').isNumeric().withMessage('Se require un numero').bail().optional({ nullable: true }),
]

export const listNotificationsValidator = [
  query('page').isNumeric().withMessage('Solo numero').bail().isInt({ min: 1 }).withMessage('El nimimo es 1'),
  query('state').isBoolean().withMessage('Solo valores booleanos'),
  allValidator,
]

export const deleteNotificationValidator = [
  param('notificationId').isNumeric().withMessage('Tiene que ser numerico').bail(),
  allValidator,
]
