import { memo } from 'react'
import { SizableText, XStack } from 'tamagui'

import { globalStyles } from '@/constants'

interface Props {
  title?: string
}

const HeadingTitle = memo((props: Props) => (
  <XStack
    borderLeftWidth="$1.5"
    borderLeftColor={globalStyles.primaryColor}
    paddingLeft="$2"
  >
    <SizableText>{props.title}</SizableText>
  </XStack>
))

export default HeadingTitle
