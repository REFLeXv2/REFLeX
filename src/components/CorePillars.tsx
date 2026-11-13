import type { LocalizedText } from '../types'
import { t } from '../i18n/translations'
import { useApp } from '../context/AppContext'

interface Pillar {
  id: string
  title: LocalizedText
  description: LocalizedText
  bullets: { ar: string; en: string; tr: string }[]
}

const pillars: Pillar[] = [
  {
    id: 'systems',
    title: {
      ar: 'أنظمة وأدوات إنتاجية',
      en: 'Production Systems & Tools',
      tr: 'Üretim Sistemleri ve Araçlar',
    },
    description: {
      ar: 'أكثر من 23 نظامًا وتطبيقًا وأداة إنتاجية متكاملة (سطح مكتب، خدمات خلفية، وأدوات CLI) صُممت لمعالجة اختناقات تشغيلية حقيقية. تُبنى هذه الحلول بمعايير برمجية تضمن الاعتمادية اليومية في البيئات المؤسسية، مع تركيز على الأتمتة وتقليل التدخل اليدوي وتسليم قيمة عملية مستمرة.',
      en: 'A portfolio of 23+ end-to-end production systems, desktop applications, background daemons, and CLI utilities built to solve real operational bottlenecks. Each solution is developed to institutional reliability standards, emphasizing automation, reduced manual effort, and consistent day-to-day operational value.',
      tr: 'Gerçek operasyonel darboğazları çözmek için tasarlanmış 23+ uçtan uca üretim sistemi, masaüstü uygulaması, arka plan hizmeti ve CLI aracından oluşan bir portföy. Her çözüm; otomasyon, manuel eforun azaltılması ve günlük kurumsal güvenilirlik odaklı yazılım standartlarıyla geliştirilmiştir.',
    },
    bullets: [
      {
        ar: 'معمارية تعمل دون اتصال أولًا (Offline-first) مع تخزين محلي مشفر وحماية لسلامة البيانات.',
        en: 'Offline-first architecture with local encrypted storage and strong data-integrity safeguards.',
        tr: 'Yerel şifreli depolama ve güçlü veri bütünlüğü korumalarıyla çevrimdışı öncelikli mimari.',
      },
      {
        ar: 'خطوط معالجة خلفية ذاتية (Autonomous pipelines) تُلغي التكرار اليدوي وتؤتمت المهام الدورية.',
        en: 'Autonomous background pipelines that eliminate manual repetition and automate recurring tasks.',
        tr: 'Manuel tekrarı ortadan kaldıran ve yinelenen görevleri otomatikleştiren otonom arka plan hatları.',
      },
      {
        ar: 'تنفيذ عالي التوازي (High-concurrency) لمعالجة الأحمال والمهام المتزامنة بكفاءة.',
        en: 'High-concurrency execution for efficient handling of parallel workloads and simultaneous tasks.',
        tr: 'Paralel iş yüklerini ve eşzamanlı görevleri verimli işlemek için yüksek eşzamanlılık.',
      },
      {
        ar: 'نشر خفيف على الحافة (Zero-bloat edge deployments) لأداء سريع واستجابة فورية.',
        en: 'Zero-bloat edge deployments for fast performance and immediate responsiveness.',
        tr: 'Hızlı performans ve anında yanıt için gereksiz yük içermeyen edge dağıtımları.',
      },
      {
        ar: 'تصميم موثوق للاستخدام اليومي المؤسسي مع قابلية للصيانة والتوسع التدريجي.',
        en: 'Reliable design for daily institutional use with maintainability and incremental scalability.',
        tr: 'Bakım kolaylığı ve kademeli ölçeklenebilirlik ile günlük kurumsal kullanım için güvenilir tasarım.',
      },
    ],
  },
  {
    id: 'domains',
    title: {
      ar: 'مجالات برمجية أساسية',
      en: 'Core Software Domains',
      tr: 'Temel Yazılım Alanları',
    },
    description: {
      ar: 'خمسة مجالات برمجية متكاملة تغطي دورة العمل المؤسسي والتقني: من إدارة القضايا والوثائق، إلى الأمن والتحقق البيومتري، وأتمتة الوسائط والبيانات الضخمة، وصولًا إلى البوابات التفاعلية وأدوات الأنظمة متعددة المنصات.',
      en: 'Five integrated software domains spanning institutional and technical workflows—from case and document operations to security and biometric verification, media and big-data automation, interactive portals, and cross-platform systems tooling.',
      tr: 'Kurumsal ve teknik iş akışlarını kapsayan beş bütünleşik yazılım alanı: dava ve belge operasyonlarından güvenlik ve biyometrik doğrulamaya, medya ve büyük veri otomasyonundan etkileşimli portallara ve çok platformlu sistem araçlarına kadar.',
    },
    bullets: [
      {
        ar: 'أنظمة المؤسسات والقانون/الإدارة: تتبع القضايا كامل الدورة، دفاتر مالية، أرشفة وثائق بالباركود، وجدولة متعددة الأقسام.',
        en: 'Enterprise & Legal/Administrative Systems: full-lifecycle case tracking, financial ledgers, barcode document archiving, and multi-department scheduling.',
        tr: 'Kurumsal ve Hukuki/İdari Sistemler: tam yaşam döngüsü dava takibi, finans defterleri, barkodlu belge arşivleme ve çok departmanlı zamanlama.',
      },
      {
        ar: 'أمن وانعدام الثقة والتحقق البيومتري: حضور جغرافي (Geofencing)، بصمات أجهزة WebAuthn، بوابات صلاحيات RBAC، وسجلات تدقيق مقاومة للعبث.',
        en: 'Zero-Trust Security & Biometric Verification: geofenced attendance check-ins, WebAuthn cryptographic device fingerprinting, RBAC permission gateways, and tamper-evident audit logs.',
        tr: 'Sıfır Güven Güvenliği ve Biyometrik Doğrulama: coğrafi sınırlı yoklama, WebAuthn kriptografik cihaz parmak izi, RBAC yetki ağ geçitleri ve değiştirilmeye dayanıklı denetim kayıtları.',
      },
      {
        ar: 'أتمتة الوسائط وOCR وفهرسة البيانات الضخمة: بحث نصي كامل FTS5 بأجزاء من الثانية عبر أرشيف 500GB+، استخراج Tesseract OCR، وخطوط وسائط دفعية FFmpeg/Pillow.',
        en: 'Autonomous Media, OCR & Big-Data Indexing: sub-second FTS5 full-text search across 500GB+ archives, Tesseract OCR extraction, and automated FFmpeg/Pillow batch media pipelines.',
        tr: 'Otonom Medya, OCR ve Büyük Veri Dizinleme: 500GB+ arşivlerde saniyenin altında FTS5 tam metin arama, Tesseract OCR çıkarımı ve otomatik FFmpeg/Pillow toplu medya hatları.',
      },
      {
        ar: 'بوابات ويب تفاعلية على الحافة: مواقع ثابتة/SSR عالية السرعة على Cloudflare Pages، حاسبات رسوم وجداول زمنية إجرائية، ومنصات رقمية موجهة للعملاء.',
        en: 'Edge Web Portals & Interactive Utilities: high-speed static/SSR portals on Cloudflare Pages, procedural fee/timeline calculators, and client-facing digital platforms.',
        tr: 'Edge Web Portalları ve Etkileşimli Araçlar: Cloudflare Pages üzerinde yüksek hızlı statik/SSR portallar, prosedür ücret/zaman çizelgesi hesaplayıcıları ve müşteriye yönelik dijital platformlar.',
      },
      {
        ar: 'برمجة الأنظمة وأدوات CLI متعددة المنصات: محركات ترحيل قواعد بيانات حتمية، محللات رموز بحث عربية (NLP)، خدمات مصغرة لرموز QR، وأدوات نقل ملفات LAN.',
        en: 'Systems Programming & Cross-Platform CLI Tooling: deterministic database migration engines, Arabic NLP search tokenizers, QR verification microservices, and local LAN transfer utilities.',
        tr: 'Sistem Programlama ve Çok Platformlu CLI Araçları: belirleyici veritabanı taşıma motorları, Arapça NLP arama tokenizer’ları, QR doğrulama mikro hizmetleri ve yerel LAN aktarım araçları.',
      },
    ],
  },
  {
    id: 'stack',
    title: {
      ar: 'التقنيات الأساسية',
      en: 'Primary Stack & Architecture',
      tr: 'Birincil Teknoloji Yığını ve Mimari',
    },
    description: {
      ar: 'حزمة تقنية متعددة الطبقات تُختار وفق معايير الأداء والأمن وقابلية الصيانة. يجمع النهج بين لغات وأنظمة عالية الأداء، وواجهات حديثة متعددة المنصات، وقواعد بيانات وبنية نشر موثوقة لتسليم حلول إنتاجية متوازنة.',
      en: 'A multi-layered technical stack selected for performance, security, and maintainability. The approach combines high-performance languages and runtimes, modern cross-platform interfaces, and reliable data and deployment architecture to deliver balanced production solutions.',
      tr: 'Performans, güvenlik ve bakım kolaylığına göre seçilen çok katmanlı bir teknoloji yığını. Yaklaşım; yüksek performanslı diller ve çalışma zamanları, modern çok platformlu arayüzler ile güvenilir veri ve dağıtım mimarisini birleştirerek dengeli üretim çözümleri sunar.',
    },
    bullets: [
      {
        ar: 'الأنظمة والخلفية عالية الأداء: Rust (Tauri, Tokio, Clap)، Python (FFmpeg, OCR, Playwright, أتمتة)، Node.js (Express, REST APIs, عمال)، Go، C#.',
        en: 'Systems & High-Performance Backend: Rust (Tauri, Tokio, Clap), Python (FFmpeg, OCR, Playwright, automation), Node.js (Express, REST APIs, workers), Go, C#.',
        tr: 'Sistemler ve Yüksek Performanslı Arka Uç: Rust (Tauri, Tokio, Clap), Python (FFmpeg, OCR, Playwright, otomasyon), Node.js (Express, REST API, worker), Go, C#.',
      },
      {
        ar: 'الواجهات الأمامية وسطح المكتب: React، TypeScript، Next.js، Tauri، Tailwind CSS مع دعم كامل RTL/LTR والتدويل.',
        en: 'Frontend & Desktop Interfaces: React, TypeScript, Next.js, Tauri, Tailwind CSS with full RTL/LTR internationalization.',
        tr: 'Ön Uç ve Masaüstü Arayüzleri: React, TypeScript, Next.js, Tauri, Tailwind CSS ile tam RTL/LTR uluslararasılaştırma.',
      },
      {
        ar: 'قواعد البيانات ومحركات البحث: SQLite (فهرسة نصية كاملة FTS5 وتشفير)، PostgreSQL، Firebase/Firestore، Redis.',
        en: 'Databases & Search Engines: SQLite (FTS5 full-text indexing & encryption), PostgreSQL, Firebase/Firestore, Redis.',
        tr: 'Veritabanları ve Arama Motorları: SQLite (FTS5 tam metin dizinleme ve şifreleme), PostgreSQL, Firebase/Firestore, Redis.',
      },
      {
        ar: 'الاتصال والتكامل: REST APIs، WebSockets، Webhooks، وCloud Functions لأتمتة سير العمل.',
        en: 'Integration & Communication: REST APIs, WebSockets, Webhooks, and Cloud Functions for workflow automation.',
        tr: 'Entegrasyon ve İletişim: REST API’ler, WebSockets, Webhook’lar ve iş akışı otomasyonu için Cloud Functions.',
      },
      {
        ar: 'النشر والبنية التحتية: Cloudflare Pages، Docker، وبيئات تشغيل موثوقة مع تركيز على الأمان وقابلية الصيانة.',
        en: 'Deployment & Infrastructure: Cloudflare Pages, Docker, and reliable runtimes with a focus on security and maintainability.',
        tr: 'Dağıtım ve Altyapı: Cloudflare Pages, Docker ve güvenlik ile bakım kolaylığına odaklanan güvenilir çalışma ortamları.',
      },
    ],
  },
]

export function CorePillars() {
  const { lang } = useApp()
  return (
    <section className="border-b border-[#DCD6CA] dark:border-slate-800/80 print:break-inside-avoid">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-xl border border-[#DCD6CA] bg-[#F7F5F0]/80 p-5 shadow-sm shadow-stone-900/5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/65 dark:shadow-none print:border-[#e2e8f0] print:bg-white print:text-black print:shadow-none print:backdrop-blur-none print:p-3"
            >
              <h2 className="text-base font-semibold tracking-tight text-stone-900 dark:text-[var(--color-ink-dark)] print:text-[12px] print:text-black">
                {t(p.title, lang)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-[var(--color-muted-dark)] print:text-[9px] print:leading-snug print:text-black">
                {t(p.description, lang)}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-stone-700 dark:text-[var(--color-muted-dark)] print:mt-2 print:space-y-1 print:text-[9px] print:text-black">
                {p.bullets.map((b) => (
                  <li key={b.en} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] print:mt-1" />
                    <span className="leading-relaxed print:leading-snug">{b[lang]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
