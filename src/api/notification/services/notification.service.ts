import { DataBase } from '../../../database'
import { Notification, NotificationAttributes } from '../models/notification.model'
import { createNotification } from './create/index'
// import { ChallengeAttributes } from '../../challenge/models/challenge.model';
// import { TipModel } from '../../tip/models/tip.model';

// const allChallenge = async (attributes:any) => {
//     return await DataBase.instance.challenge.findAll({attributes})
// }
// const all = async (attributes:any) => {
//   return await DataBase.instance.video.findAll({attributes})

// }

// const allChallenge = async (attributes:any) => {
//   return await DataBase.instance.challenge.findAll({attributes})
// }
// const allChallenge = async (attributes:any) => {
//   return await DataBase.instance.challenge.findAll({attributes})
// }

export const getContentByTypeContentService = async ({ type }: { type: string }): Promise<any> => {
  try {
    switch (type) {
      case 'encuestas':
        return await DataBase.instance.survey.findAll({ attributes: ['id', 'title'] })
      // break;
      case 'videos':
        return await DataBase.instance.video.findAll({ attributes: ['id', 'title'] })
      // break;
      case 'preguntas':
        return await DataBase.instance.question.findAll({ attributes: ['id', 'question'] })
      // break;
      case 'desafios':
        // return await allChallenge(['id','title'])
        return await DataBase.instance.challenge.findAll({ attributes: ['id', 'title'] })
      //   break;
      case 'tips':
        return await DataBase.instance.tip.findAll({ attributes: ['id', 'title'] })
      // break;
      default:
        break
    }

    // const question = await findOneQuestion({ id: questionId, state: true }, ['key'])
    // const [result, { key, size }] = await Promise.all([
    //   removeFile({ path: path.join(config.DIR_ASSETS!, question?.key || '') }),
    //   saveImageInServer({ buffer: image }),
    // ])
    // const _path = config.PROY_BEURL + '/api/render-image/' + key
    // await updateQuestion({
    //   questionId,
    //   key,
    //   size,
    //   path: _path,
    //   adminId,
    // })
    // return { path: _path, msg: result }
  } catch (err) {
    throw err
  }
}

export const createNotificationService = async ({
  notification,
  adminId,
}: {
  notification: NotificationAttributes
  adminId: number
}) => {
  try {
    return await createNotification({
      adminId,
      title: notification.title!,
      content_id: notification.content_id!,
      content_type: notification.content_type!,
      filtros: notification.filtros!,
      filtros_opcionales: notification.filtros_opcionales!,
      mensaje_personalizado: notification.mensaje_personalizado!,
      select_day: notification.select_day!,
      value: notification.value!,
      estado_notificacion: notification.estado_notificacion!,
    })
  } catch (error) {
    throw error
  }
}
