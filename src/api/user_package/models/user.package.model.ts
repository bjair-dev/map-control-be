import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface UserPackageAttributes {
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

export interface UserPackageModel extends Model<UserPackageAttributes>, UserPackageAttributes {}
export class UserPackage extends Model<UserPackageModel, UserPackageAttributes> {}

export type UserPackageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserPackageModel
}

export function UserPackageFactory(sequelize: Sequelize): UserPackageStatic {
  return <UserPackageStatic>sequelize.define(
    'user_package',
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
      },//visto - terminado
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
      tableName: 'user_package',
      timestamps: false,
    }
  )
}
