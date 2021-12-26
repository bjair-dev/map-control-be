import { allValidator } from '../../../shared/express.validator'
import { body, param } from 'express-validator'
import { notExistsTypebyId } from '../../entry_type/validator/entry.type.validator'
import { notExistsEntry, notExistsEntryTagbyId } from '../validator/entry.custom'

export const createEntryValidator = [
  body('entry_type_id')
  .isNumeric()
  .withMessage('Tiene que ser un valor numerico')
  .bail()
  .custom(notExistsTypebyId)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio'),
  
  body('entry_tag_id')
  .isNumeric()
  .withMessage('Tiene que ser un valor numerico')
  .bail()
  .custom(notExistsEntryTagbyId)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio'),
  
body('amount')
  .isFloat()
  .withMessage('Es un valor numerico')
  .isLength({ min: 1 })
  .withMessage('minimo un digito'),

body('date')
    .isISO8601()
    .withMessage('Tiene que ser una fecha valida')
    .optional({ nullable: true }),

body('description')
  .isString()
  .withMessage('Tiene que ser un string')
  .bail()
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ max: 300 })
  .withMessage('300 digitos como maximo')
  .optional({ nullable: true }),
  
body('completed')
  .isBoolean()
  .withMessage('Tiene que ser un tipo boolean (true | false)')
  .bail()
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .optional({ nullable: true }),

  body('account')
  .isString()
  .withMessage('Tiene que ser un string')
  .bail()
  // .not()
  // .isEmpty()
  // .withMessage('No puede ser vacio')
  // .bail()
  .isLength({ max: 200 })
  .withMessage('200 digitos como maximo')
  .optional({ nullable: true }),
  allValidator,
]


export const updateEntryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsEntry)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
    body('entry_type_id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsTypebyId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
    body('entry_tag_id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsEntryTagbyId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
  body('amount')
    .isFloat()
    .withMessage('Es un valor numerico')
    .isLength({ min: 1 })
    .withMessage('minimo un digito')
    .optional({ nullable: true }),

  body('date')
      .isISO8601()
      .withMessage('Tiene que ser una fecha valida')
      .optional({ nullable: true }),

  body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ max: 300 })
    .withMessage('300 digitos como maximo')
    .optional({ nullable: true }),
    
  body('completed')
    .isBoolean()
    .withMessage('Tiene que ser un tipo boolean (true | false)')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .optional({ nullable: true }),
  
    body('account')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ max: 200 })
    .withMessage('200 digitos como maximo')
    .optional({ nullable: true }),
  allValidator,
]


export const deleteEntryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsEntry)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
  allValidator,
]
export const findOneEntryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsEntry)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
  allValidator,
]

export const ListAllEntryValidator = [
  // param('id')
  //   .isNumeric()
  //   .withMessage('Tiene que ser un valor numerico')
  //   .bail()
  //   .custom(notExistsEntry)
  //   .not()
  //   .isEmpty()
  //   .withMessage('No puede ser vacio'),
    
    param('entry_type_id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsTypebyId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
    param('entry_tag_id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsEntryTagbyId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
  allValidator,
]


export const SummaryOfTheMonthEntryValidator = [
    
    param('entry_type_id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsTypebyId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
    
    param('entry_tag_id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    .custom(notExistsEntryTagbyId)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
    
    
    param('year')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .isLength({ max: 4,min:4 })
    .withMessage('Se require 4 números')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),
  allValidator,
]
export const percentageOfTheMonthEntryTagAndTypeValidator = [
    
  param('entry_type_id')
  .isNumeric()
  .withMessage('Tiene que ser un valor numerico')
  .bail()
  .custom(notExistsTypebyId)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio'),
  
  param('entry_tag_id')
  .isNumeric()
  .withMessage('Tiene que ser un valor numerico')
  .bail()
  .custom(notExistsEntryTagbyId)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio'),

allValidator,
]