import { NextFunction, Request, Response } from 'express'
import sequelize, { Op } from 'sequelize'
import createError from 'http-errors'
import { IToken } from '../../auth/passport/passport'
import { DataBase } from '../../../database'
import moment from 'moment'
import { createMetricsService, usabilityService, useRegularForDayService, useRegularForFortnightlyService, useRegularForMonthService, useRegularForWeekService } from '../services/metrics.service'
import { ActionAttributes } from '../../action/models/action.model'

import { TipAttributes } from '../../tip/models/tip.model'
import { MetricsAttributes } from '../models/metrics.model'
import { TipCategoryAttributes } from '../../tip/models/tip.category.model'
import { VideoCategoryAttributes } from '../../videos/models/video.category.model'
import { VideoAttributes } from '../../videos/models/video.model'
import { gethoursOfUseInTheMonth, gethoursOfUseInTheWeek, getUseRegularFrecuencyReport } from '../../token/services/find'
import { CountPackageUser, getFifthReportTips, getSixthReportVideos } from '../../user_package/services/find/user.package'
import { countChallengeSuccessFullInTheMonth, countChallengeSuccessFullInTheWeek, getTopChallengeUser } from '../../user_challenge/services/find'
import { getContentIdMetrics, getCountTotalMetrics, getUseFrecuencyReport } from '../services/find/metrics'
import { findAllTipCategory } from '../../tip/services/find/tip.category'
import { findAllVideoCategories } from '../../videos/services/find/videos.category'
import { getFindIdsTips } from '../../tip/services/find'
import { getFindIdsVideosd } from '../../videos/services/find'
import { ExcelExporter } from '../../../utils/exportToExcel'
import { updateUseTimeMetric } from '../services/update'
export const createMetricsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken

    const {
      contentId,
      actionId,
    } = req.body

    const metric = await createMetricsService({
      metrics: {
        contentId:Number(contentId),      
        actionId,
        userId:Number(user.userId),
        // usetime:1
      },
    })
    res.status(200).json(metric)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updateUseTimeMetricsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const {
      id,
      time
    } = req.body
    await updateUseTimeMetric({
      id,
      time,
      userId:user.userId
    })
    res.status(200).json('Proceso exitoso')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

//Cuantos usuaron gestion de presupuestos entre 2 fechas
// export const useBudgetManagementController = async (req: Request, res: Response, next: NextFunction) => {
export const usabilityController = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const finishDate:any  = req.params.finish_date 
    const startDate:any = req.params.start_date 
    // const actionId:any = req.params.action_id 
    // let data:any = []
    let data:any = {}
    
    const getActions:ActionAttributes[] = await DataBase.instance.action.findAll()
    for(const item of getActions){
      let usability = await usabilityService({
        startDate,
        finishDate,
        actionId:Number(item.id)
      }) 
      let copyUsability = JSON.parse(JSON.stringify(usability))
      // data = [...data,{[`${item?.value}`]:copyUsability}] 
      data = {...data,[`${item?.value}`]:copyUsability}
      // data = {...data,name:''}
    }
    
    const available:any = await DataBase.instance.token.findAll({
      where:{
        start_session:{
          [Op.between]:[startDate,finishDate]
        },
        rol:'user'
      },
      attributes:[
        [sequelize.fn('count', sequelize.col('userId')), 'total_month'],
        [sequelize.fn('month', sequelize.col('start_session')), 'month'],
        [sequelize.fn('year', sequelize.col('start_session')), 'year'],
      ],
      group:[sequelize.fn('month',sequelize.col('start_session')),sequelize.fn('year',sequelize.col('start_session'))],
      // logging:console.log
    })
    let use_regular:any = []
    if(available.length>0){
      for(const item of available ){
        const copy_item = JSON.parse(JSON.stringify(item))
        const data_forDay = await useRegularForDayService({month:copy_item?.month,year:copy_item?.year})
        const copy_data_forDay = JSON.parse(JSON.stringify(data_forDay)) 
        const totalDayMonth = copy_data_forDay.reduce((total:any,item:any )=> total+item?.count_user,0)
        // console.log("totalDayMonth",totalDayMonth)
        const percentageDay = Number(((totalDayMonth/copy_item?.total_month)*100).toFixed(2))
        
        
        const data_forMonth = await useRegularForMonthService({month:copy_item?.month,year:copy_item?.year})
        const copy_data_forMonth = JSON.parse(JSON.stringify(data_forMonth)) 
        const sumMonth = copy_data_forMonth.reduce((total:any,item:any )=> total+item?.count_user,0)
        // console.log("sumMonth",sumMonth,copy_item?.total_month)
        const percentageMonth = Number(((sumMonth/copy_item?.total_month)*100).toFixed(2))
        
        const data_forWeek = await useRegularForWeekService({month:copy_item?.month,year:copy_item?.year})
        const copy_data_forWeek = JSON.parse(JSON.stringify(data_forWeek)) 
        const sumWeek = copy_data_forWeek.reduce((total:any,item:any )=> total+item?.count_user,0)
        // console.log("sumWeek",sumWeek,copy_item?.total_month)
        const percentageWeek = Number(((sumWeek/copy_item?.total_month)*100).toFixed(2))
        
        const data_forFortnightly = await useRegularForFortnightlyService({month:copy_item?.month,year:copy_item?.year})
        const copy_data_forFortnightly = JSON.parse(JSON.stringify(data_forFortnightly)) 
        const sumFortnightly = copy_data_forFortnightly.reduce((total:any,item:any )=> total+item?.count_user,0)
        // console.log("sumWeek",sumFortnightly,copy_item?.total_month)
        const percentagesumFortnightly = Number(((sumFortnightly/copy_item?.total_month)*100).toFixed(2))
        
        
        
        // const copy_item = JSON.parse(JSON.stringify(item))
        use_regular = [...use_regular , Object.assign({
          month_format:moment().set('year',copy_item?.year).set('month', copy_item.month - 1).format('MMM-YY'),
          percentageDay,percentageMonth,percentageWeek,percentagesumFortnightly},copy_item)]
        
        
        // console.log(copy_data_forDay)
        // use_regular = [...use_regular , Object.assign({percentage},copy_item)]
      }
      
    }
    

    res.status(200).json({data,use_regular})
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}


