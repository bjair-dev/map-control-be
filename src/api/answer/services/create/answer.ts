import { DataBase } from '../../../../database'
import moment from 'moment'
import { AnswerAttributes } from '../../models/answer.model'

export const createAnswer = async ({
    answer,
}: {
  answer: AnswerAttributes
}) => {
  try {
    return await DataBase.instance.answer.create({
      created: moment.utc().toDate(),
      ...answer,
    })
  } catch (err) {
    throw err
  }
}
