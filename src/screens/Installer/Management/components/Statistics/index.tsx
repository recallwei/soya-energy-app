import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Circle, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { globalStyles } from '@/constants'
import i18n from '@/i18n'

import { TabStatus } from '../../enums'

const tabList = [
  {
    text: () => i18n.t('Installer.Management:Status.All'),
    value: TabStatus.All
  },
  {
    text: () => i18n.t('Installer.Management:Status.Normal'),
    value: TabStatus.Normal
  },
  {
    text: () => i18n.t('Installer.Management:Status.Alarm'),
    value: TabStatus.Alarm
  },
  {
    text: () => i18n.t('Installer.Management:Status.Offline'),
    value: TabStatus.Offline
  },
  {
    text: () => i18n.t('Installer.Management:Status.Not.Monitored'),
    value: TabStatus.NotMonitored
  }
]

export default function Statistics() {
  const [activeStatus, setActiveStatus] = useState<TabStatus>(TabStatus.All)
  const getColor = (value: TabStatus) => {
    switch (value) {
      case TabStatus.Normal:
        return 'green'
      case TabStatus.Alarm:
        return 'red'
      case TabStatus.Offline:
        return 'gray'
      case TabStatus.NotMonitored:
        return 'yellow'
      case TabStatus.All:
      default:
        return undefined
    }
  }

  const handleClickTab = (tab: (typeof tabList)[0]) => {
    setActiveStatus(tab.value)
  }

  return (
    <View
      paddingHorizontal="$4"
      paddingVertical="$2"
    >
      <Card>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <XStack
            space="$6"
            justifyContent="space-between"
            minWidth="100%"
          >
            {tabList.map((t) => (
              <TouchableOpacity onPress={() => handleClickTab(t)}>
                <YStack key={t.value}>
                  <XStack
                    alignItems="center"
                    space="$1.5"
                  >
                    {getColor(t.value) && (
                      <Circle
                        position="absolute"
                        left={-10}
                        size="$0.75"
                        backgroundColor={getColor(t.value)}
                      />
                    )}
                    <SizableText fontSize="$3">{t.text()}</SizableText>
                  </XStack>
                  <SizableText
                    fontSize="$4"
                    alignSelf="center"
                  >
                    {Math.floor(Math.random() * 100)}
                  </SizableText>
                  {activeStatus === t.value && (
                    <View
                      backgroundColor={globalStyles.primaryColor}
                      width="$1"
                      height="$0.5"
                      borderRadius="$3"
                      alignSelf="center"
                    />
                  )}
                </YStack>
              </TouchableOpacity>
            ))}
          </XStack>
        </ScrollView>
      </Card>
    </View>
  )
}
