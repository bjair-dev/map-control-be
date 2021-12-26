import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface QuestionSessionPackageAttributes {
  questionId?: number
  sessionPackageId?: number
  created?: Date
  updated?: Date
  state?: boolean
}
export interface QuestionSessionPackageModel
  extends Model<QuestionSessionPackageAttributes>,
    QuestionSessionPackageAttributes {}
export class QuestionSessionPackage extends Model<QuestionSessionPackageModel, QuestionSessionPackageAttributes> {}

export type QuestionSessionPackageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): QuestionSessionPackageModel
}

export function QuestionSessionPackageFactory(sequelize: Sequelize): QuestionSessionPackageStatic {
  return <QuestionSessionPackageStatic>sequelize.define(
    'question_session_package',
    {
      created: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: 'question_session_package',
      timestamps: false,
    }
  )
}
