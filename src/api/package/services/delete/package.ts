import { DataBase } from '../../../../database'
import { PackageAttributes } from '../../models/package.model'
import { WhereOptions } from 'sequelize'

export const deletePackage = async ({
  where,
}: {
  where: WhereOptions<PackageAttributes>
}) => {
  try {
    return await DataBase.instance.package.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}
