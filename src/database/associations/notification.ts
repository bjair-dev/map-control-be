import { NotificationStatic } from '../../api/notification/models/notification.model'
import { UserNotificationStatic } from '../../api/user_notification/models/user.notification.model'


export const notificationHasManyUserNotification = ({
  notification,
  userNotification,
}: {
  notification: NotificationStatic
  userNotification: UserNotificationStatic
}): void => {
  notification.hasMany(userNotification, {
    foreignKey: { name: 'notificationId' },
    sourceKey: 'id',
  })
  userNotification.belongsTo(notification, {
    foreignKey: { name: 'notificationId' },
    targetKey: 'id',
  })
}
