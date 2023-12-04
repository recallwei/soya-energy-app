import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Drawer } from 'react-native-drawer-layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'
import { useImmer } from 'use-immer'

import { PlantAPI } from '@/api'
import { useRefresh } from '@/hooks'
import { useThemeStore } from '@/store'
import { DeviceUtils } from '@/utils'

import { AdvancedFilter, DrawerContent, HeaderArea, ScrollList, Statistics } from './components'
import { initialAdvanceFilter } from './constants'
import { ManagementTab } from './enums'
import type { FormData } from './interfaces'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const plantListQuery = useQuery({
    queryKey: [PlantAPI.LIST_QUERY_KEY],
    queryFn: () => PlantAPI.listMock(),
    select: (data) => data.data.records ?? []
  })
  const refresh = useRefresh(async () => plantListQuery.refetch())
  const themeStore = useThemeStore()

  const [currentTab, setCurrentTab] = useState<ManagementTab>(ManagementTab.Plant)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [advancedFilter, setAdvancedFilter] = useImmer<FormData>(initialAdvanceFilter)

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
          listData={plantListQuery.data ?? []}
          currentTab={currentTab}
        />
      </View>
    </Drawer>
  )
}
