import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const createInverterSchema = yup
  .object({
    deviceSN: yup
      .string()
      .max(30, () => t('Inverter.SN.Max.Length'))
      .required(() => t('Inverter.SN.Not.Null')),
    deviceComponentPower: yup.string().required(() => t('Device.Component.Power.Not.Null')),
    deviceAlias: yup
      .string()
      .max(30, () => t('Device.Alias.Max.Length'))
      .optional()
  })
  .required()
