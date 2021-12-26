import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface LoanAttributes {
  id?: number
  description?: string
  url?: string
  tea?:number
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: number
  loan_type_id?: number
  bankId?: number
  title?:string
  requirement?:string
}
export interface LoanModel extends Model<LoanAttributes>, LoanAttributes {}
export class LoanCategory extends Model<LoanModel, LoanAttributes> {}

export type LoanStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LoanModel
}

export function LoanFactory(sequelize: Sequelize): LoanStatic {
  return <LoanStatic>sequelize.define(
    'loan',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      tea: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      requirement:{
        type: DataTypes.STRING(200),
        allowNull:false
      },
      url: {
        type: DataTypes.STRING(300),
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
      tableName: 'loan',
      timestamps: false,
    }
  )
}
