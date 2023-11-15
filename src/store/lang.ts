import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import i18n from '@/i18n'
import type { Lang } from '@/types'
import { LangUtils } from '@/utils'

interface State {
  lang: Lang
}

const initialState: State = {
  lang: 'en-US'
}

interface Actions {
  setLang: (lang: string) => void
}

export const useLangStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    setLang: (lang: string) => set({ lang: lang as Lang })
  }))
)

useLangStore.subscribe(
  (state) => state.lang,
  (lang) => {
    i18n.changeLanguage(lang)
    LangUtils.setLang(lang)
  },
  {
    fireImmediately: true
  }
)
