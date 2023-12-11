import { useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import type { FlatList } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'
import { useImmer } from 'use-immer'

import { useThemeStore } from '@/store'
import type { RouteProp } from '@/types'
import { DeviceUtils } from '@/utils'

import { AdvancedFilter, DrawerContent, HeaderArea, ScrollList, Statistics } from './components'
import { initialAdvanceFilter } from './constants'
import { ManagementTab, PlantOrderby } from './enums'
import type { FormData, SearchParams } from './types'

const DEFAULT_TAB_STATUS = '0'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const themeStore = useThemeStore()
  const route = useRoute<RouteProp<'Installer.Management'>>()

  const [currentTab, setCurrentTab] = useState<ManagementTab>(ManagementTab.Plant)

  useEffect(() => {
    setCurrentTab(route.params?.currentTab ?? ManagementTab.Plant)
  }, [route.params])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [advancedFilter, setAdvancedFilter] = useImmer<FormData>(initialAdvanceFilter)
  const [searchParams, setSearchParams] = useImmer<SearchParams>({
    keywords: '',
    status: DEFAULT_TAB_STATUS,
    order: PlantOrderby.Latest_Installation_Date,
    displayRange: '',
    loadingMonitoring: '',
    plantType: '',
    systemPowerMin: '',
    systemPowerMax: '',
    others: '',
    inverterType: '',
    ratePowerMax: '',
    ratePowerMin: '',
    batteryType: ''
  })

  useEffect(() => {
    setSearchParams((draft) => {
      draft.status = DEFAULT_TAB_STATUS
      draft.keywords = ''
    })
  }, [currentTab, setSearchParams])

  const listRef = useRef<FlatList>(null)

  const setKeywords = (keywords: string) =>
    setSearchParams((draft) => {
      draft.keywords = keywords
    })

  const setStatus = (status: string) => {
    setSearchParams((draft) => {
      draft.status = status
    })
  }

  const setOrder = (order: string) => {
    setSearchParams((draft) => {
      draft.order = order
    })
  }

  // 滚动至列表顶部
  const scrollToTop = () => listRef.current?.scrollToOffset({ animated: true, offset: 0 })

  return (
    <Drawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      renderDrawerContent={() => (
        <DrawerContent
          {...{ advancedFilter, setAdvancedFilter, setDrawerOpen, currentTab, setSearchParams }}
        />
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
          setKeywords={setKeywords}
        />
        <Statistics
          currentTab={currentTab}
          status={searchParams.status}
          setStatus={setStatus}
        />
        <AdvancedFilter
          currentTab={currentTab}
          setOrder={setOrder}
          setDrawerOpen={setDrawerOpen}
          scrollToTop={scrollToTop}
        />
        <ScrollList
          listRef={listRef}
          currentTab={currentTab}
          {...searchParams}
        />
      </View>
    </Drawer>
  )
}
