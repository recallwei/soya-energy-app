import { globalEnvConfig } from '@/env'
import type { Device, DevicePageModel, Page, R } from '@/types'

import httpRequest from './axios'

export class DeviceAPI {
  private static DEVICE_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/user`

  static LIST_QUERY_KEY = 'DEVICE_LIST'

  static list(params: DevicePageModel) {
    return httpRequest.get<R<Page<Device>>>(`${this.DEVICE_API_PREFIX}/list-device`, {
      ...params
    })
  }

  static detail(id: string) {
    return httpRequest.get<R<Device>>(`${this.DEVICE_API_PREFIX}/detail-device`, { id })
  }
}
