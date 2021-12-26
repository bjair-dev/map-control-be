import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface PackageTypeAttributes {
  id?: number
  type?: string
}
export interface PackageTypeModel extends Model<PackageTypeAttributes>, PackageTypeAttributes {}
export class PackageType extends Model<PackageTypeModel, PackageTypeAttributes> {}

export type PackageTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PackageTypeModel
}

export function PackageTypeFactory(sequelize: Sequelize): PackageTypeStatic {
  return <PackageTypeStatic>sequelize.define(
    'package_type',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'package_type',
      timestamps: false,
    }
  )
}
