import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const editInverterSchema = yup
  .object({
    deviceComponentPower: yup.string().required(() => t('Device.Component.Power.Not.Null')),
    deviceAlias: yup
      .string()
      .max(30, () => t('Device.Alias.Max.Length'))
      .optional()
  })
  .required()
