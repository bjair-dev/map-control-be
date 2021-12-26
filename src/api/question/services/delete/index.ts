import { DataBase } from '../../../../database'
import { findOneQuestion } from '../find/question'
import { removeFile } from '../../../../shared/remove.file'
import config from '../../../../config/environments'
import path from 'path'

export const deleteQuestion = async (id: number) => {
  try {
    const question = await findOneQuestion({ id, state: true }, ['key'])
    return await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, question?.key || '') }),
      DataBase.instance.question.destroy({
        where: {
          id,
        },
      }),
    ])
  } catch (err) {
    throw err
  }
}
