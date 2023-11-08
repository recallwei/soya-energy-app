import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { RefreshControl, SafeAreaView } from 'react-native'
import type { stackItemType } from 'react-native-gifted-charts/src/BarChart/RenderStackBars'
import { ScrollView, Slider, Switch, Text, ToggleGroup, View, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
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

export default function StatisticsScreen(): React.JSX.Element {
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

  function resetData() {
    setProducedData(getMockPieChartData('#4a7903', '#0078d7'))
    setConsumedData(getMockPieChartData('#f59a23', '#ffdf80'))
    setStackChartData(getMockStackChartData())
  }

  return (
    <SafeAreaView>
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
          <ToggleGroup
            alignSelf="center"
            orientation="horizontal"
            type="single"
            size="$4"
            disableDeactivation
            value={currentTimeTab}
            onValueChange={(value: TimeTab) => {
              setCurrentTimeTab(value)
              refetch()
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

          <Text
            fontFamily="$body"
            fontWeight="bold"
          >
            Produced
          </Text>

          <PieChartArea
            data={producedData}
            unit="kWh"
          />

          <Text
            fontFamily="$body"
            fontWeight="bold"
          >
            Consumed
          </Text>

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
              <Text fontFamily="$body">Produced</Text>
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
              <Text fontFamily="$body">Consumed</Text>
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
              <Text fontFamily="$body">Imported/</Text>
              <Text fontFamily="$body">Exported</Text>
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
              <Text fontFamily="$body">Charged/</Text>
              <Text fontFamily="$body">Discharged</Text>
            </YStack>
          </XStack>

          <Text
            fontFamily="$body"
            fontWeight="bold"
          >
            Performance
          </Text>

          <SCard>
            <YStack gap="$4">
              <XStack>
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                >
                  Energy Independence:{' '}
                </Text>
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                  color="green"
                >
                  89%
                </Text>
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
              <Text
                fontFamily="$body"
                marginTop="$2"
              >
                Measures your independence from the utility grid
              </Text>
            </YStack>
          </SCard>

          <SCard>
            <YStack gap="$4">
              <XStack>
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                >
                  Currency Equivalent
                </Text>
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
                  <Text
                    fontFamily="$body"
                    color="#0078d7"
                    fontWeight="600"
                  >
                    10.0 kWh
                  </Text>
                  <Text fontFamily="$body">Net Exported</Text>
                </YStack>
                <Text fontFamily="$body">=</Text>
                <YStack
                  justifyContent="center"
                  alignItems="center"
                  gap="$1"
                >
                  <Text
                    fontFamily="$body"
                    color="#333333"
                    fontWeight="600"
                  >
                    $ 9.0
                  </Text>
                  <Text fontFamily="$body">Equivalent</Text>
                </YStack>
              </XStack>
            </YStack>
          </SCard>

          <SCard>
            <YStack gap="$4">
              <XStack>
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                >
                  Environmental Impact
                </Text>
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
                  <Text
                    fontFamily="$body"
                    color="#0078d7"
                    fontWeight="600"
                  >
                    35.9 kWh
                  </Text>
                  <Text fontFamily="$body">Equivalent</Text>
                </YStack>
                <YStack
                  justifyContent="center"
                  alignItems="center"
                  gap="$1"
                  width="50%"
                >
                  <Text fontFamily="$body">CO₂ Reduction</Text>
                  <Text
                    fontFamily="$body"
                    color="#333333"
                    fontWeight="600"
                  >
                    26.0 KG
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </SCard>

          <SCard>
            <YStack gap="$4">
              <XStack>
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                >
                  Net Exported
                </Text>
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
                  <Text
                    fontFamily="$body"
                    color="#0078d7"
                    fontWeight="600"
                  >
                    10.0 kWh
                  </Text>
                  <Text fontFamily="$body">Net Exported</Text>
                </YStack>
              </XStack>
            </YStack>
          </SCard>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
