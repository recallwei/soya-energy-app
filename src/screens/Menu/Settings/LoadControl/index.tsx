import { RefreshControl } from 'react-native'
import { ScrollView, Text, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

import { CollapseArea } from './components'

export default function LoadControlScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

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
        <Text
          fontSize="$5"
          fontWeight="500"
          marginLeft="$1"
        >
          Control power to your loads
        </Text>
        <CollapseArea
          data={{
            title: 'Well Pump',
            mode: 'Basic',
            children: [
              {
                mode: 'Basic',
                textList: ['On Grid: Powered', 'Off Grid: Not Powered']
              },
              {
                mode: 'Scheduled',
                textList: ['On Grid: Powered', 'Off Grid: Powered between 06:00 am and 11:00 pm']
              },
              {
                mode: 'Advanced',
                textList: ['On Grid: Powered', 'Off Grid: Powered when battery is above 50%']
              },
              {
                mode: 'Manual',
                textList: ['Always Powered']
              }
            ]
          }}
        />

        <CollapseArea
          data={{
            title: 'Dish Washer',
            mode: 'Advanced',
            children: [
              {
                mode: 'Basic',
                textList: ['On Grid: Powered', 'Off Grid: Not Powered']
              },
              {
                mode: 'Scheduled',
                textList: ['On Grid: Powered', 'Off Grid: Powered between 06:00 am and 11:00 pm']
              },
              {
                mode: 'Advanced',
                textList: ['On Grid: Powered', 'Off Grid: Powered when battery is above 50%']
              },
              {
                mode: 'Manual',
                textList: ['Always Powered']
              }
            ]
          }}
        />

        <CollapseArea
          data={{
            title: 'Air Conditioner',
            mode: 'Advanced',
            children: [
              {
                mode: 'Basic',
                textList: ['On Grid: Powered', 'Off Grid: Not Powered']
              },
              {
                mode: 'Scheduled',
                textList: ['On Grid: Powered', 'Off Grid: Powered between 06:00 am and 11:00 pm']
              },
              {
                mode: 'Advanced',
                textList: ['On Grid: Powered', 'Off Grid: Powered when battery is above 50%']
              },
              {
                mode: 'Manual',
                textList: ['Always Powered']
              }
            ]
          }}
        />
      </YStack>
    </ScrollView>
  )
}
