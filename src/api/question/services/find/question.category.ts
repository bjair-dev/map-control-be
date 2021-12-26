import { DataBase } from '../../../../database'
import { QuestionCategoryAttributes } from '../../models/question.category.models'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions, Order } from 'sequelize/types'

export const findOneQuestionCategory = async ({
  where,
  attributes,
}: {
  where: WhereOptions<QuestionCategoryAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const category = await DataBase.instance.questionCategory.findOne({
      where,
      attributes,
    })
    if (category) return category.get({ plain: true })
    return category
  } catch (err) {
    throw err
  }
}
export const findAllQuestionCategories = async ({
  where,
  attributes,
  order,
}: {
  where?: WhereOptions<QuestionCategoryAttributes>
  attributes?: FindAttributeOptions
  order?: Order
}) => {
  try {
    return await DataBase.instance.questionCategory.findAll({
      where,
      attributes,
      order,
    })
  } catch (err) {
    throw err
  }
}
