import { globalEnvConfig } from '@/env'
import type { Page, Plant, PlantPageModel, R } from '@/types'

import httpRequest from './axios'

export class InverterAPI {
  private static INVERTER_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/site`

  static LIST_QUERY_KEY = 'INVERTER_LIST'

  static list(params: PlantPageModel) {
    return httpRequest.get<R<Page<Plant>>>(`${this.INVERTER_API_PREFIX}/list-inverter-by-page`, {
      ...params
    })
  }

  static detail(id: string) {
    return httpRequest.get<R<Plant>>(`${this.INVERTER_API_PREFIX}/query-inverter-info`, { id })
  }
}
