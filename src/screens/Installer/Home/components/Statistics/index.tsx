import { useTranslation } from 'react-i18next'
import { Separator, SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'

import { useHomeStatisticQuery } from '../../hooks'

export default function Statistics() {
  const { t } = useTranslation('Installer.Home')
  const { data } = useHomeStatisticQuery()

  return (
    <YStack space="$2">
      <XStack justifyContent="space-between">
        <Card width="49%">
          <YStack>
            <XStack space="$2">
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                {data?.totalPowerGeneration ?? '0'}
              </SizableText>
              <SizableText fontSize="$3">kWh</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Total.Energy.Generated')}</SizableText>
          </YStack>
        </Card>
        <Card width="49%">
          <YStack>
            <XStack space="$2">
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                {data?.totalInstalledCapacity ?? '0'}
              </SizableText>
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
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                {data?.todayPowerGeneration ?? '0'}
              </SizableText>
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
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                {data?.monthPowerGeneration ?? '0'}
              </SizableText>
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
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                {data?.yearPowerGeneration ?? '0'}
              </SizableText>
              <SizableText fontSize="$3">kWh</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Current.Year')}</SizableText>
          </YStack>
        </XStack>
      </Card>
    </YStack>
  )
}
