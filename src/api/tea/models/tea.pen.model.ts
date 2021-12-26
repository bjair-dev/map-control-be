import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TeaPenAttributes {
  id?: number
  min?: number
  max?: number
  updated?: Date
  created?: Date
  created_by?: number
  updated_by?: number
  loanId?: number
}
export interface TeaPenModel extends Model<TeaPenAttributes>, TeaPenAttributes {}
export class TeaPenCategory extends Model<TeaPenModel, TeaPenAttributes> {}

export type TeaPenStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TeaPenModel
}

export function TeaPenFactory(sequelize: Sequelize): TeaPenStatic {
  return <TeaPenStatic>sequelize.define(
    'tea_pen',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      min: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max: {
        type: DataTypes.INTEGER,
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
      tableName: 'tea_pen',
      timestamps: false,
    }
  )
}
