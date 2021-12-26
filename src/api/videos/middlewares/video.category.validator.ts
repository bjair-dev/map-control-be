import { body, param } from 'express-validator'
import { titleCase } from 'title-case'
import { allValidator } from '../../../shared/express.validator'
import {
  existsVideoCategory,
  notExistsVideoCategory,
  notExistsVideoCategoryExcId,
} from '../validator/video.category.custom'
export const createVideoCategoryValidator = [
  body('category')
    .isString()
    .withMessage('Se require un string')
    .bail()
    .not()
    .isEmpty()
    .customSanitizer((category) => titleCase(category))
    .withMessage('No puede ser vacio')
    .custom(notExistsVideoCategory),
  allValidator,
]
export const updateVideoCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsVideoCategory),
  body('category')
    .isString()
    .withMessage('Se require un string')
    .bail()
    .not()
    .isEmpty()
    .customSanitizer((category) => titleCase(category))
    .withMessage('No puede ser vacio')
    .custom(notExistsVideoCategoryExcId),
  allValidator,
]
export const deleteVideoCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsVideoCategory),
  allValidator,
]
