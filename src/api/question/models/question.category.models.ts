import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface QuestionCategoryAttributes {
  id?: number
  category?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
}
export interface QuestionCategoryModel
  extends Model<QuestionCategoryAttributes>,
    QuestionCategoryAttributes {}
export class QuestionCategory extends Model<
  QuestionCategoryModel,
  QuestionCategoryAttributes
> {}

export type QuestionCategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): QuestionCategoryModel
}

export function QuestionCategoryFactory(sequelize: Sequelize): QuestionCategoryStatic {
  return <QuestionCategoryStatic>sequelize.define(
    'question_category',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING(100),
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
    },
    {
      initialAutoIncrement: '1',
      tableName: 'question_category',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['category'],
        },
      ],
    }
  )
}
