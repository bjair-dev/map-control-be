import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface PackageAttributes {
  id?: number
  created?: Date
  package_content_type_id?: number
  created_by?: number
  questionId?: number
  tipId?: number
  videoId?: number
  challengeId?: number
  package_header_Id?: number
  state?: boolean

  '$package_header.id$'?: number
}
export interface PackageModel extends Model<PackageAttributes>, PackageAttributes {}
export class Package extends Model<PackageModel, PackageAttributes> {}

export type PackageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PackageModel
}

export function PackageFactory(sequelize: Sequelize): PackageStatic {
  return <PackageStatic>sequelize.define(
    'package',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'package',
      timestamps: false,
    }
  )
}
