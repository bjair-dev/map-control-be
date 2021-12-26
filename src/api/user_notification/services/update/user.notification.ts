import { DataBase } from "../../../../database"

export const updateStatusUserNotification = async ({
    id,
    userId
  }: {
    id: number
    userId: number
  }) => {
    try {
      return await DataBase.instance.userNotification.update(
        {
            status:'terminado'
        },
        {
          where: {
            id,
            userId
        },
        }
      )
    } catch (error) {
      throw error
    }
  }
  