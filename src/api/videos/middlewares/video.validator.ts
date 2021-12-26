import { body, query, param } from 'express-validator'
import { extractFile } from '../../../shared/express.satinizer'
import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
import { existsVideo } from '../validator/video.custom'
import { findOneVideo } from '../services/find/index'
import { existsVideoCategory } from '../validator/video.category.custom'

export const updateVideoValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un Id numerico')
    .bail()
    .customSanitizer(async (id, { req }) => {
      const video = await findOneVideo({
        where: {
          id,
        },
      })

      if (!video) {
        req.valid = false
        return id
      }

      req.body.key = video.key
      req.valid = true
      return id
    })
    .custom((id, { req }) => req.valid)
    .withMessage('El Id no existe'),
  body('video_category_id')
    .isNumeric()
    .withMessage('Se requiere un numero')
    .bail()
    .custom(existsVideoCategory),
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
  body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .isLength({ min: 0, max: 200 })
    .withMessage('Tiene un maximo de 200 caracteres')
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

export const createVideoValidator = [
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
  body('video_category_id')
    .isNumeric()
    .withMessage('Se requiere un numero')
    .bail()
    .custom(existsVideoCategory),
  body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 0, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200')
    .optional({ nullable: true }),
  body('vimeo')
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
    .custom((vimeo, { req }) => req.mimetype === 'video/mp4')
    .withMessage('Solo se permiten formatos de video: mp4')
    .customSanitizer((vimeo: string) => Buffer.from(vimeo, 'base64'))
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

export const listVideosValidator = [
  query('page')
    .isNumeric()
    .withMessage('Solo numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El nimimo es 1'),
  query('state').isBoolean().withMessage('Solo valores booleanos'),
  allValidator,
]

export const deleteVideoValidator = [
  param('id').isNumeric().withMessage('Se require numeros').bail().custom(existsVideo),
  allValidator,
]

export const archivedOrUnArchivedVideoValidator = [
  body('state').isBoolean().withMessage('Solo valores booleanos'),
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(async (id: number, { req }: { req: any }) => {
      const state = req.body.state as number
      const question = await findOneVideo({
        where: {
          id,
          state: Number(!state),
        },
      })
      if (!question)
        throw new Error(
          'La pregunta no existe o esta en estado ' + (state ? 'activo' : 'archivado')
        )
    }),
  allValidator,
]
