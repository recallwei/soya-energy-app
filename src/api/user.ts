import { globalEnvConfig } from '@/env'

import httpRequest from './axios'

export class UserAPI {
  private static USER_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/me`

  /**
   * 用户信息
   */
  static me() {
    return httpRequest.get(`${this.USER_API_PREFIX}/me`)
  }
}
