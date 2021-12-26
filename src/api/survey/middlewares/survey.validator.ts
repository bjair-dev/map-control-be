import { extractFile } from '../../../shared/express.satinizer'
import { body, query, param } from 'express-validator'
import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
import { existsSurveyType } from '../validator/survey.type.custom'
import { existsSurvey } from '../validator/survay.custom'
import { findOneSurvey } from '../services/find/survey'

export const createSurveyValidator = [
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
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
  body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200')
    .optional({ nullable: true }),
  body('contents').isArray().withMessage('Se require un array'),
  body('survey_type_id')
    .isNumeric()
    .withMessage('Se rquire un numero')
    .bail()
    .custom(existsSurveyType),
  body('contents.*')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('Tiene un minimo de 2 letras y maximo de 50'),
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
        req.mimetype === 'image/jpeg' ||
        req.mimetype === 'image/jpg' ||
        req.mimetype === 'image/png'
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
export const updateSurveyValidator = [
  param('id').isNumeric().withMessage('Se require un Id').bail().custom(existsSurvey),
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
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
  body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200')
    .optional({ nullable: true }),
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
        req.mimetype === 'image/jpeg' ||
        req.mimetype === 'image/jpg' ||
        req.mimetype === 'image/png'
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
export const listSurveyValidator = [
  query('page')
    .isNumeric()
    .withMessage('Solo numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El nimimo es 1'),
  query('state')
    .isNumeric()
    .withMessage('Se require numeros')
    .bail()
    .isInt({ min: 0, max: 1 })
    .withMessage('Solo se aceptan 0 y 1'),
  allValidator,
]
export const deleteSurveyValidator = [
  param('id').isNumeric().withMessage('Solo numero').bail().custom(existsSurvey),
  allValidator,
]
export const archivedOrUnArchivedSurveyValidator = [
  body('state').isBoolean().withMessage('Solo valores booleanos'),
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(async (id: number, { req }: { req: any }) => {
      const survey = await findOneSurvey({
        where: {
          id,
          state: !req.body.state,
        },
      })
      if (!survey)
        throw new Error(
          'La encuesta no existe o esta en estado ' +
            (req.body.state ? 'activo' : 'archivado')
        )
    }),
  allValidator,
]
export const findOneSurveyValidator = [
  param('id').isNumeric().withMessage('Solo numero').bail().custom(existsSurvey),
  allValidator,
]