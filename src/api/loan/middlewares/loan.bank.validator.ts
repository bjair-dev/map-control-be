import { body, param } from "express-validator";
import { allValidator } from "../../../shared/express.validator";
import { existsLoanTypeId } from "../validator/loan.bank.custom";

export const findLoanBankValidator = [
    param('id')
    .isNumeric()
    .withMessage('Tiene que ser un numero')
    .bail()
    .custom(existsLoanTypeId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Tiene un minimo de 1 numero'),
    allValidator
  ]