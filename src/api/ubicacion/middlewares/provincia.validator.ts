import { body, query, param } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'
import { existsProvincia } from '../validator/provincia.custom'

/* export const getProvinciaValidator = [
  param('id').isNumeric().withMessage('Solo numero').bail().custom(existsProvincia),
  allValidator,
] */
export const getProvinciaValidator = [
  query('region_id').isNumeric().withMessage('Se require el region_id').bail().custom(existsProvincia),
  allValidator,
]
