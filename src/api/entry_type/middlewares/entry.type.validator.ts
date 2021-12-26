import { allValidator } from '../../../shared/express.validator'
import { body } from 'express-validator'
import { existsType } from '../validator/entry.type.validator'

export const createEntryTypeValidator = [
  body('type')
    .isString()
    .withMessage('Se require una palabra')
    .bail()
    // .custom(existsType)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .toLowerCase()
    .custom(existsType),
  allValidator,
]
