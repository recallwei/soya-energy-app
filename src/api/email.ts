import { globalEnvConfig } from '@/env'
import type { R, SendEmailModel } from '@/types'

import httpRequest from './axios'

export class EmailAPI {
  private static EMAIL_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/email`

  static sendCode(params: SendEmailModel) {
    return httpRequest.post<R<any>>(`${this.EMAIL_API_PREFIX}/send-email-code`, {
      ...params
    })
  }
}
