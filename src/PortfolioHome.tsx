import { useMemo } from 'react'
import type { CategoryId, Project } from './types'
import { projectsAr } from './data/projects.ar'
import { projectsEn } from './data/projects.en'
import { projectsTr } from './data/projects.tr'
import { t, ui } from './i18n/translations'
import { useApp } from './context/AppContext'
import { Header } from './components/Header'
import { ProfileHeader } from './components/ProfileHeader'
import { CorePillars } from './components/CorePillars'
import { CoreLanguages } from './components/CoreLanguages'
import { LiveLabShowcase } from './components/lab/LiveLabShowcase'
import { Filters } from './components/Filters'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { Footer } from './components/Footer'
import { PrintDossier } from './components/PrintDossier'
import { InteractiveBackground } from './components/InteractiveBackground'
import { demoPath, navigate } from './router'
import { useEffect, useState } from 'react'
import { ArrowUp, X } from 'lucide-react'

function normalize(s: string) { return s.toLowerCase() }

export function matchesLanguage(stack: string[], selected: string) {
  const s = stack.map((x) => x.toLowerCase())
  if (selected === 'SQL') return s.some((x) => x.includes('sql') || x.includes('sqlite') || x.includes('postgres'))
  if (selected === 'JavaScript (ES2026)') return s.some((x) => x.includes('javascript'))
  if (selected === 'C# (.NET)') return s.some((x) => x.includes('c#') || x.includes('.net'))
  if (selected === 'Go (Golang)') return s.some((x) => x.includes('go'))
  return s.some((x) => x.includes(selected.toLowerCase()))
}

export function PortfolioHome() {
  const { lang } = useApp()
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [showTop, setShowTop] = useState(false)

  const projects = useMemo(() => (lang === 'ar' ? projectsAr : lang === 'tr' ? projectsTr : projectsEn), [lang])

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const p of projects) map[p.category] = (map[p.category] || 0) + 1
    return map
  }, [projects])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return projects.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (selectedLanguage && !matchesLanguage(p.stack, selectedLanguage)) return false
      if (!q) return true
      const hay = [p.title, p.problemContext, p.systemArchitecture, p.databaseAndSecurity, p.operationalImpact, ...p.keyFeatures.map((f) => `${f.title} ${f.explanation}`), ...p.stack].join(' ')
      return normalize(hay).includes(q)
    })
  }, [category, query, projects, selectedLanguage])

  const compactMode = !query.trim() && category === 'all' && !selectedLanguage
  const visible = compactMode && !showAll ? filtered.slice(0, 6) : filtered

  useEffect(() => {
    const ids = ['about', 'languages', 'lab', 'projects']
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        setShowTop(window.scrollY > 450)
        const offset = 140
        let current = 'about'
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top - offset <= 0) current = id
        }
        setActiveSection(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) window.cancelAnimationFrame(raf) }
  }, [])

  const onSelectLanguage = (name: string) => {
    setSelectedLanguage((prev) => (prev === name ? null : name))
    setShowAll(true)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onLaunchLab = (projectId: number) => navigate(demoPath(projectId))

  return (
    <div className="relative z-10 min-h-[100dvh] w-full max-w-full overflow-x-clip bg-transparent text-[var(--color-ink-light)] dark:text-[var(--color-ink-dark)]">
      <InteractiveBackground />
      <Header activeSection={activeSection} />
      <main className="no-print w-full max-w-full overflow-x-clip">
        <ProfileHeader />
        <CorePillars />
        <CoreLanguages selected={selectedLanguage} onSelect={onSelectLanguage} projects={projects} />
        <LiveLabShowcase projects={projects} />
        <Filters active={category} onChange={setCategory} query={query} onQuery={setQuery} counts={counts} total={projects.length} />
        <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-3 py-8 sm:px-6 lg:px-8">
          {selectedLanguage && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-2 text-sm text-teal-800 dark:text-teal-200">
              <span className="break-words">{t(ui.filteredBy, lang)}: <strong>{selectedLanguage}</strong> ({filtered.length} {t(ui.projectsLabel, lang)})</span>
              <button type="button" onClick={() => setSelectedLanguage(null)} className="inline-flex min-h-[42px] items-center gap-1 rounded border border-teal-600/30 px-2 py-1 text-xs font-medium transition active:scale-95 hover:bg-teal-600/20">
                <X size={12} /> {t(ui.clearFilter, lang)}
              </button>
            </div>
          )}
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]">{t(ui.noResults, lang)}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((p) => (
                  <ProjectCard key={p.id} project={p} onOpen={setSelected} onLaunchLab={onLaunchLab} />
                ))}
              </div>
              {compactMode && filtered.length > 6 && (
                <div className="mt-6 flex justify-center">
                  <button type="button" onClick={() => setShowAll((v) => !v)} className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#DCD6CA] bg-[#F7F5F0]/80 px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-md transition-all active:scale-95 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-slate-800/80 dark:bg-slate-900/65 dark:text-[var(--color-ink-dark)]">
                    {showAll ? t(ui.showLess, lang) : t(ui.showAllProjects, lang)}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
      <PrintDossier projects={projects} />
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} onLaunchLab={onLaunchLab} />}

      <button type="button" aria-label={t(ui.backToTop, lang)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`no-print fixed bottom-6 end-6 z-40 inline-flex h-11 min-h-[42px] w-11 min-w-[42px] items-center justify-center rounded-full border border-[#DCD6CA] bg-[#F7F5F0]/80 text-stone-700 shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-[var(--color-ink-dark)] ${showTop ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}>
        <ArrowUp size={18} />
      </button>
    </div>
  )
}

