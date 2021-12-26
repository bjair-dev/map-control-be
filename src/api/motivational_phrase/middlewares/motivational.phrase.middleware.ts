import { body, param } from "express-validator";
import { allValidator } from "../../../shared/express.validator";
import {  notExistsMotivationalPhrase } from "../validator/motivational.phrase.custom";

export const createMotivationalPhraseValidator = [
    body('phrase')
    .isString()
    .withMessage('Tiene que ser una cadena de texto')
    .bail()
    .isLength({ max: 600,min:5 })
    .withMessage('600 caracteres como máximo y como mínimo 5')
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
   
 
  ]
  
export const updateMotivationalPhraseValidator = [
    param('id')
    .isNumeric()
    .withMessage('Tiene que ser valor numérico')
    .bail()
    .custom(notExistsMotivationalPhrase)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
    body('phrase')
    .isString()
    .withMessage('Tiene que ser una cadena de texto')
    .bail()
    .isLength({ max: 600,min:5 })
    .withMessage('600 caracteres como máximo y como mínimo 5')
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .optional({ nullable: true }),
   
    body('state')
    .isBoolean()
    .withMessage('Puede ser true o false')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .optional({ nullable: true }),
    allValidator,
  ]
  
  export const findOneMotivationalPhraseValidator = [
    param('id')
    .isNumeric()
    .withMessage('Tiene que ser valor numérico')
    .bail()
    .custom(notExistsMotivationalPhrase)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    allValidator,
  ]
  
  export const deleteMotivationalPhraseValidator = [
    param('id')
    .isNumeric()
    .withMessage('Tiene que ser valor numérico')
    .bail()
    .custom(notExistsMotivationalPhrase)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    allValidator,
  ]
  