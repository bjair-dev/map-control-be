import { DataBase } from '../../../../database'
import { findOneNotification } from '../find/index'
import { NotificationAttributes } from '../../models/notification.model'
import { WhereOptions } from 'sequelize'

export const deleteOneNotification = async ({ where }: { where: WhereOptions<NotificationAttributes> }) => {
  try {
    return await DataBase.instance.notification.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}
