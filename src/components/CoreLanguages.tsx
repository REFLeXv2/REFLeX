import type { Project } from '../types'
import { t, ui } from '../i18n/translations'
import { useApp } from '../context/AppContext'
import { programmingLanguages } from '../data/languages'
import { matchesLanguage } from '../App'

export function CoreLanguages({ selected, onSelect, projects }: { selected: string | null; onSelect: (name: string) => void; projects: Project[] }) {
  const { lang } = useApp()
  return (
    <section id="languages" className="scroll-mt-24 border-b border-[#DCD6CA] dark:border-slate-800/80 print:break-inside-avoid">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          {t(ui.programmingLanguages, lang)}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-2 print:gap-3">
          {programmingLanguages.map((item) => {
            const active = selected === item.name
            const count = projects.filter((p) => matchesLanguage(p.stack, item.name)).length
            return (
              <button
                type="button"
                key={item.name}
                onClick={() => onSelect(item.name)}
                className={`group flex h-full cursor-pointer flex-col rounded-lg border p-5 text-start backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-md ${
                  active
                    ? 'border-[var(--color-accent)] bg-teal-600/10 ring-1 ring-[var(--color-accent)] dark:bg-teal-500/10'
                    : 'border-[#D5CEC0] bg-[#EAE5DC]/75 dark:border-slate-800/80 dark:bg-slate-900/65'
                } print:border-[#e2e8f0] print:bg-white print:p-3 print:text-black print:shadow-none print:backdrop-blur-none`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-stone-900 dark:text-[var(--color-ink-dark)]">{item.name}</h3>
                    <span className="mt-1 inline-flex rounded-full border border-[#D5CEC0] bg-[#F7F5F0]/80 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-[var(--color-muted-dark)]">
                      {t(item.categoryBadge, lang)}
                    </span>
                  </div>
                  {count > 0 && (
                    <span className="inline-flex shrink-0 rounded-full bg-teal-600/15 px-2.5 py-1 text-[11px] font-semibold text-teal-700 ring-1 ring-inset ring-teal-600/25 dark:bg-teal-500/15 dark:text-teal-300">
                      {count} {t(ui.projectsLabel, lang)}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">
                  {t(item.detailedDescription, lang)}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.ecosystems.map((eco) => (
                    <span key={eco} className="rounded border border-[#D5CEC0] bg-[#F7F5F0]/70 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-[var(--color-muted-dark)]">
                      {eco}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 text-xs font-medium text-[var(--color-accent)] opacity-80 transition-opacity group-hover:opacity-100">
                  {t(ui.filterProjectsCue, lang)}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
