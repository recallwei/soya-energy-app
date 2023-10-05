import AsyncStorage from '@react-native-async-storage/async-storage'

export class AuthUtils {
  private static readonly ACCESS_TOKEN_KEY = 'access_token'

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem(this.ACCESS_TOKEN_KEY)
      return token
    } catch {
      return null
    }
  }

  static async setToken(token: string) {
    try {
      await AsyncStorage.setItem(this.ACCESS_TOKEN_KEY, token)
    } catch {
      //
    }
  }

  static async removeToken() {
    try {
      await AsyncStorage.removeItem(this.ACCESS_TOKEN_KEY)
    } catch {
      //
    }
  }

  static async isLogin() {
    return !!(await this.getToken())
  }
}
