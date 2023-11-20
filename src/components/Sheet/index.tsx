import { memo, type PropsWithChildren } from 'react'
import { Sheet as TSheet } from 'tamagui'

interface Props extends PropsWithChildren {
  open?: boolean
  setOpen?: (open: boolean) => void
}

const Sheet = memo((props: Props) => {
  const { open, setOpen, children } = props
  return (
    <TSheet
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="medium"
    >
      <TSheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <TSheet.Handle />
      <TSheet.Frame padding="$4">{children}</TSheet.Frame>
    </TSheet>
  )
})

export default Sheet
