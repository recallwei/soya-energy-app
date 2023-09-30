import type { BaseResponse } from '@/types'

import Request from '../axios'

export class AuthAPI {
  private static AUTH_API_PREFIX = '/auth'

  static login() {
    return Request.post<BaseResponse<any>>(`${this.AUTH_API_PREFIX}/login`)
  }

  static signup() {
    return Request.post<BaseResponse<any>>(`${this.AUTH_API_PREFIX}/signup`)
  }
}
