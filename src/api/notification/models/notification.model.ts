import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface NotificationAttributes {
  id?: number
  title?: string
  content_id?: number
  content_type?: number
  filtros?: string
  filtros_opcionales?: string
  mensaje_personalizado?: string
  select_day?: number
  value?: Date | string
  estado_notificacion?: number
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
  state?: boolean
}
export interface NotificationModel extends Model<NotificationAttributes>, NotificationAttributes {}
export class Notification extends Model<NotificationModel, NotificationAttributes> {}

export type NotificationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NotificationModel
}

export function NotificationFactory(sequelize: Sequelize): NotificationStatic {
  return <NotificationStatic>sequelize.define(
    'notification',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      filtros: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      filtros_opcionales: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mensaje_personalizado: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      select_day: {
        type: DataTypes.INTEGER, //1. Dia de sesion, 2. fecha
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(100), // día de sesion ó fecha de lanzamiento
        allowNull: false,
      },
      estado_notificacion: {
        type: DataTypes.INTEGER, // 1 pendiente, 2 enviado
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
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'notification',
      timestamps: false,
    }
  )
}
