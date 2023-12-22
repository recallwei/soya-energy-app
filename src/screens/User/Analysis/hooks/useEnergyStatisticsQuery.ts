import { useQuery } from '@tanstack/react-query'

import { EnergyAPI } from '@/api'
import { useRefreshOnFocus } from '@/hooks'
import { usePlantStore } from '@/store'

export const useEnergyStatisticsQuery = () => {
  const plantStore = usePlantStore()

  const queryResult = useQuery({
    queryKey: [EnergyAPI.STATISTICS_QUERY_KEY, plantStore.currentPlant?.id],
    queryFn: () =>
      EnergyAPI.statistics({
        plantNo: plantStore.currentPlant?.id
      }),
    enabled: !!plantStore.currentPlant?.id,
    select: (res) => res.data
  })

  useRefreshOnFocus(queryResult.refetch)

  return {
    queryResult,
    energyData: {
      selfConsumptionPower: queryResult.data?.selfConsumptionPower || 0,
      onlinePower: queryResult.data?.onlinePower || 0
    },
    energyConsumptionData: {
      selfUsePower: queryResult.data?.selfUsePower || 0,
      purchasePower: queryResult.data?.purchasePower || 0
    },
    energyBalanceData: {
      xAxis: queryResult.data?.barChar?.xaxis,
      batteryPower: queryResult.data?.barChar?.yaxis?.batteryPower,
      buyOrSellPower: queryResult.data?.barChar?.yaxis?.buyOrSellPower,
      loadPower: queryResult.data?.barChar?.yaxis?.loadPower,
      pvPower: queryResult.data?.barChar?.yaxis?.pvPower
    },
    environmentImpactData: {
      co2: queryResult.data?.co2,
      tree: queryResult.data?.tree
    }
  }
}
