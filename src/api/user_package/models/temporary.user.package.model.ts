import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TemporaryUserPackageAttributes {
  id?: number
  userId?: number
  package_header_Id?: number
  user_session_day?: number
  created?: Date
  status?:string
  date:string
  finish_date?:Date
  index?:number
}

export interface TemporaryUserPackageModel extends Model<TemporaryUserPackageAttributes>, TemporaryUserPackageAttributes {}
export class TemporaryUserPackage extends Model<TemporaryUserPackageModel, TemporaryUserPackageAttributes> {}

export type TemporaryUserPackageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TemporaryUserPackageModel
}

export function TemporaryUserPackageFactory(sequelize: Sequelize): TemporaryUserPackageStatic {
  return <TemporaryUserPackageStatic>sequelize.define(
    'temporary_user_package',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_session_day: {
        type: DataTypes.INTEGER,
        defaultValue:1,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      date: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(100),
        defaultValue: 'visto',
      },
      finish_date:{
        type:DataTypes.DATE,
        allowNull: true
      },
      package_header_Id:{
        type: DataTypes.INTEGER,
      },
      index:{
        type: DataTypes.INTEGER,
        defaultValue:0
      }
    },
    {
      initialAutoIncrement: '1',
      tableName: 'temporary_user_package',
      timestamps: false,
    }
  )
}
