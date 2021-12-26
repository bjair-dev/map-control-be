import { NextFunction, Request, Response } from 'express'
import sequelize, { Op } from 'sequelize'
import createError from 'http-errors'
import { getContentByTypeContentService, createNotificationService } from '../services/notification.service'
import { IToken } from '../../auth/passport/passport'
import { findAllNotifications, findAllNotificationsOutPagination, findContentTypeNotification } from '../services/find/index'
import { updateNotification } from '../services/update/index'
import { deleteOneNotification } from '../services/delete/index'
import { DataBase } from '../../../database'
import moment from 'moment'
import { NotificationAttributes } from '../models/notification.model'
import { createUserNotification } from '../../user_notification/services/create/user.notification'
import { updateStatusUserNotification } from '../../user_notification/services/update/user.notification'
import { SendNotificationForUsers } from '../../../utils/send.notifications'
export const getContentByTypeContentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type_content } = req.params
    const getContentByTypeContent = await getContentByTypeContentService({ type: type_content })
    res.status(200).json(getContentByTypeContent)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const createNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken

    const {
      title,
      content_id,
      content_type,
      filtros,
      filtros_opcionales,
      mensaje_personalizado,
      select_day,
      value,
      estado_notificacion,
    } = req.body

    const _notification = await createNotificationService({
      adminId: user.userId,
      notification: {
        title,
        content_id,
        content_type,
        filtros,
        filtros_opcionales,
        mensaje_personalizado,
        select_day,
        value,
        estado_notificacion,
      },
    })
    res.status(200).json(_notification)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findAllNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await findAllNotifications({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      attributes: {
        include: [
          'id',
          'title',
          'content_id',
          'content_type',
          'filtros',
          'filtros_opcionales',
          'mensaje_personalizado',
          'select_day',
          'value',
          'estado_notificacion',
          'created',
          'updated',
        ],
        exclude: ['updated_by', 'created_by', 'state'],
      },
    })
    res.status(200).json(notifications)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updateNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const {
      title,
      content_id,
      content_type,
      filtros,
      filtros_opcionales,
      mensaje_personalizado,
      select_day,
      value,
      estado_notificacion,
    } = req.body

    await updateNotification({
      id: Number(req.params.notificationId),
      title,
      content_id,
      content_type,
      filtros,
      filtros_opcionales,
      mensaje_personalizado,
      select_day,
      value,
      estado_notificacion,
      adminId: user.userId,
    })
    res.status(200).json('¡Se actualizo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const removeNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.notificationId)
    await deleteOneNotification({
      where: {
        id,
      },
    })
    res.status(200).json('!Se elimino con exito¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const notificationForUserController = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    
    //Estan terminado todas las notificaciones - status  :notification_completed
    
    let data_filters:any[] = []
    
    const { userId } = req.user as IToken
    
    const date_local = moment().local().format('YYYY-MM-DD')
    


    const countNotificationsTerminado = await DataBase.instance.userNotification.count({
      where:{
        userId,
        date:date_local,
        status:'terminado'
      },
    })
    
    const countNotificationsGlobal = await DataBase.instance.userNotification.count({
      where:{
        userId,
        date:date_local,
        status:{
          [Op.in]:['terminado','enviado']
        }
      },
    })

 
    
    const latestUserNotificationsToday = await DataBase.instance.userNotification.findAll({
      where:{
        userId,
        status:'enviado',
        date:date_local,
      },
      order:[['created','DESC']],
      // limit:1
    })
    
    //Tiene notificaciones pendientes solo hoy 
    if(latestUserNotificationsToday.length > 0){
      const getIdsNotifications =  latestUserNotificationsToday.map(( item:any ) => item?.notificationId)
      
      const notifications:NotificationAttributes[] = await findAllNotificationsOutPagination({
        where:{
          id:{
            [Op.in]:getIdsNotifications,
          },
          state:true,
        }
      })
      
      // console.log("notifications",notifications)
      const copy_notifications = JSON.parse(JSON.stringify(notifications))
      let data:Array<any> = []
      
      for(const item of copy_notifications  ){
        
        let userNotificationId = latestUserNotificationsToday.find(element => element?.notificationId  == item?.id)
        let content:any = await findContentTypeNotification(Number(item?.content_id),Number(item?.content_type))
        let notificationId = item?.id
        delete item['id']
        data=[...data,Object.assign(content,item,{notificationId,userNotificationId:userNotificationId?.id})]
        // data=[...data,Object.assign(content,{userNotificationId:userNotificationId?.id},item)]
      }
      
      
      // console.log("NOTIFICATIONS PENDING")
      return res.status(200).json(data)
    }
    
   
    //No hay nada 
    if(countNotificationsGlobal == 0){
      // const user = await DataBase.instance.user.findByPk(userId,{
      //   attributes:['date_user_session_day','user_session_day']
      // })
      const user_data = await DataBase.instance.user.findByPk(userId,{
        attributes:['sexo','date_of_birth','date_user_session_day','user_session_day']
      })
      const diffDaySession = moment().local().diff(user_data?.date_user_session_day, 'days');
      const calculateDaySession = diffDaySession + Number(user_data?.user_session_day)
      // const user_data = await DataBase.instance.user.findByPk(userId,{
      //   attributes:['sexo','date_of_birth']
      // })
      const a = moment().local();
      const b = moment(user_data?.date_of_birth, 'YYYY');  
      const years_of_user = a.diff(b, 'years');
      const gender_of_user = user_data?.sexo; // options ['hombre', 'mujer','no especificado']
      

      let currentDate = moment().local().format('YYYY-MM-DD')
      // daySession = dayOffSession == null ||dayOffSession?.date == currentDate ? Number(dayOffSession?.user_session_day) : Number(dayOffSession?.user_session_day)+1
      const possibleNotifications:NotificationAttributes[] = await DataBase.instance.notification.findAll({
        where:{
          state:true,
          [Op.or]:[{
            [Op.and]:{
              select_day:1,
              value:calculateDaySession//daySession
            }
          },{
            [Op.and]:{
              select_day:2,
              value:currentDate
            }
          }]
        },
        // logging:console.log
        
      })
       
      for(const item of possibleNotifications){
        
        const filters:Array<any> = JSON.parse(item.filtros as string)
        const outQuestionId:any = filters.map((item:any) =>{ if(item.active == true)return item.questionId })
        const outQuestionValue:any = filters.map((item:any) => { if(item.active == true)return item.value })
        
        const other_filters:Array<any> = JSON.parse(item.filtros_opcionales as string)
        const outActiveOtherFilters:Array<any> = other_filters.filter((item:any) =>{ if(item.active == true)return item })
        
        let validate_other_filters:Array<any> = []
        outActiveOtherFilters.forEach(item => {
            if(item?.tag == 'Edad'){
              // para todos 
              if(item?.value?.desde == 0 && item?.value?.hasta == 0)validate_other_filters.push(1)
              
              // año exacto
              if((item?.value?.desde != 0 && item?.value?.hasta != 0) && item?.value?.desde == item?.value?.hasta && item?.value?.desde == years_of_user )validate_other_filters.push(1)
              
              // entre edades (between)
              if((item?.value?.desde != 0 && item?.value?.hasta != 0) && item?.value?.desde <= years_of_user && item?.value?.hasta>= years_of_user )validate_other_filters.push(1)
              
              //Validar menor
              //desde 0 - 20 ->  menores de 
              if(item?.value?.desde == 0 && item?.value?.hasta > item?.value?.desde){
                if(item?.value?.hasta > years_of_user )validate_other_filters.push(1)
              }
              
              //desde 20 - 0 -> mayores
              // validar mayor
              if(item?.value?.hasta == 0 && item?.value?.desde > item?.value?.hasta){
                if(item?.value?.desde < years_of_user )validate_other_filters.push(1)
              }
            }
            
            if(item?.tag == 'Genero'){
              if(item?.value == '1'){
                if(gender_of_user == 'hombre')validate_other_filters.push(1)
              }
              if(item?.value == '2'){
                if(gender_of_user == 'mujer')validate_other_filters.push(1)
              }
              if(item?.value == '3'){
                if(gender_of_user == 'no especificado')validate_other_filters.push(1)
              }
            }
            
        });
        
        if(filters.length>0){
          const findFilter = await DataBase.instance.answer.findAll({
            where:{
              questionId:{
                [Op.in]:outQuestionId
              },
              userId,
              state:true,
              
              answered:{
                [Op.in]:outQuestionValue
              },
              question21:true
            },
            // logging:console.log
          })
            
            if(findFilter.length == outQuestionId.length && validate_other_filters.length == outActiveOtherFilters.length){
              const { id } = await createUserNotification({
                notificationId:item.id,
                status:'enviado',
                state:true,
                date:moment(date_local).local().toDate(),
                userId
              })
              
              const copy_item = JSON.parse(JSON.stringify(item))
              data_filters.push(Object.assign({ userNotificationId:id },copy_item))
            }
            
        }
        
        if(filters.length == 0 && validate_other_filters.length == outActiveOtherFilters.length){
          const { id } = await createUserNotification({

            notificationId:item.id,
            status:'enviado',
            state:true,
            date:moment(date_local).local().toDate(),
            userId
          })
          const copy_item = JSON.parse(JSON.stringify(item))
          data_filters.push(Object.assign({ userNotificationId:id },copy_item))

        }
        
        
      }
    }
    
    //Estan terminado todas las notificaciones
    if(countNotificationsTerminado !=0 && countNotificationsTerminado == countNotificationsGlobal)return res.status(200).json({status:'notification_completed' })

    
    if(data_filters.length > 0 ){
      const copy_notifications = JSON.parse(JSON.stringify(data_filters))
      // console.log("copy_notifications",copy_notifications)
      let data:Array<any> = []
      
      for(const item of copy_notifications  ){
        
        let content:any = await findContentTypeNotification(Number(item?.content_id),Number(item?.content_type))
        delete item['filtros_opcionales']
        delete item['filtros']
        delete item['select_day']
        delete item['value']
        delete item['estado_notificacion']
        delete item['updated']
        delete item['created_by']
        delete item['updated_by']
        // delete item['content_type']
        // delete item['content_id']
        
        // let userNotificationId = latestUserNotificationsToday.find(element => element?.notificationId  == item?.id)
        let notificationId = item?.id
        delete item['id']
        data=[...data,Object.assign(content,item,{notificationId,userNotificationId:item?.userNotificationId})]
        
        // data=[...data,Object.assign(content,item)]
      }
      return res.send( data )
      
    }
    res.status(200).json( data_filters )
 
  } catch (err:any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
  
}
export const changeStatusUserNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user as IToken
    const { id } = req.params 
    
    await updateStatusUserNotification({ id:Number(id),userId })
    res.status(200).json('Se actualizo correctamente')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const availableNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const notificationsAvailable  = await DataBase.instance.notification.findAll({
      where:{
        [Op.or]:{
        select_day:1,
        [Op.and]:{
          select_day:2,
          value:moment().local().format('YYYY-MM-DD')
        }
      },
      state:true
      
      },
      // logging:console.log
    })
    for(const item of notificationsAvailable){
      const filters:Array<any> = JSON.parse(item.filtros as string)
     const outQuestionId:any = filters.map((item:any) =>{ if(item.active == true)return item.questionId })
     const outQuestionValue:any = filters.map((item:any) => { if(item.active == true)return item.value })
     
     const other_filters:Array<any> = JSON.parse(item.filtros_opcionales as string)
     const outActiveOtherFilters:Array<any> = other_filters.filter((item:any) =>{ if(item.active == true)return item })
     
    //  let validate_other_filters:Array<any> = []
     let validate_other_filters:any[]=[]
     
     outActiveOtherFilters.forEach(item => {
         if(item?.tag == 'Edad'){
           // para todos 
           if(item?.value?.desde == 0 && item?.value?.hasta == 0){
            //  validate_other_filters.push({})
             validate_other_filters.push(sequelize.literal(`TIMESTAMPDIFF(YEAR, date_of_birth , CURDATE()) > ${item?.value?.desde}`))
            }
           
           // año exacto
           if((item?.value?.desde != 0 && item?.value?.hasta != 0) 
           && item?.value?.desde == item?.value?.hasta ){
             validate_other_filters.push(sequelize.literal(`TIMESTAMPDIFF(YEAR, date_of_birth , CURDATE()) = ${item?.value?.desde}`))
            }
           
           // entre edades (between)
           if((item?.value?.desde != 0 && item?.value?.hasta != 0) 
          //  && item?.value?.desde <= years_of_user && item?.value?.hasta>= years_of_user 
           ){
            validate_other_filters.push(sequelize.literal(`TIMESTAMPDIFF(YEAR, date_of_birth , CURDATE()) between ${item?.value?.desde} and ${item?.value?.hasta}`))
             
            //  validate_other_filters.push(1)
            }
           
           //Validar menor
           //desde 0 - 20 ->  menores de 
           if(item?.value?.desde == 0 && item?.value?.hasta > item?.value?.desde){
            validate_other_filters.push(sequelize.literal(`TIMESTAMPDIFF(YEAR, date_of_birth , CURDATE()) < ${item?.value?.hasta}`))
             
            //  if(item?.value?.hasta > years_of_user )validate_other_filters.push(1)
           }
           
           //desde 20 - 0 -> mayores
           // validar mayor
           if(item?.value?.hasta == 0 && item?.value?.desde > item?.value?.hasta){
            validate_other_filters.push(sequelize.literal(`TIMESTAMPDIFF(YEAR, date_of_birth , CURDATE()) > ${item?.value?.desde}`))
             
            //  if(item?.value?.desde < years_of_user )validate_other_filters.push(1)
           }
         }
         
         if(item?.tag == 'Genero'){
           if(item?.value == '1'){
            validate_other_filters.push({sexo:'hombre'})
            //  if(gender_of_user == 'hombre')validate_other_filters.push()
           }
           if(item?.value == '2'){
            validate_other_filters.push({sexo:'mujer'})
             
            //  if(gender_of_user == 'mujer')validate_other_filters.push(1)
           }
           if(item?.value == '3'){
            validate_other_filters.push({sexo:'no especificado'})
             
            //  if(gender_of_user == 'no especificado')validate_other_filters.push(1)
           }
         }
         
     });
     
     
     let params = {}
    //  if(filters.length == 0 ){
    //   params = {
    //     answered:{
    //     [Op.in]:outQuestionValue
    //   }
    // }
    //  }
     if(filters.length > 0 ){
      params = {
        questionId:{
          [Op.in]:outQuestionId
        },
        answered:{
          [Op.in]:outQuestionValue
        },
        question21:true
      }
    }
     const users = await DataBase.instance.user.findAll({
      
      where:{
       [Op.and]:[...validate_other_filters,
        item.select_day == 1 ? 
        sequelize.literal(`${item.value} = TIMESTAMPDIFF(DAY, date_user_session_day , CURDATE())+user_session_day`)
        : {}
      ]
      },
      
      include:filters.length>0?[{
         model:DataBase.instance.answer,
         required:true,
         where:params
        //  where:{
        //   questionId:{
        //     [Op.in]:outQuestionId
        //   },
        //   answered:{
        //     [Op.in]:outQuestionValue
        //   }
        //  }
       }]:[],//{model: DataBase.instance., attributes: []},
       logging:console.log
     }
     
     )
     console.log(`ITEM  - ${item.id} ----`)
     console.log("outQuestionId active => ",outQuestionId)
     console.log("outQuestionValue active => ",outQuestionValue)
     console.log("outActiveOtherFilters active => ",outActiveOtherFilters)
     console.log("USERS",users.map(item => item.id))
     
     const copy_user = JSON.parse(JSON.stringify(users))
    const idUserDevice = copy_user.filter( (item:any )=> typeof item?.device_id  == 'string').map((item:any) => item?.device_id)
    if(idUserDevice.length > 0){
      
    console.log("device : ",idUserDevice)
      
      
      
      await SendNotificationForUsers({
        headings :{
          'tr': 'subtitutlo xd ',
        'en': `¡Hola,{{ name | default: 'que tal'}}!`,
        },
            contents: {
          'tr': 'Hey que tal ',
          "en": `Revisa ${item.title}!`
         
      },
      // // chrome_web_image:'data:image/png;base64,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',
      // // chrome_web_image:'https://holinsys.pe/wp-content/uploads/2021/03/ic9.png',
      // // included_segments: ['Subscribed Users'], // toplu mesaj gönderme
      include_player_ids:idUserDevice // kişiye özel mesaj gönderme
      })
    }
    console.log(" nulo device : ",idUserDevice)
    }
   
    
    // console.log(notificationsAvailable.length)
    return res.json(notificationsAvailable)
  } catch (err:any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
  
  
}
