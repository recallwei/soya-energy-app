import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import type { stackItemType } from 'react-native-gifted-charts/src/BarChart/types'
import {
  Paragraph,
  ScrollView,
  SizableText,
  Slider,
  Switch,
  ToggleGroup,
  View,
  XStack,
  YStack
} from 'tamagui'

import { Card, HeadingTitle } from '@/components'
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

export default function Screen() {
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
    <View>
      <ScrollView
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
        >
          <ToggleGroup
            alignSelf="center"
            orientation="horizontal"
            type="single"
            size="$3"
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
              <SizableText>Day</SizableText>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="month"
              width="auto"
            >
              <SizableText>Month</SizableText>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="year"
              width="auto"
            >
              <SizableText>Year</SizableText>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="lifetime"
              width="auto"
            >
              <SizableText>Life Time</SizableText>
            </ToggleGroup.Item>
          </ToggleGroup>

          <HeadingTitle title="Produced" />

          <PieChartArea
            data={producedData}
            unit="kWh"
          />

          <HeadingTitle title="Consumed" />

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
              flex={1}
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
              <SizableText size="$3">Produced</SizableText>
            </YStack>

            <YStack
              justifyContent="center"
              alignItems="center"
              space="$2"
              flex={1}
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
              <SizableText size="$3">Consumed</SizableText>
            </YStack>

            <YStack
              justifyContent="center"
              alignItems="center"
              space="$2"
              flex={1}
            >
              <Switch
                size="$3"
                backgroundColor="#dddddd"
                checked={imported}
                onCheckedChange={handleChangeImported}
              >
                <Switch.Thumb animation="quick" />
              </Switch>
              <Paragraph size="$3">Imported/Exported</Paragraph>
            </YStack>

            <YStack
              justifyContent="center"
              alignItems="center"
              space="$2"
              flex={1}
            >
              <Switch
                size="$3"
                backgroundColor="#dddddd"
                checked={charged}
                onCheckedChange={handleChangeCharged}
              >
                <Switch.Thumb animation="quick" />
              </Switch>
              <Paragraph size="$3">Charged/Discharged</Paragraph>
            </YStack>
          </XStack>

          <HeadingTitle title="Performance" />

          <Card>
            <YStack space="$4">
              <XStack>
                <SizableText>Energy Independence: </SizableText>
                <SizableText color="green">89%</SizableText>
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
              <SizableText
                marginTop="$2"
                size="$3"
              >
                Measures your independence from the utility grid
              </SizableText>
            </YStack>
          </Card>

          <Card>
            <YStack space="$2">
              <XStack>
                <SizableText fontWeight="500">Currency Equivalent</SizableText>
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
                  <SizableText
                    color="#0078d7"
                    fontWeight="600"
                  >
                    10.0 kWh
                  </SizableText>
                  <SizableText size="$3">Net Exported</SizableText>
                </YStack>
                <SizableText size="$3">=</SizableText>
                <YStack
                  justifyContent="center"
                  alignItems="center"
                  gap="$1"
                >
                  <SizableText color="#333333">$ 9.0</SizableText>
                  <SizableText size="$3">Equivalent</SizableText>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          <Card>
            <YStack space="$2">
              <XStack>
                <SizableText>Environmental Impact</SizableText>
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
                  <SizableText color="#0078d7">35.9 kWh</SizableText>
                  <SizableText size="$3">Equivalent</SizableText>
                </YStack>
                <YStack
                  justifyContent="center"
                  alignItems="center"
                  gap="$1"
                  width="50%"
                >
                  <SizableText color="#333333">26.0 KG</SizableText>
                  <SizableText size="$3">CO₂ Reduction</SizableText>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          <Card>
            <YStack space="$2">
              <XStack>
                <SizableText>Net Exported</SizableText>
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
                  <SizableText
                    color="#0078d7"
                    fontWeight="600"
                  >
                    10.0 kWh
                  </SizableText>
                  <SizableText size="$3">Net Exported</SizableText>
                </YStack>
              </XStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </View>
  )
}
