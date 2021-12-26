import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface LoanTypeAttributes {
  id?: number
  type?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
}
export interface LoanTypeModel extends Model<LoanTypeAttributes>, LoanTypeAttributes {}
export class LoanTypeCategory extends Model<LoanTypeModel, LoanTypeAttributes> {}

export type LoanTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LoanTypeModel
}

export function LoanTypeFactory(sequelize: Sequelize): LoanTypeStatic {
  return <LoanTypeStatic>sequelize.define(
    'loan_type',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(100),
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
    },
    {
      initialAutoIncrement: '1',
      tableName: 'loan_type',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['type'],
        },
      ],
    }
  )
}
