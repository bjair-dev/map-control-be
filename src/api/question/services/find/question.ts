import { DataBase } from '../../../../database'
import { Op, WhereOptions } from 'sequelize'
import { QuestionAttributes } from '../../models/question.model'
import { FindAttributeOptions } from 'sequelize/types'
export const findAllQuestion = async ({
  state,
  page,
}: {
  state: number
  page: number
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.question.findAndCountAll({
      where: {
        state,
        // '$question_type.id$': typeId,
        '$question_type.state$': true,
      },
      attributes: [
        'id',
        'question',
        'tip',
        'motivation',
        'path',
        'state',
        'created',
        'updated',
      ],
      include: [
        {
          model: DataBase.instance.questionType,
          as: 'question_type',
          attributes: ['type'],
          required: true,
        },
        {
          model: DataBase.instance.questionCategory,
          as: 'question_category',
          required: true,
          attributes: ['id', 'category'],
        },
      ],

      limit,
      offset,
      order: [['id', 'DESC']],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
export const findOneQuestion = async (
  where?: WhereOptions<QuestionAttributes>,
  attributes?: FindAttributeOptions
) => {
  try {
    return (
      await DataBase.instance.question.findOne({
        where,
        attributes,
      })
    )?.get({ plain: true })
  } catch (err) {
    throw err
  }
}
