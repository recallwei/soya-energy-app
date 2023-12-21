import { globalEnvConfig } from '@/env'
import type { Customer, R, UserInfo } from '@/types'

import httpRequest from './axios'

export class UserAPI {
  private static USER_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/base`

  static ME_QUERY_KEY = 'ME'

  static CUSTOMER_LIST_QUERY_KEY = 'CUSTOMER_LIST'

  /**
   * 用户信息
   */
  static me() {
    return httpRequest.get<R<UserInfo>>(`${this.USER_API_PREFIX}/get-user-info`)
  }

  /**
   * 获取安装商用户列表
   */
  static getUserList() {
    return httpRequest.get<R<Customer[]>>(`${this.USER_API_PREFIX}/list-user-info`)
  }
}
