import { t, ui } from '../i18n/translations'
import { useApp } from '../context/AppContext'

export function MetricsBar() {
  const { lang } = useApp()
  const items = [ui.metrics.systems, ui.metrics.domains, ui.metrics.stack]
  return (
    <section className="no-print border-b border-[#DCD6CA] bg-[#F7F5F0]/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65 print:bg-white print:backdrop-blur-none">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#DCD6CA] sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800/80 rtl:sm:divide-x-reverse">
        {items.map((m) => (
          <div key={m.value} className="px-4 py-5 sm:px-6 lg:px-8">
            <p className="text-2xl font-bold tracking-tight text-stone-900 dark:text-[var(--color-ink-dark)]">{m.value}</p>
            <p className="mt-1 text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{t(m.label, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
