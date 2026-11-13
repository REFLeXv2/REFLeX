import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react'
import { categories, LANGUAGES, t, ui } from '../i18n/translations'
import { projectsAr } from '../data/projects.ar'
import { projectsEn } from '../data/projects.en'
import { projectsTr } from '../data/projects.tr'
import { useApp } from '../context/AppContext'
import { InteractiveBackground } from './InteractiveBackground'
import { LabDemo } from './lab/LiveLabShowcase'
import { demoPath, navigate } from '../router'

export function ProjectDemoPage({ projectId }: { projectId: number }) {
  const { lang, setLang, theme, toggleTheme } = useApp()
  const [specsOpen, setSpecsOpen] = useState(true)
  const projects = useMemo(() => (lang === 'ar' ? projectsAr : lang === 'tr' ? projectsTr : projectsEn), [lang])
  const project = projects.find((p) => p.id === projectId) ?? projects[0]
  const cat = categories.find((c) => c.id === project.category)
  const prevId = projectId > 1 ? projectId - 1 : 23
  const nextId = projectId < 23 ? projectId + 1 : 1
  const prev = projects.find((p) => p.id === prevId)
  const next = projects.find((p) => p.id === nextId)
  const isRtl = lang === 'ar'

  const goBack = () => {
    navigate('/')
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <div className="relative z-10 min-h-[100dvh] w-full max-w-full overflow-x-clip bg-transparent text-[var(--color-ink-light)] dark:text-[var(--color-ink-dark)]">
      <InteractiveBackground />
      <header className="no-print sticky top-0 z-50 w-full max-w-full border-b border-[#DCD6CA] bg-[#F7F5F0]/85 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
            <button type="button" onClick={goBack} className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-md border border-[#DCD6CA] bg-[#F7F5F0]/80 px-2.5 py-1.5 text-xs font-semibold text-stone-700 transition active:scale-95 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-slate-700 dark:bg-slate-900/60 dark:text-stone-200 sm:px-3">
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} <span className="hidden xs:inline sm:inline">{t(ui.backToPortfolio, lang)}</span><span className="xs:hidden sm:hidden">{lang === 'ar' ? 'رجوع' : lang === 'tr' ? 'Geri' : 'Back'}</span>
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="rounded-full bg-[var(--color-accent)] px-2 py-0.5 font-mono text-[11px] font-bold text-white">{project.index}</span>
                {cat && <span className="rounded bg-[#EAE5DC]/75 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 dark:bg-slate-800/60 dark:text-stone-300">{t(cat.label, lang)}</span>}
                <span className="hidden text-[10px] font-medium text-stone-500 dark:text-stone-400 sm:inline">{t(ui.liveDemoPage, lang)}</span>
              </div>
              <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-stone-900 dark:text-[var(--color-ink-dark)] sm:truncate sm:text-sm">{project.title}</p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <div className="flex items-center rounded-md border border-[#D5CEC0] bg-[#EAE5DC]/75 p-0.5 dark:border-[var(--color-border-dark)] dark:bg-transparent">
              {LANGUAGES.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} className={`min-h-[42px] min-w-[38px] rounded px-2.5 py-1.5 text-xs font-medium transition-colors active:scale-95 ${lang === l.code ? 'bg-[var(--color-accent)] text-white' : 'text-stone-600 hover:text-stone-900 dark:text-[var(--color-muted-dark)] dark:hover:text-[var(--color-ink-dark)]'}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <button onClick={toggleTheme} className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center gap-1.5 rounded-md border border-[#DCD6CA] bg-[#F7F5F0]/80 px-2.5 py-1.5 text-xs font-medium text-stone-700 transition active:scale-95 dark:border-[var(--color-border-dark)] dark:bg-transparent dark:text-[var(--color-muted-dark)]" aria-label={theme === 'light' ? t(ui.themeDark, lang) : t(ui.themeLight, lang)}>
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl overflow-x-clip px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded border border-[#D5CEC0] bg-[#EAE5DC]/70 px-2 py-0.5 text-[11px] font-medium text-stone-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-stone-300">{s}</span>
          ))}
        </div>

        <section className="overflow-x-clip rounded-2xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-3 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65 sm:p-6">
          <LabDemo projectId={project.id} />
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#DCD6CA] bg-[#F7F5F0]/80 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65">
          <button type="button" onClick={() => setSpecsOpen((v) => !v)} className="flex min-h-[42px] w-full items-center justify-between px-4 py-3 text-left transition active:scale-[0.99] sm:px-6">
            <span className="text-sm font-semibold text-stone-900 dark:text-[var(--color-ink-dark)]">{t(ui.engineeringSpecs, lang)}</span>
            {specsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {specsOpen && (
            <div className="grid grid-cols-1 gap-4 border-t border-[#DCD6CA] p-4 dark:border-slate-800 sm:p-6 lg:grid-cols-2">
              <SpecBlock title={t(ui.sectionProblem, lang)} text={project.problemContext} />
              <SpecBlock title={t(ui.sectionArchitecture, lang)} text={project.systemArchitecture} />
              <SpecBlock title={t(ui.sectionDatabase, lang)} text={project.databaseAndSecurity} />
              <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/60 p-3 dark:border-slate-800 dark:bg-slate-950/30">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{t(ui.techStack, lang)}</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => <span key={s} className="rounded border border-[#D5CEC0] bg-[#EAE5DC]/75 px-2 py-0.5 text-xs font-medium text-stone-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-stone-200">{s}</span>)}
                </div>
              </div>
            </div>
          )}
        </section>

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between" aria-label="Project navigation">
          <button type="button" onClick={() => navigate(demoPath(prevId))} className="group flex min-h-[42px] flex-1 items-center gap-3 rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-3 text-start transition active:scale-[0.99] hover:border-[var(--color-accent)] dark:border-slate-800 dark:bg-slate-900/65">
            <ArrowLeft size={16} className="text-[var(--color-accent)]" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-500">{t(ui.previousProject, lang)} — {prev?.index}</div>
              <div className="truncate text-sm font-medium text-stone-900 dark:text-[var(--color-ink-dark)]">{prev?.title}</div>
            </div>
          </button>
          <button type="button" onClick={() => navigate(demoPath(nextId))} className="group flex min-h-[42px] flex-1 items-center justify-end gap-3 rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-3 text-end transition active:scale-[0.99] hover:border-[var(--color-accent)] dark:border-slate-800 dark:bg-slate-900/65">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-500">{t(ui.nextProject, lang)} — {next?.index}</div>
              <div className="truncate text-sm font-medium text-stone-900 dark:text-[var(--color-ink-dark)]">{next?.title}</div>
            </div>
            <ArrowRight size={16} className="text-[var(--color-accent)]" />
          </button>
        </nav>
      </main>
    </div>
  )
}

function SpecBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/60 p-3 dark:border-slate-800 dark:bg-slate-950/30">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">{title}</div>
      <p className="text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)]">{text}</p>
    </div>
  )
}

