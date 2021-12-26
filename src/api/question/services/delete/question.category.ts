import { DataBase } from '../../../../database'
import { QuestionCategoryAttributes } from '../../models/question.category.models'
import { WhereOptions } from 'sequelize'

export const deleteQuestionCategory = async ({
  where,
}: {
  where: WhereOptions<QuestionCategoryAttributes>
}) => {
  try {
    return await DataBase.instance.questionCategory.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}
