import { useQuery } from '@tanstack/react-query'

import { BatteryAPI } from '@/api'
import { useRefreshOnFocus } from '@/hooks'
import { usePlantStore } from '@/store'
import { TimeUtils } from '@/utils'

export const useBatteryStaticsQuery = () => {
  const plantStore = usePlantStore()

  const queryResult = useQuery({
    queryKey: [BatteryAPI.ANALYSIS_QUERY_KEY, plantStore.currentPlant?.id],
    queryFn: () => BatteryAPI.analysis(plantStore.currentPlant?.id as string),
    enabled: !!plantStore.currentPlant?.id,
    select: (res) => ({
      ...res.data,
      updatedAt: TimeUtils.formatTime(new Date(), 'YYYY-MM-DD hh:mm:ss')
    })
  })

  useRefreshOnFocus(queryResult.refetch)

  return {
    queryResult,
    detail: queryResult.data
  }
}
