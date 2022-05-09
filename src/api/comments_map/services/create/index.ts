import { DataBase } from '../../../../database'
import moment from 'moment'
import { CommentsAttributes } from '../../models/comments_map.model'

export const createComments= async ({
  adminId,
  key,
  motivation,
  path,
  size,
  tip,
  title,
}: {
  adminId: number
  key: string
  motivation: string
  path: string
  size: string
  tip: string
  title: string
  tip_category_id: number
}): Promise<CommentsAttributes> => {
  try {
    return await DataBase.instance.tip.create({
      created_by: adminId,
      created: moment.utc().toDate(),
      key,
      motivation,
      path,
      size,
      tip,
      title,
    })
  } catch (err) {
    throw err
  }
}
