import { body } from "express-validator";
import { allValidator } from '../../../shared/express.validator'
import { notExistsQuestion } from "../validator/answer.custom";

export const createAnswerValidator = [
    body('questionId').isNumeric().withMessage('Se require un numero')
    .bail()
    .custom(notExistsQuestion)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 3 })
    .withMessage('El minimo es 3 y el maximo es 100'),
    body('answered').isBoolean().withMessage('Se require un valor verdadero o falso')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
  ,
  allValidator
]
  