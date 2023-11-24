import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Drawer } from 'react-native-drawer-layout'
import { View } from 'tamagui'
import { useImmer } from 'use-immer'

import { PlantAPI } from '@/api/plant'
import { useRefresh, useSafeAreaPadding } from '@/hooks'
import { useThemeStore } from '@/store'
import { DeviceUtils } from '@/utils'

import { AdvancedFilter, DrawerContent, HeaderArea, ScrollList, Statistics } from './components'
import { initialAdvanceFilter } from './constants'
import { ManagementTab } from './enums'
import type { FormData } from './interfaces'

export default function Screen() {
  const { insetsWithoutBottom, paddingTop } = useSafeAreaPadding()
  const refresh = useRefresh()
  const themeStore = useThemeStore()

  const [currentTab, setCurrentTab] = useState<ManagementTab>(ManagementTab.Plant)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [advancedFilter, setAdvancedFilter] = useImmer<FormData>(initialAdvanceFilter)

  const { data: { records: listData = [] } = {} } = useQuery({
    queryKey: [],
    queryFn: () => PlantAPI.list(),
    select: (data) => data.data
  })

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
        paddingTop
      }}
    >
      <View
        height="100%"
        {...insetsWithoutBottom}
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
          listData={listData}
          currentTab={currentTab}
        />
      </View>
    </Drawer>
  )
}
