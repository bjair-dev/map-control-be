import { param, query } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'
import { existsUserPackage } from '../validator/user.package.custom'


export const updateStatusValidator = [
  param('id').isNumeric().withMessage('Se require un Id').bail().custom(existsUserPackage),
  query('type').isString().withMessage('Se require una cadena').bail().optional({ nullable:true }),
  
  allValidator,
]
export const updateIndexValidator = [
  param('id').isNumeric().withMessage('Se require un Id').bail().custom(existsUserPackage),
  param('current_index').isNumeric().withMessage('Se require un nuevo indice').bail(),
  query('type').isString().withMessage('Se require una cadena').bail().optional({ nullable:true }),
  
  allValidator,
]
