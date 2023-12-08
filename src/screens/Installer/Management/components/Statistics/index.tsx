import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { Circle, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { globalStyles } from '@/constants'

import type { ManagementTab } from '../../enums'
import { PlantTabStatus } from '../../enums'
import { getStatusMeta } from '../../utils'

interface Props {
  currentTab: ManagementTab
  status: string
  setStatus: (status: string) => void
}

const Statistics = memo((props: Props) => {
  const { i18n } = useTranslation()

  const handleClickTab = (tabStatus: PlantTabStatus) => props.setStatus(tabStatus)
  return (
    <View paddingHorizontal="$4">
      <Card disablePressScale>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <XStack
            space="$7"
            justifyContent="space-between"
            minWidth="100%"
          >
            {Object.values(PlantTabStatus).map((tabStatus) => {
              const { color, text } = getStatusMeta(tabStatus, props.currentTab)
              return (
                <TouchableOpacity
                  onPress={() => handleClickTab(tabStatus)}
                  key={tabStatus + i18n.language}
                >
                  <YStack key={tabStatus}>
                    <XStack
                      alignItems="center"
                      space="$1.5"
                    >
                      {color && (
                        <Circle
                          position="absolute"
                          left={-10}
                          size="$0.75"
                          backgroundColor={color}
                        />
                      )}
                      <SizableText fontSize="$3">{text}</SizableText>
                    </XStack>
                    <SizableText
                      fontSize="$4"
                      alignSelf="center"
                    >
                      {Math.floor(Math.random() * 100)}
                    </SizableText>
                    {props.status === tabStatus && (
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
              )
            })}
          </XStack>
        </ScrollView>
      </Card>
    </View>
  )
})
export default Statistics
