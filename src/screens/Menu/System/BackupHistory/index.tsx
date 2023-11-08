import { RefreshControl } from 'react-native'
import { ScrollView, Text, YStack } from 'tamagui'

import { SCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function DemoScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

  const data = [
    {
      from: '06 Sep 2023 17:53',
      to: '06 Sep 2023 17:53',
      description: '24h:11min'
    },
    {
      from: '06 Sep 2023 17:53',
      to: '06 Sep 2023 17:53',
      description: '24h:11min'
    },
    {
      from: '06 Sep 2023 17:53',
      to: '06 Sep 2023 17:53',
      description: '24h:11min'
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
          Total Backup: 23d 12h 11m
        </Text>
        {data.map((item, index) => (
          <SCard key={index}>
            <YStack gap="$2">
              <Text fontFamily="$body">From: {item.from}</Text>
              <Text fontFamily="$body">To: {item.to}</Text>
              <Text fontFamily="$body">Total: {item.description}</Text>
            </YStack>
          </SCard>
        ))}
      </YStack>
    </ScrollView>
  )
}
