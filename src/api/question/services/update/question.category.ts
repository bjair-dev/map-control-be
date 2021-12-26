import { DataBase } from '../../../../database'
import { QuestionCategoryAttributes } from '../../models/question.category.models'
import moment from 'moment'
import { WhereOptions } from 'sequelize'

export const updateCategory = async ({
  question_category,
  where,
}: {
  question_category: QuestionCategoryAttributes
  where: WhereOptions<QuestionCategoryAttributes>
}) => {
  try {
    return await DataBase.instance.questionCategory.update(
      {
        updated: moment.utc().toDate(),
        ...question_category,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
