import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import type { stackItemType } from 'react-native-gifted-charts/src/BarChart/RenderStackBars'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Label, ScrollView, Slider, Switch, Text, ToggleGroup, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useRefresh } from '@/hooks'

import { PieChartArea, StackChartArea } from './components'
import { getMockPieChartData, getMockStackChartData } from './mock'

interface PieChartItem {
  value: number
  label?: string
  frontColor?: string
  color?: string
  percentage?: number
  text?: string
}

type TimeTab = 'day' | 'month' | 'year' | 'lifetime'

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets()

  const [producedData, setProducedData] = useState<PieChartItem[]>([
    {
      label: 'Spontaneous self use',
      value: 5.31,
      percentage: 27.08,
      color: '#4a7903'
    },
    {
      label: 'On-grid',
      value: 14.3,
      percentage: 72.92,
      color: '#0078d7'
    }
  ])

  const [consumedData, setConsumedData] = useState<PieChartItem[]>([
    {
      label: 'Self use',
      value: 52.17,
      percentage: 52.17,
      color: '#f59a23'
    },
    {
      label: 'Purchase',
      value: 44.83,
      percentage: 44.83,
      color: '#ffdf80'
    }
  ])

  const [stackChartData, setStackChartData] = useState<stackItemType[]>([])

  const [currentTimeTab, setCurrentTimeTab] = useState<TimeTab>('day')

  const [produced, setProduced] = useState(true)
  const [consumed, setConsumed] = useState(true)
  const [imported, setImported] = useState(true)
  const [charged, setCharged] = useState(true)

  const handleChangeProduced = () => {
    setProduced(!produced)
    resetData()
  }

  const handleChangeConsumed = () => {
    setConsumed(!consumed)
    resetData()
  }

  const handleChangeImported = () => {
    setImported(!imported)
    resetData()
  }

  const handleChangeCharged = () => {
    setCharged(!charged)
    resetData()
  }

  const { refreshing, onRefresh } = useRefresh(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resetData()
          resolve('')
        }, 1000)
      })
  )

  const { refetch } = useQuery({
    queryKey: ['SolarArray'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resetData()
          resolve('')
        }, 1000)
      })
  })

  useEffect(() => {
    refetch()
  }, [currentTimeTab, refetch])

  function resetData() {
    setProducedData(getMockPieChartData('#4a7903', '#0078d7'))
    setConsumedData(getMockPieChartData('#f59a23', '#ffdf80'))
    setStackChartData(getMockStackChartData())
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
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
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
            <Text fontFamily="$body">Day</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="month"
            width="auto"
          >
            <Text fontFamily="$body">Month</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="year"
            width="auto"
          >
            <Text fontFamily="$body">Year</Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="lifetime"
            width="auto"
          >
            <Text fontFamily="$body">Life Time</Text>
          </ToggleGroup.Item>
        </ToggleGroup>

        <Label>Produced</Label>

        <PieChartArea
          data={producedData}
          unit="kWh"
        />

        <Label>Consumed</Label>

        <PieChartArea
          data={consumedData}
          unit="kWh"
        />

        <View
          marginTop="$4"
          height={150}
        >
          <StackChartArea data={stackChartData} />
        </View>

        <XStack
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <YStack
            justifyContent="center"
            alignItems="center"
            space="$2"
          >
            <Switch
              size="$3"
              backgroundColor="#dddddd"
              checked={produced}
              onCheckedChange={handleChangeProduced}
            >
              <Switch.Thumb
                animation="quick"
                backgroundColor="#0078d7"
              />
            </Switch>
            <Label>Produced</Label>
          </YStack>

          <YStack
            justifyContent="center"
            alignItems="center"
            space="$2"
          >
            <Switch
              size="$3"
              backgroundColor="#dddddd"
              checked={consumed}
              onCheckedChange={handleChangeConsumed}
            >
              <Switch.Thumb
                animation="quick"
                backgroundColor="#f59a23"
              />
            </Switch>
            <Label>Consumed</Label>
          </YStack>

          <YStack
            justifyContent="center"
            alignItems="center"
            space="$2"
          >
            <Switch
              size="$3"
              backgroundColor="#dddddd"
              checked={imported}
              onCheckedChange={handleChangeImported}
            >
              <Switch.Thumb animation="quick" />
            </Switch>
            <Label>Imported/</Label>
            <Label>Exported</Label>
          </YStack>

          <YStack
            justifyContent="center"
            alignItems="center"
            space="$2"
          >
            <Switch
              size="$3"
              backgroundColor="#dddddd"
              checked={charged}
              onCheckedChange={handleChangeCharged}
            >
              <Switch.Thumb animation="quick" />
            </Switch>
            <Label>Charged/</Label>
            <Label>Discharged</Label>
          </YStack>
        </XStack>

        <Label>Performance</Label>

        <Card>
          <YStack gap="$4">
            <XStack>
              <Label>Energy Independence: </Label>
              <Label color="green">89%</Label>
            </XStack>
            <Slider
              defaultValue={[80]}
              max={100}
              step={1}
              size="$2"
              backgroundColor="#dddddd"
            >
              <Slider.Track backgroundColor="#dddddd">
                <Slider.TrackActive backgroundColor="green" />
              </Slider.Track>
              <Slider.Thumb
                index={0}
                circular
                elevate
                backgroundColor="green"
                borderColor="#dfdfdf"
                borderWidth={6}
              />
            </Slider>
            <Label marginTop="$2">Measures your independence from the utility grid</Label>
          </YStack>
        </Card>

        <Card>
          <YStack gap="$4">
            <XStack>
              <Label fontWeight="500">Currency Equivalent</Label>
            </XStack>

            <XStack
              justifyContent="center"
              alignItems="center"
              gap="$10"
            >
              <YStack
                justifyContent="center"
                alignItems="center"
                gap="$1"
              >
                <Label
                  color="#0078d7"
                  fontWeight="600"
                >
                  10.0 kWh
                </Label>
                <Label>Net Exported</Label>
              </YStack>
              <Label>=</Label>
              <YStack
                justifyContent="center"
                alignItems="center"
                gap="$1"
              >
                <Label color="#333333">$ 9.0</Label>
                <Label>Equivalent</Label>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        <Card>
          <YStack gap="$4">
            <XStack>
              <Label>Environmental Impact</Label>
            </XStack>

            <XStack
              justifyContent="center"
              alignItems="center"
            >
              <YStack
                justifyContent="center"
                alignItems="center"
                gap="$1"
                width="50%"
              >
                <Label color="#0078d7">35.9 kWh</Label>
                <Label>Equivalent</Label>
              </YStack>
              <YStack
                justifyContent="center"
                alignItems="center"
                gap="$1"
                width="50%"
              >
                <Label>CO₂ Reduction</Label>
                <Label color="#333333">26.0 KG</Label>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        <Card>
          <YStack gap="$4">
            <XStack>
              <Label>Net Exported</Label>
            </XStack>

            <XStack
              justifyContent="flex-start"
              alignItems="center"
              gap="$13"
            >
              <YStack
                justifyContent="center"
                alignItems="center"
                gap="$1"
                width="50%"
              >
                <Label
                  color="#0078d7"
                  fontWeight="600"
                >
                  10.0 kWh
                </Label>
                <Label>Net Exported</Label>
              </YStack>
            </XStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  )
}
