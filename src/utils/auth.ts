import AsyncStorage from '@react-native-async-storage/async-storage'

export class AuthUtils {
  private static readonly ACCESS_TOKEN_KEY = 'access_token'

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem(this.ACCESS_TOKEN_KEY)
      return token
    } catch {
      return ''
    }
  }

  static setToken(token: string) {
    return AsyncStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }

  static removeToken() {
    return AsyncStorage.removeItem(this.ACCESS_TOKEN_KEY)
  }

  static async isLogin() {
    return !!(await this.getToken())
  }

  static async getAuthorization() {
    return `Bearer ${await this.getToken()}`
  }
}
