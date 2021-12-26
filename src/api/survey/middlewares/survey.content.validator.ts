import { body, param } from 'express-validator'
import { existsSurveyContent } from '../validator/survey.content.custom'
import { allValidator } from '../../../shared/express.validator'
import { existsSurveyAndType3 } from '../validator/survay.custom'
export const updateSurveyContentValidator = [
  body('content')
    .isString()
    .withMessage('Se require el contenido')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacío')
    .isLength({ max: 50 })
    .withMessage('Maximo de 50 digitos'),
  param('id')
    .isNumeric()
    .withMessage('Se requiere un id')
    .bail()
    .custom(existsSurveyContent),
  allValidator,
]
export const createSurveyContentValidator = [
  body('content')
    .isString()
    .withMessage('Se require el contenido')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacío')
    .isLength({ max: 50 })
    .withMessage('Maximo de 50 digitos'),
  body('surveyId')
    .isNumeric()
    .withMessage('Se requiere un id')
    .bail()
    .custom(existsSurveyAndType3),
  allValidator,
]
export const deleteSurveyContentValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se requiere un id')
    .bail()
    .custom(existsSurveyContent),
  allValidator,
]
