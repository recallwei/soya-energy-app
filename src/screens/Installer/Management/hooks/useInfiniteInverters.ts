import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { InverterAPI } from '@/api'
import type { InfinitePage, Inverter } from '@/types'

import type { SearchParams } from '../types'

const DEFAULT_PAGE_SIZE = 10

const getPaginatedInverters = async ({
  pageParam = 0,
  keywords = ''
}): Promise<InfinitePage<Inverter>> => {
  const { records, current } = (
    await InverterAPI.list({
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

export const useInfiniteInverters = (searchParams: SearchParams) => {
  const queryClient = useQueryClient()
  const inverterInfiniteQuery = useInfiniteQuery({
    queryKey: [InverterAPI.LIST_QUERY_KEY, searchParams],
    queryFn: ({ pageParam, queryKey }) => {
      const { keywords } = queryKey[1] as SearchParams
      return getPaginatedInverters({
        pageParam,
        keywords
      })
    },
    initialPageParam: 1,
    select: (data) => {
      let inverters: Inverter[] = []
      if (data.pages) {
        data.pages.forEach((page) => inverters.push(...page.page))
        inverters = inverters.flat()
      }
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        inverters,
        loadedAll: data.pages[data.pages.length - 1].page.length < DEFAULT_PAGE_SIZE
      }
    },
    enabled: false,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.page.length < DEFAULT_PAGE_SIZE ? undefined : lastPage.pageParam + 1
  })

  const refetchInverters = () => {
    queryClient.removeQueries({ queryKey: [InverterAPI.LIST_QUERY_KEY] })
    inverterInfiniteQuery.refetch()
  }

  return {
    inverterInfiniteQuery,
    inverters: inverterInfiniteQuery.data?.inverters ?? [],
    inverterLoadedAll: inverterInfiniteQuery.data?.loadedAll,
    refetchInverters
  }
}
