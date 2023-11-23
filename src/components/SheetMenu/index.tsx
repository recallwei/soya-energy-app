import React, { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { Separator, SizableText, YStack } from 'tamagui'

import Sheet from '../Sheet'

interface Props {
  open?: boolean
  setOpen?: (open: boolean) => void
  data?: SheetMenuListItem[]
  scrollable?: boolean
  autoClose?: boolean
}

export interface SheetMenuListItem<T = any> {
  text: string
  value?: T
  onPress?: (value: SheetMenuListItem<T>) => void | Promise<void>
  color?: string
}

const SheetMenu = memo((props: Props) => {
  const { t } = useTranslation()

  const handleCancel = () => {
    if (props.setOpen) {
      props.setOpen(false)
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
      open={props.open}
      setOpen={props.setOpen}
      scrollable={props.scrollable}
    >
      <YStack
        gap="$3"
        padding="$4"
        alignItems="center"
        flex={1}
      >
        {props.data &&
          props.data.map((item, index) => (
            <Fragment key={index}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <SizableText color={item.color}>{item.text}</SizableText>
              </TouchableOpacity>
              <Separator width="100%" />
            </Fragment>
          ))}
        <SizableText onPress={handleCancel}>{t('Cancel')}</SizableText>
      </YStack>
    </Sheet>
  )
})

export default SheetMenu
