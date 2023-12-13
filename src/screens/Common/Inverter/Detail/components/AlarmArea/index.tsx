import { Circle } from '@tamagui/lucide-icons'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Separator, SizableText, Stack, XStack, YStack } from 'tamagui'

const AlarmArea = memo(() => {
  const { t } = useTranslation('Common.Inverter')
  return (
    <XStack
      padding="$2"
      justifyContent="space-between"
    >
      <Stack />
      <YStack
        alignItems="center"
        space="$2"
      >
        <XStack
          alignItems="center"
          space="$0.5"
        >
          <Circle
            size={16}
            fill="#ff4d4f"
            color="#ff4d4f"
          />
          <SizableText size="$3">{t('Urgent.Alarms')}</SizableText>
        </XStack>
        <SizableText>0</SizableText>
      </YStack>

      <Separator vertical />

      <YStack
        alignItems="center"
        space="$2"
      >
        <XStack
          alignItems="center"
          space="$0.5"
        >
          <Circle
            size={16}
            fill="#ef4518"
            color="#ef4518"
          />
          <SizableText size="$3">{t('Important.Alarms')}</SizableText>
        </XStack>
        <SizableText>0</SizableText>
      </YStack>

      <Separator vertical />

      <YStack
        alignItems="center"
        space="$2"
      >
        <XStack
          alignItems="center"
          space="$0.5"
        >
          <Circle
            size={16}
            fill="#ff6600"
            color="#ff6600"
          />
          <SizableText size="$3">{t('General.Alarms')}</SizableText>
        </XStack>
        <SizableText>0</SizableText>
      </YStack>

      <Stack />
    </XStack>
  )
})
export default AlarmArea
