import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface MetricsAttributes {
  id?: number
  actionId?:number
  contentId?: number
  date?: Date
  userId?: number
  state?: boolean 
  created?:Date
  usetime?: number
}
export interface MetricsModel extends Model<MetricsAttributes>, MetricsAttributes {}
export class Metrics extends Model<MetricsModel, MetricsAttributes> {}

export type MetricsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MetricsModel
}

export function MetricsFactory(sequelize: Sequelize): MetricsStatic {
  return <MetricsStatic>sequelize.define(
    'metrics',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contentId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      actionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        // allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      usetime: {
        type: DataTypes.NUMBER,
        defaultValue: 1,
        // allowNull:true
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'metrics',
      timestamps: false
    }
  )
}
