import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { findAllBank } from '../services/find/bank'
import { findOneBank } from '../services/find/bank'
import { deleteBank } from '../services/delete/bank'
import { updateBank } from '../services/update/bank'
import { IToken } from '../../auth/passport/passport'
import { createBankService, updateBankImageService } from '../services/bank.service'
import { removeFile } from '../../../shared/remove.file'
import path from 'path'
import config from '../../../config/environments'


export const addBankController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { name, title, num_atc, num_whatsapp } = req.body
    const image = req.body.image as Buffer

    const newBank = await createBankService({
      created_by: user.userId,
      image,
      bank: {
      name,
      title,
      num_atc,
      num_whatsapp,
      },
    })
    // const bank = await createBank({
    //   bank: {
    //     created_by: user.userId,
    //     name,
    //     title,
    //     num_atc,
    //     num_whatsapp,
    //     key:_key,
    //     path:_path,
    //     size:_size,
    //   },
    // })

    res.status(200).json(newBank)
    
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findBanksController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banks = await findAllBank({
      attributes: ['id', 'name', 'title', 'num_atc', 'num_whatsapp', 'key', 'path', 'size'],
    })
    res.status(200).json(banks)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findOneBankController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const Bank = await findOneBank({
      where: {
        id,
      },
      attributes: ['id', 'name', 'title', 'num_atc', 'num_whatsapp', 'key', 'path', 'size'],
    })
    res.status(200).json(Bank)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const removeBankController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    
    const _key = (await findOneBank({ where:{ id } }))?.key
    
    await Promise.allSettled([
      removeFile({ path: path.join(config.DIR_ASSETS!, _key || '') }),
      await deleteBank({
        where: {
          id,
        },
      })
    ])

    res.status(200).json('!Se elimino con exito¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updateBankController = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IToken
  // const image = req.body.image as Buffer
  
  const {
    name,
    title,
    num_whatsapp,
    num_atc,
  } = req.body
  try {
    await updateBank({
      bank: {
        name:name,
        title:title,
        num_whatsapp:num_whatsapp,
        num_atc:num_atc,
        updated_by:user.userId,
      },
      where: {
        id:Number(req.params.id),
      },
    })
    // await updateBankService({
    //   bank:{
    //     name,
    //     title,
    //     num_whatsapp,
    //     num_atc,
    //   },
    //   image,
    //   updated_by: user.userId,
    //   id:Number(req.params.id)
    // })
   
    res.status(200).json('¡Se actualizo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updateBankImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const user = req.user as IToken
  const image = req.body.image as Buffer
  
  const { path } = await updateBankImageService({
    id:Number(req.params.id),
    image,
    updated_by:user.userId
  })
  
  res.status(200).json({ message:'¡Se actualizo correctamente!' , path})
  
  } catch (err:any) {
  if (err instanceof sequelize.ValidationError) next(createError(400, err))
    
  next(createError(404, err))
  } 
}