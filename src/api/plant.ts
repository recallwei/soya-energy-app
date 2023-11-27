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
    return new Promise<PageResponse<Plant>>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            records: [
              {
                id: '123',
                siteCapacity: '5.0',
                siteCode: 'siteCode',
                siteGridType: 'siteGridType',
                siteName: '荷兰阿姆斯特丹测试样机',
                siteNetType: 'siteNetType',
                siteType: 'siteType',
                siteUrl: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/house.png',
                status: '1',
                currentPower: '1.0',
                productionToday: '1.0',
                sitePosition: 'German'
              },
              {
                id: '123',
                siteCapacity: '55',
                siteCode: 'siteCode',
                siteGridType: 'siteGridType',
                siteName: '苏州工业园区测试样机',
                siteNetType: 'siteNetType',
                siteType: 'siteType',
                siteUrl: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/house.png',
                status: '2',
                currentPower: '1.0',
                productionToday: '1.0',
                sitePosition: 'Netherlands'
              },
              {
                id: '123',
                siteCapacity: '5.0',
                siteCode: 'siteCode',
                siteGridType: 'siteGridType',
                siteName: '德国法兰克福测试样机',
                siteNetType: 'siteNetType',
                siteType: 'siteType',
                siteUrl: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/house.png',
                status: '1',
                currentPower: '1.0',
                productionToday: '1.0',
                sitePosition: 'German'
              }
            ]
          }
        })
      }, 500)
    })
  }
}
