import auth_login_en_us from './auth/login/en-US.json'
import auth_login_zh_cn from './auth/login/zh-CN.json'
import common_my_en_us from './common/my/en-US.json'
import common_my_settings_en_us from './common/my/settings/en-US.json'
import common_my_settings_zh_cn from './common/my/settings/zh-CN.json'
import common_my_zh_cn from './common/my/zh-CN.json'
import en_us_menu from './en_us/menu.json'
import en_us_notification from './en_us/notification.json'
import en_us_services from './en_us/services.json'
import en_us_settings from './en_us/settings.json'
import en_us_system from './en_us/system.json'
import global_en_us from './global/en-US.json'
import global_zh_cn from './global/zh-CN.json'
import installer_home_en_us from './installer/home/en-US.json'
import installer_home_zh_cn from './installer/home/zh-CN.json'
import screen_en_us from './screen/en-US.json'
import screen_zh_cn from './screen/zh-CN.json'
import temp_en_us from './temp/en-US.json'
import temp_zh_cn from './temp/zh-CN.json'
import zh_cn_menu from './zh_cn/menu.json'
import zh_cn_notification from './zh_cn/notification.json'
import zh_cn_services from './zh_cn/services.json'
import zh_cn_settings from './zh_cn/settings.json'
import zh_cn_system from './zh_cn/system.json'

export const EN_US = {
  Menu: en_us_menu,
  Notification: en_us_notification,
  System: en_us_system,
  Services: en_us_services,
  Settings: en_us_settings,

  Global: global_en_us,
  Screen: screen_en_us,
  'Auth.Login': auth_login_en_us,
  'Installer.Home': installer_home_en_us,
  'Common.My': common_my_en_us,
  'Common.My.Settings': common_my_settings_en_us,
  Temp: temp_en_us
} as const

export const ZH_CN = {
  Menu: zh_cn_menu,
  Notification: zh_cn_notification,
  System: zh_cn_system,
  Services: zh_cn_services,
  Settings: zh_cn_settings,

  Global: global_zh_cn,
  Screen: screen_zh_cn,
  'Auth.Login': auth_login_zh_cn,
  'Installer.Home': installer_home_zh_cn,
  'Common.My': common_my_zh_cn,
  'Common.My.Settings': common_my_settings_zh_cn,
  Temp: temp_zh_cn
} as const
