import type { CategoryMeta, Lang, LocalizedText } from '../types'

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
]

export const categories: CategoryMeta[] = [
  {
    id: 'all',
    label: { ar: 'الكل', en: 'All', tr: 'Tümü' },
  },
  {
    id: 'desktop-systems',
    label: {
      ar: 'أنظمة المؤسسات وسطح المكتب',
      en: 'Enterprise & Desktop Systems',
      tr: 'Kurumsal ve Masaüstü Sistemler',
    },
  },
  {
    id: 'security-dashboards',
    label: {
      ar: 'الأمن والقياسات الحيوية ولوحات التحكم',
      en: 'Security, Biometrics & Control Dashboards',
      tr: 'Güvenlik, Biyometri ve Kontrol Panelleri',
    },
  },
  {
    id: 'automation-data',
    label: {
      ar: 'أتمتة العمليات ومعالجة البيانات',
      en: 'Automation Pipelines & Data Processing',
      tr: 'Otomasyon Hatları ve Veri İşleme',
    },
  },
  {
    id: 'web-portals',
    label: {
      ar: 'البوابات والواجهات المنشورة',
      en: 'Web Portals & Deployed Interfaces',
      tr: 'Web Portalları ve Yayınlanmış Arayüzler',
    },
  },
  {
    id: 'cli-tooling',
    label: {
      ar: 'أدوات سطر الأوامر والمكتبات والواجهات البرمجية',
      en: 'CLI Tools, Libraries & APIs',
      tr: 'CLI Araçları, Kütüphaneler ve API’ler',
    },
  },
]

