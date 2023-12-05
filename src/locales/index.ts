import auth_en_us from './auth/en-US.json'
import auth_zh_cn from './auth/zh-CN.json'
import common_my_en_us from './common/my/en-US.json'
import common_my_privacy_management_en_us from './common/my/privacy-management/en-US.json'
import common_my_privacy_management_zh_cn from './common/my/privacy-management/zh-CN.json'
import common_my_settings_en_us from './common/my/settings/en-US.json'
import common_my_settings_zh_cn from './common/my/settings/zh-CN.json'
import common_my_zh_cn from './common/my/zh-CN.json'
import global_en_us from './global/en-US.json'
import global_zh_cn from './global/zh-CN.json'
import installer_home_en_us from './installer/home/en-US.json'
import installer_home_zh_cn from './installer/home/zh-CN.json'
import installer_management_en_us from './installer/management/en-US.json'
import installer_management_zh_cn from './installer/management/zh-CN.json'
import installer_services_en_us from './installer/services/en-US.json'
import installer_services_zh_cn from './installer/services/zh-CN.json'
import screen_en_us from './screen/en-US.json'
import screen_zh_cn from './screen/zh-CN.json'
import temp_en_us from './temp/en-US.json'
import temp_zh_cn from './temp/zh-CN.json'
import validation_en_us from './validation/en-US.json'
import validation_zh_cn from './validation/zh-CN.json'

export const EN_US = {
  Global: global_en_us,
  Screen: screen_en_us,
  Validation: validation_en_us,
  Auth: auth_en_us,
  'Installer.Home': installer_home_en_us,
  'Installer.Management': installer_management_en_us,
  'Installer.Services': installer_services_en_us,
  'Common.My': common_my_en_us,
  'Common.My.Settings': common_my_settings_en_us,
  'Common.My.Privacy_Management': common_my_privacy_management_en_us,
  Temp: temp_en_us
} as const

export const ZH_CN = {
  Global: global_zh_cn,
  Screen: screen_zh_cn,
  Validation: validation_zh_cn,
  Auth: auth_zh_cn,
  'Installer.Home': installer_home_zh_cn,
  'Installer.Management': installer_management_zh_cn,
  'Installer.Services': installer_services_zh_cn,
  'Common.My': common_my_zh_cn,
  'Common.My.Settings': common_my_settings_zh_cn,
  'Common.My.Privacy_Management': common_my_privacy_management_zh_cn,
  Temp: temp_zh_cn
} as const
