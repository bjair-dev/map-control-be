import { DataBase } from '../../../../database'
import moment from 'moment'
import { NotificationAttributes } from '../../models/notification.model'

export const createNotification = async ({
  adminId,
  title,
  content_id,
  content_type,
  filtros,
  filtros_opcionales,
  mensaje_personalizado,
  select_day,
  value,
  estado_notificacion,
}: {
  adminId: number
  title: string
  content_id: number
  content_type: number
  filtros: string
  filtros_opcionales: string
  mensaje_personalizado: string
  select_day: number
  value: Date | string
  estado_notificacion: number
}): Promise<NotificationAttributes> => {
  try {
    return await DataBase.instance.notification.create({
      created_by: adminId,
      created: moment.utc().toDate(),
      title,
      content_id,
      content_type,
      filtros,
      filtros_opcionales,
      mensaje_personalizado,
      select_day,
      value,
      estado_notificacion,
    })
  } catch (err) {
    throw err
  }
}
