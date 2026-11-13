import { useEffect, useRef } from 'react'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { t, ui } from '../i18n/translations'
import { useApp } from '../context/AppContext'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Header({ activeSection }: { activeSection: string }) {
  const { lang, setLang, theme, toggleTheme } = useApp()
  const barRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      rafRef.current = null
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }
    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const isRtl = lang === 'ar'
  const nav = [
    { id: 'about', label: t(ui.navAbout, lang) },
    { id: 'languages', label: t(ui.navLanguages, lang) },
    { id: 'lab', label: t(ui.navLab, lang) },
    { id: 'projects', label: t(ui.navProjects, lang) },
  ]

  const brandDesktop = lang === 'ar' ? 'عبدالرزاق نبيل' : 'Abdulrazzaq N.'
  const brandMobile = brandDesktop

  const DesktopLangSwitcher = () => (
    <div
      className="inline-flex h-9 shrink-0 items-center rounded-xl border border-stone-300/70 bg-stone-200/70 p-1 dark:border-slate-700/70 dark:bg-slate-800/80"
      role="group"
      aria-label="Language"
    >
      {([
        { code: 'ar' as const, label: 'العربية' },
        { code: 'en' as const, label: 'EN' },
        { code: 'tr' as const, label: 'TR' },
      ]).map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          className={`inline-flex h-7 items-center justify-center whitespace-nowrap rounded-lg px-2.5 text-xs font-semibold leading-none transition-all ${
            lang === opt.code
              ? 'bg-white text-teal-700 shadow-xs dark:bg-slate-900 dark:text-teal-300'
              : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )

  const MobileLangSwitcher = () => (
    <div
      className="inline-flex h-8 shrink-0 items-center rounded-lg border border-stone-300/70 bg-stone-200/70 p-0.5 dark:border-slate-700/70 dark:bg-slate-800/80"
      role="group"
      aria-label="Language"
    >
      {([
        { code: 'ar' as const, label: 'عربي' },
        { code: 'en' as const, label: 'EN' },
        { code: 'tr' as const, label: 'TR' },
      ]).map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          className={`inline-flex h-7 items-center justify-center whitespace-nowrap rounded-md px-2 text-[11px] font-bold leading-none transition-all ${
            lang === opt.code
              ? 'bg-white text-teal-700 shadow-xs dark:bg-slate-900 dark:text-teal-300'
              : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )

  return (
    <header className="no-print sticky top-0 z-50 w-full max-w-full border-b border-[#DCD6CA] bg-[#F7F5F0]/85 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
      {/* Desktop */}
      <div className="mx-auto hidden h-16 max-w-7xl px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
        <div className="justify-self-start">
          <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold leading-none tracking-tight text-stone-900 dark:text-[var(--color-ink-dark)]">
            {brandDesktop}
          </span>
        </div>

        <nav className="justify-self-center" aria-label="Primary">
          <div className="inline-flex items-center gap-1 rounded-xl border border-stone-300/60 bg-stone-200/60 p-1 dark:border-slate-700/60 dark:bg-slate-800/60">
            {nav.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={`inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium leading-none transition-all ${
                    active
                      ? 'bg-white text-teal-700 shadow-xs dark:bg-slate-900 dark:text-teal-300'
                      : 'text-stone-600 hover:bg-white/60 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-slate-700/60 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="flex items-center gap-2.5 justify-self-end">
          <DesktopLangSwitcher />
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-stone-300/70 bg-stone-200/70 text-stone-700 transition-all hover:bg-white dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-stone-200 dark:hover:bg-slate-900"
            aria-label={theme === 'light' ? t(ui.themeDark, lang) : t(ui.themeLight, lang)}
            title={theme === 'light' ? t(ui.themeDark, lang) : t(ui.themeLight, lang)}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-teal-600/30 bg-teal-600/15 px-3 text-xs font-semibold leading-none text-teal-700 transition-all hover:bg-teal-600 hover:text-white dark:text-teal-300"
          >
            <span className="whitespace-nowrap">{t(ui.contactMe, lang)}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex h-[52px] items-center justify-between gap-2 px-3">
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold leading-none text-stone-900 dark:text-[var(--color-ink-dark)]">
              {brandMobile}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <MobileLangSwitcher />
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-300/70 bg-stone-200/70 text-stone-700 transition-all active:scale-95 dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-stone-200"
              aria-label={theme === 'light' ? t(ui.themeDark, lang) : t(ui.themeLight, lang)}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 border-t border-stone-300/50 px-3 py-1.5 dark:border-slate-800/70">
          {nav.map((item) => {
            const active = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className={`flex h-7 items-center justify-center truncate rounded-md px-1 text-xs font-medium leading-none transition-all ${
                  active
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-stone-200/50 text-stone-700 dark:bg-slate-800/50 dark:text-stone-200'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-transparent">
        <div
          ref={barRef}
          className={`h-full w-full ${isRtl ? 'origin-right bg-gradient-to-l' : 'origin-left bg-gradient-to-r'} from-teal-500 via-emerald-400 to-cyan-500 shadow-[0_0_8px_rgba(13,148,136,0.5)]`}
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </header>
  )
}
