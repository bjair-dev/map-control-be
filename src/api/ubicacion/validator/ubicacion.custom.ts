import { findOneUbicacion } from '../services/find/index'

export const existsUbicacion = async (rolId: number) => {
  const role = await findOneUbicacion({
    where: { id: rolId },
  })
  if (!role) throw new Error('El departamentoId no existe')
}
