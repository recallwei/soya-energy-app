import { globalEnvConfig } from '@/env'
import type { PageResponse, Plant } from '@/types'

import Request from './axios'

export class PlantAPI {
  private static PLANT_API_PREFIX = `${globalEnvConfig.BASE_API_URL}/plant`

  static LIST_QUERY_KEY = 'PLANT_LIST'

  static list() {
    return Request.get<PageResponse<Plant>>(`${this.PLANT_API_PREFIX}/list`)
  }

  static listMock() {
    return new Promise<Plant[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '123',
            siteCapacity: 'siteCapacity',
            siteCode: 'siteCode',
            siteGridType: 'siteGridType',
            siteName: 'siteName',
            siteNetType: 'siteNetType',
            siteType: 'siteType',
            siteUrl: 'siteUrl',
            status: 0
          }
        ])
      }, 500)
    })
  }
}
