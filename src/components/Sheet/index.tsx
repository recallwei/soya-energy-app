import { memo, type PropsWithChildren } from 'react'
import { Sheet as TSheet } from 'tamagui'

import { useSafeAreaPadding } from '@/hooks'

interface Props extends PropsWithChildren {
  open?: boolean
  setOpen?: (open: boolean) => void
  scrollable?: boolean
}

const Sheet = memo((props: Props) => {
  const { open, setOpen, children, scrollable = false } = props
  const { paddingBottom } = useSafeAreaPadding()

  return (
    <TSheet
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={100_000}
      modal
      animation="medium"
    >
      <TSheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <TSheet.Handle />
      <TSheet.Frame paddingBottom={paddingBottom}>
        <TSheet.ScrollView
          maxHeight={400}
          scrollEnabled={scrollable}
        >
          {children}
        </TSheet.ScrollView>
      </TSheet.Frame>
    </TSheet>
  )
})

export default Sheet
