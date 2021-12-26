import { findOneVideo } from '../services/find/index'

export const existsVideo = async (id: number) => {
  const video = await findOneVideo({ where: { id } })
  if (!video) throw new Error('El video no existe')
}
