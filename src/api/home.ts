import { globalEnvConfig } from '@/env'
import type { HomeDeviceStatistic, HomeStatistic, R } from '@/types'

import httpRequest from './axios'

export class HomeAPI {
  private static HOME_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/home`

  static STATISTIC_QUERY_KEY = 'HOME_STATISTIC'

  static DEVICE_STATISTIC_QUERY_KEY = 'HOME_DEVICE_STATISTIC'

  static statistic() {
    return httpRequest.get<R<HomeStatistic>>(`${this.HOME_API_PREFIX}/total`)
  }

  static deviceStatistic(type: string) {
    return httpRequest.get<R<HomeDeviceStatistic>>(`${this.HOME_API_PREFIX}/total-plant`, { type })
  }
}
