import { Search } from 'lucide-react'
import { categories, t, ui } from '../i18n/translations'
import { useApp } from '../context/AppContext'
import type { CategoryId } from '../types'

interface Props {
  active: CategoryId | 'all'
  onChange: (c: CategoryId | 'all') => void
  query: string
  onQuery: (q: string) => void
  counts: Record<string, number>
  total: number
}

export function Filters({ active, onChange, query, onQuery, counts, total }: Props) {
  const { lang } = useApp()
  return (
    <section className="no-print mx-auto max-w-7xl px-3 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const count = c.id === 'all' ? total : counts[c.id] || 0
            const isActive = active === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => onChange(c.id)}
                  className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors active:scale-95 ${
                    isActive
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                      : 'border-[#D5CEC0] bg-[#EAE5DC]/75 text-stone-600 hover:border-[var(--color-accent)] hover:text-stone-900 dark:border-slate-800/80 dark:bg-slate-900/65 dark:text-[var(--color-muted-dark)] dark:hover:text-[var(--color-ink-dark)]'
                  }`}
                >
                <span>{t(c.label, lang)}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? 'bg-white/20' : 'bg-[#DCD6CA]/70 text-stone-700 dark:bg-slate-800/70 dark:text-inherit'}`}>{count}</span>
              </button>
            )
          })}
        </div>
        <div className="relative w-full lg:max-w-sm">
          <Search size={16} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-stone-500 dark:text-[var(--color-muted-dark)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={t(ui.searchPlaceholder, lang)}
            className="min-h-[42px] w-full rounded-md border border-[#DCD6CA] bg-[#F7F5F0]/80 py-2 ps-9 pe-3 text-base text-stone-900 shadow-sm shadow-stone-900/5 placeholder:text-stone-500 backdrop-blur-md focus:border-[var(--color-accent)] focus:outline-none dark:border-slate-800/80 dark:bg-slate-900/65 dark:text-[var(--color-ink-dark)] dark:shadow-none dark:placeholder:text-[var(--color-muted-dark)] sm:text-sm"
          />
        </div>
      </div>
    </section>
  )
}
