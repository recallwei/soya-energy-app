import { useTranslation } from 'react-i18next'
import type { SizableTextProps } from 'tamagui'
import { Button, Input, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'
import type { Updater } from 'use-immer'

import { HeadingTitle } from '@/components'
import { globalStyles } from '@/constants'
import { BooleanEnum } from '@/enums'

import { initialAdvanceFilter } from '../../constants'
import { DisplayRange, FundingMethod, GridType, Others, PlantType, UseType } from '../../enums'
import type { FormData, MultiSelectOption, SingleSelectOption } from '../../interfaces'

interface Props {
  advancedFilter: FormData
  setAdvancedFilter: Updater<FormData>
  setDrawerOpen: (open: boolean) => void
}

export default function DrawerContent(props: Props) {
  const { t } = useTranslation(['Installer.Management', 'Global'])
  const onChangeSingleSelect = ({ value, key }: { value: string; key: keyof SingleSelectOption }) =>
    props.setAdvancedFilter((draft) => {
      if (draft[key] === value) {
        draft[key] = null
        return
      }
      draft[key] = value
    })

  const onChangeMultiSelect = ({ value, key }: { value: string; key: keyof MultiSelectOption }) =>
    props.setAdvancedFilter((draft) => {
      if ((draft[key] as Set<string>).has(value)) {
        ;(draft[key] as Set<string>).delete(value)
        return
      }
      ;(draft[key] as Set<string>).add(value)
    })

  const handleReset = () => {
    props.setAdvancedFilter(() => ({ ...initialAdvanceFilter }))
  }

  const handleSubmit = () => {
    props.setDrawerOpen(false)
  }

  const getSingleSelectProps = ({
    value,
    key,
    single
  }: {
    value: string
    key: keyof SingleSelectOption
    single?: boolean
  }) => ({
    ...(single ? { width: '49%' } : { flex: 1 }),
    borderRadius: 4,
    size: '$3',
    onPress: () => onChangeSingleSelect({ value, key }),
    backgroundColor: props.advancedFilter[key] === value ? globalStyles.primaryColor : undefined,
    color: props.advancedFilter[key] === value ? 'white' : undefined,
    height: 'auto',
    padding: '$2',
    textProps: {
      numberOfLines: 3,
      textAlign: 'center'
    } as SizableTextProps
  })

  const getMultiSelectProps = ({
    value,
    key,
    single
  }: {
    value: string
    key: keyof MultiSelectOption
    single?: boolean
  }) => ({
    ...(single ? { width: '49%' } : { flex: 1 }),
    borderRadius: 4,
    size: '$3',
    onPress: () => onChangeMultiSelect({ value, key }),
    backgroundColor: (props.advancedFilter[key] as Set<string>).has(value)
      ? globalStyles.primaryColor
      : undefined,
    color: (props.advancedFilter[key] as Set<string>).has(value) ? 'white' : undefined,
    height: 'auto',
    padding: '$2',
    textProps: {
      numberOfLines: 3,
      textAlign: 'center'
    } as SizableTextProps
  })

  return (
    <View height="100%">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack
          space="$3"
          padding="$3"
        >
          <HeadingTitle title={t('Display.Range.Text')} />
          <YStack space="$2">
            <XStack space="$2">
              <Button {...getSingleSelectProps({ value: DisplayRange.All, key: 'displayRange' })}>
                {t('Display.Range.All')}
              </Button>
              <Button {...getSingleSelectProps({ value: DisplayRange.My, key: 'displayRange' })}>
                {t('Display.Range.My')}
              </Button>
            </XStack>
            <XStack space="$2">
              <Button
                {...getSingleSelectProps({ value: DisplayRange.Customer, key: 'displayRange' })}
              >
                {t('Display.Range.Customer')}
              </Button>
              <Button
                {...getSingleSelectProps({ value: DisplayRange.Visitors, key: 'displayRange' })}
              >
                {t('Display.Range.Visitor')}
              </Button>
            </XStack>
            <XStack space="$2">
              <Button
                {...getSingleSelectProps({
                  value: DisplayRange.Others,
                  key: 'displayRange',
                  single: true
                })}
              >
                {t('Display.Range.Others')}
              </Button>
            </XStack>
          </YStack>

          <HeadingTitle title={t('PlantType.Text')} />
          <YStack space="$2">
            <XStack space="$2">
              <Button {...getMultiSelectProps({ value: PlantType.On_Grid, key: 'plantType' })}>
                {t('PlantType.On.Grid')}
              </Button>
              <Button
                {...getMultiSelectProps({ value: PlantType.Energy_Storage, key: 'plantType' })}
              >
                {t('PlantType.Energy.Storage')}
              </Button>
            </XStack>
            <XStack space="$2">
              <Button
                {...getMultiSelectProps({
                  value: PlantType.AC_Coupling,
                  key: 'plantType',
                  single: true
                })}
              >
                {t('PlantType.AC.Coupling')}
              </Button>
            </XStack>
          </YStack>

          <HeadingTitle title={t('Use.Type.Text')} />
          <XStack space="$2">
            <Button
              {...getMultiSelectProps({
                value: UseType.Home_Use,
                key: 'useType'
              })}
            >
              {t('Use.Type.Home.Use')}
            </Button>
            <Button
              {...getMultiSelectProps({
                value: UseType.Industrial_And_Commercial_Roof,
                key: 'useType'
              })}
            >
              {t('Use.Type.Industrial.And.Commercial.Roof')}
            </Button>
          </XStack>
          <XStack space="$2">
            <Button
              {...getMultiSelectProps({
                value: UseType.Ground_Mounted_Plant,
                key: 'useType'
              })}
            >
              {t('Use.Type.Ground.Mounted.Plant')}
            </Button>
            <Button
              {...getMultiSelectProps({
                value: UseType.Poverty_Alleviation_Power_Plant,
                key: 'useType'
              })}
            >
              {t('Use.Type.Poverty.Alleviation.Power.Plant')}
            </Button>
          </XStack>

          <HeadingTitle title={t('Grid.Type.Text')} />
          <YStack space="$2">
            <XStack space="$2">
              <Button
                {...getMultiSelectProps({
                  value: GridType.Export_All_To_Grid,
                  key: 'gridType'
                })}
              >
                {t('Grid.Type.Export.All.To.Grid')}
              </Button>
              <Button
                {...getMultiSelectProps({
                  value: GridType.Self_Consumption,
                  key: 'gridType'
                })}
              >
                {t('Grid.Type.Self.Consumption.And.Export.Surplus.Energy.To.Grid')}
              </Button>
            </XStack>
            <XStack space="$2">
              <Button
                {...getMultiSelectProps({
                  value: GridType.Self_Consumption,
                  key: 'gridType',
                  single: true
                })}
              >
                {t('Grid.Type.Off.Grid.Mode')}
              </Button>
            </XStack>
          </YStack>

          <HeadingTitle title={t('Funding.Method.Text')} />
          <XStack space="$2">
            <Button
              {...getMultiSelectProps({
                value: FundingMethod.Owner_Full_Payment,
                key: 'fundingMethod'
              })}
            >
              {t('Funding.Method.Owner.Full.Payment')}
            </Button>
            <Button
              {...getMultiSelectProps({
                value: FundingMethod.Owners_Loan,
                key: 'fundingMethod'
              })}
            >
              {t('Funding.Method.Owners.Loan')}
            </Button>
          </XStack>
          <XStack space="$2">
            <Button
              {...getMultiSelectProps({
                value: FundingMethod.Self_Invested_Power_Plant,
                key: 'fundingMethod'
              })}
            >
              {t('Funding.Method.Self.Invested.Power.Plant')}
            </Button>
            <Button
              {...getMultiSelectProps({
                value: FundingMethod.Joint_Venture_With_Owner,
                key: 'fundingMethod'
              })}
            >
              {t('Funding.Method.Joint.Venture.With.Owner')}
            </Button>
          </XStack>

          <HeadingTitle title={t('Load.Monitoring')} />
          <XStack space="$2">
            <Button
              {...getSingleSelectProps({
                value: BooleanEnum.Y,
                key: 'loadMonitoring'
              })}
            >
              {t('Global:Y')}
            </Button>
            <Button
              {...getSingleSelectProps({
                value: BooleanEnum.N,
                key: 'loadMonitoring'
              })}
            >
              {t('Global:N')}
            </Button>
          </XStack>

          <HeadingTitle title={t('Plant.Capacity')} />
          <XStack
            alignItems="center"
            space="$2"
          >
            <Input
              size="$3"
              flex={1}
              placeholder={t('Global:Min')}
            />
            <SizableText>{t('To')}</SizableText>
            <Input
              size="$3"
              flex={1}
              placeholder={t('Global:Max')}
            />
          </XStack>

          <HeadingTitle title={t('City')} />
          <Input size="$3" />

          <HeadingTitle title={t('Others.Text')} />
          <XStack space="$2">
            <Button
              {...getMultiSelectProps({
                value: Others.Partially_Offline,
                key: 'others',
                single: true
              })}
            >
              {t('Others.Partially.Offline')}
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
      <XStack>
        <Button
          borderRadius={0}
          flex={1}
          onPress={handleReset}
        >
          {t('Global:Reset')}
        </Button>
        <Button
          borderRadius={0}
          backgroundColor={globalStyles.primaryColor}
          color="white"
          flex={1}
          onPress={handleSubmit}
        >
          {t('Global:Confirm')}
        </Button>
      </XStack>
    </View>
  )
}
