// import { FindAttributeOptions, WhereOptions } from 'sequelize/types'

import { DataBase } from "../../../../database"
// import { MotivationalPhraseAttributes } from "../../models/motivational.phrase"

export const deleteMotivationalPhrase = async ({
    id,
  }: {
    id:number,
  }) => {
    try {
      return await DataBase.instance.motivationalPhrase.destroy({
        where:{ id },
      })
    } catch (err) {
      throw err
    }
  }
  