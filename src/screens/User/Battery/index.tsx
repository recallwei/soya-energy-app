import { RefreshControl } from 'react-native'
import { ScrollView, Spinner, View, YStack } from 'tamagui'

import { NoData } from '@/components'
import { globalStyles } from '@/constants'
import { useRefresh } from '@/hooks'

import { HeaderArea, MenuList, Statistics } from './components'
import { useBatteryStaticsQuery } from './hooks'

export default function Screen() {
  const { detail, queryResult } = useBatteryStaticsQuery()
  const { refreshing, onRefresh } = useRefresh(queryResult.refetch)

  if (queryResult.isPending) {
    return (
      <Spinner
        style={{ marginTop: 10 }}
        color={globalStyles.primaryColor}
      />
    )
  }

  if (queryResult.isFetched && !detail?.soc) {
    return <NoData />
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <YStack
          padding="$4"
          gap="$3"
        >
          <HeaderArea data={detail} />
          <Statistics data={detail} />
          <MenuList data={detail} />
        </YStack>
      </ScrollView>
    </View>
  )
}
