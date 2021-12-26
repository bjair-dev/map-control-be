import { findOneChallenge } from '../services/find/index'
export const existsChallenge = async (id: number) => {
  const challenge = await findOneChallenge({
    where: {
      id,
      state: true,
    },
  })
  if (!challenge) throw new Error('No existe el Id')
}
