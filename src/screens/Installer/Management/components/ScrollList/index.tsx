import { useQueryClient } from '@tanstack/react-query'
import type { RefObject } from 'react'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { SizableText } from 'tamagui'

import { InverterAPI, PlantAPI } from '@/api'
import { useRefresh } from '@/hooks'

import { ManagementTab } from '../../enums'
import { useInfiniteInverters, useInfinitePlants } from '../../hooks'
import type { SearchParams } from '../../types'
import PlantItem from './PlantItem'

interface Props extends SearchParams {
  currentTab: ManagementTab
  listRef: RefObject<FlatList<any>>
}

const ScrollList = memo((props: Props) => {
  const { t } = useTranslation('Global')
  const queryClient = useQueryClient()
  // 切换 tab
  useEffect(() => {
    queryClient.cancelQueries({
      queryKey: [PlantAPI.LIST_QUERY_KEY]
    })
    queryClient.cancelQueries({
      queryKey: [InverterAPI.LIST_QUERY_KEY]
    })
  }, [props.currentTab])

  const { plantInfiniteQuery, plants, plantLoadedAll, refetchPlants } = useInfinitePlants({
    keywords: props.keywords
  })
  const { inverters, inverterLoadedAll, refetchInverters } = useInfiniteInverters({
    keywords: props.keywords
  })
  // 下拉刷新
  const refresh = useRefresh(async () => {
    switch (props.currentTab) {
      case ManagementTab.Plant:
        refetchPlants()
        break
      case ManagementTab.Inverter:
        refetchInverters()
        break
      default:
        break
    }
  })

  const getCurrentTabData = () => {
    switch (props.currentTab) {
      case ManagementTab.Plant:
        return plants
      case ManagementTab.Inverter:
        return inverters
      default:
        return []
    }
  }

  return (
    <FlatList
      ref={props.listRef}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 18,
        paddingBottom: 18
      }}
      data={getCurrentTabData()}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => {
        switch (props.currentTab) {
          case ManagementTab.Plant:
            return <PlantItem {...item} />
          default:
            return null
        }
      }}
      showsVerticalScrollIndicator={false}
      refreshing
      refreshControl={
        <RefreshControl
          refreshing={!plantInfiniteQuery.isFetched || plantInfiniteQuery.isRefetching}
          onRefresh={refresh.onRefresh}
        />
      }
      onEndReached={() => plantInfiniteQuery.fetchNextPage()}
      progressViewOffset={30}
      ListFooterComponent={
        <>
          {plantInfiniteQuery.isFetchingNextPage && <ActivityIndicator style={{ marginTop: 10 }} />}
          {(plantLoadedAll || inverterLoadedAll) && (
            <SizableText
              textAlign="center"
              marginTop="$2"
            >
              {t('No.More.Data')}
            </SizableText>
          )}
        </>
      }
    />
  )
})
export default ScrollList
