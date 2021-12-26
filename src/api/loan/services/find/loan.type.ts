import { DataBase } from '../../../../database'
import { LoanTypeAttributes } from '../../models/loan.type.model'
// import { LoanAttributes} from '../../models/loan.model'

import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'





// export const findOneLoan = async ({
//     where,
//     attributes,
//   }: {
//     where: WhereOptions<LoanAttributes>
//     attributes?: FindAttributeOptions
//   }) => {
//     try {
//       const loan = await DataBase.instance.loan.findOne({
//         where,
//         attributes,
//       })
//       if (loan) return loan.get({ plain: true })
//       return loan
//     } catch (err) {
//       throw err
//     }
//   }



export const findAllLoanType = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<LoanTypeAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    return await DataBase.instance.loanType.findAll({
      where,
      attributes,
      order: [['id', 'DESC']],
    })
  } catch (err) {
    throw err
  }
}

export const findOneLoanType = async ({
    where,
    attributes,
  }: {
    where: WhereOptions<LoanTypeAttributes>
    attributes?: FindAttributeOptions
  }) => {
    try {
      const loantype = await DataBase.instance.loanType.findOne({
        where,
        attributes,
      })
      if (loantype) return loantype.get({ plain: true })
      return loantype
    } catch (err) {
      throw err
    }
  }