import { body, query, param } from 'express-validator'
import { extractFile } from '../../../shared/express.satinizer'
import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
import { findOneChallenge } from '../services/find/index'
import { existsChallenge } from '../validator/challenge.custom'

export const createChallengeValidator = [
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 100 })
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
    .isLength({ max: 200 })
    .withMessage('Tiene un minimo de 0 letras y maximo de 200')
    .optional({ nullable: true }),
  body('bottom')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Tiene un maximo de 50 caracteres')
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
export const updateChallengeValidator = [
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .customSanitizer(async (id: number, { req }) => {
      const challenge = await findOneChallenge({
        where: {
          id,
        },
      })
      if (!challenge) {
        req.valid = false
        return id
      }
      req.valid = true
      req.body.key = challenge.key
      return id
    })
    .custom((id, { req }) => req.valid)
    .withMessage('El Id no existe'),
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 100 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 20'),
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
    .isLength({ max: 200 })
    .withMessage('Tiene un minimo de 0 letras y maximo de 200')
    .optional({ nullable: true }),
  body('bottom')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Tiene un maximo de 50 caracteres')
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
export const listChallengeValidator = [
  query('page')
    .isNumeric()
    .withMessage('Solo numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El nimimo es 1'),
  query('state').isBoolean().withMessage('Solo valores booleanos'),
  allValidator,
]
export const archivedOrUnArchivedChallengeValidator = [
  body('state').isBoolean().withMessage('Solo valores booleanos'),
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(async (id: number, { req }: { req: any }) => {
      const state = req.body.state as number
      const question = await findOneChallenge({
        where: {
          id,
          state: Number(!state),
        },
      })
      if (!question)
        throw new Error(
          'La encuesta no existe o esta en estado ' + (state ? 'activo' : 'archivado')
        )
    }),
  allValidator,
]
export const deleteChallengeValidator = [
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(existsChallenge),
  allValidator,
]
