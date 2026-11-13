import { useEffect } from 'react'
import { AlertTriangle, Database, Layers, PlayCircle, Target, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import type { Project } from '../types'
import { categories, t, ui } from '../i18n/translations'
import { useApp } from '../context/AppContext'
import { demoPath } from '../router'

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="border border-[#DCD6CA] bg-[#F7F5F0]/60 p-4 dark:border-slate-800/80 dark:bg-slate-900/40 print:border-[#e2e8f0] print:bg-white">
      <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
        <span className="text-[var(--color-accent)]">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  )
}

export function ProjectModal({ project, onClose, onLaunchLab }: { project: Project; onClose: () => void; onLaunchLab: (id: number) => void }) {
  const { lang } = useApp()
  const cat = categories.find((c) => c.id === project.category)
  const demoPageUrl = `${window.location.origin}${demoPath(project.id)}`

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden border border-[#DCD6CA] bg-[#F7F5F0]/95 shadow-xl backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 print:border-[#e2e8f0] print:bg-white sm:max-h-[92dvh]">
        <div className="flex items-start justify-between gap-3 border-b border-[#DCD6CA] p-4 sm:p-5 dark:border-slate-800/80">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">{project.index}</span>
              {cat && <span className="rounded bg-[#EAE5DC]/75 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 dark:bg-slate-800/60 dark:text-[var(--color-muted-dark)]">{t(cat.label, lang)}</span>}
            </div>
            <h2 className="text-lg font-semibold leading-snug text-stone-900 dark:text-[var(--color-ink-dark)] sm:text-xl">{project.title}</h2>
            <button
              type="button"
              onClick={() => { onLaunchLab(project.id); onClose() }}
              className="mt-3 inline-flex min-h-[42px] items-center gap-1.5 rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200"
            >
              <PlayCircle size={14} /> {t(ui.launchLiveDemo, lang)}
            </button>
          </div>
          <button onClick={onClose} aria-label={t(ui.close, lang)} className="inline-flex min-h-[42px] min-w-[42px] shrink-0 items-center justify-center rounded p-1.5 text-stone-500 transition active:scale-95 hover:bg-[#EAE5DC]/75 hover:text-stone-900 dark:text-[var(--color-muted-dark)] dark:hover:bg-slate-800/60 dark:hover:text-[var(--color-ink-dark)]">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto]">
            <div className="min-w-0 space-y-4">
              <Section icon={<AlertTriangle size={14} />} title={t(ui.sectionProblem, lang)}>
                <p className="break-words text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">{project.problemContext}</p>
              </Section>
              <Section icon={<Layers size={14} />} title={t(ui.sectionArchitecture, lang)}>
                <p className="break-words text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">{project.systemArchitecture}</p>
              </Section>
              <Section icon={<Database size={14} />} title={t(ui.sectionDatabase, lang)}>
                <p className="break-words text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">{project.databaseAndSecurity}</p>
              </Section>
              <Section icon={<Layers size={14} />} title={t(ui.sectionCapabilities, lang)}>
                <ul className="list-disc space-y-2 ps-5 text-sm text-stone-700 dark:text-[var(--color-muted-dark)]">
                  {project.keyFeatures.map((f) => (
                    <li key={f.title} className="break-words">
                      <span className="font-medium text-stone-900 dark:text-[var(--color-ink-dark)]">{f.title}:</span> {f.explanation}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section icon={<Target size={14} />} title={t(ui.sectionImpact, lang)}>
                <p className="break-words text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">{project.operationalImpact}</p>
              </Section>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-center">
              <div className="rounded border border-[#D5CEC0] bg-[#F7F5F0] p-2 dark:border-slate-800/80 dark:bg-white" title={demoPageUrl}>
                <QRCodeSVG value={demoPageUrl} size={96} level="M" fgColor="#0F172A" />
              </div>
              <div className="w-full">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{t(ui.techStack, lang)}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded border border-[#D5CEC0] bg-[#EAE5DC]/75 px-2 py-0.5 text-xs font-medium text-stone-700 dark:border-slate-800/80 dark:bg-slate-800/40 dark:text-[var(--color-ink-dark)]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
