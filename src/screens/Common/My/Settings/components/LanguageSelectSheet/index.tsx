import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Label, Separator, YStack } from 'tamagui'

import { Sheet } from '@/components'
import { globalStyles } from '@/constants'
import { useLangStore } from '@/store'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const langList = [
  { code: 'en-US', name: 'English' },
  { code: 'zh-CN', name: '简体中文' }
]

export default function LanguageSelectSheet(props: Props) {
  const { t } = useTranslation('Global')

  const langStore = useLangStore()

  const handleChangeLang = (lang: string) => {
    langStore.setLang(lang)
    props.setOpen(false)
  }

  return (
    <Sheet
      open={props.open}
      setOpen={props.setOpen}
    >
      <YStack
        space="$4"
        padding="$4"
        alignItems="center"
      >
        {langList.map((item) => (
          <Fragment key={item.code}>
            <Label
              onPress={() => handleChangeLang(item.code)}
              color={langStore.lang === item.code ? globalStyles.primaryColor : '$color'}
            >
              {item.name}
            </Label>
            <Separator />
          </Fragment>
        ))}
        <Label onPress={() => props.setOpen(false)}>{t('Cancel')}</Label>
      </YStack>
    </Sheet>
  )
}
