import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { BatteryAPI, InverterAPI, PlantAPI } from '@/api'
import { useRefreshOnFocus } from '@/hooks'
import type {
  Battery,
  InfinitePage,
  Inverter,
  InverterPageModel,
  Page,
  Plant,
  PlantPageModel,
  R
} from '@/types'

import { MANAGEMENT_DEVICE_LIST_QUERY_KEY } from '../../../constants'
import { ManagementTab } from '../../../enums'
import type { SearchParams } from '../../../types'

const DEFAULT_PAGE_SIZE = 10

type ManagementDevice = Plant | Inverter | Battery

const apiMap = new Map<
  ManagementTab,
  (params: PlantPageModel | InverterPageModel) => Promise<R<Page<ManagementDevice>>>
>([
  [ManagementTab.Plant, (params) => PlantAPI.list(params)],
  [ManagementTab.Inverter, (params) => InverterAPI.list(params)],
  [ManagementTab.Battery, (params) => BatteryAPI.list(params)]
])

const getPaginatedPlants = async ({
  pageParam = 0,
  keywords = '',
  currentTab = ManagementTab.Plant
}): Promise<InfinitePage<ManagementDevice>> => {
  const { records, current } = (
    await apiMap.get(currentTab)!({
      size: DEFAULT_PAGE_SIZE,
      current: pageParam,
      keywords
    })
  ).data
  if (!records || !pageParam) {
    throw new Error('No records found')
  }
  return { page: records, pageParam: current }
}

export const useInfiniteManagementDevices = (
  currentTab: ManagementTab,
  searchParams: SearchParams
) => {
  const queryClient = useQueryClient()
  const devicesInfiniteQuery = useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [MANAGEMENT_DEVICE_LIST_QUERY_KEY, searchParams],
    queryFn: ({ pageParam, queryKey }) => {
      const { keywords } = queryKey[1] as SearchParams
      return getPaginatedPlants({
        pageParam,
        keywords,
        currentTab
      })
    },
    initialPageParam: 1,
    select: (data) => {
      let managementDevices: ManagementDevice[] = []
      if (data.pages) {
        data.pages.forEach((page) => managementDevices.push(...page.page))
        managementDevices = managementDevices.flat()
      }
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        devices: managementDevices,
        loadedAll: data.pages[data.pages.length - 1].page.length < DEFAULT_PAGE_SIZE
      }
    },
    enabled: false,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.page.length < DEFAULT_PAGE_SIZE ? undefined : lastPage.pageParam + 1
  })

  const refetch = () => {
    queryClient.removeQueries({ queryKey: [MANAGEMENT_DEVICE_LIST_QUERY_KEY] })
    devicesInfiniteQuery.refetch()
  }

  // 切换 tab
  useEffect(() => {
    refetch()
  }, [currentTab])

  useRefreshOnFocus(devicesInfiniteQuery.refetch)

  return {
    devicesInfiniteQuery,
    devices: devicesInfiniteQuery.data?.devices ?? [],
    loadedAll: devicesInfiniteQuery.data?.loadedAll,
    isRefreshing: !devicesInfiniteQuery.isFetched || devicesInfiniteQuery.isRefetching,
    refetch
  }
}
