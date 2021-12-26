import { DataBase } from '../../../../database'
import { WhereOptions } from 'sequelize'
import moment from 'moment'
import { SurveyContentAttributes } from '../../models/survey.content.model'

export const updateSurveyContent = async ({
  survet_content,
  where,
}: {
  survet_content: SurveyContentAttributes
  where: WhereOptions<SurveyContentAttributes>
}) => {
  try {
    return await DataBase.instance.surveyContent.update(
      {
        updated: moment().toDate(),
        ...survet_content,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
