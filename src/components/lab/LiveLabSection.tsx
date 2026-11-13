import { useMemo, useState } from 'react'
import type { CategoryId, Project } from '../../types'
import { categories, t, ui } from '../../i18n/translations'
import { useApp } from '../../context/AppContext'
import { DesktopSystemsLab } from './DesktopSystemsLab'
import { SecurityDashboardsLab } from './SecurityDashboardsLab'
import { AutomationDataLab } from './AutomationDataLab'
import { WebPortalsLab } from './WebPortalsLab'
import { CliToolingLab } from './CliToolingLab'

function moduleFor(id: number) {
  if (id >= 1 && id <= 5) return DesktopSystemsLab
  if (id >= 6 && id <= 9) return SecurityDashboardsLab
  if (id >= 10 && id <= 15) return AutomationDataLab
  if (id >= 16 && id <= 19) return WebPortalsLab
  return CliToolingLab
}

const catOrder: CategoryId[] = ['desktop-systems', 'security-dashboards', 'automation-data', 'web-portals', 'cli-tooling']

export function LiveLabSection({
  projects,
  activeProjectId,
  onSelectProject,
}: {
  projects: Project[]
  activeProjectId: number
  onSelectProject: (id: number) => void
}) {
  const { lang } = useApp()
  const [cat, setCat] = useState<CategoryId | 'all'>('all')

  const active = useMemo(() => projects.find((p) => p.id === activeProjectId) ?? projects[0], [projects, activeProjectId])
  const list = useMemo(() => (cat === 'all' ? projects : projects.filter((p) => p.category === cat)), [projects, cat])
  const ActiveModule = moduleFor(active?.id ?? 1)

  return (
    <section id="lab" className="no-print mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-[var(--color-ink-dark)]">{t(ui.labTitle, lang)}</h2>
        <p className="mt-1 max-w-3xl text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{t(ui.labSubtitle, lang)}</p>
      </div>

      <div className="rounded-2xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-3 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65 sm:p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat('all')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${cat === 'all' ? 'bg-[var(--color-accent)] text-white' : 'border border-[#DCD6CA] bg-[#F7F5F0]/70 text-stone-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-stone-200'}`}
          >
            {t(ui.labAllCategories, lang)}
          </button>
          {catOrder.map((cid) => {
            const meta = categories.find((c) => c.id === cid)
            if (!meta) return null
            return (
              <button
                key={cid}
                type="button"
                onClick={() => setCat(cid)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${cat === cid ? 'bg-[var(--color-accent)] text-white' : 'border border-[#DCD6CA] bg-[#F7F5F0]/70 text-stone-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-stone-200'}`}
              >
                {t(meta.label, lang)}
              </button>
            )
          })}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {list.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectProject(p.id)}
              className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold transition ${
                active?.id === p.id
                  ? 'border-teal-600 bg-teal-600/15 text-teal-800 dark:text-teal-200'
                  : 'border-[#DCD6CA] bg-[#F7F5F0]/70 text-stone-700 hover:border-[var(--color-accent)] dark:border-slate-700 dark:bg-slate-800/60 dark:text-stone-300'
              }`}
              title={p.title}
            >
              {p.index}
            </button>
          ))}
        </div>

        {active && (
          <div className="mb-4 rounded-xl border border-teal-600/20 bg-teal-600/5 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">{t(ui.labActiveProject, lang)}</div>
            <div className="mt-1 text-sm font-bold text-stone-900 dark:text-[var(--color-ink-dark)]">{active.index} — {active.title}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {active.stack.map((s) => (
                <span key={s} className="rounded border border-[#D5CEC0] bg-[#EAE5DC]/70 px-2 py-0.5 text-[11px] font-medium text-stone-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-stone-300">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/60 p-4 dark:border-slate-800/80 dark:bg-slate-950/30 sm:p-5">
          <ActiveModule projectId={active?.id ?? 1} />
        </div>
      </div>
    </section>
  )
}
