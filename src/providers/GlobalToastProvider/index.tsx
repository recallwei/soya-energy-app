import { Toast, ToastProvider, ToastViewport, useToastState } from '@tamagui/toast'

export default function GlobalToastProvider(): React.JSX.Element | null {
  const toast = useToastState()

  if (!toast || toast.isHandledNatively) {
    return null
  }

  return (
    <ToastProvider>
      <Toast
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
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}
