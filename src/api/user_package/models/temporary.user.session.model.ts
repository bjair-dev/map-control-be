import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TemporaryUserSessionAttributes {
  id?: number
  userId?: number
  user_session_day?: number
//   created?: Date
}

export interface TemporaryUserSessionModel extends Model<TemporaryUserSessionAttributes>, TemporaryUserSessionAttributes {}
export class TemporaryUserSession extends Model<TemporaryUserSessionModel, TemporaryUserSessionAttributes> {}

export type TemporaryUserSessionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TemporaryUserSessionModel
}

export function TemporaryUserSessionFactory(sequelize: Sequelize): TemporaryUserSessionStatic {
  return <TemporaryUserSessionStatic>sequelize.define(
    'temporary_user_session',
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
    //   created: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    //   },
     
    },
    {
      initialAutoIncrement: '1',
      tableName: 'temporary_user_session',
      timestamps: false,
    }
  )
}
