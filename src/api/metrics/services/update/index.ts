import { DataBase } from '../../../../database'

export const updateUseTimeMetric = async ({
  time,
  id,
  userId
}: {
  time: number
  id:number
  userId:number
}) => {
  try {
    return await DataBase.instance.metrics.update(
      {
        usetime:time
      },
      {
        where:{
            id,
            userId
        }
      }
    )
  } catch (err) {
    throw err
  }
}
