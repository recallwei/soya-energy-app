import { globalEnvConfig } from '@/env'
import type { R, UserInfo } from '@/types'

import httpRequest from './axios'

export class UserAPI {
  private static USER_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/base`

  static ME_QUERY_KEY = 'ME'

  /**
   * 用户信息
   */
  static me() {
    return httpRequest.get<R<UserInfo>>(`${this.USER_API_PREFIX}/get-user-info`)
  }
}
