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
        totalPowerGeneration: Number(totalPowerGeneration).toFixed(0),
        todayPowerGeneration: Number(todayPowerGeneration).toFixed(0),
        yearPowerGeneration: Number(yearPowerGeneration).toFixed(0),
        monthPowerGeneration: Number(monthPowerGeneration).toFixed(0),
        totalInstalledCapacity: Number(totalInstalledCapacity).toFixed(0)
      }
    }
  })
  return {
    data
  }
}
