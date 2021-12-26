import { DataBase } from '../../../../database'
import moment from 'moment'
import { AnswerSurveyAttributes } from '../../models/answer.survey.model'

export const createAnswerSurvey = async ({
    answer_survey,
}: {
  answer_survey: AnswerSurveyAttributes
}) => {
  try {
    return await DataBase.instance.answerSurvey.create({
      created: moment.utc().toDate(),
      ...answer_survey,
    })
  } catch (err) {
    throw err
  }
}
