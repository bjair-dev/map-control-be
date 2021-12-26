import { DataBase } from '../../../../database'
import moment from 'moment'

export const UserChallengeAceptado = async ({ id }: { id: number }) => {
  try {
    return await DataBase.instance.userChallenge.update(
      {
        status: 'aceptado',
        acepted_date: moment.utc().toDate(),
      },
      {
        where: {
          id,
        },
      }
    )
  } catch (error) {
    throw error
  }
}
export const UserChallengeCompletado = async ({ id }: { id: number }) => {
  try {
    return await DataBase.instance.userChallenge.update(
      {
        status: 'completado',
        completed_date: moment.utc().toDate(),
      },
      {
        where: {
          id,
        },
      }
    )
  } catch (error) {
    throw error
  }
}
