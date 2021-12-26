import { DataBase } from '../../../../database'
import moment from 'moment'
import { SurveyAttributes } from '../../models/survay.model'

export const createSurvey = async ({ survey }: { survey: SurveyAttributes }) => {
  try {
    return await DataBase.instance.survey.create({
      created: moment().toDate(),
      ...survey,
    })
  } catch (err) {
    throw err
  }
}
