import { globalEnvConfig } from '@/env'
import type {
  Inverter,
  InverterCreateModel,
  InverterDetailModel,
  InverterEditModel,
  InverterPageModel,
  Page,
  R
} from '@/types'

import httpRequest from './axios'

export class InverterAPI {
  private static INVERTER_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/site`

  static LIST_QUERY_KEY = 'INVERTER_LIST'

  static DETAIL_QUERY_KEY = 'INVERTER_DETAIL'

  static list(params: InverterPageModel) {
    return httpRequest.get<R<Page<Inverter>>>(`${this.INVERTER_API_PREFIX}/list-inverter-by-page`, {
      ...params
    })
  }

  static detail(params: InverterDetailModel) {
    return httpRequest.get<R<Inverter>>(`${this.INVERTER_API_PREFIX}/query-inverter-info`, {
      ...params
    })
  }

  static edit(params: InverterEditModel) {
    return httpRequest.post(`${this.INVERTER_API_PREFIX}/update-inverter`, { ...params })
  }

  static remove(id: string) {
    return httpRequest.post(`${this.INVERTER_API_PREFIX}/remove-inverter`, { ids: [id] })
  }

  static create(params: InverterCreateModel) {
    return httpRequest.post(`${this.INVERTER_API_PREFIX}/save-inverter`, { ...params })
  }
}
