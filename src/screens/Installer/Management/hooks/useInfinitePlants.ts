import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { PlantAPI } from '@/api'
import type { InfinitePage, Plant } from '@/types'

import type { SearchParams } from '../types'

const DEFAULT_PAGE_SIZE = 10

const getPaginatedPlants = async ({
  pageParam = 0,
  keywords = ''
}): Promise<InfinitePage<Plant>> => {
  const { records, current } = (
    await PlantAPI.list({
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

export const useInfinitePlants = (searchParams: SearchParams) => {
  const queryClient = useQueryClient()
  const plantInfiniteQuery = useInfiniteQuery({
    queryKey: [PlantAPI.LIST_QUERY_KEY, searchParams],
    queryFn: ({ pageParam, queryKey }) => {
      const { keywords } = queryKey[1] as SearchParams
      return getPaginatedPlants({
        pageParam,
        keywords
      })
    },
    initialPageParam: 1,
    select: (data) => {
      let plants: Plant[] = []
      if (data.pages) {
        data.pages.forEach((page) => plants.push(...page.page))
        plants = plants.flat()
      }
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        plants,
        loadedAll: data.pages[data.pages.length - 1].page.length < DEFAULT_PAGE_SIZE
      }
    },
    enabled: false,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.page.length < DEFAULT_PAGE_SIZE ? undefined : lastPage.pageParam + 1
  })

  const refetchPlants = () => {
    queryClient.removeQueries({ queryKey: [PlantAPI.LIST_QUERY_KEY] })
    plantInfiniteQuery.refetch()
  }

  return {
    plantInfiniteQuery,
    plants: plantInfiniteQuery.data?.plants ?? [],
    plantLoadedAll: plantInfiniteQuery.data?.loadedAll,
    refetchPlants
  }
}
