import { useState } from 'react'
import { Drawer } from 'react-native-drawer-layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'
import { useImmer } from 'use-immer'

import { useThemeStore } from '@/store'
import { DeviceUtils } from '@/utils'

import { AdvancedFilter, DrawerContent, HeaderArea, ScrollList, Statistics } from './components'
import { initialAdvanceFilter } from './constants'
import { ManagementTab } from './enums'
import type { FormData } from './interfaces'
import type { SearchParams } from './types'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const themeStore = useThemeStore()

  const [currentTab, setCurrentTab] = useState<ManagementTab>(ManagementTab.Plant)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [advancedFilter, setAdvancedFilter] = useImmer<FormData>(initialAdvanceFilter)
  const [searchParams, setSearchParams] = useImmer<SearchParams>({
    keywords: ''
  })

  const setKeywords = (keywords: string) =>
    setSearchParams((draft) => {
      draft.keywords = keywords
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
        <Statistics />
        <AdvancedFilter setDrawerOpen={setDrawerOpen} />
        <ScrollList
          currentTab={currentTab}
          {...searchParams}
        />
      </View>
    </Drawer>
  )
}
