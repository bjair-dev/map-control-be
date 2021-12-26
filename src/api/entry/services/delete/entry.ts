import { FindAttributeOptions, WhereOptions } from 'sequelize/types'

import { DataBase } from "../../../../database"
import { EntryAttributes } from "../../models/entry.model"

export const deleteEntry = async ({
    id,
    userId
  }: {
    id:number,
    userId:number
  }) => {
    try {
      return await DataBase.instance.entry.destroy({
        where:{ id,userId },
      })
    } catch (err) {
      throw err
    }
  }
  