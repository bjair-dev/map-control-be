import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface NotificationDateAttributes {
  id?: number
  title?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: boolean
}
export interface NotificationDateModel
  extends Model<NotificationDateAttributes>,
    NotificationDateAttributes {}
export class NotificationDate extends Model<NotificationDateModel, NotificationDateAttributes> {}

export type NotificationDateStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NotificationDateModel
}

export function NotificationDateFactory(sequelize: Sequelize): NotificationDateStatic {
  return <NotificationDateStatic>sequelize.define(
    'notification_date',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      day: {
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
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'notification_date',
      timestamps: false,
    }
  )
}
