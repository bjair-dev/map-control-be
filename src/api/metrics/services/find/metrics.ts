import moment from "moment"
import { Op } from "sequelize"
import sequelize from "sequelize"
import { DataBase } from "../../../../database"
import { MetricsAttributes } from "../../models/metrics.model"



export const usabilityManagement = async(
    {startDate,finishDate,actionId}:{
    startDate:Date,
    finishDate:Date,
    actionId:number
}) => {
    // console.log(moment(startDate).local().toDate(),moment(finishDate).local().toDate())
    const count_total_use_budget_management  = await DataBase.instance.metrics.count({
        where:{
          actionId,
          date:{
            //   [Op.gte]:startDate
            [Op.between]:[startDate,finishDate]
          }
        },
      })
      
      const use_budget_management = await DataBase.instance.metrics.findAll({
        attributes: [
          [sequelize.fn('year',sequelize.col('date')),'year'],
          [sequelize.fn('month', sequelize.col('date')), 'month'],
          [sequelize.fn('count', sequelize.col('actionId')), 'quantity'],
          [sequelize.literal(`round((count(userId) / ${count_total_use_budget_management})*100,2)`), 'percentage'],
        ],
        group: [sequelize.fn('month',sequelize.col('date')),sequelize.fn('year',sequelize.col('date'))],
        order:[sequelize.fn('month',sequelize.col('date'))],
        where:{
          actionId,
          state:true,
          date:{
            //   [Op.gte]:startDate
            [Op.between]:[startDate,finishDate]
          }
        },
        raw:true,
        // logging:console.log
      })
     
    //   console.log(".....",moment(`${item?.year}-${item?.month}`).local().format('MMM-YY'))
      const transform_use_budget_management = use_budget_management.map((item:any) => Object.assign(
       item,
       {
        // month_format:moment(`${item?.year}-${item?.month}`).local().format('MMM-YY'),
        // month_format:`${moment(item?.month).format('MMM')}-${moment(item?.year).format('YY')}`,
        month_format:moment().set('year',item?.year).set('month', item.month - 1).format('MMM-YY'),
        percentage:item.quantity>0 || typeof item.quantity == 'number'?Number(item?.percentage):0
      }
       ))
       return transform_use_budget_management
}


export const getContentIdMetrics = async ({ yearDate,monthDate, actionId }: { yearDate:any,monthDate:any,actionId?:number }):Promise<MetricsAttributes[]> => {
  try {
       
  const content_id_metrics:MetricsAttributes[] = await DataBase.instance.metrics.findAll({
    where:{
      actionId,
      state:true,
      [Op.and]:[
        sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), yearDate),
        sequelize.where(sequelize.fn('MONTH', sequelize.col('date')),monthDate)
      ]
    },
    attributes:['contentId']
  })
    
    return content_id_metrics
  } catch (error) {
    throw error
  }
}

export const getCountTotalMetrics = async ({ yearDate,monthDate, actionId,mapfindIds }: { yearDate:any,monthDate:any,actionId?:number,mapfindIds:any }) => {
  try {
       
    const count_total = await DataBase.instance.metrics.count({
      where:{
        contentId:{
          [Op.in]:mapfindIds
        },
        actionId,
        state:true,
        [Op.and]:[
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), yearDate),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('date')),monthDate)
        ]
      },
      // logging:console.log
    })
    return count_total
  } catch (error) {
    throw error
  }
}


export const getUseFrecuencyReport = async (
  {startDate,finishDate,actionId}:
{
    startDate:any,
    finishDate:any,
    actionId?:number
}
  ) => {
  try {
    //reportUseRegularUseBudgetManagement
    const useFrecuencyReport = await DataBase.instance.metrics.findAll({
      attributes: [
        'userId',
        [sequelize.literal(`round(count(*)/cast(TIMESTAMPDIFF(day, '${startDate}' , '${finishDate}') as signed),2)`), 'day'],
        [sequelize.literal(`round(count(*)/(cast(TIMESTAMPDIFF(day, '${startDate}' , '${finishDate}') as signed)/7),2)`), 'week'],
        [sequelize.literal(`round(count(*)/(cast(TIMESTAMPDIFF(day, '${startDate}' , '${finishDate}') as signed)/30),2)`), 'month'],
        [sequelize.literal(`sec_to_time(sum(usetime))`),'usetime']
      ],
      where:{
        actionId, // 4
        state:true,
        date:{
          [Op.between]:[startDate,finishDate]
        }
      },
      group:['userId'],
      // logging:console.log
    })
    
    // const count_total = await DataBase.instance.metrics.findAll({
    //   attributes: [[sequelize.fn('DISTINCT', sequelize.col('userId')), 'userId']],
    //   include:[
    //     {
    //       model:DataBase.instance.user,
          
    //     }
    //   ],
    //   where:{
    //     actionId,
    //     state:true,
    //     date:{
    //       [Op.between]:[startDate,finishDate]
    //     }
    //   },
      
    //   logging:console.log
    // })
    return useFrecuencyReport
  } catch (error) {
    throw error
  }
}


