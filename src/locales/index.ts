import en_us_auth from './en_us/auth.json'
import en_us_global from './en_us/global.json'
import en_us_menu from './en_us/menu.json'
import en_us_notification from './en_us/notification.json'
import en_us_services from './en_us/services.json'
import en_us_settings from './en_us/settings.json'
import en_us_system from './en_us/system.json'
import zh_cn_auth from './zh_cn/auth.json'
import zh_cn_global from './zh_cn/global.json'
import zh_cn_menu from './zh_cn/menu.json'
import zh_cn_notification from './zh_cn/notification.json'
import zh_cn_services from './zh_cn/services.json'
import zh_cn_settings from './zh_cn/settings.json'
import zh_cn_system from './zh_cn/system.json'

export const EN_US = {
  Global: en_us_global,
  Auth: en_us_auth,
  Menu: en_us_menu,
  Notification: en_us_notification,
  System: en_us_system,
  Services: en_us_services,
  Settings: en_us_settings
} as const

export const ZH_CN = {
  Global: zh_cn_global,
  Auth: zh_cn_auth,
  Menu: zh_cn_menu,
  Notification: zh_cn_notification,
  System: zh_cn_system,
  Services: zh_cn_services,
  Settings: zh_cn_settings
} as const
