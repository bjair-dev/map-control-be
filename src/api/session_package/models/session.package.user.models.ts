import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface SessionPackageUserAttributes {
  userId?: number
  sessionPackageId?: number
  created: Date
  updated: Date
  state?: boolean
}
export interface SessionPackageUserModel extends Model<SessionPackageUserAttributes>, SessionPackageUserAttributes {}
export class SessionPackageUser extends Model<SessionPackageUserModel, SessionPackageUserAttributes> {}

export type SessionPackageUserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SessionPackageUserModel
}

export function SessionPackageUserFactory(sequelize: Sequelize): SessionPackageUserStatic {
  return <SessionPackageUserStatic>sequelize.define(
    'session_package_user',
    {
      created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'session_package_user',
      timestamps: false,
    }
  )
}
