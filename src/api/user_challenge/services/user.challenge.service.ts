import { createUserChallenge } from './create/index'
import { UserChallengeAceptado, UserChallengeCompletado } from './update/index'
import { findAllByUserIdAndChallengeId, findMedalsByUserId } from './find/index'
// import { UserChalengeFactory } from '../models/user.challenge.model'

export const createUserChallengeService = async ({
  userId,
  challengeId,
}: {
  userId: number
  challengeId: number
}) => {
  try {
    return await createUserChallenge({ userId, challengeId })
  } catch (error) {
    throw error
  }
}

export const updateAceptadoChallengeService = async ({ id }: { id: number }) => {
  try {
    return await UserChallengeAceptado({ id })
  } catch (error) {
    throw error
  }
}

export const updateCompleadoChallengeService = async ({ id }: { id: number }) => {
  try {
    return await UserChallengeCompletado({ id })
  } catch (error) {
    throw error
  }
}

export const findUserChallengeByUserIdAndChallengeIdService = async ({
  userId,
  challengeId,
}: {
  userId: number
  challengeId: number
}) => {
  try {
    return await findAllByUserIdAndChallengeId(userId, challengeId)
  } catch (error) {
    throw error
  }
}

export const findAllMedals = async (userId: number) => {
  try {
    return await findMedalsByUserId(userId)
  } catch (error) {
    throw error
  }
}
