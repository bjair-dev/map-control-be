import { createChallenge } from './created/index'
import { ChallengeAttributes } from '../models/challenge.model'
import { saveImageInServer } from '../../../shared/save.file'
import config from '../../../config/environments'
import { findOneGlobalVar } from '../../global/services/find/global'
import { findOneChallenge } from './find/index'
import { removeFile } from '../../../shared/remove.file'
import path from 'path'
import { DataBase } from '../../../database/index'
import { deleteChallenge } from './delete/index'

export const createChallengeService = async ({
  challenge,
  adminId,
  image,
}: {
  challenge: ChallengeAttributes
  adminId: number
  image: Buffer
}) => {
  try {
    if (image) {
      const { key, size } = await saveImageInServer({ buffer: image })
      challenge.key = key
      challenge.path = config.PROY_BEURL + '/api/render-image/' + key
      challenge.size = size
    } else {
      challenge.path = (await findOneGlobalVar('challenge_image_default'))?.value
    }

    return await createChallenge({
      challenge,
      adminId,
    })
  } catch (err) {
    throw err
  }
}
export const deleteChallengeService = async (id: number) => {
  try {
    const key = await findOneChallenge({
      where: { id },
    })
    return await Promise.all([
      removeFile({ path: path.join(config.DIR_ASSETS!, key?.key || '') }),
      deleteChallenge({
        where: { id },
      }),
    ])
  } catch (err) {
    throw err
  }
}
export const updateChallengeService = async ({
  challenge,
  image,
}: {
  challenge: ChallengeAttributes
  image: Buffer
}) => {
  try {
    if (image) {
      await removeFile({ path: path.join(config.DIR_ASSETS!, challenge.key! || '') })
      const { key, size } = await saveImageInServer({ buffer: image })
      challenge.key = key
      challenge.path = config.PROY_BEURL + '/api/render-image/' + key
      challenge.size = size
    }
    return await DataBase.instance.challenge.update(
      {
        ...challenge,
      },
      {
        where: {
          id: challenge.id,
        },
      }
    )
  } catch (err) {
    throw err
  }
}
