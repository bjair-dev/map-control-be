import { DataBase } from '../../../../database'
import { SurveyContentAttributes } from '../../models/survey.content.model'
import { Includeable, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findOneSurveyContent = async ({
  where,
  attributes,
  include,
}: {
  where: WhereOptions<SurveyContentAttributes>
  attributes?: FindAttributeOptions
  include?: Includeable | Includeable[]
}) => {
  try {
    const content = await DataBase.instance.surveyContent.findOne({
      where,
      attributes,
      include,
    })
    if (content) return content.get({ plain: true })
    return content
  } catch (err) {
    throw err
  }
}
