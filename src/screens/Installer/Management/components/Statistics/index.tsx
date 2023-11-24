import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { Circle, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { globalStyles } from '@/constants'

import { TabStatus } from '../../enums'
import { getColor } from '../../utils'

export default function Statistics() {
  const { t } = useTranslation('Installer.Management')

  const tabList = [
    {
      text: t('Status.All'),
      value: TabStatus.All
    },
    {
      text: t('Status.Normal'),
      value: TabStatus.Normal
    },
    {
      text: t('Status.Alarm'),
      value: TabStatus.Alarm
    },
    {
      text: t('Status.Offline'),
      value: TabStatus.Offline
    },
    {
      text: t('Status.Not.Monitored'),
      value: TabStatus.NotMonitored
    }
  ]

  const [activeStatus, setActiveStatus] = useState<TabStatus>(TabStatus.All)

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
            {tabList.map((tabItem) => (
              <TouchableOpacity onPress={() => handleClickTab(tabItem)}>
                <YStack key={tabItem.value}>
                  <XStack
                    alignItems="center"
                    space="$1.5"
                  >
                    {getColor(tabItem.value) && (
                      <Circle
                        position="absolute"
                        left={-10}
                        size="$0.75"
                        backgroundColor={getColor(tabItem.value)}
                      />
                    )}
                    <SizableText fontSize="$3">{tabItem.text}</SizableText>
                  </XStack>
                  <SizableText
                    fontSize="$4"
                    alignSelf="center"
                  >
                    {Math.floor(Math.random() * 100)}
                  </SizableText>
                  {activeStatus === tabItem.value && (
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
