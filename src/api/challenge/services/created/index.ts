import { DataBase } from '../../../../database'
import moment from 'moment'
import { ChallengeAttributes } from '../../models/challenge.model'

export const createChallenge = async ({
  challenge,
  adminId,
}: {
  challenge: ChallengeAttributes
  adminId: number
}) => {
  try {
    return await DataBase.instance.challenge.create({
      created: moment.utc().toDate(),
      title: challenge.title,
      description: challenge.title,
      question: challenge.question,
      created_by: adminId,
      path: challenge.path,
      key: challenge.key,
      size: challenge.size,
      bottom: challenge.bottom,
    })
  } catch (err) {
    throw err
  }
}
