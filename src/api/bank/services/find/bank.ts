import { DataBase } from '../../../../database'
import { BankAttributes } from '../../models/bank.model'
import { Op, Order, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findOneBank = async ({
  where,
  attributes,
}: {
  where: WhereOptions<BankAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const bank = await DataBase.instance.bank.findOne({
      where,
      attributes,
    })
    if (bank) return bank.get({ plain: true })
    return bank
  } catch (err) {
    throw err
  }
}

export const findAllBank = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<BankAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    return await DataBase.instance.bank.findAll({
      where,
      attributes,
      order: [['id', 'DESC']],
    })
  } catch (err) {
    throw err
  }
}


export const SearchBank = async ({
  regex,
  order,
}: {
  regex?: string
  order: Order
}) => {
  try {
    const limit: number = 12
    const bank = await DataBase.instance.bank.findAll({
      where:{
        // state:true,
        [Op.or]:{
          id:{
            [Op.regexp]:regex
          },
          name:{
            [Op.regexp]:regex
          },
          title:{
            [Op.regexp]:regex
          },
          num_atc:{
            [Op.regexp]:regex
          },
          num_whatsapp:{
            [Op.regexp]:regex
          },
        }
      },
      attributes:['title','name','num_atc','num_whatsapp','id','key','size','path'],
      order,
      limit,
      // logging:console.log
    })
    return bank
  } catch (err) {
    throw err
  }
}

