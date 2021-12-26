import { DataBase } from '../../../../database'
import { EntryTypeAttributes } from '../../models/entry.type.model'
export const findEntryTypeByType = async (type: string): Promise<EntryTypeAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.entryType.findOne({
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
export const findEntryTypeById = async (id: string): Promise<EntryTypeAttributes | undefined> => {
  try {
    return (
      await DataBase.instance.entryType.findOne({
        where: {
          id,
          state: true,
        },
      })
    )?.get({ plain: true })
  } catch (err) {
    throw err
  }
}
export const findAllEntryType = async (): Promise<EntryTypeAttributes[]> => {
  try {
    return await DataBase.instance.entryType.findAll({
      attributes: ['id', 'type'],
      raw: true,
      where: {
        state: true,
      },
    })
  } catch (err) {
    throw err
  }
}
