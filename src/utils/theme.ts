import AsyncStorage from '@react-native-async-storage/async-storage'

export class ThemeUtils {
  private static readonly THEME_KEY = '@THEME_KEY'

  static getTheme() {
    return AsyncStorage.getItem(this.THEME_KEY)
  }

  static setTheme(theme: string) {
    return AsyncStorage.setItem(this.THEME_KEY, theme)
  }

  static removeTheme() {
    return AsyncStorage.removeItem(this.THEME_KEY)
  }
}
