import { useTranslation } from 'react-i18next'
import { Separator, SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'

export default function Statistics() {
  const { t } = useTranslation('Installer.Home')

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
                18.2
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
                22.4
              </SizableText>
              <SizableText fontSize="$3">kWp</SizableText>
            </XStack>
            <SizableText fontSize="$2">{t('Total.Installed.Capacity')}</SizableText>
          </YStack>
        </Card>
      </XStack>

      <Card>
        <XStack justifyContent="space-between">
          <YStack alignItems="center">
            <XStack space="$2">
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                12.8
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
          <YStack alignItems="center">
            <XStack space="$2">
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                358.6
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
          <YStack alignItems="center">
            <XStack space="$2">
              <SizableText
                fontSize="$7"
                fontWeight="$bold"
              >
                2984.2
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
