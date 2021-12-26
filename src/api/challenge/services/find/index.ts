import { DataBase } from '../../../../database'
import { ChallengeAttributes } from '../../models/challenge.model'
import { FindAttributeOptions } from 'sequelize/types'
import { WhereOptions } from 'sequelize'

export const findAllChallenge = async ({
  page,
  where,
  attributes,
}: {
  page: number
  where?: ChallengeAttributes
  attributes?: FindAttributeOptions
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.challenge.findAndCountAll({
      where,
      attributes,
      order: [['id', 'DESC']],
      limit,
      offset,
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
export const findOneChallenge = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<ChallengeAttributes>
  attributes?: FindAttributeOptions
}): Promise<ChallengeAttributes | null> => {
  try {
    const challenge = await DataBase.instance.challenge.findOne({
      where,
      attributes,
    })
    if (challenge) return challenge.get({ plain: true })
    return challenge
  } catch (err) {
    throw err
  }
}
