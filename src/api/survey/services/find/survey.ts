import { SurveyAttributes } from '../../models/survay.model'
import { Includeable, WhereOptions } from 'sequelize'
import { FindAttributeOptions, Order } from 'sequelize/types'
import { DataBase } from '../../../../database/index'
export const findAllSurvey = async ({
  page,
  where,
  attributes,
  order,
}: {
  page: number
  where?: WhereOptions<SurveyAttributes>
  attributes?: FindAttributeOptions
  order?: Order
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const rows = await DataBase.instance.survey.findAll({
      where,
      attributes,
      limit,
      offset,
      include: [
        {
          model: DataBase.instance.surveyContent,
          as: 'survey_contents',
          required: false,
          attributes: ['id', 'content'],
        },
        {
          model: DataBase.instance.surveyType,
          as: 'survey_type',
          required: true,
        },
      ],
      order,
    })

    return { page, count: rows.length, rows }
  } catch (err) {
    throw err
  }
}
export const findOneSurvey = async ({
  where,
  attributes,
  include
}: {
  where?: WhereOptions<SurveyAttributes>
  attributes?: FindAttributeOptions,
  include?:Includeable | Includeable[]
}) => {
  try {
    const survey = await DataBase.instance.survey.findOne({
      where,
      attributes,
      include
      
    })
    if (survey) return survey.get({ plain: true })
    return survey
  } catch (err) {
    throw err
  }
}
