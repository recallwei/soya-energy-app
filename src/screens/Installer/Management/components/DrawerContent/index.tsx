import { Button, Input, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'
import type { Updater } from 'use-immer'

import { HeadingTitle } from '@/components'
import { globalStyles } from '@/constants'

import { initialAdvanceFilter } from '../../constants'
import { DisplayRange, PlantType } from '../../enums'
import type { FormData, MultiSelectOption, SingleSelectOption } from '../../interfaces'

interface Props {
  advancedFilter: FormData
  setAdvancedFilter: Updater<FormData>
  setDrawerOpen: (open: boolean) => void
}

export default function DrawerContent(props: Props) {
  const onChangeSingleSelect = ({ value, key }: { value: number; key: keyof SingleSelectOption }) =>
    props.setAdvancedFilter((draft) => {
      if (draft[key] === value) {
        draft[key] = null
        return
      }
      draft[key] = value
    })

  const onChangeMultiSelect = ({ value, key }: { value: number; key: keyof MultiSelectOption }) =>
    props.setAdvancedFilter((draft) => {
      if ((draft[key] as Set<number>).has(value)) {
        ;(draft[key] as Set<number>).delete(value)
        return
      }
      ;(draft[key] as Set<number>).add(value)
    })

  const handleReset = () =>
    props.setAdvancedFilter((draft) => {
      // eslint-disable-next-line no-param-reassign, unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
      draft = initialAdvanceFilter
    })

  const handleSubmit = () => {
    console.log(props.advancedFilter)
    props.setDrawerOpen(false)
  }

  const getSingleSelectProps = ({
    value,
    key,
    single
  }: {
    value: number
    key: keyof SingleSelectOption
    single?: boolean
  }) => ({
    ...(single ? { width: '49%' } : { flex: 1 }),
    borderRadius: 4,
    size: '$3',
    onPress: () => onChangeSingleSelect({ value, key }),
    backgroundColor: props.advancedFilter[key] === value ? globalStyles.primaryColor : undefined,
    color: props.advancedFilter[key] === value ? 'white' : undefined
  })

  const getMultiSelectProps = ({
    value,
    key,
    single
  }: {
    value: number
    key: keyof MultiSelectOption
    single?: boolean
  }) => ({
    ...(single ? { width: '49%' } : { flex: 1 }),
    borderRadius: 4,
    size: '$3',
    onPress: () => onChangeMultiSelect({ value, key }),
    backgroundColor: (props.advancedFilter[key] as Set<number>).has(value)
      ? globalStyles.primaryColor
      : undefined,
    color: (props.advancedFilter[key] as Set<number>).has(value) ? 'white' : undefined
  })

  return (
    <View height="100%">
      <ScrollView>
        <YStack
          space="$3"
          padding="$3"
        >
          <HeadingTitle title="显示范围" />
          <YStack space="$2">
            <XStack space="$2">
              <Button {...getSingleSelectProps({ value: DisplayRange.All, key: 'displayRange' })}>
                全部
              </Button>
              <Button {...getSingleSelectProps({ value: DisplayRange.My, key: 'displayRange' })}>
                我的
              </Button>
            </XStack>
            <XStack space="$2">
              <Button
                {...getSingleSelectProps({ value: DisplayRange.Customer, key: 'displayRange' })}
              >
                客户
              </Button>
              <Button
                {...getSingleSelectProps({ value: DisplayRange.Visitors, key: 'displayRange' })}
              >
                访客
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
                其他
              </Button>
            </XStack>
          </YStack>

          <HeadingTitle title="电站类型" />
          <YStack space="$2">
            <XStack space="$2">
              <Button {...getMultiSelectProps({ value: PlantType.On_Grid, key: 'plantType' })}>
                并网
              </Button>
              <Button
                {...getMultiSelectProps({ value: PlantType.Energy_Storage, key: 'plantType' })}
              >
                储能
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
                交流耦合
              </Button>
            </XStack>
          </YStack>

          <HeadingTitle title="使用类型" />
          <XStack space="$2">
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              家庭户用
            </Button>
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              工商业屋顶
            </Button>
          </XStack>
          <XStack space="$2">
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              地面电站
            </Button>
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              扶贫电站
            </Button>
          </XStack>

          <HeadingTitle title="并网类型" />
          <YStack space="$2">
            <XStack space="$2">
              <Button
                borderRadius={4}
                flex={1}
                size="$3"
              >
                全额上网
              </Button>
              <Button
                borderRadius={4}
                flex={1}
                size="$3"
              >
                自发自用余额上网
              </Button>
            </XStack>
            <XStack space="$2">
              <Button
                width="49%"
                borderRadius={4}
                size="$3"
              >
                离网模式
              </Button>
            </XStack>
          </YStack>

          <HeadingTitle title="出资方式" />
          <XStack space="$2">
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              业主全款
            </Button>
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              业主贷款
            </Button>
          </XStack>
          <XStack space="$2">
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              自投电站
            </Button>
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              与业主合资
            </Button>
          </XStack>

          <HeadingTitle title="负载监控" />
          <XStack space="$2">
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              有
            </Button>
            <Button
              borderRadius={4}
              flex={1}
              size="$3"
            >
              没有
            </Button>
          </XStack>

          <HeadingTitle title="电站容量(kWp)" />
          <XStack
            alignItems="center"
            space="$2"
          >
            <Input
              size="$3"
              flex={1}
            />
            <SizableText>to</SizableText>
            <Input
              size="$3"
              flex={1}
            />
          </XStack>

          <HeadingTitle title="城市" />
          <Input size="$3" />

          <HeadingTitle title="其他" />
          <XStack space="$2">
            <Button
              width="49%"
              borderRadius={4}
              size="$3"
            >
              部分离线
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
          重置
        </Button>
        <Button
          borderRadius={0}
          backgroundColor={globalStyles.primaryColor}
          color="white"
          flex={1}
          onPress={handleSubmit}
        >
          确认
        </Button>
      </XStack>
    </View>
  )
}
