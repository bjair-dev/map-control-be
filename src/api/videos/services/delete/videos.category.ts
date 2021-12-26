import { DataBase } from '../../../../database/index'
import { VideoCategoryAttributes } from '../../models/video.category.model'
import { WhereOptions } from 'sequelize'

export const deleteVideoCategory = async ({
  where,
}: {
  where: WhereOptions<VideoCategoryAttributes>
}) => {
  try {
    return await DataBase.instance.videoCategory.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}
