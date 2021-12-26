import { DataBase } from '../../../../database'
import moment from 'moment'
import { PackageHeaderAttributes } from '../../models/package_header.model'
import { findOneGlobalVar } from '../../../global/services/find/global'
export const createPackageHeader = async ({
  package_header,
}: {
  package_header: PackageHeaderAttributes
}) => {
  try {
    const global = await findOneGlobalVar('package_header_image_default')
    return await DataBase.instance.packageHeader.create({
      created: moment().toDate(),
      ...package_header,
      path: global?.value,
    })
  } catch (err) {
    throw err
  }
}
//'Día ' + date + ': ' + name,
