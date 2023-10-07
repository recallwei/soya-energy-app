import en_auth from './en/auth.json'
import en_global from './en/global.json'
import en_menu from './en/menu.json'
import en_notification from './en/notification.json'
import en_services from './en/services.json'
import en_settings from './en/settings.json'
import en_system from './en/system.json'
import fr_auth from './fr/auth.json'
import fr_global from './fr/global.json'
import fr_menu from './fr/menu.json'
import fr_notification from './fr/notification.json'
import fr_services from './fr/services.json'
import fr_settings from './fr/settings.json'
import fr_system from './fr/system.json'
import zh_cn_auth from './zh_cn/auth.json'
import zh_cn_global from './zh_cn/global.json'
import zh_cn_menu from './zh_cn/menu.json'
import zh_cn_notification from './zh_cn/notification.json'
import zh_cn_services from './zh_cn/services.json'
import zh_cn_settings from './zh_cn/settings.json'
import zh_cn_system from './zh_cn/system.json'

export const EN = {
  Global: en_global,
  Auth: en_auth,
  Menu: en_menu,
  Notification: en_notification,
  System: en_system,
  Services: en_services,
  Settings: en_settings
} as const

export const FR = {
  Global: fr_global,
  Auth: fr_auth,
  Menu: fr_menu,
  Notification: fr_notification,
  System: fr_system,
  Services: fr_services,
  Settings: fr_settings
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
