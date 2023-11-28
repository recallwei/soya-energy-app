import { RefreshControl, View } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()

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
          space="$3"
        >
          <MenuItemCard
            hideAction
            header
            headerLeftText="通知标题"
            headerRightText="2022/06/22"
            description="通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容"
          />
        </YStack>
      </ScrollView>
    </View>
  )
}
