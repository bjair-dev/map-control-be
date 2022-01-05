import { DataBase } from '../../../../database'
import { LoanAttributes} from '../../models/loan.model'

import { Order, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'


export const findAllLoanBank = async ({
    where,
    attributes,
    order
  }: {
    where: WhereOptions<LoanAttributes>
    attributes?: FindAttributeOptions
    order?: Order
  }) => {
    try {
      const loan = await DataBase.instance.loan.findAll({
        where,
        attributes,
        include:[{
          model:DataBase.instance.bank,
          attributes:{
            exclude:['updated','created_by','updated_by','size','key']
        }
        }],
        order,
      })
    //   if (loan) return loan.get({ plain: true })
      return loan
    } catch (err) {
      throw err
    }
  }