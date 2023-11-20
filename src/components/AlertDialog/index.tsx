import type { PropsWithChildren } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertDialog as TAlertDialog, Button, XStack, YStack } from 'tamagui'

interface Props extends PropsWithChildren {
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

const AlertDialog = memo((props: Props) => {
  const { t } = useTranslation('Global')

  const {
    title = t('Confirm.Dialog.Default.Title'),
    description = t('Confirm.Dialog.Default.Description'),
    confirmText = t('Confirm.Dialog.Default.ConfirmText'),
    cancelText = t('Confirm.Dialog.Default.CancelText'),
    onConfirm = () => {},
    onCancel = () => {}
  } = props

  return (
    <TAlertDialog native>
      <TAlertDialog.Trigger asChild>{props.children}</TAlertDialog.Trigger>
      <TAlertDialog.Portal>
        <TAlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <TAlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <TAlertDialog.Title>{title}</TAlertDialog.Title>
            <TAlertDialog.Description>{description}</TAlertDialog.Description>
            <XStack
              space="$3"
              justifyContent="flex-end"
            >
              <TAlertDialog.Cancel
                asChild
                onPress={onCancel}
              >
                <Button>{cancelText}</Button>
              </TAlertDialog.Cancel>
              <TAlertDialog.Action
                asChild
                onPress={onConfirm}
              >
                <Button theme="active">{confirmText}</Button>
              </TAlertDialog.Action>
            </XStack>
          </YStack>
        </TAlertDialog.Content>
      </TAlertDialog.Portal>
    </TAlertDialog>
  )
})

export default AlertDialog
