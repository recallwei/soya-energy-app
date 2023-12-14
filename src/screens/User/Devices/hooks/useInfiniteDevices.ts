import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { DeviceAPI } from '@/api'
import { useRefreshOnFocus } from '@/hooks'
import { usePlantStore } from '@/store'
import type { Device, InfinitePage } from '@/types'

const DEFAULT_PAGE_SIZE = 10

interface Params {
  pageParam: number
  id: string
}

const getPaginatedDevices = async (params: Params): Promise<InfinitePage<Device>> => {
  const { pageParam } = params
  const { records, current } = (
    await DeviceAPI.list({
      size: DEFAULT_PAGE_SIZE,
      current: pageParam,
      id: params.id
    })
  ).data
  if (!records || !pageParam) {
    throw new Error('No records found')
  }
  return { page: records, pageParam: current }
}

export const useInfiniteDevices = () => {
  const queryClient = useQueryClient()
  const plantStore = usePlantStore()

  const devicesInfiniteQuery = useInfiniteQuery({
    queryKey: [DeviceAPI.LIST_QUERY_KEY, plantStore.currentPlant?.id],
    queryFn: ({ pageParam }) =>
      getPaginatedDevices({
        pageParam,
        id: plantStore.currentPlant?.id ?? ''
      }),
    initialPageParam: 1,
    enabled: Boolean(plantStore.currentPlant?.id),
    select: (data) => {
      let devices: Device[] = []
      if (data.pages) {
        data.pages.forEach((page) => devices.push(...page.page))
        devices = devices.flat()
      }
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        devices,
        loadedAll: data.pages[data.pages.length - 1].page.length < DEFAULT_PAGE_SIZE
      }
    },
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.page.length < DEFAULT_PAGE_SIZE ? undefined : lastPage.pageParam + 1
  })

  const refetch = () => {
    queryClient.removeQueries({ queryKey: [DeviceAPI.LIST_QUERY_KEY] })
    devicesInfiniteQuery.refetch()
  }

  useRefreshOnFocus(devicesInfiniteQuery.refetch)

  return {
    devicesInfiniteQuery,
    devices: devicesInfiniteQuery.data?.devices ?? [],
    loadedAll: devicesInfiniteQuery.data?.loadedAll,
    isRefreshing: !devicesInfiniteQuery.isFetched || devicesInfiniteQuery.isFetching,
    refetch
  }
}
