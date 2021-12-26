import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'
import { SurveyAttributes } from './survay.model'

export interface SurveyContentAttributes {
  id?: number
  content?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: number
  surveyId?: number
  survey?: SurveyAttributes
}

export interface SurveyContentModel
  extends Model<SurveyContentAttributes>,
    SurveyContentAttributes {}
export class SurveyContent extends Model<SurveyContentModel, SurveyContentAttributes> {}

export type SurveyContentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SurveyContentModel
}

export function SurveyContentFactory(sequelize: Sequelize): SurveyContentStatic {
  return <SurveyContentStatic>sequelize.define(
    'survey_content',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
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
      state: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'survey_content',
      timestamps: false,
    }
  )
}
