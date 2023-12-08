import { memo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Circle, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { globalStyles } from '@/constants'

import type { ManagementTab } from '../../enums'
import { PlantTabStatus } from '../../enums'
import { getStatusMeta } from '../../utils'

interface Props {
  currentTab: ManagementTab
}

const Statistics = memo((props: Props) => {
  const [activeStatus, setActiveStatus] = useState<PlantTabStatus>(PlantTabStatus.All)

  const handleClickTab = (tabStatus: PlantTabStatus) => setActiveStatus(tabStatus)

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
            {Object.values(PlantTabStatus).map((tabStatus) => (
              <TouchableOpacity onPress={() => handleClickTab(tabStatus)}>
                <YStack key={tabStatus}>
                  <XStack
                    alignItems="center"
                    space="$1.5"
                  >
                    {getStatusMeta(tabStatus, props.currentTab).color && (
                      <Circle
                        position="absolute"
                        left={-10}
                        size="$0.75"
                        backgroundColor={getStatusMeta(tabStatus, props.currentTab).color}
                      />
                    )}
                    <SizableText fontSize="$3">
                      {getStatusMeta(tabStatus, props.currentTab)?.text()}
                    </SizableText>
                  </XStack>
                  <SizableText
                    fontSize="$4"
                    alignSelf="center"
                  >
                    {Math.floor(Math.random() * 100)}
                  </SizableText>
                  {activeStatus === tabStatus && (
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
})
export default Statistics
