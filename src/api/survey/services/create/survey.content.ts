import { DataBase } from '../../../../database'
import moment from 'moment'
import { SurveyContentAttributes } from '../../models/survey.content.model'

export const createSurveyContent = async ({
  survey_content,
}: {
  survey_content: SurveyContentAttributes
}) => {
  try {
    return await DataBase.instance.surveyContent.create({
      created: moment().toDate(),
      ...survey_content,
    })
  } catch (err) {
    throw err
  }
}
