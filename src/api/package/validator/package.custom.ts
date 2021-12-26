import { findOnePackageType } from '../services/find/package.type'
import { PackageTypeAttributes } from '../models/package.type.model'
import { findOneContentType } from '../services/find/content.type'
import { findOnePackageHeader } from '../services/find/package.header'
import { findOnePackage } from '../services/find/package'

export const existsPackageType = async (id: number) => {
  const type: PackageTypeAttributes | null = await findOnePackageType({ where: { id } })
  if (!type) throw new Error('¡No existe ese tipo de paquete!')
}
export const existsPackageContentType = async (id: number) => {
  const type = await findOneContentType({ where: { id } })
  if (!type) throw new Error('¡No existe ese tipo de contenido del paquete!')
}
export const yesExistsDateOfPachakeHeader = async (date: string) => {
  const type = await findOnePackageHeader({ where: { date } })
  if (type) throw new Error('¡Ya existe el dia se sesión!')
}
export const existsPackageHeader = async (id: number) => {
  const pHeader = await findOnePackageHeader({ where: { id } })
  if (!pHeader) throw new Error('¡No existe el Id!')
}

export const existsPackage = async (id: number) => {
  const _package = await findOnePackage({ where: { id } })
  if (!_package) throw new Error('¡No existe el Id!')
}
