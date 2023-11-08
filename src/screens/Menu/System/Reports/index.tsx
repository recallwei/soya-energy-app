import { RefreshControl, TouchableOpacity } from 'react-native'
import { ScrollView, Separator, Text, YStack } from 'tamagui'

import { SCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function ReportsScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

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
        <SCard>
          <YStack gap="$2">
            <Text
              fontFamily="$body"
              fontWeight="bold"
            >
              Monthly Energy
            </Text>

            <Separator />

            <Text fontFamily="$body">
              This report summarizes the energy produced, consumed imported to, and exported from
              this site for every 15 minutes of the selected month. lf the system includes
              batteries, the report also shows energy stored and discharged.
            </Text>

            <Text
              fontFamily="$body"
              marginTop="$4"
              fontWeight="bold"
            >
              SEPTEMBER 2023
            </Text>

            <Separator />

            <TouchableOpacity onPress={() => {}}>
              <Text
                fontFamily="$body"
                color="#0078d7"
                marginTop="$4"
              >
                Email Reports
              </Text>
            </TouchableOpacity>
          </YStack>
        </SCard>
      </YStack>
    </ScrollView>
  )
}
