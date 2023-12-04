export interface LoginInputModel extends Record<string, unknown> {
  username: string
  password: string
}

export interface UserInfo {
  username: string
  avatarUrl: string
}

export interface RefreshToken {
  access_token: string
  refresh_token: string
}
