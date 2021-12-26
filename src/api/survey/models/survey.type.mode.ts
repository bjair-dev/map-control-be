import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface SurveyTypeAttributes {
  id?: number
  type?: string
}

export interface SurveyTypeModel
  extends Model<SurveyTypeAttributes>,
    SurveyTypeAttributes {}
export class SurveyType extends Model<SurveyTypeModel, SurveyTypeAttributes> {}

export type SurveyTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SurveyTypeModel
}

export function SurveyTypeFactory(sequelize: Sequelize): SurveyTypeStatic {
  return <SurveyTypeStatic>sequelize.define(
    'survey_type',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'survey_type',
      timestamps: false,
    }
  )
}
