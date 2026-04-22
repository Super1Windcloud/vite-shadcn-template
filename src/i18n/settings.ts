export const locales = ['en', 'zh-CN'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeCookieName = 'locale'

export const localeCookieMaxAge = 60 * 60 * 24 * 365

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '简体中文',
}

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && locales.includes(value as Locale)
}
