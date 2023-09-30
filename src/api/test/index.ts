import type { BaseResponse } from '@/types'

import Request from '../axios'

export class TestAPI {
  private static TEST_API_PREFIX = '/products'

  static getAll() {
    return Request.get<BaseResponse<any>>(this.TEST_API_PREFIX)
  }
}
