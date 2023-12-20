import type { SendEmailType } from '@/enums'

export interface SendEmailModel {
  email: string
  type: SendEmailType
}