export const recordsAndTopsController = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
   
    // const dateToday = moment().local().format('YYYY-MM-DD')
    const startDate:any = req.params.start_date 
    const monthDate = moment(startDate).local().format('MM') 
    const yearDate = moment(startDate).local().format('YYYY') 
    const weekDate = moment(startDate).local().format('W') 
    
    
    //RECORDS WEEK     
    const hoursOfUseInTheWeek = await gethoursOfUseInTheWeek({monthDate,yearDate,weekDate})
    const packageCompletedInTheWeek =  await CountPackageUser({
      where:{
        status:'terminado',
        [Op.and]:[
          sequelize.where(sequelize.fn('WEEK', sequelize.col('finish_date')), weekDate),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('finish_date')), yearDate),
        ]
      },
      // logging:console.log
    })
   
    const challengeSuccessFullInTheWeek =  await countChallengeSuccessFullInTheWeek({weekDate,yearDate})
  
    
    // RECORDS - MONTH 
    const hoursOfUseInTheMonth = await gethoursOfUseInTheMonth({monthDate,yearDate})
    
    const challengeSuccessFullInTheMonth =  await countChallengeSuccessFullInTheMonth({monthDate,yearDate})
    

    const packageCompletedInTheMonth =  await CountPackageUser({
      where:{
        status:'terminado',
        [Op.and]:[
          sequelize.where(sequelize.fn('MONTH', sequelize.col('finish_date')), monthDate),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('finish_date')), yearDate),
        ]
      },
    })
    
    const useHours:any = await new DataBase().sequelize.query(`
    
    SELECT
    CASE
        WHEN hours > 18000 THEN 'mas_de_cinco_horas'
        WHEN hours BETWEEN 3600 and 18000 THEN 'de_1_a_5_horas'
        WHEN hours BETWEEN 1800 and 3600 THEN 'de_media_hora_a_1_hora'
        WHEN hours <1800 THEN 'menos_de_media_hora'
        WHEN hours IS NULL THEN 'is_null'

    END as hour_range,
    COUNT(*) AS count
    FROM (select  sum(TIMESTAMPDIFF(second,start_session, last_session)) as hours from token where rol = 'user' 
    and month(start_session)=${monthDate} and year(start_session)=${yearDate}
     group by userId) as token
    GROUP BY hour_range
    ORDER BY hour_range
    `,{
      type:sequelize.QueryTypes.SELECT
    })


    let data_hour = {
      mas_de_cinco_horas:0,
      de_1_a_5_horas:0,
      de_media_hora_a_1_hora:0,
      menos_de_media_hora:0
    }
 
    for (const {count,hour_range} of useHours) {
      data_hour = {...data_hour, [hour_range]:count}
    }
    const transform_data_hour = Object.entries(data_hour).map(([key,value]) => Object.assign({[key]:value}))
    
    const topChallengeUser = await getTopChallengeUser({monthDate,yearDate})
    
    let shared_tips:any = []
    const tip_category:TipCategoryAttributes[] = await findAllTipCategory({
      attributes:['id','category']
    })
    
    //actionId  2 - share_tip
    const content_id_metrics:MetricsAttributes[] = await getContentIdMetrics({ yearDate,monthDate,actionId:2 })
    const tips_map_content_id_metrics:any = content_id_metrics.map(item=>item?.contentId)
    
    for(const item of tip_category){
      const findIdsTips:TipAttributes[] = await  getFindIdsTips({map_content_id_metrics:tips_map_content_id_metrics,tip_category_id:Number(item?.id)})
     
      const mapfindIdsTips:any = findIdsTips.map(item => item.id)
      
      const count_total = await getCountTotalMetrics({yearDate,monthDate,mapfindIds:mapfindIdsTips,actionId:2})
      shared_tips = [...shared_tips,{name:item.category,count:findIdsTips.length>0 ? count_total : 0 }] 
      // shared_tips = [...shared_tips,{ [`${item.category}`]:{name:item.category,count:findIdsTips.length>0 ? count_total : 0 }}] 
      
    }
    
    let shared_videos:any = []
    const video_category:VideoCategoryAttributes[] = await findAllVideoCategories({
      attributes:['id','category']
    })

    //actionId  1 - share_video
    const videos_content_id_metrics:MetricsAttributes[] = await getContentIdMetrics({ yearDate,monthDate,actionId:1 })
    const videos_map_content_id_metrics:any = videos_content_id_metrics.map(item=>item?.contentId)
    
    for(const item of video_category){
      
      const findIdsVideos:VideoAttributes[] = await getFindIdsVideosd({map_content_id_metrics:videos_map_content_id_metrics,video_category_id:Number(item?.id)}) 
      const mapfindIdsVideo:any = findIdsVideos.map(item => item.id)
      
      const count_total = await getCountTotalMetrics({yearDate,monthDate,mapfindIds:mapfindIdsVideo,actionId:1}) 
   
      shared_videos = [...shared_videos,{name:item.category,count:findIdsVideos.length>0 ? count_total : 0 }] 
      // shared_videos = [...shared_videos,{ [`${item.category}`]:{name:item.category,count:findIdsVideos.length>0 ? count_total : 0 }}] 
      
    }
    

    
    return res.status(200).json({
      records:{
      hoursOfUseInTheWeek,
      hoursOfUseInTheMonth,
      challengeSuccessFullInTheWeek,
      challengeSuccessFullInTheMonth,
      packageCompletedInTheWeek,
      packageCompletedInTheMonth,
    },
    tops:{
      useHours:transform_data_hour,
      topChallengeUser,
      shared_tips,
      shared_videos
    }
  }) 
 
    
    
    
   

  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

