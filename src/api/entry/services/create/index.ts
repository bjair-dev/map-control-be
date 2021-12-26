import { DataBase } from '../../../../database'
import moment from 'moment'
import { EntryAttributes } from '../../models/entry.model'

export const createEntry = async ({
  userId,
  amount,
  date,
  description,
  entry_type_id,
  entry_tag_id,
  account,
  completed
  
}: {
  userId: number
  amount: string
  date?: Date 
  description?: string
  entry_type_id: number
  entry_tag_id:number
  account?:string
  completed?:boolean
  
}): Promise<EntryAttributes> => {
  try {
    return await DataBase.instance.entry.create({
      date: date || moment.utc().toDate(),
      userId,
      amount,
      created: moment.utc().toDate(),
      description,
      entry_type_id,
      entry_tag_id,
      account,
      completed
    })
  } catch (err) {
    throw err
  }
}
