import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface LoanLinkContentAttributes {
  id?: number
  id_loan_link?: number
  id_loan?: number
  created?: Date
  state?: number
}

export interface LoanLinkContentModel extends Model<LoanLinkContentAttributes>, LoanLinkContentAttributes {}

export class LoanLinkContentCategory extends Model<LoanLinkContentModel, LoanLinkContentAttributes> {}

export type LoanLinkContentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LoanLinkContentModel
}

export function LoanLinkContentFactory(sequelize: Sequelize): LoanLinkContentStatic {
  return <LoanLinkContentStatic>sequelize.define(
    'loan_link_content',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'loan_link_content',
      timestamps: false,
    }
  )
}
