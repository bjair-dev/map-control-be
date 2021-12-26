import { DataBase } from '../../../../database'
import moment from 'moment'
import { WhereOptions } from 'sequelize'
import { MotivationalPhraseAttributes } from '../../models/motivational.phrase'

export const updateMotivationalPhrase = async ({
  motivationalPhrase,
  where,
}: {
    motivationalPhrase: MotivationalPhraseAttributes
  where: WhereOptions<MotivationalPhraseAttributes>
}) => {
  try {
    return await DataBase.instance.motivationalPhrase.update(
      {
        updated: moment.utc().toDate(),
        ...motivationalPhrase,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
