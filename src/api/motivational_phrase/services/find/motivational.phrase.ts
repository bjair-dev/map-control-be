import { FindAttributeOptions, Order, WhereOptions } from "sequelize/types"
import { DataBase } from "../../../../database"
import { MotivationalPhraseAttributes } from "../../models/motivational.phrase"

export const findAllMotivationalPhrase = async ({
    where,
    attributes,
    order,
    limit
  }: {
    where?: WhereOptions<MotivationalPhraseAttributes>
    attributes:FindAttributeOptions
    order?:Order
    limit?:number
}): Promise<MotivationalPhraseAttributes[] | null>  => {
    try {
      const motivationalPhrase = await DataBase.instance.motivationalPhrase.findAll({
        where,
        attributes,
        order,
        limit
      })
      
      return motivationalPhrase
    } catch (err) {
      throw err
    }
  }
  
  export const findLatestMotivationalPhrase = async ({
    where,
    attributes,
    order,
    limit
  }: {
    where?: WhereOptions<MotivationalPhraseAttributes>
    attributes:FindAttributeOptions
    order?:Order
    limit?:number
}): Promise<MotivationalPhraseAttributes | null>  => {
    try {
      const motivationalPhrase = await DataBase.instance.motivationalPhrase.findOne({
        where,
        attributes,
        order,
        limit
      })
      
      return motivationalPhrase
    } catch (err) {
      throw err
    }
  }
  
  export const findMotivationalPhraseById = async ({
    id,
    attributes,
  }: {
    id:number
    attributes?:FindAttributeOptions
}): Promise<MotivationalPhraseAttributes | null>  => {
    try {
      const motivationalPhrase = await DataBase.instance.motivationalPhrase.findByPk(id,{
        attributes
      })
      
      return motivationalPhrase
    } catch (err) {
      throw err
    }
  }
  