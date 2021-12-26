import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface TeaUsdAttributes {
  id?: number
  min?: number
  max?: number
  updated?: Date
  created?: Date
  created_by?: number
  updated_by?: number
  loanId?: number
}
export interface TeaUsdModel extends Model<TeaUsdAttributes>, TeaUsdAttributes {}
export class TeaUsdCategory extends Model<TeaUsdModel, TeaUsdAttributes> {}

export type TeaUsdStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TeaUsdModel
}

export function TeaUsdFactory(sequelize: Sequelize): TeaUsdStatic {
  return <TeaUsdStatic>sequelize.define(
    'tea_usd',
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
      tableName: 'tea_usd',
      timestamps: false,
    }
  )
}
