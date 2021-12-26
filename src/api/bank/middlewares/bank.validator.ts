import { body, query, param } from 'express-validator'
import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
import { extractFile } from '../../../shared/express.satinizer'
import {ExistsBank, ExistsNameBank} from '../validator/bank.custom'
export const createBankValidator = [
    body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 5, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
    
    body('name')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .custom(ExistsNameBank)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 2, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
    
    body('num_atc')
    .isNumeric()
    .withMessage('Se require el numero de atención al cliente como valores numericos')
    .bail()
    .isLength({ min: 9, max: 14 })
    .withMessage('Se require un numero de Peru, 9 digitos - 14'),
 
    body('num_whatsapp')
    .isNumeric()
    .withMessage('Se require el numero de WhatsApp al cliente como valores numericos')
    .bail()
    .isLength({ min: 9, max: 14 })
    .withMessage('Se require un numero de Peru, 9 digitos - 14'),
    
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

export const deleteBankValidator = [
    param('id')
      .isNumeric()
      .withMessage('Tiene que ser numerico')
      .bail()
      .custom(ExistsBank),
    allValidator,
  ]

  export const getOneBankValidator = [
    param('id')
      .isNumeric()
      .withMessage('Tiene que ser numerico')
      .bail()
      .custom(ExistsBank),
    allValidator,
  ]
  
//   export const updateBankValidator = [
//     param('id')
//       .isNumeric()
//       .withMessage('Tiene que ser numerico')
//       .bail()
//       .custom(ExistsBank),
//     allValidator,
//   ]
//   export const updateBankValidator = [
//     param('id')
//       .isNumeric()
//       .withMessage('Tiene que ser numerico')
//       .bail()
//       .custom(ExistsBank),
//     allValidator,
//   ]

export const updateBankValidator =[ 
param('id')
.isNumeric()
.withMessage('Tiene que ser numerico')
.bail()
.custom(ExistsBank)
.optional({ nullable: true }),


body('title')
.isString()
.withMessage('Tiene que ser un string')
.bail()
.not()
.isEmpty()
.withMessage('No puede ser vacio')
.bail()
.isLength({ min: 5, max: 200 })
.withMessage('Tiene un minimo de 10 letras y maximo de 200')
.optional({ nullable: true }),



body('name')
.isString()
.withMessage('Tiene que ser un string')
// .bail()
// .custom(ExistsNameBank)
.not()
.isEmpty()
.withMessage('No puede ser vacio')
.bail()
.isLength({ min: 2, max: 200 })
.withMessage('Tiene un minimo de 10 letras y maximo de 200')
.optional({ nullable: true }),


body('num_atc')
.isNumeric()
.withMessage('Se require el numero de atención al cliente como valores numericos')
.bail()
.isLength({ min: 9, max: 14 })
.withMessage('Se require un numero de Peru, 9 digitos - 14')
.optional({ nullable: true }),


body('num_whatsapp')
.isNumeric()
.withMessage('Se require el numero de WhatsApp al cliente como valores numericos')
.bail()
.isLength({ min: 9, max: 14 })
.withMessage('Se require un numero de Peru, 9 digitos - 14')
.optional({ nullable: true }),


allValidator,
]


// //*@DESC update image of the question
export const updateBankImageValidator = [
  param('id')
  .isNumeric()
  .withMessage('Se require un numero')
  .bail()
  .custom(ExistsBank),
  
  body('image')
    .isString()
    .withMessage('Es una cadena de Base64')
    
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
    }),
  allValidator,
]

