import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function DevicesScreen() {
  const { refreshing, onRefresh } = useRefresh()

  const navigation = useNavigation()

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
        <MenuItemCard
          title="Gateway (1)"
          description="Normal"
          onPress={() => navigation.navigate('SystemDevicesGateway')}
        />
        <MenuItemCard
          title="Battery (2)"
          description="Normal"
          onPress={() => navigation.navigate('SystemDevicesBattery')}
        />
        <MenuItemCard
          title="System Controller (1)"
          description="Normal"
          onPress={() => navigation.navigate('SystemDevicesSystemControl')}
        />
        <MenuItemCard
          title="Microinverters (20)"
          description="Normal"
          onPress={() => navigation.navigate('SystemDevicesMicroinverters')}
        />
        <MenuItemCard
          title="Loads (4)"
          description="Normal"
          onPress={() => navigation.navigate('SystemDevicesLoads')}
        />
      </YStack>
    </ScrollView>
  )
}
