import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Paragraph, SizableText, YStack } from 'tamagui'

import { Checkbox } from '@/components'

export default function Screen() {
  const insets = useSafeAreaInsets()
  return (
    <YStack
      padding="$4"
      space="$2"
      height="100%"
      justifyContent="space-between"
      paddingBottom={insets.bottom}
    >
      <YStack space="$1">
        <Paragraph marginBottom="$2">注销后，账户将被永久删除，不可恢复。</Paragraph>
        <SizableText size="$3">1. 该账号与电站已无绑定关系</SizableText>
        <SizableText size="$3">2. 该账号与其他账号无关联关系</SizableText>
        <SizableText size="$3">3. 该账号无服务、资金未完结等情况</SizableText>
      </YStack>
      <YStack space="$3">
        <Checkbox label="已阅读并同意《账户注销协议》" />
        <Button>申请注销</Button>
      </YStack>
    </YStack>
  )
}
