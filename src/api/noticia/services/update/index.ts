import { DataBase } from '../../../../database'
import moment from 'moment'

export const updateNoticia = async ({
  id,
  title,
  titular,
  state,
  key,
  path,
  size,
  adminId,
  region_id,
  prov_id,
  distrito_id,
}: {
  id: number
  title?: string
  titular?: string
  state?: boolean
  key?: string
  path?: string
  size?: string
  adminId: number
  region_id?: number
  prov_id?: number

  distrito_id?: number
}) => {
  try {
    return await DataBase.instance.noticia.update(
      {
        title,
        titular,
        updated: moment.utc().toDate(),
        updated_by: adminId,
        state,
        key,
        path,
        size,
        region_id,
        prov_id,
        distrito_id,
      },
      {
        where: {
          id,
        },
      }
    )
  } catch (err) {
    throw err
  }
}
