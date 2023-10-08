import { RefreshControl } from 'react-native'
import { ScrollView, Text, YStack } from 'tamagui'

import { SCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function EventHistoryScreen(): React.JSX.Element {
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
          fontSize="$6"
          fontWeight="bold"
          marginLeft="$1"
        >
          Total Events: 3
        </Text>
        {data.map((item, index) => (
          <SCard key={index}>
            <YStack gap="$2">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                {item.title}
              </Text>
              <Text>{item.description}</Text>
            </YStack>
          </SCard>
        ))}
      </YStack>
    </ScrollView>
  )
}
