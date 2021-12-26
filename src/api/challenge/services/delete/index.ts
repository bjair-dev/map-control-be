import { DataBase } from '../../../../database'
import { WhereOptions } from 'sequelize'
import { ChallengeAttributes } from '../../models/challenge.model'

export const deleteChallenge = async ({
  where,
}: {
  where: WhereOptions<ChallengeAttributes>
}) => {
  try {
    return await DataBase.instance.challenge.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}
