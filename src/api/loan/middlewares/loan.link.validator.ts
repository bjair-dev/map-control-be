import { body, query, param } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'

export const createLoanLinkValidator = [
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 140 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 140')
    .optional({ nullable: true }),
  body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 500')
    .optional({ nullable: true }),
  body('arr_loan').isArray().withMessage('Se require un array'),
  allValidator,
]
export const getOneLoanLinkValidator = [
  param('id').isNumeric().withMessage('Tiene que ser numerico').bail(),
  allValidator,
]

export const deleteLoanLinkValidator = [
  param('id').isNumeric().withMessage('Tiene que ser numerico').bail(),
  allValidator,
]
