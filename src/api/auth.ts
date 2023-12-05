import { globalEnvConfig } from '@/env'
import type { LoginInputModel, R, Token } from '@/types'

import httpRequest from './axios'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/auth`

  /**
   * 登录
   * @description skipAuth 模拟登录
   */
  static login(data: LoginInputModel, skipAuth?: boolean): Promise<R<Token>> {
    if (skipAuth) {
      return new Promise((resolve) => {
        resolve({
          msg: '登录成功',
          data: {
            access_token: '123456',
            refresh_token: '123456'
          }
        })
      })
    }
    return httpRequest.post<R<Token>>(`${this.AUTH_API_PREFIX}/login`, data)
  }

  /**
   * 退出
   */
  static logout() {
    return httpRequest.post(`${this.AUTH_API_PREFIX}/logout`)
  }
}
