export interface SignUpForm {
  account: string
  email: string
  emailCode: string
  password: string
  confirmPassword: string
  country?: string
  timezone?: string
}
