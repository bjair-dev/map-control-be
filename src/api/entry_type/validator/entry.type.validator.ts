import { findEntryTypeByType, findEntryTypeById } from '../services/find/index'

export const existsType = async (type: string) => {
  const obj = await findEntryTypeByType(type)
  if (obj) throw new Error('El tipo de ingreso ya existe')
}
export const notExistsTypebyId = async (type: string) => {
  const obj = await findEntryTypeById(type)
  if (!obj) throw new Error('El tipo de ingreso no existe')
}
