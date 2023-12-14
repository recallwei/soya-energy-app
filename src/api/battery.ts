import { globalEnvConfig } from '@/env'
import type { Battery, Page, PlantPageModel, R } from '@/types'

import httpRequest from './axios'

export class BatteryAPI {
  private static BATTERY_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/inverter`

  static LIST_QUERY_KEY = 'INVERTER_LIST'

  static DETAIL_QUERY_KEY = 'INVERTER_DETAIL'

  static list(params: PlantPageModel) {
    return httpRequest.get<R<Page<Battery>>>(`${this.BATTERY_API_PREFIX}/list-battery`, {
      ...params
    })
  }

  static detail(id: string) {
    return httpRequest.get<R<Battery>>(`${this.BATTERY_API_PREFIX}/detail-battery`, { id })
  }

  static detailGroup(id: string) {
    return httpRequest.get<R<Battery>>(`${this.BATTERY_API_PREFIX}/detail-battery-by-group`, { id })
  }
}
