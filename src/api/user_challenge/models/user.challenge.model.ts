import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface UserChallengeAttributtes {
  id?: number
  userId?: number
  challengeId?: number
  status?: string
  send_date?: Date
  acepted_date?: Date
  completed_date?: Date
}

export interface UserChallengeModel extends Model<UserChallengeAttributtes>, UserChallengeAttributtes {}
export class UserChallenge extends Model<UserChallengeModel, UserChallengeAttributtes> {}

export type UserChallengeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserChallengeModel
}

export function UserChalengeFactory(sequelize: Sequelize): UserChallengeStatic {
  return <UserChallengeStatic>sequelize.define(
    'user_challenge',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      challengeId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: 'enviado',
      }, //enviado  - aceptado - completado
      send_date: {
        //fecha al momento de crear el registro
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      acepted_date: {
        //fecha al momento que el usuario acepto el desafío
        type: DataTypes.DATE,
      },
      completed_date: {
        //fecha cuando el usuario termina el desafío
        type: DataTypes.DATE,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'user_challenge',
      timestamps: false,
    }
  )
}
