import { saveImageInServer } from '../../../shared/save.file'
import { updateQuestion } from './update/index'
import { removeFile } from '../../../shared/remove.file'
import config from '../../../config/environments'
import { findOneQuestion } from './find/question'
import path from 'path'

export const updateImageQuestion = async ({
  image,
  questionId,
  adminId,
}: {
  image: Buffer
  questionId: number
  adminId: number
}) => {
  try {
    const question = await findOneQuestion({ id: questionId, state: true }, ['key'])
    const [result, { key, size }] = await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, question?.key || '') }),
      saveImageInServer({ buffer: image }),
    ])
    const _path = config.PROY_BEURL + '/api/render-image/' + key
    await updateQuestion({
      questionId,
      key,
      size,
      path: _path,
      adminId,
    })
    return { path: _path, msg: result }
  } catch (err) {
    throw err
  }
}
