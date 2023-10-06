import en_auth from './en/auth.json'
import en_global from './en/global.json'
import en_menu from './en/menu.json'
import en_notification from './en/notification.json'
import fr_auth from './fr/auth.json'
import fr_global from './fr/global.json'
import fr_menu from './fr/menu.json'
import fr_notification from './fr/notification.json'
import zh_cn_auth from './zh_cn/auth.json'
import zh_cn_global from './zh_cn/global.json'
import zh_cn_menu from './zh_cn/menu.json'
import zh_cn_notification from './zh_cn/notification.json'

export const EN = {
  Global: en_global,
  Auth: en_auth,
  Menu: en_menu,
  Notification: en_notification
} as const

export const FR = {
  Global: fr_global,
  Auth: fr_auth,
  Menu: fr_menu,
  Notification: fr_notification
} as const

export const ZH_CN = {
  Global: zh_cn_global,
  Auth: zh_cn_auth,
  Menu: zh_cn_menu,
  Notification: zh_cn_notification
} as const
