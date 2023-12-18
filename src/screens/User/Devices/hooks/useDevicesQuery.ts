import { useQuery } from '@tanstack/react-query'

import { DeviceAPI } from '@/api'
import { useRefreshOnFocus } from '@/hooks'
import { usePlantStore } from '@/store'

export const useDevicesQuery = () => {
  const plantStore = usePlantStore()

  const queryResult = useQuery({
    queryKey: [DeviceAPI.LIST_QUERY_KEY, plantStore.currentPlant?.id],
    queryFn: () => DeviceAPI.list({ plantId: plantStore.currentPlant?.id }),
    enabled: Boolean(plantStore.currentPlant?.id),
    select: (res) => res.data
  })

  useRefreshOnFocus(queryResult.refetch)

  return {
    queryResult,
    devices: queryResult.data ?? []
  }
}
