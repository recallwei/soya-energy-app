import { globalEnvConfig } from '@/env'
import type { Page, Plant, PlantPageModel, R } from '@/types'

import httpRequest from './axios'

export class PlantAPI {
  private static PLANT_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/installer`

  static LIST_QUERY_KEY = 'PLANT_LIST'

  static list(params: PlantPageModel) {
    return httpRequest.get<R<Page<Plant>>>(`${this.PLANT_API_PREFIX}/list-plant-by-page`, {
      ...params
    })
  }

  static detail(id: string) {
    return httpRequest.get<R<Plant>>(`${this.PLANT_API_PREFIX}/query-plant-info`, { id })
  }
}
