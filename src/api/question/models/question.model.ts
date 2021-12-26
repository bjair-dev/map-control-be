import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface QuestionAttributes {
  id?: number
  question: string
  question_type_id?: number
  tip?: string //*@DESC repregunta
  motivation?: string
  path?: string
  key?: string
  size?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: boolean
  question_category_id?: number

  '$question_type.id$'?: string
  '$question_type.state$'?: boolean
}
export interface QuestionModel extends Model<QuestionAttributes>, QuestionAttributes {}
export class Question extends Model<QuestionModel, QuestionAttributes> {}

export type QuestionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): QuestionModel
}

export function QuestionFactory(sequelize: Sequelize): QuestionStatic {
  return <QuestionStatic>sequelize.define(
    'question',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      tip: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      motivation: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
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
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
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
      tableName: 'question',
      timestamps: false,
    }
  )
}
