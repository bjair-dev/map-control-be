import { body, query, param } from 'express-validator'
// import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
// import { extractFile } from '../../../shared/express.satinizer'
import {ExistsLoan, ExistsLoanType, VerifyLoanState} from '../validator/loan.custom'
import { ExistsBank } from '../../bank/validator/bank.custom'
export const createLoanValidator = [
    body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 0, max: 1000 })
    .withMessage('Tiene un minimo de 0 letras y maximo de 1000'),
    
    body('requirement')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1, max: 200 })
    .withMessage('Tiene un minimo de 1 y maximo de 200 letras'),
    
    body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min:1,max: 150 })
    .withMessage('Tiene un minimo de 1 y maximo de 150 letras'),
    // .optional({ nullable: true }),
    
    body('loan_type_id')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .custom(ExistsLoanType)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1, max: 2 })
    .withMessage('Tiene un minimo de 1 y maximo de 2 digitos'),
    
    body('bankId')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .custom(ExistsBank)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Tiene un minimo de 1 digito'),
    
    body('tea')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 2, max: 5 })
    .withMessage('Tiene un minimo de 10 y maximo de 5 digitos'),
    
    body('url')
    .optional({nullable:true})
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .isLength({ min: 0, max: 300 })
    .withMessage('Tiene un minimo de 5 letras y maximo de 300'),

 
    
    
    query('state')
    .optional({nullable:true})
    .isNumeric()
    .withMessage('Tiene que ser un numero')
    .bail()
    .custom(VerifyLoanState)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 0, max: 1 })
    .withMessage('Tiene un minimo de 1 y maximo de 1 numero'),
    
  allValidator,
]

export const deleteLoanValidator = [
    param('id')
      .isNumeric()
      .withMessage('Tiene que ser numerico')
      .bail()
      .custom(ExistsLoan),
    allValidator,
  ]

  export const getOneLoanValidator = [
    param('id')
      .isNumeric()
      .withMessage('Tiene que ser numerico')
      .bail()
      .custom(ExistsLoan),
    allValidator,
  ]
  export const findAllLoanValidator = [
    query('page')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .optional({nullable:true}),
    query('state')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .optional({nullable:true}),
    allValidator
  ]
    
  export const updateLoanValidator = [
    param('id')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .custom(ExistsLoan),
    
    body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min:1,max: 150 })
    .withMessage('Tiene un minimo de 1 y maximo de 150 letras')
    .optional({ nullable: true }),
    
    body('requirement')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1, max: 200 })
    .withMessage('Tiene un minimo de 1 y maximo de 200 letras')
    .optional({ nullable: true }),
    
    
    body('description')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 0, max: 1000 })
    .withMessage('Tiene un minimo de 0 letras y maximo de 1000')
    .optional({ nullable: true }),
    
    
    body('loan_type_id')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .custom(ExistsLoanType)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1, max: 2 })
    .withMessage('Tiene un minimo de 1 y maximo de 2 digitos')
    .optional({ nullable: true }),
    
    
    body('bankId')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .custom(ExistsBank)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Tiene un minimo de 1 digito')
    .optional({ nullable: true }),
    
    
    body('tea')
    .isNumeric()
    .withMessage('Tiene que ser numerico')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 2, max: 5 })
    .withMessage('Tiene un minimo de 10 y maximo de 5 digitos')
    .optional({ nullable: true }),
    
    
    body('url')
    .optional({nullable:true})
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .isLength({ min: 0, max: 300 })
    .withMessage('Tiene un minimo de 5 letras y maximo de 300')
    .optional({ nullable: true }),
    

 
    
    
    query('state')
    .optional({nullable:true})
    .isNumeric()
    .withMessage('Tiene que ser un numero')
    .bail()
    .custom(VerifyLoanState)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 0, max: 1 })
    .withMessage('Tiene un minimo de 1 y maximo de 1 numero')
    .optional({ nullable: true }),
    
    
  allValidator,
  ]


  
// export const updateBankValidator =[ 
// param('id')
// .isNumeric()
// .withMessage('Tiene que ser numerico')
// .bail()
// .custom(ExistsBank)
// .optional({ nullable: true }),


// body('title')
// .isString()
// .withMessage('Tiene que ser un string')
// .bail()
// .not()
// .isEmpty()
// .withMessage('No puede ser vacio')
// .bail()
// .isLength({ min: 5, max: 200 })
// .withMessage('Tiene un minimo de 10 letras y maximo de 200')
// .optional({ nullable: true }),



// body('name')
// .isString()
// .withMessage('Tiene que ser un string')
// // .bail()
// // .custom(ExistsNameBank)
// .not()
// .isEmpty()
// .withMessage('No puede ser vacio')
// .bail()
// .isLength({ min: 2, max: 200 })
// .withMessage('Tiene un minimo de 10 letras y maximo de 200')
// .optional({ nullable: true }),


// body('num_atc')
// .isNumeric()
// .withMessage('Se require el numero de atención al cliente como valores numericos')
// .bail()
// .isLength({ min: 9, max: 14 })
// .withMessage('Se require un numero de Peru, 9 digitos - 14')
// .optional({ nullable: true }),


// body('num_whatsapp')
// .isNumeric()
// .withMessage('Se require el numero de WhatsApp al cliente como valores numericos')
// .bail()
// .isLength({ min: 9, max: 14 })
// .withMessage('Se require un numero de Peru, 9 digitos - 14')
// .optional({ nullable: true }),


// allValidator,
// ]


// // //*@DESC update image of the question
// export const updateBankImageValidator = [
//   param('id')
//   .isNumeric()
//   .withMessage('Se require un numero')
//   .bail()
//   .custom(ExistsBank),
  
//   body('image')
//     .isString()
//     .withMessage('Es una cadena de Base64')
    
//     .not()
//     .isEmpty()
//     .withMessage('No puede ser vacio')
//     .bail()
//     .customSanitizer(extractFile)
//     .isBase64()
//     .withMessage('Tiene que ser una cadena de Base64')
//     .custom(
//       (file, { req }) =>
//         req.mimetype === 'image/jpeg' ||
//         req.mimetype === 'image/jpg' ||
//         req.mimetype === 'image/png'
//     )
//     .withMessage('Solo se permiten formatos de imagen')
//     .customSanitizer((image: string) => Buffer.from(image, 'base64'))
//     .customSanitizer(async (image: Buffer) => {
//       return await resizeImage({
//         file: image,
//         pngOptions: {
//           compressionLevel: 9,
//         },
//         resizeOptions: {
//           width: 300,
//           height: 300,
//           fit: 'cover',
//         },
//       })
//     }),
//   allValidator,
// ]

