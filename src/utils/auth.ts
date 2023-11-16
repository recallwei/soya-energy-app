import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserRole } from '@/enums'

export class AuthUtils {
  private static readonly ACCESS_TOKEN_KEY = '@ACCESS_TOKEN'

  private static readonly ACCOUNT_REMEMBER_PASSWORD_KEY = '@ACCOUNT_REMEMBER_PASSWORD'

  private static readonly ROLE_KEY = '@ROLE'

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

  static getAccountRememberPassword() {
    return AsyncStorage.getItem(this.ACCOUNT_REMEMBER_PASSWORD_KEY)
  }

  static setAccountRememberPassword(data: string) {
    return AsyncStorage.setItem(this.ACCOUNT_REMEMBER_PASSWORD_KEY, data)
  }

  static removeAccountRememberPassword() {
    return AsyncStorage.removeItem(this.ACCOUNT_REMEMBER_PASSWORD_KEY)
  }

  static async getRole() {
    try {
      const role = await AsyncStorage.getItem(this.ROLE_KEY)
      return role
    } catch {
      return null
    }
  }

  static setRole(role: string) {
    return AsyncStorage.setItem(this.ROLE_KEY, role)
  }

  static removeRole() {
    return AsyncStorage.removeItem(this.ROLE_KEY)
  }

  static async isInstaller() {
    const role = await this.getRole()
    if (!role) return false
    return role === UserRole.INSTALLER.toString()
  }

  static async isUser() {
    const role = await this.getRole()
    if (!role) return false
    return role === UserRole.USER.toString()
  }
}
