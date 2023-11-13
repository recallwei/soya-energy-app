import { CachedImage } from '@georstat/react-native-image-cache'
import { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'
import { CacheUtils } from '@/utils'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const { refreshing, onRefresh } = useRefresh()

  useEffect(() => {
    const init = async () => {
      console.log(await CacheUtils.getCacheSize())
    }
    init()
  })

  return (
    <ScrollView
      minHeight="100%"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$4"
        alignItems="center"
      >
        <View
          padding="$3"
          backgroundColor="#dfdfdf"
          borderRadius="$3"
        >
          <CachedImage
            source="https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-light.png"
            style={{ height: 150, width: 200 }}
          />
        </View>
        <View
          padding="$3"
          backgroundColor="#333333"
          borderRadius="$3"
        >
          <CachedImage
            source="https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-dark.png"
            style={{ height: 150, width: 200 }}
          />
        </View>
      </YStack>
    </ScrollView>
  )
}
