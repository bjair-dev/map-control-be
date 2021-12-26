import { body } from "express-validator";
import { allValidator } from "../../../shared/express.validator";

export const createLoanTypeValidator = [
    body('type')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    
    .isLength({ min: 1, max: 200 })
    .withMessage('Tiene un minimo de 1 y maximo de 200 letras'),
    allValidator
  ]