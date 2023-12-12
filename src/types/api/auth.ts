export interface LoginInputModel extends Record<string, unknown> {
  username: string
  password: string
}

export interface SignupInputModel extends Record<string, unknown> {
  account: string
  avatar: string
  birthday: string
  email: string
  emailCode: string
  name: string
  password: string
  phone: string
  realName: string
  sex: string
}

export interface ChangePasswordInputModel extends Record<string, unknown> {
  oldPassword: string
  newPassword: string
}

export interface ForgotPasswordInputModel extends Record<string, unknown> {
  email: string
  emailCode: string
  password: string
}

export interface Token {
  access_token: string
  refresh_token: string
}
