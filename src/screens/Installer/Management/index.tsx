import { useState } from 'react'
import { View } from 'tamagui'

import { useRefresh, useSafeAreaPadding } from '@/hooks'

import { AdvancedFilter, HeaderArea, ScrollList, Statistics } from './components'
import { ManagementTab } from './enums'

export default function Screen() {
  const { insetsWithoutBottom } = useSafeAreaPadding()
  const refresh = useRefresh()

  const [currentTab, setCurrentTab] = useState<ManagementTab>(ManagementTab.Plant)

  return (
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
      <AdvancedFilter />
      <ScrollList {...refresh} />
    </View>
  )
}
