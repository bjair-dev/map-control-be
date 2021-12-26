// import moment from 'moment'
import sequelize,{ FindAttributeOptions, Op, Order, WhereOptions } from 'sequelize'
import { DataBase } from '../../../../database'
import { EntryAttributes } from '../../models/entry.model'

export const findOne = async ({
  id,
  userId
}: {
  id: number
  userId: number
  
}): Promise<EntryAttributes | null>  => {
  try {
    const entry = await DataBase.instance.entry.findOne({
      where:{
          id,
          userId
      },
      attributes:{
        // include:[[sequelize.fn('sum', sequelize.col('amount')), 'total_amount']],
        exclude:['created','updated','entry_tag_id','userId','entry_type_id']
      },
       include:[
        {
          model:DataBase.instance.entryType,
          attributes:{
          exclude:['created','updated','updated_by','created_by']
          }
        },
        {
          model:DataBase.instance.entryTag,
          attributes:{
            exclude:['created','updated','updated_by','created_by']
            }
          
        }
      ],
    })
    if (entry) return entry.get({ plain: true })
    return entry
  } catch (err) {
    throw err
  }
}


export const findAll = async ({
  where,
  attributes,
  order,
  limit
}: {
  where: WhereOptions<EntryAttributes>
  attributes:FindAttributeOptions
  order?: Order
  limit?: number
}): Promise<EntryAttributes[] | null>  => {
  try {
    const entry = await DataBase.instance.entry.findAll({
      where,
      attributes,
      order,
      limit
      // include:[
      //   {
      //     model:DataBase.instance.entryType,
      //     attributes:{
      //     exclude:['created','updated','updated_by','created_by']
      //     }
      //   },
      //   {
      //     model:DataBase.instance.entryTag,
      //     attributes:{
      //       exclude:['created','updated','updated_by','created_by']
      //       }
          
      //   }
      // ],
      
    })
    
    return entry
  } catch (err) {
    throw err
  }
  
}
export const getSumAmountByEntryTypeAndDateToday = async ({
  userId,
  entry_type_id,
  // convertToday,
  month,
  year,
  day
}:{
  userId:number
  entry_type_id:number
  // convertToday:string,
  month:any,
  year:any,
  day:any
}) => {
  // const convertToday = moment().utc().format('YYYY-MM-DD')
  
  const amountTotal = DataBase.instance.entry.sum('amount',{
    where:{
      [Op.and]:[
        {
          entry_type_id,
          userId,
        },
        //DATE_SUB(created , interval 5 hour)
        // sequelize.where(sequelize.fn('DAY', sequelize.col('created')), day),
        // sequelize.where(sequelize.fn('MONTH', sequelize.col('created')), month),
        // sequelize.where(sequelize.fn('YEAR', sequelize.col('created')), year)
        
        sequelize.where(sequelize.fn('DAY', sequelize.literal('DATE_SUB(created , interval 5 hour)')), day),
        sequelize.where(sequelize.fn('MONTH', sequelize.literal('DATE_SUB(created , interval 5 hour)')), month),
        sequelize.where(sequelize.fn('YEAR', sequelize.literal('DATE_SUB(created , interval 5 hour)')), year)
      ],
      // created:{
      //   [Op.gte]:convertToday
      // }
    },
    // logging:console.log
  })
  return amountTotal
}

export const findOneEgress = async ({
  userId,
  entry_type_id,
  convertToday
}:{
  userId:number
  entry_type_id:number
  convertToday:string
}) => {
  
  const amountTotal = DataBase.instance.entry.findOne({
    where:{
      entry_type_id,
      userId:userId,
      created:{
        [Op.gte]:convertToday
      }
    },
    include:[{
      model:DataBase.instance.entryTag
    }],
    order:[['amount','ASC']],
    limit:1
  })
  return amountTotal
}

export const findOneEntryTag = async (
  entry_tag_id:number
) => {
  const entryTag = await DataBase.instance.entryTag.findByPk(entry_tag_id,{
    attributes:['id','tag','tag_type']})
    
  return entryTag
}
export const SummaryOfTheMonthEntry = async ({
  where,
  totalAmount
  // attributes
}: {
  where: WhereOptions<EntryAttributes>
  totalAmount: number
  // attributes:FindAttributeOptions
}): Promise<EntryAttributes[] | null>  => {
  try {

    const data = await DataBase.instance.entry.findAll({
      // subQuery: false,
      attributes: [
        // 'date',
        [sequelize.fn('month', sequelize.col('date')), 'mes'],
        [sequelize.fn('sum', sequelize.col('amount')), 'total'],
        [sequelize.literal(`round((sum(amount) / ${totalAmount})*100,2)`), 'percentage'],
        // [sequelize.literal(`(sum(amount) / ${total})*100`), 'percentage'],
        
      ],
      group: [sequelize.fn('month',sequelize.col('date'))],
      order:[sequelize.fn('month',sequelize.col('date'))],
      where,
      // raw:true,
    })
    const summary = JSON.parse(JSON.stringify(data))
    Array(12).fill(0).forEach((_,index)=>{
      if(summary.some((item:any)=>item.mes == index+1) == false){
        summary.push({
         "mes": index+1,
          "total": 0,
          "percentage": 0
      })
      }
  })
  
  summary.sort((a:any,b:any)=>a?.mes-b?.mes)
  
    return summary
  } catch (err) {
    throw err
  }
  
}


export const getSumAmountEntryTypeAndEntryTag = async ({
  where,
}: {
  where: WhereOptions<EntryAttributes>
}): Promise<any> => {
  try {
    const totalAmount = await DataBase.instance.entry.sum('amount',{
      where,
      // logging:console.log
    })
    return totalAmount
  } catch (err) {
    throw err
  }
  
}