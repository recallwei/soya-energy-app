import { RefreshControl } from 'react-native'
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'

import { SCheckbox } from '@/components'
import { useRefresh } from '@/hooks'

import { CollapseArea } from './components'

export default function MyNotificationScreen(): React.JSX.Element {
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
          fontSize="$6"
          fontWeight="bold"
          marginVertical="$2"
        >
          Manage My Notification
        </Text>
        <SCheckbox label="Show weather features for this site" />

        <YStack gap="$1">
          <XStack>
            <Text width="40%">Notification Type</Text>
            <Text
              width="20%"
              textAlign="center"
            >
              Text
            </Text>
            <Text
              width="20%"
              textAlign="center"
            >
              Email
            </Text>
            <Text
              width="20%"
              textAlign="center"
            >
              Push
            </Text>
          </XStack>
          <CollapseArea
            data={[
              {
                title: 'Errors',
                children: [
                  {
                    title: 'Communication',
                    description: 'Battery/Gateway/System Controller'
                  },
                  {
                    title: 'Production',
                    description: 'Solar power production errors'
                  },
                  {
                    title: 'Hardware',
                    description: 'System Controller errors'
                  }
                ]
              },
              {
                title: 'Alerts',
                children: [
                  {
                    title: 'Grid On/Off',
                    description: 'System switches to On Grid or Off'
                  },
                  {
                    title: 'Storm Guard',
                    description: 'Severe weather alert is issued or ended'
                  },
                  {
                    title: 'Battery Charge',
                    description: 'Battery charge alerts'
                  }
                ]
              },
              {
                title: 'Information',
                children: [
                  {
                    title: 'Monthly Report',
                    description: 'Energy report of your system'
                  },
                  {
                    title: 'Services',
                    description: 'Updates about services & upgrades'
                  },
                  {
                    title: 'Product',
                    description: 'Newsletters, promotions, and surveys'
                  }
                ]
              }
            ]}
          />

          <Button marginTop="$4">Save</Button>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
