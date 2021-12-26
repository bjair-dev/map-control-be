import { DataBase } from '../../../../database'
import { QuestionTypeAttributes } from '../../models/question.model.model'
export const findOneQuestionTypeById = async (
  typeId: number
): Promise<QuestionTypeAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.questionType.findOne({
        where: {
          id: typeId,
          state: true,
        },
      })
    )?.get({ plain: true })
  } catch (err) {
    throw err
  }
}
export const findOneQuestionTypeByType = async (
  type: string
): Promise<QuestionTypeAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.questionType.findOne({
        where: {
          type,
          state: true,
        },
      })
    )?.get({ plain: true })
  } catch (err) {
    throw err
  }
}
export const findAllQuestionType = async (): Promise<QuestionTypeAttributes[]> => {
  try {
    return await DataBase.instance.questionType.findAll({
      where: {
        state: true,
      },
      attributes: ['id', 'type'],
    })
  } catch (err) {
    throw err
  }
}
