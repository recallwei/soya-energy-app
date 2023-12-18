import { useQuery } from '@tanstack/react-query'

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
        totalPowerGeneration: Number(totalPowerGeneration ?? 0).toFixed(0),
        todayPowerGeneration: Number(todayPowerGeneration ?? 0).toFixed(0),
        yearPowerGeneration: Number(yearPowerGeneration ?? 0).toFixed(0),
        monthPowerGeneration: Number(monthPowerGeneration ?? 0).toFixed(0),
        totalInstalledCapacity: Number(totalInstalledCapacity ?? 0).toFixed(0)
      }
    }
  })
  return {
    data
  }
}
