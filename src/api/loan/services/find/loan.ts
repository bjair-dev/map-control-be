import { DataBase } from '../../../../database'
import { LoanAttributes} from '../../models/loan.model'

import { Op, Order, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'


export const SearchLoan = async ({
  regex,
  order,
}: {
  regex?: string
  order: Order
}) => {
  try {
    const limit: number = 12
    const loan = await DataBase.instance.loan.findAll({
      where:{
        state:true,
        [Op.or]:{
          id:{
            [Op.regexp]:regex
          },
          description:{
            [Op.regexp]:regex
          },
          title:{
            [Op.regexp]:regex
          },
          tea:{
            [Op.regexp]:regex
          },
          '$loan_type.type$': { [Op.regexp]:regex },
          '$bank.name$': { [Op.regexp]:regex },
          
        }
      },
      include:[{
        model:DataBase.instance.loanType,
        attributes:['id','type'],
        required:true,
      },
      {
      model:DataBase.instance.bank,
      attributes:['id','name'],
      required:true,
      }
    ],
      attributes:['title','description','tea','id','loan_type_id','bankId'],
      order,
      limit,
      // logging:console.log
    })
    return loan
  } catch (err) {
    throw err
  }
}


export const findAllLoan = async ({
    state,
    page,
  }: {
    state: number
    page: number
  }) => {
    try {
      const limit: number = 12
      const offset: number = 0 + (page - 1) * limit
      const { count, rows } = await DataBase.instance.loan.findAndCountAll({
        where: {
            state,
            // '$question_type.id$': typeId,
          },
        attributes: ['id','description','url','tea','state','title','requirement','created','updated'],
        include: [
          {
            model: DataBase.instance.bank,
            // as: 'question_type',
            attributes: ['id','name'],
            required: true,
          },
          {
            model: DataBase.instance.loanType,
            // as: 'question_category',
            required: true,
            attributes: ['id', 'type'],
          },
        ],
  
        limit,
        offset,
        order: [['id', 'DESC']],
      })
      return { page, count, rows }
    } catch (err) {
      throw err
    }
  }
  
  
export const findOneLoan = async ({
    where,
    attributes,
  }: {
    where: WhereOptions<LoanAttributes>
    attributes?: FindAttributeOptions
  }) => {
    try {
      const loan = await DataBase.instance.loan.findOne({
        where,
        attributes,
      })
      if (loan) return loan.get({ plain: true })
      return loan
    } catch (err) {
      throw err
    }
  }
  
  