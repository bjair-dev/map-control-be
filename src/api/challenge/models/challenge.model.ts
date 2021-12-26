import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface ChallengeAttributes {
  id?: number
  title?: string
  question?: string
  description?: string
  created?: Date
  updated?: Date
  path?: string
  key?: string
  size?: string
  created_by?: number
  updated_by?: number
  state?: number
  bottom?: number
  trigger?: string
  content_reference?: number
}
export interface ChallengeModel extends Model<ChallengeAttributes>, ChallengeAttributes {}
export class Challenge extends Model<ChallengeModel, ChallengeAttributes> {}

export type ChallengeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ChallengeModel
}

export function ChallengeFactory(sequelize: Sequelize): ChallengeStatic {
  return <ChallengeStatic>sequelize.define(
    'challenge',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      bottom: {
        type: DataTypes.STRING(50),
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
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      state: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      trigger: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      content_reference: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'challenge',
      timestamps: false,
    }
  )
}
