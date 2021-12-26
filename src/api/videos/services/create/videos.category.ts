import { DataBase } from '../../../../database'
import { VideoCategoryAttributes } from '../../models/video.category.model'
import moment from 'moment'

export const createVideoCategory = async ({
  video_category,
}: {
  video_category: VideoCategoryAttributes
}) => {
  try {
    return await DataBase.instance.videoCategory.create({
      created: moment.utc().toDate(),
      ...video_category,
    })
  } catch (err) {
    throw err
  }
}
