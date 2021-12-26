import { DataBase } from '../../../../database'
import moment from 'moment'
import { WhereOptions } from 'sequelize'
import { VideoAttributes } from '../../models/video.model'

export const updateVideo = async ({
  where,
  video,
  adminId,
}: {
  video: VideoAttributes
  adminId?: number
  where: WhereOptions<VideoAttributes>
}) => {
  try {
    return await DataBase.instance.video.update(
      {
        updated_by: adminId,
        updated: moment.utc().toDate(),
        key: video.key,
        key_video: video.key_video,
        path: video.path,
        path_video: video.path_video,
        size: video.size,
        size_video: video.size_video,
        title: video.title,
        state: video.state,
        description: video.description,
        video_category_id: video.video_category_id,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
