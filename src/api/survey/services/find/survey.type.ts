import { DataBase } from '../../../../database'
import { SurveyTypeAttributes } from '../../models/survey.type.mode'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findOneSurveyType = async ({
  where,
  attributes,
}: {
  where: WhereOptions<SurveyTypeAttributes>
  attributes?: FindAttributeOptions
}): Promise<SurveyTypeAttributes | null> => {
  try {
    const type = await DataBase.instance.surveyType.findOne({
      where,
      attributes,
    })
    if (type) type.get({ plain: true })
    return type
  } catch (err) {
    throw err
  }
}
