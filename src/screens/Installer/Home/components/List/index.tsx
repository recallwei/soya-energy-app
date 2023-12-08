import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { useAsyncEffect } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Circle, SizableText, styled, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { ManagementTab } from '@/screens/Installer/Management/enums'
import { useThemeStore } from '@/store'
import { CacheUtils } from '@/utils'

import ProgressBar from '../ProgressBar'

interface Item {
  id: string
  name: string
  url: string
  total: number
  normal: number
  offline: number
  normalRunningRate: number
  alarm: number
  notMonitored: number
}

const mockData: Item[] = [
  {
    id: '1',
    name: '户用电站',
    url: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/house.png',
    total: 4,
    normal: 3,
    offline: 1,
    normalRunningRate: 75,
    alarm: 0,
    notMonitored: 0
  },
  {
    id: '2',
    name: '逆变器',
    url: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/invertor.png',
    total: 4,
    normal: 3,
    offline: 1,
    normalRunningRate: 75,
    alarm: 0,
    notMonitored: 0
  },
  {
    id: '3',
    name: '电池',
    url: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/battery.png',
    total: 4,
    normal: 3,
    offline: 1,
    normalRunningRate: 75,
    alarm: 0,
    notMonitored: 0
  }
]

export default function List() {
  const { t } = useTranslation('Installer.Home')
  const themeStore = useThemeStore()
  const { navigate } = useNavigation()

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob(mockData.map((item) => item.url))
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
        navigate('Installer.Management', {
          currentTab: ManagementTab.Plant
        })
        break
      case '2':
        navigate('Installer.Management', {
          currentTab: ManagementTab.Inverter
        })
        break
      case '3':
        navigate('Installer.Management', {
          currentTab: ManagementTab.Battery
        })
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
      data={mockData}
      keyExtractor={({ id }: Item) => id}
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
                <SizableText
                  marginTop="$2.5"
                  fontWeight="$semiBold"
                  fontSize="$4"
                >
                  {item.name}
                </SizableText>
                <CachedImage
                  source={item.url}
                  style={{
                    width: '70%',
                    height: 120,
                    shadowRadius: 4,
                    shadowOpacity: 0.05,
                    borderRadius: 4
                    // backgroundColor: themeStore.theme === 'light' ? 'white' : '$gray6'
                  }}
                />
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
                    <SizableText
                      fontSize="$6"
                      fontWeight="$bold"
                    >
                      {item.total}
                    </SizableText>
                    <SizableText
                      lineHeight={16}
                      fontSize={10}
                    >
                      {t('Total')}
                    </SizableText>
                  </StatisticCard>
                  <StatisticCard>
                    <SizableText
                      fontSize="$6"
                      fontWeight="$bold"
                    >
                      {item.total}%
                    </SizableText>
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
                    <SizableText
                      fontSize="$6"
                      fontWeight="$bold"
                    >
                      {item.total}
                    </SizableText>
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
                    <SizableText
                      fontSize="$6"
                      fontWeight="$bold"
                    >
                      {item.total}
                    </SizableText>
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
                    <SizableText
                      fontSize="$6"
                      fontWeight="$bold"
                    >
                      {item.total}
                    </SizableText>
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
                    <SizableText
                      fontSize="$6"
                      fontWeight="$bold"
                    >
                      {item.total}
                    </SizableText>
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
            <ProgressBar />
          </YStack>
        </Card>
      )}
    />
  )
}
