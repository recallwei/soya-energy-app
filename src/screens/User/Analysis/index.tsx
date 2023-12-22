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
import { useEnergyStatisticsQuery } from './hooks'
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

  const {
    queryResult: statisticQueryResult,
    energyData,
    energyBalanceData,
    environmentImpactData,
    energyConsumptionData
  } = useEnergyStatisticsQuery()

  const { refreshing, onRefresh } = useRefresh(statisticQueryResult.refetch)

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

          {/* <DatePicker /> */}

          <HeadingTitle title={t('Energy')} />

          <Card
            size="$4"
            bordered
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
            overflow="visible"
            alignItems="center"
          >
            <PieChart
              width={Dimensions.get('window').width - 32}
              height={200}
              data={[
                {
                  name: t('Self.Consumption'),
                  value: energyData.selfConsumptionPower
                },
                {
                  name: t('Export.Energy'),
                  value: energyData.onlinePower
                }
              ]}
            />
          </Card>

          <HeadingTitle title={t('Energy.Consumption')} />

          <Card
            size="$4"
            bordered
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
            overflow="visible"
            alignItems="center"
          >
            <PieChart
              width={Dimensions.get('window').width - 32}
              height={200}
              data={[
                {
                  name: t('Self.Sufficiency'),
                  value: energyConsumptionData.selfUsePower
                },
                {
                  name: t('Import.Energy'),
                  value: energyConsumptionData.purchasePower
                }
              ]}
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
              xAxis={energyBalanceData.xAxis}
              series={[
                {
                  name: t('Self.Consumption'),
                  type: 'bar',
                  stack: 'A',
                  emphasis: {
                    focus: 'series'
                  },
                  data: energyBalanceData.loadPower
                },
                {
                  name: t('Export.Energy'),
                  type: 'bar',
                  stack: 'A',
                  emphasis: {
                    focus: 'series'
                  },
                  data: energyBalanceData.pvPower
                },
                {
                  name: t('Self.Sufficiency'),
                  type: 'bar',
                  stack: 'A',
                  emphasis: {
                    focus: 'series'
                  },
                  data: energyBalanceData.batteryPower
                },
                {
                  name: t('Import.Energy'),
                  type: 'bar',
                  stack: 'A',
                  emphasis: {
                    focus: 'series'
                  },
                  data: energyBalanceData.buyOrSellPower
                }
              ]}
            />
          </Card>

          <SwitchGroup {...{ energyBalanceParams, setEnergyBalanceParams }} />

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
              xAxis={energyBalanceData.xAxis}
              series={[
                {
                  name: t('Import.Energy'),
                  type: 'bar',
                  stack: 'A',
                  emphasis: {
                    focus: 'series'
                  },
                  data: energyBalanceData.buyOrSellPower
                }
              ]}
            />
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
                  <SizableText>{environmentImpactData.co2 || '--'} KG</SizableText>
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
                    <SizableText>{environmentImpactData.tree || '--'}</SizableText>
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
