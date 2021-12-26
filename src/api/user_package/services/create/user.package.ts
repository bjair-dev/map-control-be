import { DataBase } from '../../../../database'
import moment from 'moment'
import { UserPackageAttributes } from '../../models/user.package.model'

export const createUserPackage = async ({
  user_package,
}: {
  user_package: UserPackageAttributes
}) => {
  try {
    return await DataBase.instance.userPackage.create({
      created:moment().toDate(),
      ...user_package,
    })
  } catch (err) {
    throw err
  }
}
