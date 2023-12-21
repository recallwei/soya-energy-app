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

export interface Customer {
  /**
   * 头像地址
   */
  avatar?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 用户ID
   */
  id: string
  /**
   * 用户名
   */
  name?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 真实名
   */
  realName?: string
}
