import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react'
import { categories, t, ui } from '../i18n/translations'
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

  const langOpts = [
    { code: 'ar' as const, label: 'عربي' },
    { code: 'en' as const, label: 'EN' },
    { code: 'tr' as const, label: 'TR' },
  ]

  const DesktopLangSwitcher = () => (
    <div className="inline-flex h-9 shrink-0 items-center rounded-xl border border-stone-300/70 bg-stone-200/70 p-1 dark:border-slate-700/70 dark:bg-slate-800/80" role="group" aria-label="Language">
      {([
        { code: 'ar' as const, label: 'العربية' },
        { code: 'en' as const, label: 'EN' },
        { code: 'tr' as const, label: 'TR' },
      ]).map((opt) => (
        <button key={opt.code} type="button" onClick={() => setLang(opt.code)} className={`inline-flex h-7 items-center justify-center whitespace-nowrap rounded-lg px-2.5 text-xs font-semibold leading-none transition-all ${lang === opt.code ? 'bg-white text-teal-700 shadow-xs dark:bg-slate-900 dark:text-teal-300' : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white'}`}>
          {opt.label}
        </button>
      ))}
    </div>
  )

  const MobileLangSwitcher = () => (
    <div className="inline-flex h-8 shrink-0 items-center rounded-lg border border-stone-300/70 bg-stone-200/70 p-0.5 dark:border-slate-700/70 dark:bg-slate-800/80" role="group" aria-label="Language">
      {langOpts.map((opt) => (
        <button key={opt.code} type="button" onClick={() => setLang(opt.code)} className={`inline-flex h-7 items-center justify-center whitespace-nowrap rounded-md px-2 text-[11px] font-bold leading-none transition-all ${lang === opt.code ? 'bg-white text-teal-700 shadow-xs dark:bg-slate-900 dark:text-teal-300' : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white'}`}>
          {opt.label}
        </button>
      ))}
    </div>
  )

  return (
    <div className="relative z-10 min-h-[100dvh] w-full max-w-full overflow-x-clip bg-transparent text-[var(--color-ink-light)] dark:text-[var(--color-ink-dark)]">
      <InteractiveBackground />
      <header className="no-print sticky top-0 z-50 w-full max-w-full border-b border-[#DCD6CA] bg-[#F7F5F0]/85 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
        {/* Desktop */}
        <div className="mx-auto hidden h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:flex lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={goBack} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/80 px-3 text-xs font-semibold leading-none text-stone-700 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-slate-700 dark:bg-slate-900/60 dark:text-stone-200">
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} <span className="whitespace-nowrap">{t(ui.backToPortfolio, lang)}</span>
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[var(--color-accent)] px-2 py-0.5 font-mono text-[11px] font-bold text-white">{project.index}</span>
                {cat && <span className="rounded bg-[#EAE5DC]/75 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 dark:bg-slate-800/60 dark:text-stone-300">{t(cat.label, lang)}</span>}
                <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">{t(ui.liveDemoPage, lang)}</span>
              </div>
              <p className="truncate text-sm font-semibold leading-snug text-stone-900 dark:text-[var(--color-ink-dark)]">{project.title}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <DesktopLangSwitcher />
            <button onClick={toggleTheme} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-stone-300/70 bg-stone-200/70 text-stone-700 transition hover:bg-white dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-stone-200 dark:hover:bg-slate-900" aria-label={theme === 'light' ? t(ui.themeDark, lang) : t(ui.themeLight, lang)}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex h-12 items-center justify-between px-3 gap-2">
            <button type="button" onClick={goBack} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/80 px-2.5 text-[11px] font-bold leading-none text-stone-700 transition active:scale-95 dark:border-slate-700 dark:bg-slate-900/60 dark:text-stone-200">
              {isRtl ? <ArrowRight size={13} /> : <ArrowLeft size={13} />} <span className="whitespace-nowrap">{lang === 'ar' ? 'رجوع' : lang === 'tr' ? 'Geri' : 'Back'}</span>
            </button>
            <div className="flex shrink-0 items-center gap-1.5">
              <MobileLangSwitcher />
              <button onClick={toggleTheme} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-300/70 bg-stone-200/70 text-stone-700 transition active:scale-95 dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-stone-200" aria-label={theme === 'light' ? t(ui.themeDark, lang) : t(ui.themeLight, lang)}>
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-stone-300/50 px-3 py-1.5 dark:border-slate-800/70">
            <span className="shrink-0 rounded-full bg-[var(--color-accent)] px-2 py-0.5 font-mono text-[10px] font-bold leading-none text-white">{project.index}</span>
            {cat && <span className="shrink-0 rounded bg-[#EAE5DC]/75 px-1.5 py-0.5 text-[10px] font-medium uppercase leading-none tracking-wide text-stone-600 dark:bg-slate-800/60 dark:text-stone-300">{t(cat.label, lang)}</span>}
            <p className="min-w-0 flex-1 truncate text-xs font-semibold leading-none text-stone-900 dark:text-[var(--color-ink-dark)]">{project.title}</p>
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
            <ArrowLeft size={16} className="shrink-0 text-[var(--color-accent)]" />
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
            <ArrowRight size={16} className="shrink-0 text-[var(--color-accent)]" />
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
