import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Paragraph, SizableText, Switch, XStack, YStack } from 'tamagui'
import type { Updater } from 'use-immer'

import { StackChartColors } from '../../constants'
import type { EnergyBalanceParams } from '../../types'

interface Props {
  energyBalanceParams: EnergyBalanceParams
  setEnergyBalanceParams: Updater<EnergyBalanceParams>
}

const SwitchGroup = memo((props: Props) => {
  const { energyBalanceParams, setEnergyBalanceParams } = props
  const { t } = useTranslation('User.Analysis')
  return (
    <XStack
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <YStack
        justifyContent="center"
        alignItems="center"
        space="$2"
        flex={1}
      >
        <Switch
          size="$3"
          backgroundColor="#dddddd"
          checked={energyBalanceParams.pvPower}
          onCheckedChange={() =>
            setEnergyBalanceParams((draft) => {
              draft.pvPower = !draft.pvPower
            })
          }
        >
          <Switch.Thumb
            animation="quick"
            backgroundColor={StackChartColors.pvPower}
          />
        </Switch>
        <SizableText size="$3">{t('PV.Power')}</SizableText>
      </YStack>

      <YStack
        justifyContent="center"
        alignItems="center"
        space="$2"
        flex={1}
      >
        <Switch
          size="$3"
          backgroundColor="#dddddd"
          checked={energyBalanceParams.loadPower}
          onCheckedChange={() =>
            setEnergyBalanceParams((draft) => {
              draft.loadPower = !draft.loadPower
            })
          }
        >
          <Switch.Thumb
            animation="quick"
            backgroundColor={StackChartColors.loadPower}
          />
        </Switch>
        <SizableText size="$3">{t('Load.Power')}</SizableText>
      </YStack>

      <YStack
        justifyContent="center"
        alignItems="center"
        space="$2"
        flex={1}
      >
        <Switch
          size="$3"
          backgroundColor="#dddddd"
          checked={energyBalanceParams.enablePower}
          onCheckedChange={() =>
            setEnergyBalanceParams((draft) => {
              draft.enablePower = !draft.enablePower
            })
          }
        >
          <Switch.Thumb
            animation="quick"
            backgroundColor={StackChartColors.enablePower}
          />
        </Switch>
        <Paragraph size="$3">
          {t('Import.Power')}/{t('Export.Power')}
        </Paragraph>
      </YStack>

      <YStack
        justifyContent="center"
        alignItems="center"
        space="$2"
        flex={1}
      >
        <Switch
          size="$3"
          backgroundColor="#dddddd"
          checked={energyBalanceParams.enableBattery}
          onCheckedChange={() =>
            setEnergyBalanceParams((draft) => {
              draft.enableBattery = !draft.enableBattery
            })
          }
        >
          <Switch.Thumb
            animation="quick"
            backgroundColor={StackChartColors.enableBattery}
          />
        </Switch>
        <Paragraph size="$3">
          {t('Battery.Charge')}/{t('Battery.Discharge')}
        </Paragraph>
      </YStack>
    </XStack>
  )
})
export default SwitchGroup
