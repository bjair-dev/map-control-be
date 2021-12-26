// import { DataBase } from '../../../database'
// import { Notification, NotificationAttributes } from '../models/notification.model'
// import { createNotification } from './create/index'
// // import { ChallengeAttributes } from '../../challenge/models/challenge.model';
// // import { TipModel } from '../../tip/models/tip.model';

import moment from "moment"
import sequelize,{ Op } from "sequelize"
import { DataBase } from "../../../database"
import { MetricsAttributes } from "../models/metrics.model"
import { createMetrics } from "./create"
import { usabilityManagement } from "./find/metrics"



export const createMetricsService = async ({
  metrics,
}: {
  metrics: MetricsAttributes
}) => {
  try {
    return await createMetrics({
    userId:metrics.userId,
    actionId:metrics.actionId,
    contentId:metrics.contentId,
    state:true,
    date:moment(moment().local().format('YYYY-MM-DD')).toDate(),
    // usetime:metrics.usetime
    })
  } catch (error) {
    throw error
  }
}
export const usabilityService = async ( {startDate,finishDate,actionId}:{
  startDate:Date,
  finishDate:Date,
  actionId:number
}
) => {
  try {
    return await usabilityManagement({
      startDate,
      finishDate,
      actionId
    }
    )
  } catch (error) {
    throw error
  }
}


export const useRegularForDayService = async ( {month,year , total}:{
  month:any,
  year:any,
  total?:number
}
) => {
  try {
   
    const forDays:any = await DataBase.instance.token.findAll({
      attributes:[
        // [sequelize.literal(`round((sum(amount) / ${totalAmount})*100,2)`), 'percentage'],
        [sequelize.literal(`count(distinct userId)`), 'count_user'],
      ],
      where:{
        [Op.and]:[
          {
          rol:'user',
          // state:true
        },
          sequelize.where(sequelize.fn('YEAR', sequelize.col('start_session')), year),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('start_session')), month)
        ]
      },
      group:[
        sequelize.fn('month',sequelize.col('start_session')),
        sequelize.fn('day',sequelize.col('start_session'))
      ],
      // logging:console.log
    })
    
    return forDays
    
  } catch (error) {
    throw error
  }
}
export const useRegularForMonthService = async ( {month,year }:{
  month:any,
  year:any,
}
) => {
  try {
   
    const ForMonth:any = await DataBase.instance.token.findAll({
      attributes:[
        // [sequelize.literal(`round((sum(amount) / ${totalAmount})*100,2)`), 'percentage'],
        [sequelize.literal(`count(distinct userId)`), 'count_user'],
      ],
      where:{
        [Op.and]:[
          {
          rol:'user',
          // state:true
        },
          sequelize.where(sequelize.fn('YEAR', sequelize.col('start_session')), year),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('start_session')), month)
        ]
      },
      group:[
        sequelize.fn('month',sequelize.col('start_session')),
        // sequelize.fn('day',sequelize.col('start_session'))
      ],
      // logging:console.log
    })
    
    return ForMonth
    
  } catch (error) {
    throw error
  }
}

export const useRegularForWeekService = async ( {month,year }:{
  month:any,
  year:any,
}
) => {
  try {
   
    const forWeek:any = await DataBase.instance.token.findAll({
      attributes:[
        // [sequelize.literal(`round((sum(amount) / ${totalAmount})*100,2)`), 'percentage'],
        [sequelize.literal(`count(distinct userId)`), 'count_user'],
      ],
      where:{
        [Op.and]:[
          {
          rol:'user',
          // state:true
        },
          sequelize.where(sequelize.fn('YEAR', sequelize.col('start_session')), year),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('start_session')), month)
        ]
      },
      group:[
        sequelize.fn('month',sequelize.col('start_session')),
        sequelize.fn('week',sequelize.col('start_session'))
          
        // sequelize.fn('day',sequelize.col('start_session'))
      ],
      // logging:console.log
    })
    
    return forWeek
    
  } catch (error) {
    throw error
  }
}


export const useRegularForFortnightlyService = async ( {month,year }:{
  month:any,
  year:any,
}
) => {
  try {
   
    const ForFortnightly:any = await DataBase.instance.token.findAll({
      attributes:[
        // [sequelize.literal(`round((sum(amount) / ${totalAmount})*100,2)`), 'percentage'],
        [sequelize.literal(`count(distinct userId)`), 'count_user'],
      ],
      where:{
        [Op.and]:[
          {
          rol:'user',
          // state:true
        },
          sequelize.where(sequelize.fn('YEAR', sequelize.col('start_session')), year),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('start_session')), month)
        ]
      },
      group:[
        sequelize.fn('month',sequelize.col('start_session')),
        sequelize.fn('ceil',
        sequelize.literal('week(start_session)/2'))
        // sequelize.fn('week',sequelize.col('start_session')),'/2'),
        
        // `ceil(week(start_session)/2)`
        // sequelize.fn('week',sequelize.col('start_session'))
          
        // sequelize.fn('day',sequelize.col('start_session'))
      ],
      // logging:console.log
    })
    
    return ForFortnightly
    
  } catch (error) {
    throw error
  }
}
