import { RefreshControl } from 'react-native'
import { Paragraph, ScrollView, Separator, Text, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

import { CollapseArea } from './components'

export default function BatteryScreen() {
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
        <Text
          fontFamily="$body"
          fontWeight="500"
        >
          Storm Guard Enabled
        </Text>

        <Separator />

        <Paragraph>
          Overrides your system profile to Full Backup when a severe weather condition alert is
          issued for your locality.
        </Paragraph>

        <Text
          fontFamily="$body"
          fontWeight="500"
        >
          Select a smart profile to control your battery
        </Text>

        <CollapseArea
          title="Savings"
          description="Minimize the use of electricity from the grid when the electricity rate is higher. During peak hours, your home is powered in the following order of priority: battery, solar and grid. Any extra solar is exported to the grid."
        >
          <Text fontFamily="$body">30% Reserve</Text>
          <Text fontFamily="$body">Based on Optimization</Text>
        </CollapseArea>

        <CollapseArea
          title="Self - Consumption"
          description="Use stored solar to power your home after the sun goes down. Battery is used when solar is not available."
        >
          <Text fontFamily="$body">30% Reserve</Text>
          <Text fontFamily="$body">Increase Self-Consumption to minimize Grid Dependence</Text>
        </CollapseArea>

        <CollapseArea
          title="Full Backup"
          description="100% of the battery is reserved for backup."
        >
          <Text fontFamily="$body">100% Reserve</Text>
        </CollapseArea>
      </YStack>
    </ScrollView>
  )
}
