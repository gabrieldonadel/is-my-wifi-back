import { Platform } from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  onNotification: (notification) => {
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },
  requestPermissions: Platform.OS === 'ios',
  // iOS Only
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
})

// Android Only
PushNotification.createChannel({
  channelId: 'wifi-back',
  channelName: 'Is my WiFi Back?',
})
