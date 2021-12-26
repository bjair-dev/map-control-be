import { body, param } from 'express-validator'
import {
  notExistsQuestionCategory,
  existsQuestionCategory,
  notExistsQuestionCategoryExcId,
} from '../validator/question.category.custom'
import { allValidator } from '../../../shared/express.validator'
import { titleCase } from 'title-case'
export const createQuestionCategoryValidator = [
  body('category')
    .isString()
    .withMessage('Se require un string')
    .bail()
    .not()
    .isEmpty()
    .customSanitizer((category) => titleCase(category))
    .withMessage('No puede ser vacio')
    .custom(notExistsQuestionCategory),
  allValidator,
]
export const updateQuestionCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsQuestionCategory),
  body('category')
    .isString()
    .withMessage('Se require un string')
    .bail()
    .not()
    .isEmpty()
    .customSanitizer((category) => titleCase(category))
    .withMessage('No puede ser vacio')
    .custom(notExistsQuestionCategoryExcId),
  allValidator,
]
export const deleteQuestionCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsQuestionCategory),
  allValidator,
]
