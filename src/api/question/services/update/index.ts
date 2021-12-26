import moment from 'moment'
import { DataBase } from '../../../../database'

export const updateQuestion = async ({
  questionId,
  question,
  motivation,
  tip,
  state,
  path,
  size,
  key,
  adminId,
  question_category_id,
}: {
  questionId?: number
  question?: string
  motivation?: string
  tip?: string
  state?: boolean
  path?: string
  size?: string
  key?: string
  adminId: number
  question_category_id?: number
}) => {
  try {
    return await DataBase.instance.question.update(
      {
        updated: moment.utc().toDate(),
        question,
        motivation,
        tip,
        state,
        path,
        size,
        key,
        updated_by: adminId,
        question_category_id,
      },
      {
        where: {
          id: questionId,
        },
      }
    )
  } catch (err) {
    throw err
  }
}
