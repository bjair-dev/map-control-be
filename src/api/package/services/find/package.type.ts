import { DataBase } from '../../../../database'
import { PackageTypeAttributes } from '../../models/package.type.model'

export const findOnePackageType = async ({
  where,
}: {
  where?: PackageTypeAttributes
}): Promise<PackageTypeAttributes | null> => {
  try {
    const type = await DataBase.instance.packageType.findOne({
      where,
    })
    if (type) return type.get({ plain: true })
    return type
  } catch (err) {
    throw err
  }
}
export const findAllPackageType = async ({
  where,
}: {
  where?: PackageTypeAttributes
}): Promise<PackageTypeAttributes[]> => {
  try {
    return await DataBase.instance.packageType.findAll({
      where,
    })
  } catch (err) {
    throw err
  }
}
