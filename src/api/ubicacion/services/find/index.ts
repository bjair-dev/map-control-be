import { FindAttributeOptions, WhereOptions } from 'sequelize/types'
import { DataBase } from '../../../../database'
import { UbicacionTypeAttributes } from '../../models/ubicacion.model.model'
export const findOneUbicacion = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<UbicacionTypeAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const role = await await DataBase.instance.ubicacion.findOne({
      where,
      attributes,
    })
    if (role) return role.get({ plain: true })
    return role
  } catch (err) {
    throw err
  }
}
export const findAllUbicacion = async () => {
  try {
    return await DataBase.instance.ubicacion.findAll()
  } catch (err) {
    throw err
  }
}
