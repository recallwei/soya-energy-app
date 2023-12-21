import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, SizableText, Spinner, XStack, YStack } from 'tamagui'

import { InputTitle } from '@/components'
import type { RouteProp } from '@/types'

import { useInverterDetailQuery } from '../../Inverter/Detail/hooks'
import { useCreateForm, useCreateMutation } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Global', 'Validation', 'Common.Inverter', 'Common.Inverter'])
  const { navigate } = useNavigation()
  const route = useRoute<RouteProp<'Common.Plant.Create.Inverter'>>()

  const [inverterSn, setInverterSn] = useState('')
  const { detail } = useInverterDetailQuery({ deviceSN: inverterSn })
  const { control, handleSubmit, handleSubmitError, getValues } = useCreateForm()
  const { isPending, handleCreateMutate } = useCreateMutation()

  const isInverterExist = !!detail?.id

  return (
    <YStack
      padding="$4"
      gap="$3"
      position="relative"
      height="100%"
    >
      <Controller
        name="deviceSN"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle required>{t('Common.Inverter:Inverter.SN')}</InputTitle>
            <XStack space="$2">
              <Input
                flex={1}
                maxLength={30}
                autoCapitalize="none"
                placeholder={t('Validation:Inverter.SN.Not.Null')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isPending}
                borderColor={error ? 'red' : undefined}
              />
              <Button onPress={() => setInverterSn(getValues('deviceSN'))}>{t('Query')}</Button>
            </XStack>
          </YStack>
        )}
      />
      {isInverterExist ? (
        <YStack>
          <XStack justifyContent="space-between">
            <SizableText size="$3">{t('Common.Inverter:Access.Component.Power')}</SizableText>
            <SizableText size="$3"> {detail.deviceComponentPower}</SizableText>
          </XStack>
          <XStack justifyContent="space-between">
            <SizableText size="$3">{t('Common.Inverter:Inverter.Alias')}</SizableText>
            <SizableText size="$3">{detail.deviceAlias}</SizableText>
          </XStack>
        </YStack>
      ) : (
        <>
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
        </>
      )}
      {isInverterExist ? (
        <Button
          onPress={() =>
            navigate('Common.Plant.Create', {
              userId: route.params.userId,
              inverterSn
            })
          }
        >
          {t('Next.Step')}
        </Button>
      ) : (
        <Button
          width="100%"
          marginTop="$4"
          onPress={handleSubmit((data) => handleCreateMutate(data), handleSubmitError)}
          disabled={isPending}
          icon={isPending ? <Spinner /> : undefined}
        >
          {t('Submit')}
        </Button>
      )}
    </YStack>
  )
}