// Herramienta de gestion de presupuesto  - actionId - 3
// Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 
export const useFrecuencyReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const user = req.user as IToken
    // const moment = require('moment');
    
    
// Herramienta de gestion de presupuesto  - actionId - 3
// Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 
    
    const { start_date, finish_date,actionId } = req.params
    
    const date_from = start_date //desde
    const date_until = finish_date; //hasta

    const last_day = moment(date_until).add(1, 'months').date(0)
    const get_last_day = moment(last_day).format('DD')

    const concat_first_day = moment(`${date_from}-01`).format('YYYY-MM-DD')
    const concat_last_day = moment(`${date_until}-${get_last_day}`).format('YYYY-MM-DD')
    
    const dataGetUseFrecuencyReport = await getUseFrecuencyReport({
      startDate:concat_first_day,
      actionId:Number(actionId),
      finishDate:concat_last_day
    })
    const copy_dataGetUseFrecuencyReport:any = JSON.parse(JSON.stringify(dataGetUseFrecuencyReport))
    // console.log(copy_dataGetUseFrecuencyReport)
    const data = copy_dataGetUseFrecuencyReport.map((item:any,index:any) => Object.assign(item,
      {
        day:parseFloat(item?.day),
        week:parseFloat(item?.week),
        month:parseFloat(item?.month)
      }
      ))
      let headerArray = ['userId', 'dia', 'semana', 'mes','tiempo de uso']    
      // Herramienta de gestion de presupuesto  - actionId - 3
      // Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 
      let title = ''
      if( Number(actionId) == 3 )title = 'Usuarios de la aplicación móvil Mi Yunta Financiero que usan la herramienta de gestión de presupuesto'
      if( Number(actionId) == 4 )title = 'Usuarios de la aplicación móvil Mi Yunta Financiero que usa la herramienta de comparador y simulador de ahorro y crédito'
      
      let report = new ExcelExporter(headerArray, data, title)
      report.BuildReport1().then(({ statusCode, result }) => {
        res.writeHead(200, {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        res.end(result, 'binary')
      })
      
        // res.status(200).json(toNumber)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}




export const useRegularFrecuencyReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    
    const { start_date, finish_date } = req.params
    
    const date_from = start_date //desde
    const date_until = finish_date; //hasta

    const last_day = moment(date_until).add(1, 'months').date(0)
    const get_last_day = moment(last_day).format('DD')

    const concat_first_day = moment(`${date_from}-01`).format('YYYY-MM-DD')
    const concat_last_day = moment(`${date_until}-${get_last_day}`).format('YYYY-MM-DD')
    // console.log(concat_last_day,concat_first_day)
    
    const useRegular = await getUseRegularFrecuencyReport({
      startDate:concat_first_day,
      finishDate:concat_last_day
    })
    // return res.status(200).json(dataGetUseFrecuencyReport)
    const data:any = JSON.parse(JSON.stringify(useRegular))
  
      let headerArray = ['código', 'dia', 'semana', 'mes','tiempo de uso','componente mas usado']    
      // Herramienta de gestion de presupuesto  - actionId - 3
      // Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 
      let title = 'Usuarios de la aplicación móvil Mi Yunta Financiero que la usan de manera regular'
    
      let report = new ExcelExporter(headerArray, data, title)
      report.BuildReport1().then(({ statusCode, result }) => {
        res.writeHead(200, {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        res.end(result, 'binary')
      })
      
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const fifthReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    
    const { start_date, finish_date } = req.params
    
    const date_from = start_date //desde
    const date_until = finish_date; //hasta

    const last_day = moment(date_until).add(1, 'months').date(0)
    const get_last_day = moment(last_day).format('DD')

    const concat_first_day = moment(`${date_from}-01`).format('YYYY-MM-DD')
    const concat_last_day = moment(`${date_until}-${get_last_day}`).format('YYYY-MM-DD')
    // console.log(concat_last_day,concat_first_day)
    
    const sixthReport = await getFifthReportTips({
      startDate:concat_first_day,
      finishDate:concat_last_day
    })
    // return res.status(200).json(dataGetUseFrecuencyReport)
    const data:any = JSON.parse(JSON.stringify(sixthReport))
  
      let headerArray = ['código usuario', 'nro tips recibido', 'nro tips visualizados', 'nro de tips compartidos','lista de id de tips']    
      // Herramienta de gestion de presupuesto  - actionId - 3
      // Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 
      let title = 'Usuarios de la aplicación móvil Mi Yunta Financiero que comparte los tips'
    
      let report = new ExcelExporter(headerArray, data, title)
      report.BuildReport1().then(({ statusCode, result }) => {
        res.writeHead(200, {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        res.end(result, 'binary')
      })
      
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}


export const sixthReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    
    const { start_date, finish_date } = req.params
    
    const date_from = start_date //desde
    const date_until = finish_date; //hasta

    const last_day = moment(date_until).add(1, 'months').date(0)
    const get_last_day = moment(last_day).format('DD')

    const concat_first_day = moment(`${date_from}-01`).format('YYYY-MM-DD')
    const concat_last_day = moment(`${date_until}-${get_last_day}`).format('YYYY-MM-DD')
    // console.log(concat_last_day,concat_first_day)
    
    const sixthReport = await getSixthReportVideos({
      startDate:concat_first_day,
      finishDate:concat_last_day
    })
    // return res.status(200).json(dataGetUseFrecuencyReport)
    const data:any = JSON.parse(JSON.stringify(sixthReport))
  
      let headerArray = ['código usuario', 'nro videos recibido', 'nro videos visualizados', 'nro de videos compartidos','lista de id de videos']    
      // Herramienta de gestion de presupuesto  - actionId - 3
      // Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 
      let title = 'Usuarios de la aplicación móvil Mi Yunta Financiero que comparte los videos'
    
      let report = new ExcelExporter(headerArray, data, title)
      report.BuildReport1().then(({ statusCode, result }) => {
        res.writeHead(200, {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        res.end(result, 'binary')
      })
      
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}