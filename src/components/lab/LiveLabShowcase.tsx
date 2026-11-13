import { categories, t, ui } from '../../i18n/translations'
import { demoPath, navigate } from '../../router'
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

export function LabDemo({ projectId }: { projectId: number }) {
  const Mod = moduleFor(projectId)
  return <Mod projectId={projectId} />
}

const catOrder = ['desktop-systems', 'security-dashboards', 'automation-data', 'web-portals', 'cli-tooling'] as const

export function LiveLabShowcase({ projects }: { projects: { id: number; index: string; title: string; stack: string[]; category: string }[] }) {
  const { lang } = useApp()
  return (
    <section id="lab" className="no-print mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-[var(--color-ink-dark)]">{t(ui.demosShowcase, lang)}</h2>
        <p className="mt-1 max-w-3xl text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{t(ui.demosShowcaseHint, lang)}</p>
      </div>
      <div className="space-y-5">
        {catOrder.map((cid) => {
          const meta = categories.find((c) => c.id === cid)
          const list = projects.filter((p) => p.category === cid)
          if (!list.length) return null
          return (
            <div key={cid} className="rounded-2xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65">
              <h3 className="mb-3 text-sm font-semibold text-teal-700 dark:text-teal-300">{meta ? t(meta.label, lang) : cid}</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => navigate(demoPath(p.id))}
                    className="group rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 text-start transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--color-accent)]">{p.index}</span>
                      <span className="rounded-full bg-teal-600/10 px-2 py-0.5 text-[10px] font-semibold text-teal-700 dark:text-teal-300">{t(ui.openDemo, lang)} →</span>
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm font-semibold text-stone-900 dark:text-[var(--color-ink-dark)]">{p.title}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s} className="rounded border border-[#D5CEC0] bg-[#EAE5DC]/70 px-1.5 py-0.5 text-[10px] text-stone-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-stone-400">{s}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
