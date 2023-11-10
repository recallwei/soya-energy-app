import { useState } from 'react'
import { RefreshControl } from 'react-native'
import { Button, ScrollView, YStack } from 'tamagui'

import { Card, RadioGroup } from '@/components'
import { useRefresh } from '@/hooks'

export default function EnergyScreen(): React.JSX.Element {
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
        <Card>
          <RadioGroup
            value={currentSelect}
            data={[
              {
                label: 'Energy Independence',
                value: '1',
                description: 'Measures your independence from the utility grid'
              },
              {
                label: 'Grid Dependence',
                value: '2',
                description: 'Measures your dependence on the utility grid'
              }
            ]}
            onValueChange={(value) => setCurrentSelect(value)}
            description
          />
        </Card>
        <Button>Save</Button>
      </YStack>
    </ScrollView>
  )
}
