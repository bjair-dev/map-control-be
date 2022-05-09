/* import { CommentsAttributes } from '../models/comments_map.model'
import { createComments } from './create/index'
import { saveImageInServer } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import config from '../../../config/environments'
import { removeFile } from '../../../shared/remove.file'
import { updateTip } from './update/index'
import { findOneTip } from './find/index'
import path from 'path'

export const createCommentsService = async ({
  tip,
  adminId,
  image,
}: {
  tip: CommentsAttributes
  adminId: number
  image: Buffer
}) => {
  try {
    let _key: string | undefined = undefined
    let _path: string | undefined = undefined
    let _size: string | undefined = undefined
    if (image) {
      const { key, path, size } = await saveImageInServer({ buffer: image })
      _key = key
      _path = config.PROY_BEURL + '/api/render-image/' + key
      _size = size
    } else {
      _path = (await findOneGlobalVar('tip_image_default'))?.value
    }
    return await createComments({
      adminId,
      motivation: tip.motivation!,
      tip: tip.tip!,
      key: _key!,
      path: _path!,
      size: _size!,
      title: tip.title!,
      tip_category_id: tip.tip_category_id!,
    })
  } catch (err) {
    throw err
  }
}
 */