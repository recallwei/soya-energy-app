import type { PropsWithChildren } from 'react'
import { memo } from 'react'
import { SizableText, XStack } from 'tamagui'

import { globalStyles } from '@/constants'

interface Props {
  required?: boolean
}
const InputTitle = memo((props: PropsWithChildren<Props>) => (
  <XStack space="$1">
    {props.required && <SizableText color={globalStyles.errorColor}>*</SizableText>}
    <SizableText marginLeft={props.required ? undefined : '$2.5'}>{props.children}</SizableText>
  </XStack>
))
export default InputTitle
