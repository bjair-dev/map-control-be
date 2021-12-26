import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface QuestionTypeAttributes {
  id?: number
  type: string
  created: Date
  updated: Date
  state: boolean
}
export interface QuestionTypeModel extends Model<QuestionTypeAttributes>, QuestionTypeAttributes {}
export class QuestionType extends Model<QuestionTypeModel, QuestionTypeAttributes> {}

export type QuestionTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): QuestionTypeModel
}

export function QuestionTypeFactory(sequelize: Sequelize): QuestionTypeStatic {
  return <QuestionTypeStatic>sequelize.define(
    'question_type',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(20), //agress - entry
        allowNull: false,
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
      tableName: 'question_type',
      timestamps: false,
    }
  )
}
