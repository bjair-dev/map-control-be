import { Op } from 'sequelize'
import { findOneVideoCategory } from '../services/find/videos.category'
export const notExistsVideoCategory = async (category: string | number) => {
  const _category = await findOneVideoCategory({
    where: {
      [Op.or]: {
        id: category,
        category: {
          [Op.like]: `%${category}`,
        },
      },
    },
  })
  if (_category)
    throw new Error(
      `Ya existe ${
        typeof category === 'number' ? 'el Id de la categoria' : 'la categoria'
      }`
    )
}
export const notExistsVideoCategoryExcId = async (
  category: string | number,
  { req }: { req: any }
) => {
  const _category = await findOneVideoCategory({
    where: {
      [Op.and]: {
        category,
        id: {
          [Op.not]: req.params.id,
        },
      },
    },
  })
  if (_category)
    throw new Error(
      `Ya existe ${
        typeof category === 'number' ? 'el Id de la categoria' : 'la categoria'
      }`
    )
}
export const existsVideoCategory = async (category: string | number) => {
  const _category = await findOneVideoCategory({
    where: {
      [Op.or]: {
        id: category,
        category: {
          [Op.like]: `%${category}`,
        },
      },
    },
  })
  if (!_category)
    throw new Error(
      `No existe ${
        typeof category === 'number' ? 'el Id de la categoria' : 'la categoria'
      }`
    )
}
