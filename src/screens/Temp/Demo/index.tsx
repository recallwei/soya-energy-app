import { RefreshControl, Share } from 'react-native'
import { Button, ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh } from '@/hooks'

export default function DemoScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          title: 'Soya Energy',
          message: 'Welcome to Soya Energy!',
          url: 'https://soyaenergy.com'
        },
        {
          dialogTitle: 'Share Soya Energy',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter',
            'com.apple.uikit.activity.mail'
          ],
          subject: 'Share Link',
          tintColor: 'green',
          anchor: 10
        }
      )

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with ${result.activityType}`)
        } else {
          console.log('Shared!')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed!')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

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
    >
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <NoData />
        <Button onPress={handleShare}>Share</Button>
      </YStack>
    </ScrollView>
  )
}
