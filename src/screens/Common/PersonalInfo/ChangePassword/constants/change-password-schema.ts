import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const changePasswordSchema = yup
  .object({
    oldPassword: yup
      .string()
      .min(6, () => t('Old.Password.Min.Length'))
      .max(20, () => t('Old.Password.Max.Length'))
      .required(() => t('Old.Password.Not.Null')),
    newPassword: yup
      .string()
      .min(6, () => t('New.Password.Min.Length'))
      .max(20, () => t('New.Password.Max.Length'))
      .required(() => t('New.Password.Not.Null')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], () => t('Confirm.Password.Not.Match'))
      .required(() => t('Confirm.Password.Not.Null'))
  })
  .required()
