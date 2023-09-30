import type { PropsWithChildren } from 'react'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  useToastState
} from '@tamagui/toast'

export default function GlobalToastProvider(
  props: PropsWithChildren
): React.JSX.Element {
  const toast = useToastState()

  return (
    <ToastProvider>
      <Toast
        duration={toast?.duration}
        enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
        exitStyle={{ opacity: 0, scale: 1, y: -20 }}
        y={200}
        opacity={1}
        scale={1}
        animation="300ms"
        viewportName={toast?.viewportName}
      >
        <Toast.Title>{toast?.title}</Toast.Title>
        <Toast.Description>{toast?.message}</Toast.Description>
      </Toast>
      {props.children}
      <ToastViewport />
    </ToastProvider>
  )
}
