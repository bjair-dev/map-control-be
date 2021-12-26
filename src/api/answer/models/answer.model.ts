import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface AnswerAttributes {
  id?: number
  answered?:boolean
  userId?: number
  questionId?: number
  created?: Date
  state?: boolean 
  question21?: boolean
}
export interface AnswerModel extends Model<AnswerAttributes>, AnswerAttributes {}
export class Answer extends Model<AnswerModel, AnswerAttributes> {}

export type AnswerStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AnswerModel
}

export function AnswerFactory(sequelize: Sequelize): AnswerStatic {
  return <AnswerStatic>sequelize.define(
    'answer',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      answered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        // allowNull: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
        // allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      question21: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'answer',
      timestamps: false
    }
  )
}
