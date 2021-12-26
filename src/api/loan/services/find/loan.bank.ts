import { DataBase } from '../../../../database'
import { LoanAttributes} from '../../models/loan.model'

import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'


export const findAllLoanBank = async ({
    where,
    attributes,
  }: {
    where: WhereOptions<LoanAttributes>
    attributes?: FindAttributeOptions
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
        }]
      })
    //   if (loan) return loan.get({ plain: true })
      return loan
    } catch (err) {
      throw err
    }
  }