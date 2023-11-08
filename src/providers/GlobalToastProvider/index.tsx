import { ToastProvider, ToastViewport, useToastState } from '@tamagui/toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function GlobalToastProvider() {
  const { left, top, right } = useSafeAreaInsets()

  const toast = useToastState()

  if (!toast || toast.isHandledNatively) {
    return null
  }

  return (
    <ToastProvider
      label="Bruce Song"
      duration={2000}
      swipeDirection="right"
      swipeThreshold={50}
      native
      burntOptions={{}}
      notificationOptions={{}}
    >
      {/* <Toast
        key={toast.id}
        duration={toast.duration}
        enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
        exitStyle={{ opacity: 0, scale: 1, y: -20 }}
        y={200}
        opacity={1}
        scale={1}
        animation="300ms"
        viewportName={toast.viewportName}
      >
        <Toast.Title>{toast.title}</Toast.Title>
        {!!toast.message && <Toast.Description>{toast.message}</Toast.Description>}
      </Toast> */}
      <ToastViewport
        label="Bruce Song"
        name="global"
        multipleToasts
        unstyled
        top={top}
        left={left}
        right={right}
      />
    </ToastProvider>
  )
}
