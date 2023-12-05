import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Drawer } from 'react-native-drawer-layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'
import { useImmer } from 'use-immer'

import { PlantAPI } from '@/api'
import { useRefresh } from '@/hooks'
import { useThemeStore } from '@/store'
import type { Pagination } from '@/types/page'
import { DeviceUtils } from '@/utils'

import { AdvancedFilter, DrawerContent, HeaderArea, ScrollList, Statistics } from './components'
import { initialAdvanceFilter } from './constants'
import { ManagementTab } from './enums'
import type { FormData } from './interfaces'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const themeStore = useThemeStore()

  const [currentTab, setCurrentTab] = useState<ManagementTab>(ManagementTab.Plant)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [advancedFilter, setAdvancedFilter] = useImmer<FormData>(initialAdvanceFilter)
  const [pagination, setPagination] = useImmer<Pagination>({
    size: 10,
    current: 1,
    total: 0,
    keywords: ''
  })

  const listQuery = useQuery({
    queryKey: [PlantAPI.LIST_QUERY_KEY, pagination.size, pagination.current, currentTab],
    queryFn: () => {
      if (currentTab === ManagementTab.Plant) {
        return PlantAPI.list({
          size: pagination.size,
          current: pagination.current,
          keywords: pagination.keywords
        })
      }
      return PlantAPI.list({})
    },
    select: ({ data }) => {
      const { records, current, total } = data
      return {
        records,
        current,
        total
      }
    }
  })
  const refresh = useRefresh(async () => {
    clearPagination()
    listQuery.refetch()
  })

  function clearPagination() {
    setPagination((draft) => {
      draft.current = 1
      draft.total = 0
    })
  }

  return (
    <Drawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      renderDrawerContent={() => (
        <DrawerContent {...{ advancedFilter, setAdvancedFilter, setDrawerOpen }} />
      )}
      drawerPosition="right"
      drawerType="front"
      drawerStyle={{
        backgroundColor: themeStore.getBgColor(),
        right: 0,
        width: DeviceUtils.SCREEN_WIDTH * 0.8,
        paddingTop: insets.top
      }}
    >
      <View
        height="100%"
        paddingTop={insets.top}
        paddingLeft={insets.left}
        paddingRight={insets.right}
      >
        <HeaderArea
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...refresh}
        />
        <Statistics />
        <AdvancedFilter setDrawerOpen={setDrawerOpen} />
        <ScrollList
          {...refresh}
          listData={listQuery.data?.records ?? []}
          currentTab={currentTab}
        />
      </View>
    </Drawer>
  )
}
