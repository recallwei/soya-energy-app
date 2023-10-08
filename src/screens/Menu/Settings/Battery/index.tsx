import { useState } from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { SCard, SRatioGroup } from '@/components'
import { useRefresh } from '@/hooks'

export default function BatteryScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

  const [currentSelect, setCurrentSelect] = useState('1')

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
          <SRatioGroup
            value={currentSelect}
            data={[
              { label: 'Energy Independence', value: '1' },
              { label: 'Grid Dependence', value: '2' }
            ]}
            onValueChange={(value) => setCurrentSelect(value)}
          />
          <SRatioGroup />
        </SCard>
      </YStack>
    </ScrollView>
  )
}
