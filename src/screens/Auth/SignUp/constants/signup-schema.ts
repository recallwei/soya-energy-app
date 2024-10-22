import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const signupSchema = yup
  .object({
    account: yup
      .string()
      .min(6, t('Account.Min.Length'))
      .max(20, t('Account.Max.Length'))
      .required(t('Account.Not.Null')),
    email: yup.string().required(t('Email.Not.Null')),
    emailCode: yup.string().required(t('Verification.Code.Not.Null')),
    password: yup
      .string()
      .min(6, t('Password.Min.Length'))
      .max(20, t('Password.Max.Length'))
      .required(t('Password.Not.Null')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('Confirm.Password.Not.Match'))
      .required(t('Confirm.Password.Not.Null')),
    country: yup.string().optional(),
    timezone: yup.string().optional()
  })
  .required()
