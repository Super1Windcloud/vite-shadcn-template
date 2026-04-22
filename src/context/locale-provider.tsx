import { createContext, useContext, useEffect, useState } from 'react'
import { i18n } from '@/i18n'
import {
  defaultLocale,
  isLocale,
  type Locale,
  localeCookieMaxAge,
  localeCookieName,
  localeLabels,
  locales,
} from '@/i18n/settings'
import { setCookie } from '@/lib/cookies'

type LocaleContextValue = {
  defaultLocale: Locale
  locale: Locale
  localeLabel: string
  locales: readonly Locale[]
  setLocale: (locale: Locale) => Promise<void>
  resetLocale: () => Promise<void>
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function getResolvedLocale(language: string | undefined): Locale {
  return isLocale(language) ? language : defaultLocale
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    getResolvedLocale(i18n.resolvedLanguage ?? i18n.language)
  )

  useEffect(() => {
    const syncLocale = (language: string) => {
      const nextLocale = getResolvedLocale(language)
      setLocaleState(nextLocale)
      document.documentElement.lang = nextLocale
    }

    syncLocale(i18n.resolvedLanguage ?? i18n.language)
    i18n.on('languageChanged', syncLocale)

    return () => {
      i18n.off('languageChanged', syncLocale)
    }
  }, [])

  const updateLocale = async (nextLocale: Locale) => {
    await i18n.changeLanguage(nextLocale)
    setCookie(localeCookieName, nextLocale, localeCookieMaxAge)
  }

  const value: LocaleContextValue = {
    defaultLocale,
    locale,
    localeLabel: localeLabels[locale],
    locales,
    setLocale: updateLocale,
    resetLocale: () => updateLocale(defaultLocale),
  }

  return <LocaleContext value={value}>{children}</LocaleContext>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}
