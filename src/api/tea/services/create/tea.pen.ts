import { DataBase } from '../../../../database'
import moment from 'moment'
import { TeaPenAttributes } from '../../models/tea.pen.model'

export const createTenPen = async ({ tea_pen }: { tea_pen: TeaPenAttributes }) => {
  try {
    return await DataBase.instance.teaPen.create({
      created: moment().toDate(),
      ...tea_pen,
    })
  } catch (err) {
    throw err
  }
}
