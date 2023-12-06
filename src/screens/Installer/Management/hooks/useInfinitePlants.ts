import { useInfiniteQuery } from '@tanstack/react-query'

import { PlantAPI } from '@/api'
import type { InfinitePage, Plant } from '@/types'

import type { SearchParams } from '../types'

const getPaginatedPlants = async ({
  pageParam = 0,
  keywords = ''
}): Promise<InfinitePage<Plant>> => {
  const { records, current } = (
    await PlantAPI.list({
      size: 10,
      current: pageParam,
      keywords
    })
  ).data
  if (!records || !pageParam) {
    throw new Error('No records found')
  }
  return { page: records, pageParam: current }
}

export const useInfinitePlants = (searchParams: SearchParams) =>
  useInfiniteQuery({
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
      const allPages: Plant[] = []
      if (data.pages) {
        data.pages.forEach((page) => allPages.push(...page.page))
      }
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        plants: allPages.flat()
      }
    },
    enabled: false,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.page.length < 10 ? undefined : lastPage.pageParam
  })
