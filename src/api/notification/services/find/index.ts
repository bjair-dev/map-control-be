import { DataBase } from '../../../../database'
import { NotificationModel, NotificationAttributes } from '../../models/notification.model'
import { Op, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export interface IFindAllNotifications {
  page: number
  rows: NotificationModel[]
  count: number
}
export const findAllNotifications = async ({
  page,
  where,
  attributes,
}: {
  page: number
  where: WhereOptions<NotificationAttributes>
  attributes?: FindAttributeOptions
}): Promise<IFindAllNotifications> => {
  try {
    const limit = 12
    const offset = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.notification.findAndCountAll({
      where,
      attributes,
      offset,
      limit,
      order: [['id', 'DESC']],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
export const findAllNotificationsOutPagination = async ({
  where,
  // attributes,
}: {
  where: WhereOptions<NotificationAttributes>
  // attributes?: FindAttributeOptions
}): Promise<NotificationAttributes[]> => {
  try {
    const notifications = await DataBase.instance.notification.findAll({
      where,
      attributes:{
        exclude:['filtros','filtros_opcionales','select_day','value','estado_notificacion','updated','created_by','updated_by']
      },
      // include:{
      //   model:''
      // }
    })
    return notifications
  } catch (err) {
    throw err
  }
}

export const findOneNotification = async (
  where: WhereOptions<NotificationAttributes>
): Promise<NotificationAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.notification.findOne({
        where,
      })
    )?.get({ plain: true })
  } catch (err) {
    throw err
  }
}


export const findContentTypeNotification = async (
  id:number,
  type:number
) => {
  
  try {
    
    switch (type) {
      case 2:
        return {
          survey:await DataBase.instance.survey.findOne(
            { 
              where:{id},attributes: ['id', 'title'] ,
              include:[{
                model:DataBase.instance.surveyContent,
                attributes:{
                  exclude:['created_by','updated_by','created','updated']
                }
              },
              {
                model:DataBase.instance.surveyType
              }
            ]
            
            }
            )
        }
      // break;
      case 3:
        return {video:await DataBase.instance.video.findOne({ where:{id}, attributes: {
          exclude:['created_by','updated_by','created','updated','size','key']
        } })}
      // break;
      case 4:
        return {question:await DataBase.instance.question.findOne({ where:{id}, attributes: {
          exclude:['created_by','updated_by','created','updated','size','key']

        } })}
      // break;
      case 5:
        // return await allChallenge(['id','title'])
        return {challenge:await DataBase.instance.challenge.findOne({ where:{id}, attributes: {
          exclude:['created_by','updated_by','created','updated','size','key']
          
        } })}
      //   break;
      case 1:
        return {tip:await DataBase.instance.tip.findOne({ where:{id}, attributes: {
          exclude:['created_by','updated_by','created','updated','size','key']
        } })}
      // break;
      default:
        return {}
        // break
    }
    
  } catch (err) {
    throw err
  }
  
}