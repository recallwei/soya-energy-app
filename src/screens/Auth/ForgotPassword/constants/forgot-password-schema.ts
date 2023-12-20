import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const forgotPasswordSchema = yup
  .object({
    email: yup.string().required(t('Email.Not.Null')),
    emailCode: yup.string().required(t('Verification.Code.Not.Null')),
    password: yup
      .string()
      .min(6, t('New.Password.Min.Length'))
      .max(20, t('New.Password.Max.Length'))
      .required(t('New.Password.Not.Null')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('Confirm.Password.Not.Match'))
      .required(t('Confirm.Password.Not.Null'))
  })
  .required()
