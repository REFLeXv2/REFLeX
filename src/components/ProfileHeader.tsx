import { Calendar, Globe, Layers, MapPin, Briefcase } from 'lucide-react'
import { t, ui } from '../i18n/translations'
import { profile } from '../config/profile'
import { useApp } from '../context/AppContext'

export function ProfileHeader() {
  const { lang } = useApp()
  const badges = [
    { icon: Calendar, text: t(profile.dateOfBirth.label, lang) },
    { icon: Briefcase, text: t(profile.experience.label, lang) },
    { icon: Globe, text: t(profile.spokenLanguages.label, lang) },
    { icon: Layers, text: t(profile.portfolioScale.label, lang) },
  ]
  const bio = ui.bio[lang]

  return (
    <section id="about" className="scroll-mt-24 border-b border-[#DCD6CA] dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-6 shadow-sm shadow-stone-900/5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65 dark:shadow-none sm:p-8 print:border-[#e2e8f0] print:bg-white print:text-black print:shadow-none print:backdrop-blur-none">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-[var(--color-ink-dark)]">
            {t(profile.fullName, lang)}
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium text-[var(--color-accent)] sm:text-lg">
            {t(profile.title, lang)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-[var(--color-muted-dark)]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {t(profile.location, lang)}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span key={b.text} className="inline-flex items-center gap-1.5 rounded-full border border-[#D5CEC0] bg-[#EAE5DC]/75 px-3 py-1 text-xs font-medium text-stone-700 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65 dark:text-[var(--color-ink-dark)] print:bg-white print:backdrop-blur-none">
                <b.icon size={13} className="text-[var(--color-accent)]" />
                {b.text}
              </span>
            ))}
          </div>
          <div className="mt-6 border-t border-[#DCD6CA] pt-5 dark:border-slate-800/80 print:pt-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {t(ui.about, lang)}
            </h2>
            <div className="mt-3 max-w-4xl space-y-3">
              {bio.map((para) => (
                <p key={para.slice(0, 24)} className="text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)] print:text-[10px] print:leading-snug print:text-black">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
