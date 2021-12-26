import { DataBase } from '../../../../database'
import { PackageHeaderAttributes } from '../../models/package_header.model'
export const findOnePackageHeader = async ({
  where,
}: {
  where?: PackageHeaderAttributes
}): Promise<PackageHeaderAttributes | null> => {
  try {
    const header = await DataBase.instance.packageHeader.findOne({ where })
    if (header) return header.get({ plain: true })
    return header
  } catch (err) {
    throw err
  }
}
export const findAllPackageHeader = async ({
  where,
  page,
}: {
  where?: PackageHeaderAttributes
  page: number
}) => {
  try {
    const limit: number = 10
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.packageHeader.findAndCountAll({
      attributes: {
        exclude: ['created_by', 'updated_by', 'state'],
      },
      where,
      limit,
      offset,
      order: [['id', 'DESC']],
      include: [
        {
          model: DataBase.instance.packageType,
          as: 'package_type',
          attributes: ['id', 'type'],
          required: true,
        },
      ],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
