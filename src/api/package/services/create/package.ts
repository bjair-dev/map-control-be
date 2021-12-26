import { DataBase } from '../../../../database'
import moment from 'moment'
import { PackageAttributes } from '../../models/package.model'

export const createPackage = async ({
  adminId,
  _package,
}: {
  _package: PackageAttributes
  adminId: number
}) => {
  try {
    return await DataBase.instance.package.create({
      created: moment.utc().toDate(),
      created_by: adminId,
      questionId: _package.questionId,
      tipId: _package.tipId,
      videoId: _package.videoId,
      challengeId: _package.challengeId,
      package_header_Id: _package.package_header_Id,
      package_content_type_id: _package.package_content_type_id,
    })
  } catch (err) {
    throw err
  }
}
