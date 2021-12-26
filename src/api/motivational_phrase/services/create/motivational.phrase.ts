import { DataBase } from '../../../../database'
import moment from 'moment'
import { MotivationalPhraseAttributes } from '../../models/motivational.phrase'

export const createMotivationalPhraseAdmin = async ({
  phrase,
  created_by,
}: {
  phrase:string
  created_by: number
}): Promise<MotivationalPhraseAttributes> => {
  try {
    return await DataBase.instance.motivationalPhrase.create({
      phrase,
      created_by,
      created: moment.utc().toDate(),
      state:true,
    })
  } catch (err) {
    throw err
  }
}
