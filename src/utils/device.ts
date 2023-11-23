import { Dimensions, Linking, Platform } from 'react-native'

export class DeviceUtils {
  /**
   * 屏幕宽度
   */
  static SCREEN_WIDTH = Dimensions.get('window').width

  /**
   * 屏幕高度
   */
  static SCREEN_HEIGHT = Platform.select<number>({
    android: Dimensions.get('screen').height,
    ios: Dimensions.get('window').height
  }) as number

  /**
   * 打开应用设置
   */
  static openSettings() {
    Platform.select({
      ios: () => Linking.openURL('app-settings:'),
      android: () => Linking.openSettings()
    })?.()
  }
}
