import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Label, Spinner, Text, ToggleGroup, XStack, YStack } from 'tamagui'

import { Card } from '@/components'

import { SolarGrid } from './components'

type TimeTab = 'day' | 'month' | 'year' | 'lifetime'

export default function SolarArray() {
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

  useEffect(() => {
    refetch()
  }, [currentTimeTab, refetch])

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
            <Card>
              <YStack space="$1">
                <XStack>
                  <Label>Quantity: </Label>
                  <Label>100 PCS</Label>
                </XStack>
                <XStack>
                  <Label>Avg Production: </Label>
                  <Label color="green">1.1 kWh</Label>
                </XStack>
                <XStack>
                  <Label>Total Production: </Label>
                  <Label color="green">110 kWh</Label>
                </XStack>
              </YStack>
            </Card>
          </>
        )}
      </XStack>
    </YStack>
  )
}
