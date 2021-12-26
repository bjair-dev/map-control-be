import { NextFunction,Response,Request } from "express"
import { IToken } from "../../auth/passport/passport"
import createError from 'http-errors'
import sequelize from "sequelize"
import { createEntryTagAdmin } from "../services/create/entry.tag"
import { EntryTagAttributes } from "../models/entry.tag.model"
import { findAllEntryTag } from "../services/find/entry.tag"

export const createEntryTagAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { tag ,tag_type:type }: EntryTagAttributes = req.body
    const user = req.user as IToken
    
    try {
      const entryTag = await createEntryTagAdmin({
        created_by:Number(user.userId),
        tag_type:type as string,
          tag,
      })
 
      res.status(200).json(entryTag)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  
  export const listEntryTagController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { tag_type } = req.params
      const entryTag = await findAllEntryTag({
        attributes:['id','tag','state','tag_type'],
        where:{
          tag_type
        }
    })
    
    
      res.status(200).json(entryTag)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  