export interface LoginInputModel extends Record<string, unknown> {
  username: string
  password: string
}

export interface UserInfo {
  avatar: string
  avatarUrl: string
}

export interface Token {
  access_token: string
  refresh_token: string
}
