import { DataBase } from '../../../../database'
import moment from 'moment'
import { UserNotificationAttributes } from '../../models/user.notification.model'

export const createUserNotification = async ( userNotification: UserNotificationAttributes ) => {
  try {
    return await DataBase.instance.userNotification.create({
      created: moment().toDate(),
      ...userNotification,
    })
  } catch (err) {
    throw err
  }
}
