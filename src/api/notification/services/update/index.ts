import { DataBase } from '../../../../database'
import moment from 'moment'

export const updateNotification = async ({
  id,
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
  id: number
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
}) => {
  try {
    return await DataBase.instance.notification.update(
      {
        title,
        content_id,
        content_type,
        filtros,
        filtros_opcionales,
        mensaje_personalizado,
        select_day,
        value,
        estado_notificacion,
        updated: moment.utc().toDate(),
        updated_by: adminId,
      },
      {
        where: {
          id,
        },
      }
    )
  } catch (error) {
    throw error
  }
}


