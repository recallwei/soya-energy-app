import { useTranslation } from 'react-i18next'
import type { SizableTextProps } from 'tamagui'
import { Button, Input, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'
import type { Updater } from 'use-immer'

import { HeadingTitle } from '@/components'
import { globalStyles } from '@/constants'
import { BooleanEnum } from '@/enums'

import { initialAdvanceFilter } from '../../constants'
import {
  BatteryType,
  DisplayRange,
  InverterType,
  ManagementTab,
  Others,
  PlantType
} from '../../enums'
import type { FormData, MultiSelectOption, SearchParams, SingleSelectOption } from '../../types'

interface Props {
  advancedFilter: FormData
  setAdvancedFilter: Updater<FormData>
  setDrawerOpen: (open: boolean) => void
  currentTab: ManagementTab
  setSearchParams: Updater<SearchParams>
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
    props.setSearchParams((draft) => {
      const {
        displayRange,
        loadMonitoring,
        plantType,
        systemPowerMax,
        systemPowerMin,
        others,
        inverterType,
        ratePowerMax,
        ratePowerMin,
        batteryType
      } = props.advancedFilter
      draft.displayRange = displayRange ?? ''
      draft.loadingMonitoring = loadMonitoring ?? ''
      draft.plantType = Array.from(plantType).join(',') ?? ''
      draft.systemPowerMax = systemPowerMax ?? ''
      draft.systemPowerMin = systemPowerMin ?? ''
      draft.others = Array.from(others).join(',') ?? ''
      draft.inverterType = Array.from(inverterType).join(',') ?? ''
      draft.ratePowerMax = ratePowerMax ?? ''
      draft.ratePowerMin = ratePowerMin ?? ''
      draft.batteryType = Array.from(batteryType).join(',') ?? ''
    })
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
          gap="$3"
          padding="$3"
        >
          {props.currentTab === ManagementTab.Plant && (
            <>
              <HeadingTitle title={t('Display.Range.Text')} />
              <YStack space="$2">
                <XStack space="$2">
                  <Button
                    {...getSingleSelectProps({ value: DisplayRange.My, key: 'displayRange' })}
                  >
                    {t('Display.Range.My')}
                  </Button>
                  <Button
                    {...getSingleSelectProps({ value: DisplayRange.Customer, key: 'displayRange' })}
                  >
                    {t('Display.Range.Customer')}
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
                  value={props.advancedFilter.systemPowerMax}
                  onChangeText={(text) =>
                    props.setAdvancedFilter((draft) => {
                      draft.systemPowerMax = text
                    })
                  }
                />
                <SizableText>{t('To')}</SizableText>
                <Input
                  size="$3"
                  flex={1}
                  placeholder={t('Global:Max')}
                  value={props.advancedFilter.systemPowerMin}
                  onChangeText={(text) =>
                    props.setAdvancedFilter((draft) => {
                      draft.systemPowerMin = text
                    })
                  }
                />
              </XStack>

              <HeadingTitle title={t('City')} />
              <Input
                size="$3"
                value={props.advancedFilter.city}
                onChangeText={(text) =>
                  props.setAdvancedFilter((draft) => {
                    draft.city = text
                  })
                }
              />

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
            </>
          )}
          {props.currentTab === ManagementTab.Inverter && (
            <>
              <HeadingTitle title={t('InverterType.Text')} />
              <YStack space="$2">
                <XStack space="$2">
                  <Button
                    {...getMultiSelectProps({ value: InverterType.On_Grid, key: 'inverterType' })}
                  >
                    {t('InverterType.On.Grid')}
                  </Button>
                  <Button
                    {...getMultiSelectProps({
                      value: InverterType.Energy_Storage,
                      key: 'inverterType'
                    })}
                  >
                    {t('InverterType.Energy.Storage')}
                  </Button>
                </XStack>
                <XStack space="$2">
                  <Button
                    {...getMultiSelectProps({
                      value: InverterType.AC_Coupling,
                      key: 'inverterType',
                      single: true
                    })}
                  >
                    {t('InverterType.AC.Coupling')}
                  </Button>
                </XStack>
              </YStack>

              <HeadingTitle title={t('Rated.Power')} />
              <XStack
                alignItems="center"
                space="$2"
              >
                <Input
                  size="$3"
                  flex={1}
                  placeholder={t('Global:Min')}
                  value={props.advancedFilter.ratePowerMin}
                  onChangeText={(text) =>
                    props.setAdvancedFilter((draft) => {
                      draft.ratePowerMin = text
                    })
                  }
                />
                <SizableText>{t('To')}</SizableText>
                <Input
                  size="$3"
                  flex={1}
                  placeholder={t('Global:Max')}
                  value={props.advancedFilter.ratePowerMax}
                  onChangeText={(text) =>
                    props.setAdvancedFilter((draft) => {
                      draft.ratePowerMax = text
                    })
                  }
                />
              </XStack>
            </>
          )}
          {props.currentTab === ManagementTab.Battery && (
            <>
              <HeadingTitle title={t('BatteryType.Text')} />
              <YStack space="$2">
                <XStack space="$2">
                  <Button
                    {...getMultiSelectProps({ value: BatteryType.BuiltIn, key: 'batteryType' })}
                  >
                    {t('BatteryType.BuiltIn')}
                  </Button>
                  <Button
                    {...getMultiSelectProps({
                      value: BatteryType.Expand,
                      key: 'batteryType'
                    })}
                  >
                    {t('BatteryType.Expand')}
                  </Button>
                </XStack>
              </YStack>
            </>
          )}
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
