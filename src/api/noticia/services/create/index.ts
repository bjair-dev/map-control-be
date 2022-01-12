import { DataBase } from '../../../../database'
import moment from 'moment'
import { NoticiaAttributes } from '../../models/noticia.model'

export const createNoticia = async ({
  adminId,
  key,
  titular,
  path,
  size,
  title,
}: {
  adminId: number
  key: string
  titular: string
  path: string
  size: string
  title: string
}): Promise<NoticiaAttributes> => {
  try {
    return await DataBase.instance.noticia.create({
      created_by: adminId,
      created: moment.utc().toDate(),
      key,
      titular,
      path,
      size,
      title,
    })
  } catch (err) {
    throw err
  }
}
