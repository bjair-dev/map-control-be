import { DataBase } from '../../../../database'
import { PackageAttributes } from '../../models/package.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions, literal } from 'sequelize'

export const findOnePackage = async ({
  where,
  attributes,
}: {
  where: WhereOptions<PackageAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const _package = await DataBase.instance.package.findOne({
      where,
      attributes,
    })
    if (_package) return _package.get({ plain: true })
    return _package
  } catch (err) {
    throw err
  }
}

export const CountPackage = async ({
  where,
}: {
  where: WhereOptions<PackageAttributes>
}) => {
  try {
    const _package = await DataBase.instance.package.count({
      where,
    })
    return _package
  } catch (err) {
    throw err
  }
}

export const findAllPackage = async ({
  package_header_id,
}: {
  package_header_id: number
}) => {
  try {
    const { count, rows } = await DataBase.instance.package.findAndCountAll({
      attributes: {
        include: ['id'],
        exclude: [
          'package_header_Id',
          'created_by',
          'updated_by',
          'questionId',
          'tipId',
          'videoId',
          'package_content_type_id',
          'challengeId',
        ],
      },
      include: [
        {
          model: DataBase.instance.packageHeader,
          as: 'package_header',
          required: true,
          attributes: {
            include: ['id', 'name', 'date'],
            exclude: [
              'created',
              'updated',
              'created_by',
              'updated_by',
              'state',
              'package_type_id',
            ],
          },
          include: [
            {
              model: DataBase.instance.packageType,
              as: 'package_type',
              required: true,
              attributes: ['id', 'type'],
            },
          ],
        },
        {
          model: DataBase.instance.packageContentType,
          as: 'package_content_type',
          required: true,
          attributes: ['id', 'type'],
        },
        {
          model: DataBase.instance.video,
          as: 'video',
          required: false,
          attributes: {
            include: [
              'id',
              'title',
              'created',
              'updated',
              'key_video',
              'path',
              'path_video',
              'description',
            ],
            exclude: [
              'key',
              'size',
              'size_video',
              'created_by',
              'updated_by',
              'state',
              'video_category_id',
            ],
          },
          include: [
            {
              model: DataBase.instance.videoCategory,
              as: 'video_category',
              required: true,
              attributes: ['id', 'category'],
            },
          ],
        },
        {
          model: DataBase.instance.question,
          as: 'question',
          required: false,
          attributes: {
            include: [
              'id',
              'question',
              'tip',
              'motivation',
              'created',
              'updated',
              'path',
            ],
            exclude: [
              'key',
              'size',
              'created_by',
              'updated_by',
              'question_type_id',
              'state',
            ],
          },
          include: [
            {
              model: DataBase.instance.questionType,
              as: 'question_type',
              required: true,
              attributes: {
                include: ['id', 'type'],
                exclude: ['created', 'updated', 'state'],
              },
            },
            {
              model: DataBase.instance.questionCategory,
              as: 'question_category',
              required: true,
              attributes: ['id', 'category'],
            },
          ],
        },
        {
          model: DataBase.instance.tip,
          as: 'tip',
          required: false,
          attributes: {
            include: ['id', 'title', 'tip', 'motivation', 'created', 'updated', 'path'],
            exclude: [
              'key',
              'size',
              'created_by',
              'updated_by',
              'state',
              'tip_category_id',
            ],
          },
          include: [
            {
              model: DataBase.instance.tipCategory,
              as: 'tip_category',
              required: true,
              attributes: ['id', 'category'],
            },
          ],
        },
        {
          model: DataBase.instance.challenge,
          as: 'challenge',
          required: false,
          attributes: {
            include: [
              'id',
              'title',
              'question',
              'description',
              'created',
              'updated',
              'path',
            ],
            exclude: ['key', 'size', 'created_by', 'updated_by', 'state'],
          },
        },
      ],
      where: {
        '$package_header.id$': package_header_id,
        state:true
      },
      order: [['id', 'DESC']],
    })
    return { count, rows }
  } catch (err) {
    throw err
  }
}
export const listOfTipToUse = async ({
  package_header_id,
}: {
  package_header_id: number
}) => {
  try {
    return await DataBase.instance.tip.findAll({
      attributes: {
        include: [
          [
            literal(`(
            SELECT pack.id from package as pack
            Where  pack.tipId = tip.id
            and pack.package_content_type_id = 3
            and pack.package_header_id = ${package_header_id}

          )`),
            'package',
          ],
        ],
        exclude: [
          'motivation',
          // 'tip',
          'created',
          'updated',
          'key',
          'size',
          'created_by',
          'updated_by',
          'state',
          'tip_category_id',
        ],
      },
      where: {
        state: 1,
      },
      having: literal(`package IS NULL`),
      order: [['id', 'ASC']],
    })
  } catch (err) {
    throw err
  }
}
export const listOfVideoToUse = async ({
  package_header_id,
}: {
  package_header_id: number
}) => {
  try {
    return await DataBase.instance.video.findAll({
      attributes: {
        include: [
          [
            literal(`(
            SELECT pack.id from package as pack
            Where  pack.videoId = video.id
            and pack.package_content_type_id = 2
            and pack.package_header_id = ${package_header_id}

          )`),
            'package',
          ],
        ],
        exclude: [
          'description',
          'tip',
          'created',
          'updated',
          'key',
          'size',
          'created_by',
          'updated_by',
          'state',
          'video_category_id',
          'path_video',
          'key_video',
          'size_video',
        ],
      },
      where: {
        state: 1,
      },
      having: literal(`package IS NULL`),
      order: [['id', 'ASC']],
    })
  } catch (err) {
    throw err
  }
}
export const listOfQuestionToUse = async ({
  package_header_id,
}: {
  package_header_id: number
}) => {
  try {
    return await DataBase.instance.question.findAll({
      attributes: {
        include: [
          [
            literal(`(
            SELECT pack.id from package as pack
            Where  pack.questionId = question.id
            and pack.package_content_type_id = 1
            and pack.package_header_id = ${package_header_id}

          )`),
            'package',
          ],
        ],
        exclude: [
          'tip',
          'motivation',
          'created',
          'updated',
          'key',
          'size',
          'created_by',
          'updated_by',
          'state',
          'question_category_id',
          'question_type_id',
        ],
      },
      where: {
        state: 1,
      },
      having: literal(`package IS NULL`),
      order: [['id', 'ASC']],
    })
  } catch (err) {
    throw err
  }
}
export const listOfChallengeToUse = async ({
  package_header_id,
}: {
  package_header_id: number
}) => {
  try {
    return await DataBase.instance.challenge.findAll({
      attributes: {
        include: [
          [
            literal(`(
            SELECT pack.id from package as pack
            Where  pack.challengeId = challenge.id
            and pack.package_content_type_id = 4
            and pack.package_header_id = ${package_header_id} 

          )`),
            'package',
          ],
        ],
        exclude: [
          'title',
          'description',
          'created',
          'updated',
          'created_by',
          'updated_by',
          'state',
          'key',
          'size',
          'bottom',
        ],
      },
      where: {
        state: 1,
      },
      having: literal(`package IS NULL`),
      order: [['id', 'ASC']],
    })
  } catch (err) {
    throw err
  }
}


export const findPackageFilter = async ({
  where,
  attributes
}: {
  where: WhereOptions<PackageAttributes>
  attributes? : FindAttributeOptions
}):Promise<PackageAttributes[]> => {
  try {
    const data = DataBase.instance.package.findAll({
      where,
      attributes
    })
    return data
  } catch (err) {
    throw err
  }
}