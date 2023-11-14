import en_us_auth from './en_us/auth.json'
import common_my_en_us from './en_us/common/my/index.json'
import common_my_settings_en_us from './en_us/common/my/settings/index.json'
import en_us_global from './en_us/global/index.json'
import en_us_menu from './en_us/menu.json'
import en_us_notification from './en_us/notification.json'
import screen_en_us from './en_us/screen/index.json'
import en_us_services from './en_us/services.json'
import en_us_settings from './en_us/settings.json'
import en_us_system from './en_us/system.json'
import temp_en_us from './en_us/temp/index.json'
import zh_cn_auth from './zh_cn/auth.json'
import common_my_zh_cn from './zh_cn/common/my/index.json'
import common_my_settings_zh_cn from './zh_cn/common/my/settings/index.json'
import zh_cn_global from './zh_cn/global/idnex.json'
import zh_cn_menu from './zh_cn/menu.json'
import zh_cn_notification from './zh_cn/notification.json'
import screen_zh_cn from './zh_cn/screen/index.json'
import zh_cn_services from './zh_cn/services.json'
import zh_cn_settings from './zh_cn/settings.json'
import zh_cn_system from './zh_cn/system.json'
import temp_zh_cn from './zh_cn/temp/index.json'

export const EN_US = {
  Auth: en_us_auth,
  Menu: en_us_menu,
  Notification: en_us_notification,
  System: en_us_system,
  Services: en_us_services,
  Settings: en_us_settings,

  Global: en_us_global,
  Screen: screen_en_us,
  'Common.My': common_my_en_us,
  'Common.My.Settings': common_my_settings_en_us,
  Temp: temp_en_us
} as const

export const ZH_CN = {
  Auth: zh_cn_auth,
  Menu: zh_cn_menu,
  Notification: zh_cn_notification,
  System: zh_cn_system,
  Services: zh_cn_services,
  Settings: zh_cn_settings,

  Global: zh_cn_global,
  Screen: screen_zh_cn,
  'Common.My': common_my_zh_cn,
  'Common.My.Settings': common_my_settings_zh_cn,
  Temp: temp_zh_cn
} as const
