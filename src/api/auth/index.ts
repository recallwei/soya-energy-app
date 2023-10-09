import { globalEnvConfig } from '@/env'
import type { LoginInput } from '@/types'

import Request from '../axios'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/raipiot-auth/oauth`

  /**
   * 登录
   */
  static login(params: LoginInput) {
    return Request.post<{
      access_token: string
      error_code?: string
      error_description?: string
    }>(
      `${this.AUTH_API_PREFIX}/token`,
      {},
      {
        params: {
          ...params,
          tenantId: '000000',
          grant_type: 'password',
          scope: 'all',
          type: 'account'
        }
      }
    )
  }

  /**
   * 退出
   */
  static logout() {
    return Request.post(`${this.AUTH_API_PREFIX}/logout`)
  }
}
