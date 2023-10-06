import en_auth from './en/auth.json'
import en_global from './en/global.json'
import fr_auth from './fr/auth.json'
import fr_global from './fr/global.json'
import zh_cn_auth from './zh_cn/auth.json'
import zh_cn_global from './zh_cn/global.json'

export const EN = {
  Global: en_global,
  Auth: en_auth
} as const

export const FR = {
  Global: fr_global,
  Auth: fr_auth
} as const

export const ZH_CN = {
  Global: zh_cn_global,
  Auth: zh_cn_auth
} as const
