import { DataBase } from '../../../../database'
import { SurveyAttributes } from '../../models/survay.model'
import { WhereOptions } from 'sequelize'
import moment from 'moment'

export const updateSurvey = async ({
  survey,
  where,
}: {
  survey: SurveyAttributes
  where: WhereOptions<SurveyAttributes>
}) => {
  try {
    return await DataBase.instance.survey.update(
      {
        updated: moment().toDate(),
        ...survey,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
