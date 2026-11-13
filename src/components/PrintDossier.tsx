import { QRCodeSVG } from 'qrcode.react'
import type { Project } from '../types'
import { categories, t, ui } from '../i18n/translations'
import { profile } from '../config/profile'
import { useApp } from '../context/AppContext'

export function PrintDossier({ projects }: { projects: Project[] }) {
  const { lang } = useApp()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const langs = [
    { name: 'Python', domain: { ar: 'الذكاء الاصطناعي والأتمتة وخطوط البيانات', en: 'AI, Automation & Data Pipelines', tr: 'Yapay Zeka, Otomasyon ve Veri Hatları' } },
    { name: 'TypeScript', domain: { ar: 'تطوير الويب المتكامل والمعماريات القابلة للتوسع', en: 'Full-Stack & Scalable Web Architecture', tr: 'Tam Yığın ve Ölçeklenebilir Web Mimarisi' } },
    { name: 'JavaScript (ES2026)', domain: { ar: 'الويب التفاعلي وبيئات التشغيل', en: 'Interactive Web & Runtime Ecosystems', tr: 'Etkileşimli Web ve Çalışma Zamanı Ekosistemleri' } },
    { name: 'Rust', domain: { ar: 'برمجة الأنظمة وسطح المكتب وأدوات CLI عالية الأداء', en: 'Systems Programming, Desktop & High-Performance CLIs', tr: 'Sistem Programlama, Masaüstü ve Yüksek Performanslı CLI' } },
    { name: 'Go (Golang)', domain: { ar: 'الخدمات السحابية والتوازي والخدمات المصغرة', en: 'Cloud Services, Concurrency & Microservices', tr: 'Bulut Hizmetleri, Eşzamanlılık ve Mikro Hizmetler' } },
    { name: 'C# (.NET)', domain: { ar: 'أنظمة المؤسسات والتطبيقات متعددة المنصات', en: 'Enterprise Systems & Cross-Platform Apps', tr: 'Kurumsal Sistemler ve Çok Platformlu Uygulamalar' } },
    { name: 'C++', domain: { ar: 'الأداء منخفض المستوى والمحركات الأصلية', en: 'Low-Level Performance & Native Engines', tr: 'Düşük Seviye Performans ve Yerel Motorlar' } },
    { name: 'Java', domain: { ar: 'الواجهة الخلفية للمؤسسات والأنظمة الموزعة', en: 'Enterprise Backend & Distributed Systems', tr: 'Kurumsal Arka Uç ve Dağıtık Sistemler' } },
    { name: 'Kotlin', domain: { ar: 'تطوير Android الحديث وواجهات JVM الخلفية', en: 'Modern Android & JVM Backend', tr: 'Modern Android ve JVM Arka Uç' } },
    { name: 'Swift', domain: { ar: 'تطوير iOS ومنظومة Apple', en: 'iOS & Apple Ecosystem Development', tr: 'iOS ve Apple Ekosistemi Geliştirme' } },
    { name: 'SQL', domain: { ar: 'قواعد البيانات العلائقية: PostgreSQL وSQLite وMySQL', en: 'Relational Databases: PostgreSQL, SQLite, MySQL', tr: 'İlişkisel Veritabanları: PostgreSQL, SQLite, MySQL' } },
    { name: 'Dart', domain: { ar: 'تطبيقات الجوال متعددة المنصات وتصميم الواجهات', en: 'Cross-Platform Mobile & UI Development', tr: 'Çok Platformlu Mobil ve Arayüz Geliştirme' } },
  ]
  const bio = ui.bio[lang]
  return (
    <section className="print-only">
      <div className="mb-3 border-b-2 border-[#0F172A] pb-2 print-break-inside-avoid">
        <h1 className="text-2xl font-bold text-[#0F172A]">{t(profile.fullName, lang)}</h1>
        <p className="text-sm font-medium text-[#0D9488]">{t(profile.title, lang)}</p>
        <p className="mt-1 text-[10px] text-[#475569]">
          {t(profile.location, lang)} · {t(profile.dateOfBirth.label, lang)} · {t(profile.experience.label, lang)} · {t(profile.spokenLanguages.label, lang)}
        </p>
        <p className="mt-0.5 text-[10px] text-[#475569]">
          GitHub: github.com/USERNAME · LinkedIn: linkedin.com/in/USERNAME · Telegram: t.me/USERNAME · WhatsApp: wa.me/9647XXXXXXXXX · Instagram: instagram.com/USERNAME
        </p>
        <div className="mt-1.5 space-y-1">
          {bio.map((para) => (
            <p key={para.slice(0, 24)} className="text-[9px] leading-snug text-[#334155]">
              {para}
            </p>
          ))}
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#0F172A]">{t(ui.portfolioDossier, lang)} — {t(profile.portfolioScale.label, lang)}</p>
      </div>
      <div className="mb-3 border border-[#e2e8f0] p-2 print-break-inside-avoid">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#0D9488]">{t(ui.programmingLanguages, lang)}</p>
        <div className="grid grid-cols-3 gap-1">
          {langs.map((l) => (
            <div key={l.name} className="border border-[#e2e8f0] px-1.5 py-1">
              <p className="text-[9px] font-semibold text-[#0F172A]">{l.name}</p>
              <p className="text-[8px] leading-snug text-[#475569]">{t(l.domain, lang)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {projects.map((p) => {
          const cat = categories.find((c) => c.id === p.category)
          const demoPageUrl = `${origin}/demo/${String(p.id).padStart(2, '0')}`
          return (
            <article key={p.id} className="print-break-inside-avoid border border-[#e2e8f0] p-2.5">
              <div className="mb-1.5 flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-semibold text-[#0D9488]">{p.index}</span>
                  {cat && <span className="ms-1 text-[9px] uppercase tracking-wide text-[#475569]">{t(cat.label, lang)}</span>}
                  <h3 className="mt-0.5 text-[11px] font-semibold leading-snug text-[#0F172A]">{p.title}</h3>
                </div>
                <QRCodeSVG value={demoPageUrl} size={38} level="M" fgColor="#0F172A" />
              </div>
              <div className="space-y-1.5 text-[8.5px] leading-relaxed text-[#334155]">
                <p className="print-break-inside-avoid"><strong className="text-[#0F172A]">{t(ui.sectionProblem, lang)}:</strong> {p.problemContext}</p>
                <p className="print-break-inside-avoid"><strong className="text-[#0F172A]">{t(ui.sectionArchitecture, lang)}:</strong> {p.systemArchitecture}</p>
                <p className="print-break-inside-avoid"><strong className="text-[#0F172A]">{t(ui.sectionDatabase, lang)}:</strong> {p.databaseAndSecurity}</p>
                <div className="print-break-inside-avoid">
                  <p className="font-semibold text-[#0F172A]">{t(ui.sectionCapabilities, lang)}:</p>
                  <ul className="mt-0.5 list-disc space-y-0.5 ps-4">
                    {p.keyFeatures.map((f) => (
                      <li key={f.title}><strong>{f.title}:</strong> {f.explanation}</li>
                    ))}
                  </ul>
                </div>
                <p className="print-break-inside-avoid"><strong className="text-[#0F172A]">{t(ui.sectionImpact, lang)}:</strong> {p.operationalImpact}</p>
                <p><strong className="text-[#0F172A]">Stack:</strong> {p.stack.join(', ')}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
