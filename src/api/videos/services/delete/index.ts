import { DataBase } from '../../../../database'

export const deleteVideo = async (id: number) => {
  try {
    return await DataBase.instance.video.destroy({
      where: { id },
    })
  } catch (err) {
    throw err
  }
}
