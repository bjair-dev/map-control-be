import { findOneQuestionCategory } from '../services/find/question.category'
import { Op } from 'sequelize'
export const notExistsQuestionCategory = async (category: string) => {
  const _category = await findOneQuestionCategory({
    where: {
      category: {
        [Op.like]: `%${category}`,
      },
    },
  })
  if (_category) throw new Error(`La categoria ya existe`)
}
export const notExistsQuestionCategoryExcId = async (
  category: string,
  { req }: { req: any }
) => {
  const _category = await findOneQuestionCategory({
    where: {
      [Op.and]: {
        category,
        id: {
          [Op.not]: req.params.id,
        },
      },
    },
  })
  if (_category) throw new Error(`La categoria ya existe`)
}
export const existsQuestionCategory = async (id: number) => {
  const _category = await findOneQuestionCategory({
    where: { id },
  })
  if (!_category) throw new Error(`La categoria no existe`)
}
