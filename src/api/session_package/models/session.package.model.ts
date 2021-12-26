import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface SessionPackageAttributes {
  id?: number
  title: string
  description: string
  created: Date
  updated: Date
  state?: boolean
}
export interface SessionPackageModel extends Model<SessionPackageAttributes>, SessionPackageAttributes {}
export class SessionPackage extends Model<SessionPackageModel, SessionPackageAttributes> {}

export type SessionPackageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SessionPackageModel
}

export function SessionPackageFactory(sequelize: Sequelize): SessionPackageStatic {
  return <SessionPackageStatic>sequelize.define(
    'session_package',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(280),
        allowNull: true,
      },
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
      tableName: 'session_package',
      timestamps: false,
    }
  )
}