export const ui = {
  name: '[Your Full Name / الاسم الكامل]' as const,
  title: {
    ar: 'مطور برمجيات وأنظمة متكاملة | مزاول مهنة',
    en: 'Full-Stack & Systems Software Developer',
    tr: 'Tam Yığın ve Sistem Yazılım Geliştiricisi',
  } as LocalizedText,
  location: {
    ar: 'بغداد، العراق',
    en: 'Baghdad, Iraq',
    tr: 'Bağdat, Irak',
  } as LocalizedText,
  metrics: {
    systems: {
      value: '23+',
      label: {
        ar: 'أنظمة وأدوات إنتاجية',
        en: 'Production Systems & Tools',
        tr: 'Üretim Sistemleri ve Araçlar',
      },
    },
    domains: {
      value: '5',
      label: {
        ar: 'مجالات أساسية',
        en: 'Core Domains',
        tr: 'Temel Alan',
      },
    },
    stack: {
      value: 'Rust · TS · Python',
      label: {
        ar: 'التقنيات الأساسية',
        en: 'Primary Stack',
        tr: 'Birincil Teknoloji Yığını',
      },
    },
  },
  searchPlaceholder: {
    ar: 'ابحث بالعنوان أو التقنية أو الملخص…',
    en: 'Search by title, tech stack, or summary…',
    tr: 'Başlık, teknoloji yığını veya özet ile ara…',
  },
  print: {
    ar: 'طباعة / تصدير ملف PDF',
    en: 'Print / Export PDF Dossier',
    tr: 'Yazdır / PDF Dosyası Dışa Aktar',
  },
  themeLight: { ar: 'فاتح', en: 'Light', tr: 'Açık' } as LocalizedText,
  themeDark: { ar: 'داكن', en: 'Dark', tr: 'Koyu' } as LocalizedText,
  viewDetails: { ar: 'عرض التفاصيل', en: 'View details', tr: 'Ayrıntıları görüntüle' } as LocalizedText,
  close: { ar: 'إغلاق', en: 'Close', tr: 'Kapat' } as LocalizedText,
  problem: { ar: 'المشكلة', en: 'Problem', tr: 'Sorun' } as LocalizedText,
  architecture: { ar: 'المعمارية', en: 'Architecture', tr: 'Mimari' } as LocalizedText,
  outcome: { ar: 'النتيجة', en: 'Outcome', tr: 'Sonuç' } as LocalizedText,
  highlights: { ar: 'أبرز النقاط التقنية', en: 'Key Technical Highlights', tr: 'Öne Çıkan Teknik Noktalar' } as LocalizedText,
  techStack: { ar: 'التقنيات المستخدمة', en: 'Tech Stack', tr: 'Teknoloji Yığını' } as LocalizedText,
  noResults: {
    ar: 'لا توجد مشاريع مطابقة لخيارات البحث الحالية.',
    en: 'No projects match the current filters.',
    tr: 'Geçerli filtrelerle eşleşen proje yok.',
  } as LocalizedText,
  projectsLabel: { ar: 'مشاريع', en: 'projects', tr: 'proje' } as LocalizedText,
  contact: { ar: 'تواصل', en: 'Contact', tr: 'İletişim' } as LocalizedText,
  contactMe: { ar: 'تواصل معي', en: 'Contact', tr: 'İletişim' } as LocalizedText,
  navAbout: { ar: 'نبذة', en: 'About', tr: 'Hakkımda' } as LocalizedText,
  navLanguages: { ar: 'لغات البرمجة', en: 'Languages', tr: 'Diller' } as LocalizedText,
  navLab: { ar: 'المختبر الحي', en: 'Live Lab', tr: 'Canlı Lab' } as LocalizedText,
  navProjects: { ar: 'المشاريع (23)', en: 'Projects (23)', tr: 'Projeler (23)' } as LocalizedText,
  filteredBy: { ar: 'تصفية حسب', en: 'Filtered by', tr: 'Filtre' } as LocalizedText,
  clearFilter: { ar: 'مسح التصفية', en: 'Clear Filter', tr: 'Filtreyi Temizle' } as LocalizedText,
  showAllProjects: { ar: 'عرض جميع المشاريع (23 مشروع)', en: 'Show All 23 Projects (17 More)', tr: 'Tüm 23 Projeyi Göster (17 Daha)' } as LocalizedText,
  showLess: { ar: 'طي القائمة', en: 'Show Less', tr: 'Daha Az Göster' } as LocalizedText,
  backToTop: { ar: 'العودة للأعلى', en: 'Back to top', tr: 'Başa dön' } as LocalizedText,
  filterProjectsCue: { ar: 'اضغط لعرض المشاريع المرتبطة ←', en: 'Click to filter matching projects →', tr: 'İlgili projeleri filtrele →' } as LocalizedText,
  labTitle: { ar: 'المختبر الهندسي التفاعلي الحي', en: 'Live Interactive Engineering Lab', tr: 'Canlı Etkileşimli Mühendislik Laboratuvarı' } as LocalizedText,
  labSubtitle: {
    ar: 'أربع تجارب برمجية حقيقية تعمل بالكامل على جانب العميل لاستعراض قدرات البحث، الأمان، المعمارية، وتوليد التحقق بشكل حي داخل المتصفح.',
    en: 'Four real client-side interactive demos showcasing search, security, architecture, and verification capabilities running live in the browser.',
    tr: 'Arama, güvenlik, mimari ve doğrulama yeteneklerini tarayıcıda canlı olarak sergileyen dört gerçek istemci tarafı etkileşimli demo.',
  } as LocalizedText,
  labTabSearch: { ar: 'بحث ونمطنة عربية', en: 'Arabic Search Normalizer', tr: 'Arapça Arama Normalizasyonu' } as LocalizedText,
  labTabSecurity: { ar: 'بصمة وتحقق جغرافي', en: 'Security & Geofence', tr: 'Güvenlik ve Coğrafi Sınır' } as LocalizedText,
  labTabArch: { ar: 'مستكشف المعمارية', en: 'Architecture Explorer', tr: 'Mimari Gezgini' } as LocalizedText,
  labTabQr: { ar: 'ختم QR تشفيري', en: 'QR Verification Stamp', tr: 'QR Doğrulama Damgası' } as LocalizedText,
  launchLiveDemo: { ar: 'تجربة النظام تفاعلياً', en: 'Try Interactive System', tr: 'Sistemi Etkileşimli Dene' } as LocalizedText,
  labSelectProject: { ar: 'اختر مشروعاً', en: 'Select a project', tr: 'Bir proje seçin' } as LocalizedText,
  labActiveProject: { ar: 'المشروع النشط', en: 'Active Project', tr: 'Aktif Proje' } as LocalizedText,
  labAllCategories: { ar: 'كل الفئات', en: 'All Categories', tr: 'Tüm Kategoriler' } as LocalizedText,
  backToPortfolio: { ar: 'العودة للبورتفوليو', en: 'Back to Portfolio', tr: 'Portföye Dön' } as LocalizedText,
  engineeringSpecs: { ar: 'المواصفات الهندسية', en: 'Engineering Specs', tr: 'Mühendislik Özellikleri' } as LocalizedText,
  previousProject: { ar: 'المشروع السابق', en: 'Previous Project', tr: 'Önceki Proje' } as LocalizedText,
  nextProject: { ar: 'المشروع التالي', en: 'Next Project', tr: 'Sonraki Proje' } as LocalizedText,
  liveDemoPage: { ar: 'صفحة المعاينة الحية', en: 'Live Preview Page', tr: 'Canlı Önizleme Sayfası' } as LocalizedText,
  openDemo: { ar: 'فتح المعاينة', en: 'Open Preview', tr: 'Önizlemeyi Aç' } as LocalizedText,
  demosShowcase: { ar: 'معرض التجارب الحية التفاعلية', en: 'Interactive Live Demos Showcase', tr: 'Etkileşimli Canlı Demolar Vitrini' } as LocalizedText,
  demosShowcaseHint: { ar: 'انتقل مباشرة إلى صفحة المعاينة المخصصة لكل مشروع', en: 'Jump straight to each project’s dedicated preview page', tr: 'Her projenin özel önizleme sayfasına doğrudan geçin' } as LocalizedText,
  born: { ar: 'تاريخ الميلاد', en: 'Born', tr: 'Doğum' } as LocalizedText,
  experience: { ar: 'الخبرة', en: 'Experience', tr: 'Deneyim' } as LocalizedText,
  spokenLanguages: { ar: 'اللغات', en: 'Spoken Languages', tr: 'Konuşulan Diller' } as LocalizedText,
  programmingLanguages: { ar: 'لغات البرمجة الأساسية (12)', en: 'Core Programming Languages (12)', tr: 'Temel Programlama Dilleri (12)' } as LocalizedText,
  portfolioScale: { ar: 'حجم المحفظة', en: 'Portfolio Scale', tr: 'Portföy Ölçeği' } as LocalizedText,
  email: { ar: 'البريد الإلكتروني', en: 'Email', tr: 'E-posta' } as LocalizedText,
  github: { ar: 'GitHub', en: 'GitHub', tr: 'GitHub' } as LocalizedText,
  about: { ar: 'نبذة تعريفية والخبرة العملية', en: 'About & Practical Experience', tr: 'Hakkımda ve Uygulamalı Deneyim' } as LocalizedText,
  expandDetails: { ar: 'عرض كل التفاصيل', en: 'Expand Full Details', tr: 'Tüm Ayrıntıları Genişlet' } as LocalizedText,
  collapseDetails: { ar: 'إخفاء التفاصيل', en: 'Collapse Details', tr: 'Ayrıntıları Daralt' } as LocalizedText,
  problemOverview: { ar: 'نظرة على المشكلة', en: 'Problem Overview', tr: 'Sorun Genel Bakışı' } as LocalizedText,
  solutionOverview: { ar: 'نظرة على بنية الحل', en: 'Solution Architecture Overview', tr: 'Çözüm Mimarisi Genel Bakışı' } as LocalizedText,
  keyFeatures: { ar: 'القدرات التقنية الرئيسية', en: 'Key Technical Features', tr: 'Temel Teknik Özellikler' } as LocalizedText,
  sectionProblem: { ar: 'المشكلة والتحديات التشغيلية', en: 'Operational Problem & Bottlenecks', tr: 'Operasyonel Sorun ve Darboğazlar' } as LocalizedText,
  sectionArchitecture: { ar: 'الهندسة البرمجية وبنية النظام', en: 'System Architecture & Data Flow', tr: 'Sistem Mimarisi ve Veri Akışı' } as LocalizedText,
  sectionDatabase: { ar: 'قاعدة البيانات والأمن والموثوقية', en: 'Database, Security & Fault Tolerance', tr: 'Veritabanı, Güvenlik ve Hata Toleransı' } as LocalizedText,
  sectionCapabilities: { ar: 'المميزات والقدرات التقنية التفصيلية', en: 'Detailed Technical Capabilities', tr: 'Ayrıntılı Teknik Yetenekler' } as LocalizedText,
  sectionImpact: { ar: 'الأثر العملي والنتائج', en: 'Operational Impact & Outcomes', tr: 'Operasyonel Etki ve Sonuçlar' } as LocalizedText,
  bio: {
    ar: [
      'مطور برمجيات وأنظمة متكاملة بخبرة عملية تمتد لـ 9 سنوات في تصميم وبناء الحلول البرمجية الإنتاجية. تتركز خبرتي في تحويل التحديات الإدارية والتشغيلية الواقعية إلى أنظمة رقمية عالية الاعتمادية، بدءاً من تطبيقات سطح المكتب المشفرة التي تعمل دون اتصال بالإنترنت باستخدام Rust وTauri، مروراً بمنصات الويب السحابية السريعة، وصولاً إلى أنظمة التحقق الأمني والبيومتري ومحركات الأتمتة والفهرسة النصية للبيانات الضخمة.',
      'أعتمد في عملي التقني والبرمجي على مبدأ البساطة والأداء العالي بعيداً عن التعقيد غير المبرر، مع تركيز خاص على أمن البيانات، سرعة الاستجابة، وتجربة المستخدم العملية التي تخدم المؤسسات والأفراد بكفاءة يومية.',
    ],
    en: [
      'Full-Stack and Systems Software Developer with 9 years of hands-on practical experience architecting and deploying production-grade software solutions. My work focuses on translating real-world operational and administrative workflows into reliable digital systems—spanning offline-first encrypted desktop applications built with Rust and Tauri, edge-deployed web platforms, biometric and geofenced verification systems, and high-throughput data indexing and automation pipelines.',
      'My technical approach prioritizes performance, data integrity, and maintainability over unnecessary bloat, delivering practical tools engineered for continuous daily reliability.',
    ],
    tr: [
      '9 yıllık uygulamalı saha deneyimine sahip Tam Yığın (Full-Stack) ve Sistem Yazılım Geliştiricisiyim. Çalışmalarım; gerçek dünyadaki operasyonel ve idari iş süreçlerini yüksek güvenilirlikli dijital sistemlere dönüştürmeye odaklanmaktadır. Rust ve Tauri ile geliştirilen çevrimdışı öncelikli şifreli masaüstü uygulamalarından, bulut tabanlı web platformlarına, biyometrik ve konum tabanlı doğrulama sistemlerinden yüksek hızlı veri indeksleme ve otomasyon altyapılarına kadar geniş bir yelpazede üretim düzeyinde çözümler geliştiriyorum.',
      'Teknik ve yazılımsal yaklaşımımda gereksiz karmaşıklıktan uzak, doğrudan performansı, veri güvenliğini ve günlük operasyonel verimliliği merkeze alan sürdürülebilir mimariler inşa ediyorum.',
    ],
  } as { ar: string[]; en: string[]; tr: string[] },
  portfolioDossier: { ar: 'ملف أعمال برمجي', en: 'Software Portfolio Dossier', tr: 'Yazılım Portföy Dosyası' } as LocalizedText,
  index: { ar: 'الفهرس', en: 'Index', tr: 'Dizin' } as LocalizedText,
}

export function t(text: LocalizedText, lang: Lang): string {
  return text[lang]
}
