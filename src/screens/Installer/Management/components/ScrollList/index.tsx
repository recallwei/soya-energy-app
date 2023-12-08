import type { RefObject } from 'react'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { SizableText } from 'tamagui'

import { SheetMenu } from '@/components'
import { useRefresh } from '@/hooks'

import { ManagementTab } from '../../enums'
import type { SearchParams } from '../../types'
import { InverterItem, PlantItem } from './components'
import { useInfiniteManagementDevices, usePlantSheet } from './hooks'

interface Props extends SearchParams {
  currentTab: ManagementTab
  listRef: RefObject<FlatList<any>>
}

const ScrollList = memo((props: Props) => {
  const { t } = useTranslation('Global')
  const { devicesInfiniteQuery, devices, loadedAll, refetch, isRefreshing } =
    useInfiniteManagementDevices(props.currentTab, {
      keywords: props.keywords,
      status: props.status
    })
  const refresh = useRefresh(async () => refetch())
  const { plantSheetMenuData, plantSheetOpen, setPlantSheetOpen, handleOpenPlantSheet } =
    usePlantSheet()

  return (
    <>
      <FlatList
        ref={props.listRef}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 18,
          paddingBottom: 18
        }}
        data={devices}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          switch (props.currentTab) {
            case ManagementTab.Plant:
              return (
                <PlantItem
                  {...item}
                  currentTab={props.currentTab}
                  handleOpenPlantSheet={handleOpenPlantSheet}
                />
              )
            case ManagementTab.Inverter:
              return (
                <InverterItem
                  {...item}
                  currentTab={props.currentTab}
                />
              )
            case ManagementTab.Battery:
            default:
              return null
          }
        }}
        showsVerticalScrollIndicator={false}
        refreshing
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh.onRefresh}
          />
        }
        onEndReached={() => devicesInfiniteQuery.fetchNextPage()}
        progressViewOffset={30}
        ListFooterComponent={
          <>
            {devicesInfiniteQuery.isFetchingNextPage && !isRefreshing && (
              <ActivityIndicator style={{ marginTop: 10 }} />
            )}
            {loadedAll && (
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
      <SheetMenu
        data={plantSheetMenuData}
        sheet={{
          open: plantSheetOpen,
          setOpen: setPlantSheetOpen
        }}
        autoClose
      />
    </>
  )
})
export default ScrollList
