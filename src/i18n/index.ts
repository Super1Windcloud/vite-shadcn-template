import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getCookie } from '@/lib/cookies'
import { enCommon } from './locales/en/common'
import { zhCNCommon } from './locales/zh-CN/common'
import { defaultLocale, isLocale, localeCookieName } from './settings'

const initialLocale = getCookie(localeCookieName)

void i18n.use(initReactI18next).init({
  lng: isLocale(initialLocale) ? initialLocale : defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: ['en', 'zh-CN'],
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: enCommon,
    },
    'zh-CN': {
      common: zhCNCommon,
    },
  },
  defaultNS: 'common',
  ns: ['common'],
})

export { i18n }
