import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Spinner, Text, ToggleGroup, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'

import { SolarGrid } from './components'

type TimeTab = 'day' | 'month' | 'year' | 'lifetime'

export default function SolarArray(): React.JSX.Element {
  const [currentTimeTab, setCurrentTimeTab] = useState<TimeTab>('day')
  const { refetch, isFetching } = useQuery({
    queryKey: ['SolarArray'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('')
        }, 1000)
      })
  })

  return (
    <YStack rowGap="$4">
      <ToggleGroup
        alignSelf="center"
        orientation="horizontal"
        type="single"
        size="$4"
        disableDeactivation
        value={currentTimeTab}
        onValueChange={(value: TimeTab) => {
          setCurrentTimeTab(value)
          refetch().catch(() => {})
        }}
      >
        <ToggleGroup.Item
          value="day"
          width="auto"
        >
          <Text>Day</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="month"
          width="auto"
        >
          <Text>Month</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="year"
          width="auto"
        >
          <Text>Year</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="lifetime"
          width="auto"
        >
          <Text>Life Time</Text>
        </ToggleGroup.Item>
      </ToggleGroup>

      <XStack
        width="100%"
        flexWrap="wrap"
        justifyContent="center"
        gap="$4"
      >
        {isFetching ? (
          <Spinner marginTop="$2" />
        ) : (
          <>
            {Array.from({ length: 26 }).map((_, index) => (
              <SolarGrid
                key={index}
                height={10}
                width="20%"
                text="1.82 kWh"
              />
            ))}
            <SCard>
              <YStack space="$1">
                <XStack>
                  <Text>Quantity: </Text>
                  <Text>100 PCS</Text>
                </XStack>
                <XStack>
                  <Text>Avg Production: </Text>
                  <Text color="green">1.1 kWh</Text>
                </XStack>
                <XStack>
                  <Text>Total Production: </Text>
                  <Text color="green">110 kWh</Text>
                </XStack>
              </YStack>
            </SCard>
          </>
        )}
      </XStack>
    </YStack>
  )
}
