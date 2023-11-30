import { ChevronDown } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { SizableText, View, XStack } from 'tamagui'

import type { SheetMenuProps } from '../SheetMenu'
import SheetMenu from '../SheetMenu'

interface Props {
  text?: string
  onPress?: () => void
  sheetMenu?: SheetMenuProps
}
const DropDownMenu = memo((props: Props) => {
  const { sheetMenu = {} } = props
  const { sheet = {} } = sheetMenu
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (typeof sheet.setOpen === 'function') {
            sheet.setOpen(true)
          }
          if (typeof props.onPress === 'function') {
            props.onPress()
          }
        }}
      >
        <XStack
          alignItems="center"
          space="$1"
        >
          <SizableText>{props.text}</SizableText>
          <View marginTop="$1">
            <ChevronDown size="$1" />
          </View>
        </XStack>
      </TouchableOpacity>
      <SheetMenu
        sheet={sheet}
        autoClose
        data={sheetMenu.data}
        footer={sheetMenu.footer}
      />
    </>
  )
})
export default DropDownMenu
