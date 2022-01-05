import { body, param } from "express-validator";
import { allValidator } from '../../../shared/express.validator'
import { notExistsSurvey } from "../validator/answer.survey.custom";

export const createAnswerValidator = [
    body('surveyId')
    .isNumeric().withMessage('Se require un numero')
    .bail()
    .custom(notExistsSurvey)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail(),


    body('answer')
    .isString()
    .withMessage('Se require una cadena')
    .bail()
    .isLength({ min: 1,max:700 })
    .withMessage('El minimo es 1 y el maximo es 700 caracteres')
    
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
  ,
  allValidator
]
  //surveyId
export const resultAnswerSurveyValidator = [
  param('id')
  .isNumeric().withMessage('Se require un numero')
  .bail()
  .custom(notExistsSurvey)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
,
allValidator
]
