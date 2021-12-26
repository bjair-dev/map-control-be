import { DataBase } from '../../../../database'
import moment from 'moment'
import { UserChallengeAttributtes } from '../../models/user.challenge.model'

export const createUserChallenge = async ({
  userId,
  challengeId,
}: {
  userId: number
  challengeId: number
}): Promise<UserChallengeAttributtes> => {
  try {
    return await DataBase.instance.userChallenge.create({
      userId: userId,
      challengeId: challengeId,
      send_date: moment.utc().toDate(),
    })
  } catch (err) {
    throw err
  }
}
