import { AirVent, BatteryMedium, Refrigerator, Tv } from '@tamagui/lucide-icons'
import { RefreshControl } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import SListItemGroup from '@/components/SListItemGroup'
import { useRefresh } from '@/hooks'
import { SVG } from '@/svg'

import { CircleItem, LineSVG } from './components'

export default function LiveStatusScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

  const loadControlData = [
    { title: 'Air Conditioning', description: 'Solar', icon: AirVent },
    { title: 'Television', description: 'Solar', icon: Tv },
    { title: 'Refrigerator', description: 'Solar', icon: Refrigerator }
  ]

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
        space="$4"
      >
        <SCard>
          <YStack>
            <XStack
              justifyContent="center"
              alignItems="flex-end"
            >
              <CircleItem
                borderColor="#578e31"
                icon={
                  <SVG.SolarPanel
                    color="#333333"
                    width={25}
                    height={25}
                  />
                }
                iconText="1.4 kWh"
              />
            </XStack>

            <XStack
              justifyContent="center"
              alignItems="center"
              height={140}
            >
              <CircleItem
                icon={
                  <SVG.ElectricalTower
                    color="#333333"
                    width={25}
                    height={25}
                  />
                }
                iconText="0 kWh"
              />

              <LineSVG.Item1 />

              <CircleItem
                borderColor="#946121"
                icon={
                  <BatteryMedium
                    color="#333333"
                    size={25}
                  />
                }
                iconText="0 kWh"
              />
            </XStack>

            <XStack
              justifyContent="center"
              alignItems="flex-start"
            >
              <CircleItem
                icon={
                  <SVG.Home
                    color="#333333"
                    width={25}
                    height={25}
                  />
                }
                iconText="1.4 kWh"
              />
            </XStack>
          </YStack>
        </SCard>

        <YStack space="$2">
          <Text
            fontSize="$6"
            fontWeight="bold"
            marginLeft="$1"
          >
            Load Control
          </Text>

          <SListItemGroup
            data={loadControlData}
            separator
          />
        </YStack>
      </YStack>
    </ScrollView>
  )
}