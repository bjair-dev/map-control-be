import { DataBase } from '../../../../database'
import moment from 'moment'
import { ChallengeAttributes } from '../../models/challenge.model'
import { WhereOptions } from 'sequelize'

export const updateChallenge = async ({
  challenge,
  where,
}: {
  challenge: ChallengeAttributes
  where: WhereOptions<ChallengeAttributes>
}) => {
  try {
    return await DataBase.instance.challenge.update(
      {
        updated: moment.utc().toDate(),
        ...challenge,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}
