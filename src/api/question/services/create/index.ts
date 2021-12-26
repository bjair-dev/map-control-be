import moment from 'moment'
import { DataBase } from '../../../../database'

export const createQuestion = async ({
  question_type_id,
  question,
  adminId,
  motivation,
  tip,
  key,
  size,
  path,
  question_category_id,
}: {
  question_type_id: number
  question: string
  adminId: number
  motivation: string
  tip: string
  key?: string
  size?: string
  path?: string
  question_category_id?: number
}) => {
  try {
    return (
      await DataBase.instance.question.create({
        question_type_id,
        created: moment.utc().toDate(),
        question,
        created_by: adminId,
        motivation,
        tip,
        key,
        path,
        size,
        question_category_id,
      })
    ).get({ plain: true })
  } catch (err) {
    throw err
  }
}
