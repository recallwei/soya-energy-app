import { memo, type PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Sheet as TSheet } from 'tamagui'

export interface SheetProps extends PropsWithChildren {
  open?: boolean
  setOpen?: (open: boolean) => void
  scrollable?: boolean
}

const Sheet = memo((props: SheetProps) => {
  const { open, setOpen, children, scrollable = false } = props
  const insets = useSafeAreaInsets()

  return (
    <TSheet
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={999_999}
      modal
      animation="medium"
    >
      <TSheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <TSheet.Handle />
      <TSheet.Frame paddingBottom={insets.bottom}>
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
