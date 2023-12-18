import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, Spinner, XStack, YStack } from 'tamagui'

import { InputTitle } from '@/components'
import { usePlantStore } from '@/store'

import { useCreateForm, useCreateMutation } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Global', 'Validation', 'Common.Inverter'])
  const plantStore = usePlantStore()
  const { control, handleResetForm, handleSubmit, handleSubmitError } = useCreateForm()
  const { isPending, handleCreateMutate } = useCreateMutation({ handleResetForm })

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <Controller
        name="deviceSN"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle required>{t('Common.Inverter:Inverter.SN')}</InputTitle>
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                width="100%"
                maxLength={30}
                autoCapitalize="none"
                placeholder={t('Validation:Inverter.SN.Not.Null')}
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
            handleCreateMutate({
              plantId: plantStore.currentPlant!.id,
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
