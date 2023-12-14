import type { RefObject } from 'react'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'
import { SizableText, Spinner } from 'tamagui'

import { SheetMenu } from '@/components'
import { globalStyles } from '@/constants'
import { useRefresh } from '@/hooks'

import { ManagementTab } from '../../enums'
import type { SearchParams } from '../../types'
import { BatteryItem, InverterItem, PlantItem } from './components'
import { useInfiniteManagementDevices, usePlantSheet } from './hooks'

interface Props extends SearchParams {
  currentTab: ManagementTab
  listRef: RefObject<FlatList<any>>
}

const ScrollList = memo((props: Props) => {
  const { currentTab, listRef, ...rest } = props
  const { t } = useTranslation('Global')
  const { devicesInfiniteQuery, devices, loadedAll, refetch, isRefreshing } =
    useInfiniteManagementDevices(currentTab, {
      ...rest
    })
  const refresh = useRefresh(async () => refetch())
  const { plantSheetMenuData, plantSheetOpen, setPlantSheetOpen, handleOpenPlantSheet } =
    usePlantSheet()

  return (
    <>
      <FlatList
        ref={listRef}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 18,
          paddingBottom: 18
        }}
        data={devices}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          switch (currentTab) {
            case ManagementTab.Plant:
              return (
                <PlantItem
                  {...item}
                  currentTab={currentTab}
                  handleOpenPlantSheet={handleOpenPlantSheet}
                />
              )
            case ManagementTab.Inverter:
              return (
                <InverterItem
                  {...item}
                  currentTab={currentTab}
                />
              )
            case ManagementTab.Battery:
              return (
                <BatteryItem
                  {...item}
                  currentTab={currentTab}
                />
              )
            default:
              return null
          }
        }}
        showsVerticalScrollIndicator={false}
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
            {devicesInfiniteQuery.isFetchingNextPage && (
              <Spinner
                style={{ marginTop: 10 }}
                color={globalStyles.primaryColor}
              />
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
