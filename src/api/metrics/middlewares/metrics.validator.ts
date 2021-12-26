import { body } from "express-validator";
import { allValidator } from '../../../shared/express.validator'
import { notExistsMetric } from "../validator/metrics.custom";

export const updateUseTimeMetricsValidator = [
    body('id')
    .isNumeric().withMessage('Se require un numero')
    .bail()
    .custom(notExistsMetric)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail(),
    
    body('time')
    .isNumeric().withMessage('Se require un numero')
    .bail()
    // .custom(notExistsSurvey)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail(),

  
  allValidator
]
  
