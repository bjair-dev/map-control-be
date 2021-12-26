import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface PackageHeaderAttributes {
  id?: number
  package_type_id?: number
  name?: string
  date?: Date | number | string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: number
  path?: string
  outstanding?: number

  '$package_type.id$'?: number
}

export interface PackageHeaderModel
  extends Model<PackageHeaderAttributes>,
    PackageHeaderAttributes {}
export class PackageHeader extends Model<PackageHeaderModel, PackageHeaderAttributes> {}

export type PackageHeaderStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PackageHeaderModel
}

export function PackageHeaderFactory(sequelize: Sequelize): PackageHeaderStatic {
  return <PackageHeaderStatic>sequelize.define(
    'package_header',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      outstanding: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      state: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      path: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'package_header',
      timestamps: false,
    }
  )
}
