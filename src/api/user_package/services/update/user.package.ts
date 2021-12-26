import moment from 'moment'
import { DataBase } from '../../../../database'

export const updateUserPackage = async ({
  id,
}: {
  id: number
  
}) => {
  try {
    return await DataBase.instance.userPackage.update(
      {
        status:'terminado',
        finish_date:moment().toDate()
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


export const updateIndexUserPackage = async ({
  id,
  index
}: {
  id: number
  index: number
}) => {
  try {
    return await DataBase.instance.userPackage.update(
      {
        index
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
