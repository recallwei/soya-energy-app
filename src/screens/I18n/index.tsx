import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'
import { Adapt, Select, Sheet, YStack } from 'tamagui'

import { changeLanguage } from '@/i18n'
import { TextStyles } from '@/styles'
import type { Lang } from '@/types/lang'

export default function I18nScreen(): React.JSX.Element {
  const { t } = useTranslation(['Global'])

  const [currentLang, setCurrentLang] = useState<Lang>('en')

  const languages = [
    {
      name: 'English',
      value: 'en'
    },
    {
      name: 'Français',
      value: 'fr'
    },
    {
      name: '简体中文',
      value: 'zh_cn'
    }
  ]

  const onChangeLanguage = (lang: Lang) => {
    setCurrentLang(lang)
    changeLanguage(lang).catch(() => {})
  }

  return (
    <YStack
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        style={{
          ...TextStyles.base,
          marginBottom: 20
        }}
      >
        {`${t('Global:Language.CurrentLanguage')} ${t(
          'Global:Language.Current'
        )}`}
      </Text>

      <Select
        value={currentLang}
        onValueChange={onChangeLanguage}
        disablePreventBodyScroll
      >
        <Select.Trigger
          width={220}
          iconAfter={ChevronDown}
        >
          <Select.Value placeholder="Something" />
        </Select.Trigger>

        <Adapt platform="touch">
          <Sheet
            native
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              <Select.Label>
                {t('Global:Language.CurrentLanguage')}
              </Select.Label>
              {languages.map((item, i) => (
                <Select.Item
                  index={i}
                  key={item.name}
                  value={item.value}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width="$4"
              pointerEvents="none"
            >
              {/* <ChevronDown size="$3" /> */}
            </YStack>
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </YStack>
  )
}
