import React, { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { Separator, SizableText, YStack } from 'tamagui'

import type { SheetProps } from '../Sheet'
import Sheet from '../Sheet'

export interface SheetMenuProps {
  data?: SheetMenuListItem[]
  sheet?: SheetProps
  footer?: React.ReactNode
  autoClose?: boolean
}

export interface SheetMenuListItem<T = any> {
  text?: string | (() => string)
  value?: T
  onPress?: (value: SheetMenuListItem<T>) => void | Promise<void>
  color?: string
}

const SheetMenu = memo((props: SheetMenuProps) => {
  const { sheet = {} } = props
  const { t } = useTranslation()

  const handleCancel = () => {
    if (sheet.setOpen) {
      sheet.setOpen(false)
    }
  }

  const handlePress = async (item: SheetMenuListItem) => {
    if (item.onPress) {
      await item.onPress(item)
    }
    if (props.autoClose) {
      handleCancel()
    }
  }

  return (
    <Sheet
      open={sheet.open}
      setOpen={sheet.setOpen}
      scrollable={sheet.scrollable}
    >
      <YStack
        gap="$2"
        padding="$4"
        alignItems="center"
        flex={1}
      >
        {props.data &&
          props.data.map((item, index) => (
            <Fragment key={index}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <SizableText color={item.color}>
                  {typeof item.text === 'function' ? item.text() : item.text}
                </SizableText>
              </TouchableOpacity>
              <Separator width="100%" />
            </Fragment>
          ))}
        <SizableText onPress={handleCancel}>{t('Cancel')}</SizableText>
        {props.footer && props.footer}
      </YStack>
    </Sheet>
  )
})

export default SheetMenu
