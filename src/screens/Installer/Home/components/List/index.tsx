import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { useAsyncEffect } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Circle, SizableText, Stack, styled, View, XStack, YStack } from 'tamagui'

import { AnimationNumber, Card } from '@/components'
import { SYSTEM_RESOURCE } from '@/constants'
import { ManagementTab } from '@/screens/Installer/Management/enums'
import { useThemeStore } from '@/store'
import { CacheUtils } from '@/utils'

import { useHomeDeviceStatisticQuery } from '../../hooks'
import ProgressBar from '../ProgressBar'

export default function List() {
  const { t } = useTranslation('Installer.Home')
  const themeStore = useThemeStore()
  const { navigate } = useNavigation()

  const { statisticData } = useHomeDeviceStatisticQuery()

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob([
      SYSTEM_RESOURCE.PLANT_DEFAULT_IMAGE_URL,
      SYSTEM_RESOURCE.INVERTER_DEFAULT_IMAGE_URL,
      SYSTEM_RESOURCE.BATTERY_DEFAULT_IMAGE_URL
    ])
  }, [])

  const StatisticCard = styled(View, {
    width: '50%',
    backgroundColor: themeStore.theme === 'light' ? 'white' : '$gray6',
    shadowColor: '$shadowColor',
    shadowRadius: 4,
    shadowOpacity: 0.05,
    paddingVertical: '$0.5',
    paddingHorizontal: '$2',
    borderRadius: '$1'
  })

  const handleClickCard = (id: string) => {
    switch (id) {
      case '1':
        navigate('Installer.Management', { currentTab: ManagementTab.Plant })
        break
      case '2':
        navigate('Installer.Management', { currentTab: ManagementTab.Inverter })
        break
      case '3':
        navigate('Installer.Management', { currentTab: ManagementTab.Battery })
        break
      default:
        break
    }
  }

  return (
    <FlatList
      contentContainerStyle={{ gap: 6 }}
      numColumns={1}
      scrollEnabled={false}
      data={statisticData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Card onPress={() => handleClickCard(item.id)}>
          <YStack
            space="$2"
            width="100%"
          >
            <XStack
              space="$2"
              justifyContent="space-between"
            >
              <YStack
                justifyContent="space-between"
                alignItems="center"
                width="20%"
              >
                <Stack />
                <SizableText
                  marginTop="$2.5"
                  fontWeight="$semiBold"
                  fontSize="$4"
                >
                  {t('Plant')}
                </SizableText>

                <CachedImage
                  source={item?.url}
                  style={{
                    width: 60,
                    height: 60,
                    overflow: 'hidden',
                    shadowRadius: 4,
                    shadowOpacity: 0.05,
                    borderRadius: 8,
                    marginBottom: 10
                  }}
                  resizeMode="cover"
                />
                <Stack />
              </YStack>

              <YStack
                space="$2"
                width="100%"
              >
                <XStack
                  width="75%"
                  space="$2"
                >
                  <StatisticCard>
                    <AnimationNumber
                      fontSize="$6"
                      fontWeight="$bold"
                      value={item?.total}
                    />
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Total')}
                    </SizableText>
                  </StatisticCard>
                  <StatisticCard>
                    <AnimationNumber
                      fontSize="$6"
                      fontWeight="$bold"
                      value={item?.normalRate}
                      suffix="%"
                    />
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Normal.Running.Rate')}
                    </SizableText>
                  </StatisticCard>
                </XStack>
                <XStack
                  width="75%"
                  space="$2"
                >
                  <StatisticCard>
                    <AnimationNumber
                      fontSize="$6"
                      fontWeight="$bold"
                      value={item?.normal}
                    />
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Normal')}
                    </SizableText>
                    <Circle
                      size="$0.75"
                      backgroundColor="green"
                      position="absolute"
                      right={10}
                      top={10}
                      margin="auto"
                    />
                  </StatisticCard>
                  <StatisticCard>
                    <AnimationNumber
                      fontSize="$6"
                      fontWeight="$bold"
                      value={item?.alarm}
                    />
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Alarm')}
                    </SizableText>
                    <Circle
                      size="$0.75"
                      backgroundColor="red"
                      position="absolute"
                      right={10}
                      top={10}
                      margin="auto"
                    />
                  </StatisticCard>
                </XStack>
                <XStack
                  width="75%"
                  space="$2"
                >
                  <StatisticCard>
                    <AnimationNumber
                      fontSize="$6"
                      fontWeight="$bold"
                      value={item?.offline}
                    />
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Offline')}
                    </SizableText>
                    <Circle
                      size="$0.75"
                      backgroundColor="gray"
                      position="absolute"
                      right={10}
                      top={10}
                      margin="auto"
                    />
                  </StatisticCard>
                  <StatisticCard>
                    <AnimationNumber
                      fontSize="$6"
                      fontWeight="$bold"
                      value={item?.unmonitored}
                    />
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Not.Monitored')}
                    </SizableText>
                    <Circle
                      size="$0.75"
                      backgroundColor="orange"
                      position="absolute"
                      right={10}
                      top={10}
                      margin="auto"
                    />
                  </StatisticCard>
                </XStack>
              </YStack>
            </XStack>
            <ProgressBar
              {...{
                normal: item?.normalRate,
                alarm: item?.alarmRate,
                notMonitored: item?.unmonitoredRate,
                offline: item?.offlineRate
              }}
            />
          </YStack>
        </Card>
      )}
    />
  )
}
