import { globalEnvConfig } from '@/env'
import type { EnergyBenefit, EnergyFlow, EnergyQueryModel, EnergyStatistics, R } from '@/types'

import httpRequest from './axios'

export class EnergyAPI {
  private static ENERGY_API_PREFIX = `${globalEnvConfig.BASE_USER_API_URL}/energy`

  static BENEFIT_QUERY_KEY = 'ENERGY_BENEFIT'

  static FLOW_QUERY_KEY = 'ENERGY_FLOW'

  static STATISTICS_QUERY_KEY = 'ENERGY_STATISTICS'

  static benefit(params: EnergyQueryModel) {
    return httpRequest.get<R<EnergyBenefit>>(`${this.ENERGY_API_PREFIX}/info-benefit`, {
      ...params
    })
  }

  static flow(params: EnergyQueryModel) {
    return httpRequest.get<R<EnergyFlow>>(`${this.ENERGY_API_PREFIX}/detail-flow`, {
      ...params
    })
  }

  static statistics(params: EnergyQueryModel) {
    return httpRequest.get<R<EnergyStatistics>>(`${this.ENERGY_API_PREFIX}/info-statistics`, {
      ...params
    })
  }
}
