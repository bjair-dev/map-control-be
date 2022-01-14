import { DataBase } from '../../../../database'
import moment from 'moment'
import { NoticiaAttributes } from '../../models/noticia.model'

export const createNoticia = async ({
  adminId,
  key,
  path,
  size,
  title,
  titular,
  region_id,
  prov_id,
  distrito_id,
}: {
  adminId: number
  key: string
  path: string
  size: string
  title: string
  titular: string

  region_id: number
  prov_id: number
  distrito_id: number
}): Promise<NoticiaAttributes> => {
  try {
    return await DataBase.instance.noticia.create({
      created_by: adminId,
      created: moment.utc().toDate(),
      key,
      path,
      size,
      title,
      titular,
      region_id,
      prov_id,
      distrito_id,
    })
  } catch (err) {
    throw err
  }
}
