import { globalEnvConfig } from '@/env'
import type { LoginInputModel } from '@/types'

import Request from './axios'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/raipiot-auth/oauth`

  /**
   * 登录
   * @description skipAuth 模拟登录
   */
  static login(params: LoginInputModel, skipAuth?: boolean) {
    if (skipAuth) {
      return new Promise((resolve) => {
        resolve({ access_token: '123456' })
      })
    }
    return Request.post<{
      access_token: string
      error_code?: string
      error_description?: string
    }>(`${this.AUTH_API_PREFIX}/token`, {}, { params })
  }

  /**
   * 退出
   */
  static logout() {
    return Request.post(`${this.AUTH_API_PREFIX}/logout`)
  }
}
