import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface SurveyAttributes {
  id?: number
  title?: string
  question?: string
  description?: string
  path?: string
  size?: string
  key?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: number
  survey_type_id?: number
}

export interface SurveyModel extends Model<SurveyAttributes>, SurveyAttributes {}
export class Survey extends Model<SurveyModel, SurveyAttributes> {}

export type SurveyStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SurveyModel
}

export function SurveyFactory(sequelize: Sequelize): SurveyStatic {
  return <SurveyStatic>sequelize.define(
    'survey',
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
      path: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING(150),
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
      tableName: 'survey',
      timestamps: false,
    }
  )
}
