import { useRoute } from '@react-navigation/native'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, Spinner, XStack, YStack } from 'tamagui'

import { InputTitle } from '@/components'
import type { RouteProp } from '@/types'

import { useEditForm, useEditMutation } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Global', 'Validation', 'Common.Inverter'])
  const route = useRoute<RouteProp<'Common.Inverter.Edit'>>()

  const { control, handleResetForm, handleSubmit, handleSubmitError } = useEditForm()
  const { isPending, handleEditMutate } = useEditMutation({ handleResetForm })

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <Controller
        name="deviceComponentPower"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle required>{t('Common.Inverter:Access.Component.Power')}</InputTitle>
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                keyboardType="decimal-pad"
                width="100%"
                maxLength={30}
                autoCapitalize="none"
                placeholder={t('Validation:Device.Component.Power.Not.Null')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isPending}
                borderColor={error ? 'red' : undefined}
              />
            </XStack>
          </YStack>
        )}
      />
      <Controller
        name="deviceAlias"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle>{t('Common.Inverter:Alias')}</InputTitle>
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                width="100%"
                maxLength={20}
                autoCapitalize="none"
                placeholder={t('Validation:Device.Alias.Not.Null')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isPending}
                borderColor={error ? 'red' : undefined}
              />
            </XStack>
          </YStack>
        )}
      />
      <Button
        width="100%"
        marginTop="$4"
        onPress={handleSubmit(
          (data) =>
            handleEditMutate({
              id: route.params.id,
              ...data
            }),
          handleSubmitError
        )}
        disabled={isPending}
        icon={isPending ? <Spinner /> : undefined}
      >
        {t('Submit')}
      </Button>
    </YStack>
  )
}