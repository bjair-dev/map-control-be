import { DataBase } from '../../../../database'
import moment from 'moment'
import { WhereOptions } from 'sequelize'
import { EntryAttributes } from '../../models/entry.model'

export const updateEntry = async ({
  entry,
  where,
}: {
  entry: EntryAttributes
  where: WhereOptions<EntryAttributes>
}) => {
  try {
    return await DataBase.instance.entry.update(
      {
        updated: moment.utc().toDate(),
        ...entry,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
