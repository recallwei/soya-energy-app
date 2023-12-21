import { globalEnvConfig } from '@/env'
import type { CreatePlantModel, Page, Plant, PlantPageModel, R } from '@/types'

import httpRequest from './axios'

export class PlantAPI {
  private static PLANT_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/installer`

  static LIST_QUERY_KEY = 'PLANT_LIST'

  static list(params: PlantPageModel) {
    return httpRequest.get<R<Page<Plant>>>(`${this.PLANT_API_PREFIX}/list-plant-by-page`, {
      ...params
    })
  }

  static detail(id: string) {
    return httpRequest.get<R<Plant>>(`${this.PLANT_API_PREFIX}/query-plant-info`, { id })
  }

  /**
   * 自建电站
   */
  static create(params: CreatePlantModel) {
    return httpRequest.post(`${this.PLANT_API_PREFIX}/add-plant`, { ...params })
  }

  /**
   * 代建电站
   */
  static createProxy(params: CreatePlantModel) {
    return httpRequest.post(`${this.PLANT_API_PREFIX}/add-plant-by-proxy`, { ...params })
  }

  static update(params: CreatePlantModel) {
    return httpRequest.post(`${this.PLANT_API_PREFIX}/update-plant`, { ...params })
  }

  static remove(id: string) {
    return httpRequest.post(`${this.PLANT_API_PREFIX}/remove-plant`, { ids: [id] })
  }
}
