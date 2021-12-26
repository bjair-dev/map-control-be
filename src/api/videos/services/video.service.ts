import { createVideo } from './create/index'
import { VideoAttributes } from '../models/video.model'
import config from '../../../config/environments'
import { saveImageInServer } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import { uploadVideo } from '../../../shared/vimeo'
import { removeFile } from '../../../shared/remove.file'
import { updateVideo } from './update/index'
import path from 'path'

export const createVideoService = async ({
  video,
  adminId,
  vimeo,
  image,
}: {
  video: VideoAttributes
  adminId: number
  vimeo: Buffer
  image: Buffer
}) => {
  try {
    let _key_image: string | undefined = undefined
    let _path_image: string | undefined = undefined
    let _size_image: string | undefined = undefined

    let _key_video: string | undefined = undefined
    let _path_video: string | undefined = undefined
    let _size_video: string | undefined = undefined

    if (image) {
      const { key, size } = await saveImageInServer({ buffer: image })
      _key_image = key
      _size_image = size
      _path_image = config.PROY_BEURL + '/api/render-image/' + key
    } else {
      _path_image = (await findOneGlobalVar('video_image_default'))?.value
    }

    if (vimeo) {
      const _vimeo = await uploadVideo({
        vimeo,
        description: video.title!,
        name: video.title!,
      })

      _key_video = _vimeo.key
      _path_video = _vimeo.path
      _size_video = _vimeo.size
      await removeFile({ path: _vimeo.file_path })
    } else {
      _path_video = (await findOneGlobalVar('video_vimeo_default'))?.value
    }
    return await createVideo({
      adminId,
      title: video.title!,
      key_video: _key_video!,
      path_video: _path_video!,
      size_video: _size_video!,
      key: _key_image!,
      path: _path_image!,
      size: _size_image!,
      description: video.description!,
      video_category_id: video.video_category_id!,
    })
  } catch (err) {
    throw err
  }
}

export const updateVideoService = async ({
  video,
  adminId,
  image,
}: {
  video: VideoAttributes
  adminId: number
  image: Buffer
}) => {
  try {
    if (image) {
      await removeFile({ path: path.join(config.DIR!, 'assets', video.key! || '') })
      const { key, size } = await saveImageInServer({ buffer: image })
      video.key = key
      video.size = size
      video.path = config.PROY_BEURL + '/api/render-image/' + key
    }
    await updateVideo({
      video,
      where: {
        id: video.id,
      },
      adminId,
    })
  } catch (err) {
    throw err
  }
}
