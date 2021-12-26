import { query, param, body } from 'express-validator'
import {
  existsPackageType,
  existsPackageHeader,
  yesExistsDateOfPachakeHeader,
} from '../validator/package.custom'
import { allValidator } from '../../../shared/express.validator'

export const createPackageHeaderValidator = [
  // body('package_type_id')
  //   .isNumeric()
  //   .withMessage('Se require el package_type_id')
  //   .bail()
  //   .custom(existsPackageType),
  body('name')
    .isString()
    .withMessage('Se require el name')
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 100 })
    .withMessage('El minimo es 10 y el maximno es 1000'),
  body('outstanding').isBoolean().withMessage('Se require valores booleanos'),
  body('date')
    .isNumeric()
    .withMessage('Se require el date como numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El minimo es 1')
    .bail()
    .custom(yesExistsDateOfPachakeHeader),
  allValidator,
]
export const createPackageHeaderDatesValidator = [
  // body('package_type_id')
  //   .isNumeric()
  //   .withMessage('Se require el package_type_id')
  //   .bail()
  //   .custom(existsPackageType),
  body('outstanding').isBoolean().withMessage('Se require valores booleanos'),

  body('name')
    .isString()
    .withMessage('Se require el name')
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 100 })
    .withMessage('El minimo es 10 y el maximno es 1000'),
  body('date').isISO8601().withMessage('Se requiere un formato de fecha'),
  allValidator,
]
export const listPackageHeaderValidator = [
  query('page')
    .isNumeric()
    .withMessage('Solo numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El nimimo es 1'),
  query('type')
    .isNumeric()
    .withMessage('Se require el type')
    .bail()
    .custom(existsPackageType),
  allValidator,
]

export const deletePackageHeaderValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se un valor numerico')
    .bail()
    .custom(existsPackageHeader),
  allValidator,
]
