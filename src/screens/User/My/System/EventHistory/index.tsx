import { RefreshControl } from 'react-native'
import { ScrollView, Text, YStack } from 'tamagui'

import { Card } from '@/components'
import { useRefresh } from '@/hooks'

export default function EventHistoryScreen() {
  const { refreshing, onRefresh } = useRefresh()

  const data = [
    {
      title: '06 Sep 2023 17:53',
      description:
        ' You enabled the Storm Guard feature. Your system profile will beset to “Full Backup” when National Weather Service issues a severe weather condition alert for your locality.'
    },
    {
      title: '06 Sep 2023 17:53',
      description:
        ' You enabled the Storm Guard feature. Your system profile will beset to “Full Backup” when National Weather Service issues a severe weather condition alert for your locality.'
    },
    {
      title: '06 Sep 2023 17:53',
      description:
        ' You enabled the Storm Guard feature. Your system profile will beset to “Full Backup” when National Weather Service issues a severe weather condition alert for your locality.'
    }
  ]

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
        <Text
          fontFamily="$body"
          fontWeight="bold"
          marginLeft="$1"
        >
          Total Events: 3
        </Text>
        {data.map((item, index) => (
          <Card key={index}>
            <YStack gap="$2">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                {item.title}
              </Text>
              <Text fontFamily="$body">{item.description}</Text>
            </YStack>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  )
}
