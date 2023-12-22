import { globalEnvConfig } from '@/env'
import type { Battery, BatteryAnalysis, Page, PlantPageModel, R } from '@/types'

import httpRequest from './axios'

export class BatteryAPI {
  private static BATTERY_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/inverter`

  private static BATTERY_USER_API_PREFIX = `${globalEnvConfig.BASE_USER_API_URL}/inverter`

  static LIST_QUERY_KEY = 'BATTERY_LIST'

  static DETAIL_QUERY_KEY = 'BATTERY_DETAIL'

  static ANALYSIS_QUERY_KEY = 'BATTERY_ANALYSIS'

  static list(params: PlantPageModel) {
    return httpRequest.get<R<Page<Battery>>>(`${this.BATTERY_API_PREFIX}/list-by-page`, {
      ...params
    })
  }

  static detail(id: string) {
    return httpRequest.get<R<Battery>>(`${this.BATTERY_API_PREFIX}/query-battery-detail-by-id`, {
      id
    })
  }

  static analysis(id: string) {
    return httpRequest.get<R<BatteryAnalysis>>(
      `${this.BATTERY_USER_API_PREFIX}/query-battery-by-plant`,
      {
        id
      }
    )
  }
}
