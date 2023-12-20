import { useTranslation } from 'react-i18next'
import { Separator, SizableText, XStack, YStack } from 'tamagui'

import { AnimationNumber, Card } from '@/components'

import { useHomeStatisticQuery } from '../../hooks'

export default function Statistics() {
  const { t } = useTranslation('Installer.Home')
  const { data } = useHomeStatisticQuery()

  return (
    <YStack space="$2">
      <XStack justifyContent="space-between">
        <Card width="49%">
          <YStack alignItems="center">
            <XStack space="$2">
              <AnimationNumber
                fontSize="$7"
                fontWeight="$bold"
                value={data?.totalPowerGeneration}
              />
              <SizableText fontSize="$3">kWh</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Total.Energy.Generated')}</SizableText>
          </YStack>
        </Card>
        <Card width="49%">
          <YStack alignItems="center">
            <XStack space="$2">
              <AnimationNumber
                fontSize="$7"
                fontWeight="$bold"
                value={data?.totalInstalledCapacity}
              />
              <SizableText fontSize="$3">kWp</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Total.Installed.Capacity')}</SizableText>
          </YStack>
        </Card>
      </XStack>

      <Card>
        <XStack justifyContent="space-between">
          <YStack
            alignItems="center"
            flex={1}
          >
            <XStack space="$2">
              <AnimationNumber
                fontSize="$7"
                fontWeight="$bold"
                value={data?.todayPowerGeneration}
              />
              <SizableText fontSize="$3">kWh</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Today')}</SizableText>
          </YStack>
          <Separator
            alignSelf="stretch"
            vertical
            marginHorizontal={15}
          />
          <YStack
            alignItems="center"
            flex={1}
          >
            <XStack space="$2">
              <AnimationNumber
                fontSize="$7"
                fontWeight="$bold"
                value={data?.monthPowerGeneration}
              />
              <SizableText fontSize="$3">kWh</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('This.Month')}</SizableText>
          </YStack>
          <Separator
            alignSelf="stretch"
            vertical
            marginHorizontal={15}
          />
          <YStack
            alignItems="center"
            flex={1}
          >
            <XStack space="$2">
              <AnimationNumber
                fontSize="$7"
                fontWeight="$bold"
                value={data?.yearPowerGeneration}
              />
              <SizableText fontSize="$3">kWh</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Current.Year')}</SizableText>
          </YStack>
        </XStack>
      </Card>
    </YStack>
  )
}
