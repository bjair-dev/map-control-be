import { DataBase } from '../../../../database/index';
import moment from 'moment';
import { VideoCategoryAttributes } from '../../models/video.category.model';
import { WhereOptions } from 'sequelize';
export const updateVideoCategory = async ({
    video_category,
    where,
  }: {
    video_category: VideoCategoryAttributes
    where:WhereOptions<VideoCategoryAttributes>
  }) => {
    try {
      return await DataBase.instance.videoCategory.update(
        {
          updated: moment.utc().toDate(),
          ...video_category,
        },
        {
          where,
        }
      )
    } catch (err) {
      throw err
    }
  }
  