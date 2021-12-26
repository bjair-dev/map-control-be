import { DataBase } from '../../../../database'
import { VideoCategoryAttributes } from '../../models/video.category.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions, Order } from 'sequelize/types'

export const findOneVideoCategory = async ({
  where,
  attributes,
}: {
  where: WhereOptions<VideoCategoryAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const category = await DataBase.instance.videoCategory.findOne({
      where,
      attributes,
    })
    if (category) return category.get({ plain: true })
    return category
  } catch (err) {
    throw err
  }
}
export const findAllVideoCategories = async ({
  where,
  attributes,
  order,
}: {
  where?: WhereOptions<VideoCategoryAttributes>
  attributes?: FindAttributeOptions
  order?: Order
}) => {
  try {
    return await DataBase.instance.videoCategory.findAll({
      where,
      attributes,
      order,
    })
  } catch (err) {
    throw err
  }
}
