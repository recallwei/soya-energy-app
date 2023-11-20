import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules, Platform } from 'react-native'

export class LangUtils {
  private static readonly LANG_KEY = '@LANG'

  private static readonly DEFAULT_LANG = 'en-US'

  static async getLang() {
    try {
      const lang = await AsyncStorage.getItem(this.LANG_KEY)
      return lang
    } catch {
      return ''
    }
  }

  static setLang(lang: string) {
    return AsyncStorage.setItem(this.LANG_KEY, lang)
  }

  static removeLang() {
    return AsyncStorage.removeItem(this.LANG_KEY)
  }

  static getDeviceLang() {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier

    if (!deviceLanguage) return this.DEFAULT_LANG
    if (deviceLanguage.includes('en')) {
      return 'en-US'
    }
    if (deviceLanguage.includes('zh')) {
      return 'zh-CN'
    }
    return this.DEFAULT_LANG
  }

  static async getDefaultLang() {
    return (await this.getLang()) ?? this.getDeviceLang()
  }
}
