import { PackageStatic } from '../../api/package/models/package.model'
import { PackageTypeStatic } from '../../api/package/models/package.type.model'
import { QuestionStatic } from '../../api/question/models/question.model'
import { TipStatic } from '../../api/tip/models/tip.model'
import { VideoStatic } from '../../api/videos/models/video.model'
import { PackageContentTypeStatic } from '../../api/package/models/package.content.type.model'
import { PackageHeaderStatic } from '../../api/package/models/package_header.model'
import { ChallengeStatic } from '../../api/challenge/models/challenge.model'

export const packageTypeHasManyPackageHeader = ({
  packageheader,
  package_type,
}: {
  packageheader: PackageHeaderStatic
  package_type: PackageTypeStatic
}): void => {
  package_type.hasMany(packageheader, {
    foreignKey: { name: 'package_type_id', allowNull: false },
    sourceKey: 'id',
  })
  packageheader.belongsTo(package_type, {
    foreignKey: { name: 'package_type_id', allowNull: false },
    targetKey: 'id',
  })
}
export const questionHasManyPackage = ({
  _package,
  question,
}: {
  _package: PackageStatic
  question: QuestionStatic
}): void => {
  question.hasMany(_package, {
    foreignKey: { name: 'questionId', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  _package.belongsTo(question, {
    foreignKey: { name: 'questionId', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}
export const TipHasManyPackage = ({
  _package,
  tip,
}: {
  _package: PackageStatic
  tip: TipStatic
}): void => {
  tip.hasMany(_package, {
    foreignKey: { name: 'tipId', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  _package.belongsTo(tip, {
    foreignKey: { name: 'tipId', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

//*@DESC  VIDEO HAS MANY PACKAGE
export const VideoHasManyPackage = ({
  _package,
  video,
}: {
  _package: PackageStatic
  video: VideoStatic
}): void => {
  video.hasMany(_package, {
    foreignKey: { name: 'videoId', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  _package.belongsTo(video, {
    foreignKey: { name: 'videoId', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

//*@DESC  POLL HAS MANY PACKAGE
export const challengeHasManyPackage = ({
  _package,
  challenge,
}: {
  _package: PackageStatic
  challenge: ChallengeStatic
}): void => {
  challenge.hasMany(_package, {
    foreignKey: { name: 'challengeId', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  _package.belongsTo(challenge, {
    foreignKey: { name: 'challengeId', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

export const contentTypeHasManyPackageHeader = ({
  _package,
  contentType,
}: {
  _package: PackageStatic
  contentType: PackageContentTypeStatic
}): void => {
  contentType.hasMany(_package, {
    foreignKey: { name: 'package_content_type_id', allowNull: true },
    sourceKey: 'id',
  })
  _package.belongsTo(contentType, {
    foreignKey: { name: 'package_content_type_id', allowNull: true },
    targetKey: 'id',
  })
}

export const packageHeaderHasManyPackage = ({
  packageheader,
  _package,
}: {
  packageheader: PackageHeaderStatic
  _package: PackageStatic
}): void => {
  packageheader.hasMany(_package, {
    foreignKey: { name: 'package_header_Id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  _package.belongsTo(packageheader, {
    foreignKey: { name: 'package_header_Id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}
