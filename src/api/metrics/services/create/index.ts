import { DataBase } from '../../../../database'
import moment from 'moment'
import { MetricsAttributes } from '../../models/metrics.model'

export const createMetrics = async ( metrics?: MetricsAttributes ) => {
  try {
    return await DataBase.instance.metrics.create({
      created: moment().toDate(),
      ...metrics,
    })
  } catch (err) {
    throw err
  }
}
