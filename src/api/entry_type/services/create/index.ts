import { DataBase } from '../../../../database'
import moment from 'moment'
import { EntryTypeAttributes } from '../../models/entry.type.model'

export const createEntryType = async ({
  type,
  created_by,
}: {
  type: string
  created_by: number
}): Promise<EntryTypeAttributes> => {
  try {
    return await DataBase.instance.entryType.create({
      type,
      created_by,
      created: moment.utc().toDate(),
      state:true,
    })
  } catch (err) {
    throw err
  }
}
