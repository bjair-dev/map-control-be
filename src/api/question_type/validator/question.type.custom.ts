import { findOneQuestionTypeById, findOneQuestionTypeByType } from '../services/find/index'
export const notExistsQuestionType = async (typeId: number) => {
  const type = await findOneQuestionTypeById(typeId)
  if (!type) throw new Error('El id no existe')
}
export const existsQuestionTypebyType = async (type: string) => {
  const _type = await findOneQuestionTypeByType(type)
  if (!_type) throw new Error('El type no existe')
}
