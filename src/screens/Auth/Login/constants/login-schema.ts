import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const loginSchema = yup
  .object({
    username: yup
      .string()
      .min(6, () => t('Account.Min.Length'))
      .max(20, () => t('Account.Max.Length'))
      .required(() => t('Account.Not.Null')),
    password: yup
      .string()
      .min(6, () => t('Password.Min.Length'))
      .max(20, () => t('Account.Max.Length'))
      .required(() => t('Password.Not.Null'))
  })
  .required()
