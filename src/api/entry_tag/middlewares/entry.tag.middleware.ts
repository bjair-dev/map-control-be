import { body, param } from "express-validator";
import { allValidator } from "../../../shared/express.validator";
import { existsTagType } from "../validator/entry.tag.custom";

export const addEntryTagAdminValidator = [

    body('tag')
      .isString()
      .withMessage('Tiene que ser un string')
      .bail()
      .not()
      .isEmpty()
      .withMessage('No puede ser vacio')
      .bail()
      .isLength({ min: 1, max: 70 })
      .withMessage('Tiene un minimo de 1 letra y maximo de 70'),
      body('tag_type')
      .isString()
      .withMessage('Tiene que ser un string')
      .bail()
      .not()
      .isEmpty()
      .withMessage('No puede ser vacio')
      .bail()
      .isLength({ min: 1, max:10 })
      .withMessage('Tiene un minimo de 1 letra y maximo de 10'),
      body('status')
      .isBoolean()
      .withMessage('Tiene que ser un valor de tipo boolean (true | false)')
      .bail()
      .not()
      .isEmpty()
      .withMessage('No puede ser vacio')
      .optional({nullable:true}),
    allValidator,
  ]
  
  export const findAllEntryTagUserValidator = [
    param('tag_type')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .custom(existsTagType)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1, max:10 })
    .withMessage('Tiene un minimo de 1 letra y maximo de 10'),
  ]
  
  