export interface User {
  account?: string
  avatar?: string
  company?: string
  email?: string
  city?: string
  timeZone?: string
  realName?: string
}

export interface UserInfo {
  user: User
  roles?: string[]
}
