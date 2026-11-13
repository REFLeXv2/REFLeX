import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang, Theme } from '../types'

interface AppContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  theme: Theme
  toggleTheme: () => void
  dir: 'rtl' | 'ltr'
}

const AppContext = createContext<AppContextValue | null>(null)

const LANG_KEY = 'portfolio-lang'
const THEME_KEY = 'portfolio-theme'

function getInitialLang(): Lang {
  const stored = localStorage.getItem(LANG_KEY)
  if (stored === 'ar' || stored === 'en' || stored === 'tr') return stored
  return 'en'
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr'

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem(LANG_KEY, l)
  }

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_KEY, next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const value = useMemo(() => ({ lang, setLang, theme, toggleTheme, dir }), [lang, theme, dir])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
