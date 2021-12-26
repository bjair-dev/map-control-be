import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface UserNotificationAttributes {
  id?: number
  // notificationsId?: string
  date?: Date
  userId?:number
  created?: Date
  state?: boolean
  status?:string
  notificationId?:number
}
export interface UserNotificationModel extends Model<UserNotificationAttributes>, UserNotificationAttributes {}
export class UserNotification extends Model<UserNotificationModel, UserNotificationAttributes> {}

export type UserNotificationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserNotificationModel
}

export function UserNotificationFactory(sequelize: Sequelize): UserNotificationStatic {
  return <UserNotificationStatic>sequelize.define(
    'user_notification',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // notificationsId: {
      //   type: DataTypes.STRING(700),
      // },
      status: {
        type:DataTypes.STRING, // enviado | terminado
        defaultValue:'enviado'
      },
      notificationId: {
        type:DataTypes.NUMBER, // enviado | terminado
        allowNull:false
      },
      
      date: {
        type: DataTypes.DATEONLY,
      },
      userId: {
        type: DataTypes.NUMBER,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'user_notification',
      timestamps: false,
    }
  )
}
