import { useState } from 'react'
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import type { Project } from '../types'
import { categories, t, ui } from '../i18n/translations'
import { useApp } from '../context/AppContext'
import { demoPath } from '../router'

export function ProjectCard({ project, onOpen, onLaunchLab }: { project: Project; onOpen: (p: Project) => void; onLaunchLab: (id: number) => void }) {
  const { lang } = useApp()
  const [expanded, setExpanded] = useState(false)
  const cat = categories.find((c) => c.id === project.category)
  const topFeatures = project.keyFeatures.slice(0, 4)
  const demoPageUrl = `${window.location.origin}${demoPath(project.id)}`

  return (
    <article className="group flex min-w-0 flex-col border border-[#DCD6CA] bg-[#F7F5F0]/80 p-4 shadow-sm shadow-stone-900/5 backdrop-blur-md transition-colors hover:border-[var(--color-accent)] dark:border-slate-800/80 dark:bg-slate-900/65 dark:shadow-none print-break-inside-avoid print:border-[#e2e8f0] print:bg-white print:text-black print:shadow-none print:backdrop-blur-none sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">{project.index}</span>
          {cat && (
            <span className="inline-block rounded bg-[#EAE5DC]/75 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 dark:bg-slate-800/60 dark:text-[var(--color-muted-dark)] print:bg-slate-100">
              {t(cat.label, lang)}
            </span>
          )}
        </div>
        <div className="shrink-0 rounded border border-[#D5CEC0] bg-[#F7F5F0] p-1 dark:border-[var(--color-border-dark)] dark:bg-white" title={demoPageUrl}>
          <QRCodeSVG value={demoPageUrl} size={48} level="M" fgColor="#0F172A" />
        </div>
      </div>
      <h3 className="text-base font-semibold leading-snug text-stone-900 dark:text-[var(--color-ink-dark)]">
        {project.title}
      </h3>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onLaunchLab(project.id) }}
        className="no-print mt-3 inline-flex min-h-[42px] w-fit items-center gap-1.5 rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200"
      >
        <PlayCircle size={14} /> {t(ui.launchLiveDemo, lang)}
      </button>
      <div className="mt-3 space-y-2">
        <p className="text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">
          <span className="font-semibold text-stone-900 dark:text-[var(--color-ink-dark)]">{t(ui.problemOverview, lang)}: </span>
          {project.problemContext}
        </p>
        <p className="text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">
          <span className="font-semibold text-stone-900 dark:text-[var(--color-ink-dark)]">{t(ui.solutionOverview, lang)}: </span>
          {project.systemArchitecture}
        </p>
      </div>
      <div className="mt-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{t(ui.keyFeatures, lang)}</p>
        <ul className="list-disc space-y-1 ps-5 text-sm text-stone-700 dark:text-[var(--color-muted-dark)]">
          {topFeatures.map((f) => (
            <li key={f.title}><span className="font-medium text-stone-900 dark:text-[var(--color-ink-dark)]">{f.title}:</span> {f.explanation}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="rounded border border-[#D5CEC0] bg-[#EAE5DC]/75 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:border-slate-800/80 dark:bg-slate-800/40 dark:text-[var(--color-muted-dark)] print:bg-white">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-[#DCD6CA] pt-3 dark:border-slate-800/80 no-print">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v) }}
          className="inline-flex min-h-[42px] items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] transition active:scale-95 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? t(ui.collapseDetails, lang) : t(ui.expandDetails, lang)}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {expanded && (
          <div className="mt-3 space-y-4 text-sm text-stone-700 dark:text-[var(--color-muted-dark)]">
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{t(ui.sectionDatabase, lang)}</h4>
              <p className="leading-relaxed">{project.databaseAndSecurity}</p>
            </section>
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{t(ui.sectionCapabilities, lang)}</h4>
              <ul className="list-disc space-y-2 ps-5">
                {project.keyFeatures.map((f) => (
                  <li key={f.title}><span className="font-medium text-stone-900 dark:text-[var(--color-ink-dark)]">{f.title}:</span> {f.explanation}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{t(ui.sectionImpact, lang)}</h4>
              <p className="leading-relaxed">{project.operationalImpact}</p>
            </section>
            <button type="button" onClick={() => onOpen(project)} className="text-xs font-medium text-[var(--color-accent)] hover:underline">
              {t(ui.viewDetails, lang)} →
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
