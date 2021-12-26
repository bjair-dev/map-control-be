import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface PackageContentTypeAttributes {
  id?: number
  type?: string
}
export interface PackageContentTypeModel
  extends Model<PackageContentTypeAttributes>,
    PackageContentTypeAttributes {}
export class PackageContentType extends Model<
  PackageContentTypeModel,
  PackageContentTypeAttributes
> {}

export type PackageContentTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PackageContentTypeModel
}

export function PackageContentTypeFactory(sequelize: Sequelize): PackageContentTypeStatic {
  return <PackageContentTypeStatic>sequelize.define(
    'package_content_type',
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
      tableName: 'package_content_type',
      timestamps: false,
    }
  )
}
