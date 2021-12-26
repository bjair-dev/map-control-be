import { DataBase } from '../../../../database'
import moment from 'moment'
import { QuestionCategoryAttributes } from '../../models/question.category.models'

export const createQuestionCategory = async ({
  question_category,
}: {
  question_category: QuestionCategoryAttributes
}) => {
  try {
    return await DataBase.instance.questionCategory.create({
      created: moment.utc().toDate(),
      ...question_category,
    })
  } catch (err) {
    throw err
  }
}
