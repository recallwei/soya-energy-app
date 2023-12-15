import { TreePine } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, RefreshControl } from 'react-native'
import { ScrollView, SizableText, View, XStack, YStack } from 'tamagui'
import { useImmer } from 'use-immer'

import { BarChart, PieChart } from '@/charts'
import { Card, HeadingTitle } from '@/components'
import { globalStyles } from '@/constants'
import { DateRange } from '@/enums'
import { useRefresh } from '@/hooks'

import { DateRangeSelector, SwitchGroup } from './components'
import { pieChartData1, pieChartData2 } from './mock'
import type { EnergyBalanceParams } from './types'

export default function Screen() {
  const { t } = useTranslation('User.Analysis')
  const [currentTab, setCurrentTab] = useState<DateRange>(DateRange.DAY)
  const [energyBalanceParams, setEnergyBalanceParams] = useImmer<EnergyBalanceParams>({
    pvPower: true,
    loadPower: true,
    enablePower: true,
    enableBattery: true
  })

  const { refreshing, onRefresh } = useRefresh(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('')
        }, 1000)
      })
  )

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
          <DateRangeSelector {...{ currentTab, setCurrentTab }} />

          <HeadingTitle title={t('Energy')} />

          <Card
            size="$4"
            bordered
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
            padded
            overflow="visible"
            alignItems="center"
          >
            <PieChart
              width={200}
              height={250}
              borderRadius={12}
              overflow="hidden"
              data={pieChartData1}
            />
          </Card>

          <HeadingTitle title={t('Energy.Consumption')} />

          <Card
            size="$4"
            bordered
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
            padded
            overflow="visible"
            alignItems="center"
          >
            <PieChart
              width={200}
              height={250}
              data={pieChartData2}
            />
          </Card>

          <HeadingTitle title={t('Energy.Balance')} />

          <Card
            size="$4"
            bordered
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
            padded
            overflow="visible"
            alignItems="center"
          >
            <BarChart
              title="123"
              width={Dimensions.get('window').width - 32}
              height={250}
            />
          </Card>

          <SwitchGroup {...{ energyBalanceParams, setEnergyBalanceParams }} />

          <Card>
            <SizableText>123</SizableText>
          </Card>

          <HeadingTitle title={t('Environment.Impact')} />

          <Card>
            <YStack space="$2">
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
                  <SizableText color="#333333">26.0 KG</SizableText>
                  <SizableText size="$3">CO₂</SizableText>
                </YStack>
                <YStack
                  justifyContent="center"
                  alignItems="center"
                  gap="$1"
                  width="50%"
                >
                  <XStack
                    alignItems="center"
                    space="$1"
                  >
                    <SizableText color="#333333">35.9</SizableText>
                    <TreePine
                      size="$1"
                      color={globalStyles.primaryColor}
                    />
                  </XStack>
                  <SizableText size="$3">{t('Trees')}</SizableText>
                </YStack>
              </XStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </View>
  )
}
