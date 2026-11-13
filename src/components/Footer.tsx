import { t } from '../i18n/translations'
import { profile } from '../config/profile'
import { useApp } from '../context/AppContext'
import { SocialIcon } from './SocialIcon'

function socialClass(id: string) {
  const base =
    'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 bg-white/50 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 print:bg-white print:text-slate-900 print:border-slate-300 print:backdrop-blur-none'
  switch (id) {
    case 'instagram':
      return `${base} [&_svg]:text-[#C13584]/80 dark:[&_svg]:text-[#E1306C]/80 hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 hover:text-[#C13584] dark:hover:text-[#F472B6]`
    case 'telegram':
      return `${base} [&_svg]:text-[#0088CC]/80 dark:[&_svg]:text-[#38BDF8]/80 hover:bg-[#26A5E4]/10 hover:border-[#26A5E4]/30 hover:text-[#0088CC] dark:hover:text-[#38BDF8]`
    case 'linkedin':
      return `${base} [&_svg]:text-[#0A66C2]/80 dark:[&_svg]:text-[#60A5FA]/80 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] dark:hover:text-[#60A5FA]`
    case 'whatsapp':
      return `${base} [&_svg]:text-[#16A34A]/80 dark:[&_svg]:text-[#4ADE80]/80 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:text-[#15803D] dark:hover:text-[#4ADE80]`
    case 'github':
      return `${base} [&_svg]:text-slate-700/80 dark:[&_svg]:text-purple-300/80 hover:bg-slate-500/10 dark:hover:bg-purple-500/10 hover:border-slate-400/40 dark:hover:border-purple-400/30 hover:text-slate-900 dark:hover:text-purple-200`
    default:
      return base
  }
}

export function Footer() {
  const { lang } = useApp()
  return (
    <footer id="contact" className="no-print mt-16 scroll-mt-24 border-t border-[#DCD6CA] dark:border-slate-800/80">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:px-6 lg:px-8 dark:text-[var(--color-muted-dark)]">
        <div>
          <p className="font-medium text-stone-900 dark:text-[var(--color-ink-dark)]">{t(profile.fullName, lang)}</p>
          <p className="text-stone-500 dark:text-[var(--color-muted-dark)]">{t(profile.location, lang)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {profile.socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(s.label, lang)}
              className={socialClass(s.id)}
            >
              <SocialIcon id={s.id} size={14} />
              <span>{t(s.label, lang)}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
