import { body, param, query } from 'express-validator'
import { notExistsQuestionType } from '../../question_type/validator/question.type.custom'
import { allValidator } from '../../../shared/express.validator'
import { extractFile } from '../../../shared/express.satinizer'
import { existsQuestion } from '../validator/question.custom'
import { findOneQuestion } from '../services/find/question'
import { resizeImage } from '../../../helpers/sharp'
import { Request } from 'express'
import { existsQuestionCategory } from '../validator/question.category.custom'

export const createQuestionValidator = [
  body('question')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
  body('tip')
    .isString()
    .withMessage('Tiene que se un tip')
    .bail()
    .isLength({ max: 200 })
    .withMessage('Tiene un maximo de 200'),
  body('motivation')
    .isString()
    .withMessage('Tiene que se una motivación')
    .bail()
    .isLength({ max: 200 })
    .withMessage('Tiene un maximo de 200'),
  body('question_type_id')
    .isNumeric()
    .withMessage('Tiene que ser numeros')
    .bail()
    .custom(notExistsQuestionType),
  body('question_category_id')
    .isNumeric()
    .withMessage('Tiene que ser numeros')
    .bail()
    .custom(existsQuestionCategory),
  body('image')
    .isString()
    .withMessage('Es una cadena de Base64')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .customSanitizer(extractFile)
    .isBase64()
    .withMessage('Tiene que ser una cadena de Base64')
    .custom(
      (file, { req }) =>
        req.mimetype === 'image/jpeg' || req.mimetype === 'image/jpg' || req.mimetype === 'image/png'
    )
    .withMessage('Solo se permiten formatos de imagen')
    .customSanitizer((image: string) => Buffer.from(image, 'base64'))
    .customSanitizer(async (image: Buffer) => {
      return await resizeImage({
        file: image,
        pngOptions: {
          compressionLevel: 9,
        },
        resizeOptions: {
          width: 300,
          height: 300,
          fit: 'cover',
        },
      })
    })
    .optional({ nullable: true }),
  allValidator,
]
//*@DESC update image of the question
export const updateImageQuestionValidator = [
  param('questionId').isNumeric().withMessage('Se require un numero').bail().custom(existsQuestion),
  body('image')
    .isString()
    .withMessage('Es una cadena de Base64')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .customSanitizer(extractFile)
    .isBase64()
    .withMessage('Tiene que ser una cadena de Base64')
    .custom(
      (file, { req }) =>
        req.mimetype === 'image/jpeg' || req.mimetype === 'image/jpg' || req.mimetype === 'image/png'
    )
    .withMessage('Solo se permiten formatos de imagen')
    .customSanitizer((image: string) => Buffer.from(image, 'base64'))
    .customSanitizer(async (image: Buffer) => {
      return await resizeImage({
        file: image,
        pngOptions: {
          compressionLevel: 9,
        },
        resizeOptions: {
          width: 300,
          height: 300,
          fit: 'cover',
        },
      })
    }),
  allValidator,
]
//*DESC Validator of the update questions
export const updateQuestionValidator = [
  param('questionId')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(existsQuestion),
  body('question')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minino de 10 y maximo de 200'),
  body('tip')
    .isString()
    .withMessage('Tiene que se un tip')
    .bail()
    .isLength({ max: 200 })
    .withMessage('Tiene un maximo de 200'),
  body('motivation')
    .isString()
    .withMessage('Tiene que se una motivación')
    .bail()
    .isLength({ max: 200 })
    .withMessage('Tiene un maximo de 200'),
  body('question_category_id')
    .isNumeric()
    .withMessage('Tiene que ser numeros')
    .bail()
    .custom(existsQuestionCategory),
  allValidator,
]

//*DESC Validator of the update questions
export const deleteQuestionValidator = [
  param('questionId')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(existsQuestion),
  allValidator,
]

//*DESC Validator of the archived or unarchived of the questions
export const archivedOrUnArchivedQuestionValidator = [
  body('state').isBoolean().withMessage('Solo valores booleanos'),
  param('questionId')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(async (questionId: number, { req }: { req: any }) => {
      const question = await findOneQuestion({ id: questionId, state: !req.body.state })
      if (!question)
        throw new Error('La pregunta no existe o esta en estado ' + (req.body.state ? 'activo' : 'archivado'))
    }),
  allValidator,
]

export const listQuestionValidator = [
  query('page').isNumeric().withMessage('Solo numero').bail().isInt({ min: 1 }).withMessage('El nimimo es 1'),
  query('state').isBoolean().withMessage('Solo valores booleanos'),
  allValidator,
]
export const findOneQuestionValidator = [
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser un valor numerico')
    .bail()
    // .custom(notExistsEntry)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio'),

  allValidator,
]
