import { DataBase } from '../../../../database'
import { PackageContentTypeAttributes } from '../../models/package.content.type.model'

export const findOneContentType = async ({
  where,
}: {
  where?: PackageContentTypeAttributes
}): Promise<PackageContentTypeAttributes | null> => {
  try {
    const type = await DataBase.instance.packageContentType.findOne({
      where,
    })
    if (type) return type.get({ plain: true })
    return type
  } catch (err) {
    throw err
  }
}
export const findAllContentType = async () => {
  try {
    return await DataBase.instance.packageContentType.findAll()
  } catch (err) {
    throw err
  }
}
