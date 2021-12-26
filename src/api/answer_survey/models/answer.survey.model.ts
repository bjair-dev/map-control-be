import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface AnswerSurveyAttributes {
  id?: number
  answer?:string
  userId?: number
  surveyId?: number
  created?: Date
  state?: boolean 
}
export interface AnswerSurveyModel extends Model<AnswerSurveyAttributes>, AnswerSurveyAttributes {}
export class AnswerSurvey extends Model<AnswerSurveyModel, AnswerSurveyAttributes> {}

export type AnswerSurveyStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AnswerSurveyModel
}

export function AnswerSurveyFactory(sequelize: Sequelize): AnswerSurveyStatic {
  return <AnswerSurveyStatic>sequelize.define(
    'answer_survey',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      answer: {
        type: DataTypes.STRING(700),
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
     
    },
    {
      initialAutoIncrement: '1',
      tableName: 'answer_survey',
      timestamps: false
    }
  )
}
