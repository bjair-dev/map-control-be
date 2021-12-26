import { body, query, param } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'
import {
  existsPackageHeader,
  existsPackageContentType,
  existsPackage,
} from '../validator/package.custom'
import { existsVideo } from '../../videos/validator/video.custom'
import { existsTip } from '../../tip/validator/tip.custom'
import { existsQuestion } from '../../question/validator/question.custom'
import { existsChallenge } from '../../challenge/validator/challenge.custom'

//*@DESC Validator create package
export const createPackageValidator = [
  body('questionId')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsQuestion)
    .optional({ nullable: true }),
  body('tipId')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsTip)
    .optional({ nullable: true }),
  body('videoId')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsVideo)
    .optional({ nullable: true }),
  body('challengeId')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsChallenge)
    .optional({ nullable: true }),
  body('package_header_Id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsPackageHeader),
  body('package_content_type_id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsPackageContentType),
  allValidator,
]
export const listPackageValidator = [
  query('page')
    .isNumeric()
    .withMessage('Solo numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El nimimo es 1'),
  query('package_header_id')
    .isNumeric()
    .withMessage('Se require el package_header_id')
    .bail()
    .custom(existsPackageHeader),
  allValidator,
]
export const deletePackageValidator = [
  param('id').isNumeric().withMessage('Solo numero').bail().custom(existsPackage),
  allValidator,
]
export const listAllToUseValidator = [
  query('package_header_id')
    .isNumeric()
    .withMessage('Se require una programación')
    .bail()
    .custom(existsPackageHeader),
  allValidator,
]
