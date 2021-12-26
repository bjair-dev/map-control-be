import { DataBase } from '../../../../database'
import moment from 'moment'
import { VideoAttributes } from '../../models/video.model'

export const createVideo = async ({
  title,
  key,
  path,
  size,
  path_video,
  key_video,
  size_video,
  adminId,
  description,
  video_category_id,
}: {
  title: string
  key: string
  path: string
  size: string
  path_video: string
  key_video: string
  size_video: string
  description: string
  adminId: number
  video_category_id: number
}): Promise<VideoAttributes> => {
  try {
    return await DataBase.instance.video.create({
      title,
      key,
      path,
      size,
      created_by: adminId,
      created: moment.utc().toDate(),
      path_video,
      key_video,
      size_video,
      description,
      video_category_id,
    })
  } catch (err) {
    throw err
  }
}
