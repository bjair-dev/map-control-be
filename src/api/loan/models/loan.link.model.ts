import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface LoanLinkAttributes {
  id?: number
  title?: string
  description?: string
  link_ref?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: number
}

export interface LoanLinkModel extends Model<LoanLinkAttributes>, LoanLinkAttributes {}

export class LoanLinkCategory extends Model<LoanLinkModel, LoanLinkAttributes> {}

export type LoanLinkStatic = typeof Model & { new (values?: object, options?: BuildOptions): LoanLinkModel }

export function LoanLinkFactory(sequelize: Sequelize): LoanLinkStatic {
  return <LoanLinkStatic>sequelize.define(
    'loan_link',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(800),
        allowNull: true,
      },
      link_ref: {
        type: DataTypes.STRING(45),
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
      tableName: 'loan_link',
      timestamps: false,
    }
  )
}
