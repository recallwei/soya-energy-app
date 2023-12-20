import { useQuery } from '@tanstack/react-query'
import { toNumber } from 'lodash'

import { HomeAPI } from '@/api'
import type { HomeStatistic, R } from '@/types'

export const useHomeStatisticQuery = () => {
  const { data } = useQuery({
    queryKey: [HomeAPI.STATISTIC_QUERY_KEY],
    queryFn: () => HomeAPI.statistic(),
    select: (res: R<HomeStatistic>) => {
      const {
        todayPowerGeneration,
        totalInstalledCapacity,
        yearPowerGeneration,
        monthPowerGeneration,
        totalPowerGeneration
      } = res.data
      return {
        totalPowerGeneration: formatValue(totalPowerGeneration),
        todayPowerGeneration: formatValue(todayPowerGeneration),
        yearPowerGeneration: formatValue(yearPowerGeneration),
        monthPowerGeneration: formatValue(monthPowerGeneration),
        totalInstalledCapacity: formatValue(totalInstalledCapacity)
      }
    }
  })

  function formatValue(value?: number | string) {
    if (!value) return 0
    return toNumber(toNumber(value).toFixed(0))
  }

  return {
    data
  }
}
