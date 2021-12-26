import { DataBase } from '../../../../database'
import moment from 'moment'
import { EntryTagAttributes } from '../../models/entry.tag.model'

export const createEntryTagAdmin = async ({
  tag,
  created_by,
  tag_type
}: {
  tag: string
  created_by: number
  tag_type:string
}): Promise<EntryTagAttributes> => {
  try {
    return await DataBase.instance.entryTag.create({
      tag,
      created_by,
      created: moment.utc().toDate(),
      state:true,
      tag_type
    })
  } catch (err) {
    throw err
  }
}
