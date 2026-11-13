import type { LocalizedText } from '../types'

export interface ProgrammingLanguage {
  name: string
  categoryBadge: LocalizedText
  detailedDescription: LocalizedText
  ecosystems: string[]
}

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    name: 'Python',
    categoryBadge: { ar: 'الأتمتة وخطوط البيانات', en: 'Automation & Data Pipelines', tr: 'Otomasyon ve Veri Hatları' },
    detailedDescription: {
      ar: 'أستخدم Python لبناء خطوط أتمتة مستقلة ومعالجة دفعية للوسائط والفيديو عبر أدوات مثل FFmpeg وPillow مع تحكم دقيق في الجودة والأبعاد. أطور حلول التعرف البصري على النصوص (Tesseract OCR) لاستخراج المحتوى من المستندات المصورة وتحويله إلى بيانات قابلة للبحث والفهرسة. أعتمد على Playwright لأتمتة المتصفحات بدون واجهة وتنفيذ سيناريوهات تفاعلية موثوقة، إضافة إلى فهرسة الملفات عالية السرعة باستخدام SQLite FTS5. يتيح لي هذا المزيج بناء أدوات عملية لمعالجة البيانات والأرشفة والمهام المتكررة بكفاءة عالية.',
      en: 'I use Python to build autonomous automation pipelines and batch media/video processing workflows with tools such as FFmpeg and Pillow, maintaining precise control over quality and dimensions. I develop optical character recognition solutions with Tesseract OCR to extract content from scanned documents and transform it into searchable, indexable data. I rely on Playwright for headless browser orchestration and reliable interactive scenarios, alongside high-speed file indexing powered by SQLite FTS5. This combination enables practical, efficient tooling for data processing, archiving, and repetitive operational tasks.',
      tr: 'Python’u; FFmpeg ve Pillow gibi araçlarla kalite ve boyutlar üzerinde hassas kontrol sağlayan otonom otomasyon hatları ve toplu medya/video işleme akışları oluşturmak için kullanıyorum. Taranmış belgelerden içerik çıkarmak ve bunu aranabilir, indekslenebilir veriye dönüştürmek amacıyla Tesseract OCR ile optik karakter tanıma çözümleri geliştiriyorum. Güvenilir etkileşimli senaryolar için Playwright ile başsız tarayıcı orkestrasyonuna ve SQLite FTS5 destekli yüksek hızlı dosya indekslemeye dayanıyorum. Bu birleşim; veri işleme, arşivleme ve tekrarlayan operasyonel görevler için pratik ve verimli araçlar üretmemi sağlar.',
    },
    ecosystems: ['FastAPI', 'Playwright', 'FFmpeg', 'Tesseract OCR', 'PyMuPDF'],
  },
  {
    name: 'TypeScript',
    categoryBadge: { ar: 'تطوير الويب المتكامل الآمن بالنمط', en: 'Type-Safe Full-Stack Web', tr: 'Tip Güvenli Tam Yığın Web' },
    detailedDescription: {
      ar: 'أعتمد TypeScript لبناء معماريات ويب متكاملة آمنة بالنمط من الواجهة إلى الخادم، مما يقلل الأخطاء المبكرة ويعزز قابلية الصيانة في المشاريع الإنتاجية. أطور واجهات أمامية قابلة للتوسع وعقود بيانات صارمة لواجهات API لضمان اتساق التدفق بين المكونات والخدمات. أستخدمه أيضًا في بناء مكتبات متخصصة مثل تطبيع النصوص العربية وتحسين تكاملها مع أنظمة البحث والفهرسة. بفضل النظام النوعي القوي، أستطيع تقديم قواعد برمجية واضحة ومنظمة تدعم التطوير طويل الأمد والعمل المنهجي.',
      en: 'I rely on TypeScript to build end-to-end type-safe full-stack web architectures, reducing early defects and improving maintainability in production projects. I develop scalable frontends and strict API data contracts to ensure consistent data flow between components and services. I also use it to create specialized libraries such as Arabic text normalization utilities integrated with search and indexing systems. With its strong type system, I deliver clear, organized codebases that support long-term development and disciplined engineering workflows.',
      tr: 'TypeScript’i, uçtan uca tip güvenli tam yığın web mimarileri oluşturmak için kullanıyor; üretim projelerinde erken hataları azaltıyor ve bakım kolaylığını artırıyorum. Bileşenler ve servisler arasında tutarlı veri akışı sağlamak amacıyla ölçeklenebilir ön yüzler ve katı API veri sözleşmeleri geliştiriyorum. Ayrıca arama ve indeksleme sistemleriyle entegre Arapça metin normalizasyonu gibi özel kütüphaneler oluşturuyorum. Güçlü tip sistemi sayesinde uzun vadeli geliştirmeyi ve disiplinli mühendislik süreçlerini destekleyen net, düzenli kod tabanları sunuyorum.',
    },
    ecosystems: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'WebAuthn'],
  },
  {
    name: 'JavaScript (ES2026)',
    categoryBadge: { ar: 'الويب التفاعلي والوقت الفعلي', en: 'Interactive & Real-Time Web', tr: 'Etkileşimli ve Gerçek Zamanlı Web' },
    detailedDescription: {
      ar: 'أستخدم JavaScript (ES2026) لبناء تجارب تفاعلية مباشرة في المتصفح وخدمات تعتمد على نموذج الأحداث غير المتزامن لتحقيق استجابة عالية. أطور لوحات قياس حية عبر WebSockets لنقل البيانات اللحظية، إضافة إلى أدوات حساب إجرائية تعمل بالكامل على جانب العميل بزمن استجابة شبه صفري. أستفيد من خصائص اللغة الحديثة لبناء منطق مرن وفعال يتكامل بسلاسة مع واجهات الويب وواجهات البرمجة. يتيح ذلك تقديم تطبيقات خفيفة وسريعة تلبي متطلبات التفاعل الفوري وتجربة المستخدم العملية.',
      en: 'I use JavaScript (ES2026) to build interactive browser experiences and asynchronous, event-driven services that deliver high responsiveness. I develop real-time telemetry dashboards over WebSockets for live data streaming, as well as client-side procedural calculators that operate with near-zero latency. Leveraging modern language features, I implement flexible and efficient logic that integrates smoothly with web interfaces and APIs. This enables lightweight, fast applications tailored for immediate interaction and practical user experiences.',
      tr: 'JavaScript’i (ES2026), yüksek yanıt verebilirlik sağlayan etkileşimli tarayıcı deneyimleri ve eşzamansız, olay güdümlü servisler oluşturmak için kullanıyorum. Canlı veri akışı için WebSockets üzerinden gerçek zamanlı telemetri panoları ve neredeyse sıfır gecikmeyle çalışan istemci tarafı prosedürel hesaplayıcılar geliştiriyorum. Modern dil özelliklerinden yararlanarak web arayüzleri ve API’lerle sorunsuz entegre olan esnek, verimli mantıklar uyguluyorum. Bu sayede anlık etkileşim ve pratik kullanıcı deneyimi gereksinimlerini karşılayan hafif, hızlı uygulamalar sunuyorum.',
    },
    ecosystems: ['ES2026', 'Express', 'WebSockets', 'REST APIs', 'Service Workers'],
  },
  {
    name: 'Rust',
    categoryBadge: { ar: 'برمجة الأنظمة والأداء الآمن', en: 'Safe Systems & High Performance', tr: 'Güvenli Sistemler ve Yüksek Performans' },
    detailedDescription: {
      ar: 'أوظف Rust في برمجة الأنظمة الآمنة بالذاكرة لبناء تطبيقات سطح مكتب مشفرة تعمل دون اتصال بالإنترنت عبر Tauri مع أداء عالٍ واستهلاك موارد منخفض. أطور خدمات خلفية غير متزامنة متحملة للأخطاء باستخدام Tokio لمعالجة المهام الطويلة والاتصالات الموثوقة. كما أبني أدوات سطر أوامر حتمية لترحيل قواعد البيانات ونقل الملفات بسرعة على الشبكة المحلية دون إعداد مسبق. تمنحني خصائص Rust في الأمان والأداء بناء برمجيات مستقرة وموثوقة في البيئات الحساسة للإنتاجية والاعتمادية.',
      en: 'I use Rust for memory-safe systems programming to build offline-first encrypted desktop applications with Tauri, delivering high performance and low resource usage. I develop fault-tolerant asynchronous background daemons with Tokio to handle long-running tasks and reliable communication. I also build deterministic command-line tools for database migrations and zero-config LAN file transfer utilities. Rust’s safety and performance characteristics enable me to deliver stable, dependable software for reliability-critical production environments.',
      tr: 'Rust’ı; bellek güvenli sistem programlama için kullanarak Tauri ile çevrimdışı öncelikli, şifreli masaüstü uygulamaları geliştiriyor, yüksek performans ve düşük kaynak kullanımı sağlıyorum. Uzun süreli görevleri ve güvenilir iletişimi yönetmek için Tokio ile hata toleranslı eşzamansız arka plan servisleri oluşturuyorum. Ayrıca veritabanı taşımaları için deterministik komut satırı araçları ve sıfır yapılandırmalı yerel ağ dosya aktarım yardımcıları geliştiriyorum. Rust’ın güvenlik ve performans özellikleri, güvenilirlik açısından kritik üretim ortamları için kararlı ve bağımlı yazılımlar üretmemi sağlar.',
    },
    ecosystems: ['Tauri', 'Tokio', 'Clap', 'Serde', 'SQLx'],
  },
  {
    name: 'Go (Golang)',
    categoryBadge: { ar: 'الخدمات السحابية والتوازي', en: 'Cloud Concurrency & Services', tr: 'Bulut Eşzamanlılığı ve Servisler' },
    detailedDescription: {
      ar: 'أستخدم Go (Golang) لتطوير خدمات سحابية مصغرة عالية التوازي قادرة على معالجة طلبات متعددة بكفاءة بفضل نموذج Goroutines الخفيف. أبني عمال طوابير خلفية وبروكسيات توجيه شبكي سريعة مع الحفاظ على بساطة النشر عبر ملفات تنفيذية أحادية. أركز على تقليل استهلاك الذاكرة وتحقيق زمن استجابة منخفض في الخدمات الشبكية والمهام الموزعة. يتيح لي Go تقديم حلول تشغيلية مستقرة وسهلة الصيانة في البيئات التي تتطلب أداءً ثابتًا وقابلية توسع عملية.',
      en: 'I use Go (Golang) to develop highly concurrent cloud microservices capable of efficiently handling many requests through lightweight goroutines. I build fast background queue workers and network routing proxies while keeping deployments simple with single-binary outputs. My focus is on low memory footprint and reduced latency for network services and distributed tasks. Go enables me to deliver stable, maintainable operational solutions in environments that require consistent performance and practical scalability.',
      tr: 'Go’yu (Golang), hafif goroutine modeli sayesinde çok sayıda isteği verimli şekilde işleyebilen yüksek eşzamanlı bulut mikroservisleri geliştirmek için kullanıyorum. Tek ikili dosya dağıtımlarının sağladığı sadeliği korurken hızlı arka plan kuyruk çalışanları ve ağ yönlendirme proxy’leri oluşturuyorum. Ağ servisleri ve dağıtık görevlerde düşük bellek kullanımı ve azaltılmış gecikmeye odaklanıyorum. Go, tutarlı performans ve pratik ölçeklenebilirlik gerektiren ortamlarda kararlı, bakımı kolay operasyonel çözümler sunmamı sağlar.',
    },
    ecosystems: ['Goroutines', 'net/http', 'Docker', 'gRPC', 'Redis'],
  },
  {
    name: 'C# (.NET)',
    categoryBadge: { ar: 'أنظمة المؤسسات والتكامل', en: 'Enterprise Systems & Integration', tr: 'Kurumsal Sistemler ve Entegrasyon' },
    detailedDescription: {
      ar: 'أستخدم C# وبيئة .NET لبناء أنظمة إدارة مؤسسية منظمة تعتمد على منطق أعمال واضح وصلاحيات متعددة الأدوار. أطور تكاملات سطح مكتب لنظام Windows وطبقات وصول بيانات علائقية موثوقة تدعم العمليات اليومية المستقرة. أركز على تصميم خدمات خلفية قابلة للصيانة مع فصل واضح للمسؤوليات وقواعد تحقق صارمة. يساعدني هذا النهج على تقديم تطبيقات مؤسسية عملية تجمع بين الاعتمادية، قابلية التوسع، وسهولة التطوير المستقبلي.',
      en: 'I use C# and the .NET ecosystem to build structured enterprise management systems grounded in clear business logic and multi-role access control. I develop Windows desktop integrations and reliable relational data access layers that support stable day-to-day operations. I focus on maintainable backend services with clear separation of responsibilities and strict validation rules. This approach enables practical enterprise applications that balance reliability, scalability, and ease of future development.',
      tr: 'C# ve .NET ekosistemini; net iş mantığına ve çok rollü erişim kontrolüne dayanan yapılandırılmış kurumsal yönetim sistemleri oluşturmak için kullanıyorum. Kararlı günlük operasyonları destekleyen Windows masaüstü entegrasyonları ve güvenilir ilişkisel veri erişim katmanları geliştiriyorum. Sorumlulukların net ayrımına ve katı doğrulama kurallarına sahip, bakımı kolay arka uç servislerine odaklanıyorum. Bu yaklaşım; güvenilirlik, ölçeklenebilirlik ve gelecekteki geliştirme kolaylığını dengeleyen pratik kurumsal uygulamalar sunmamı sağlar.',
    },
    ecosystems: ['.NET 8+', 'ASP.NET Core', 'Entity Framework', 'LINQ', 'REST'],
  },
  {
    name: 'C++',
    categoryBadge: { ar: 'الأداء منخفض المستوى', en: 'Low-Level Performance', tr: 'Düşük Seviye Performans' },
    detailedDescription: {
      ar: 'أستخدم C++ لتطوير وحدات حرجة الأداء تتطلب تحكمًا دقيقًا بالموارد وسرعة تنفيذ حتمية. أبني خوارزميات وأدوات نظام أصلية كفؤة في استهلاك الذاكرة مع قدرة على التعامل مع مكونات قريبة من العتاد عند الحاجة. أركز على كتابة كود منخفض المستوى مستقر يدعم المعالجة المتوازية ويقلل زمن الاستجابة في المسارات الحساسة. يتيح لي ذلك تقديم حلول موثوقة للسيناريوهات التي لا تقبل فيها الأنظمة العامة أي تهاون في الأداء أو إدارة الموارد.',
      en: 'I use C++ to develop performance-critical modules that require precise resource control and deterministic execution speed. I build memory-efficient native system utilities and algorithms, with the ability to interface closely with hardware-oriented components when needed. My focus is on stable low-level code that supports multithreaded processing and minimizes latency in sensitive execution paths. This enables reliable solutions for scenarios where general-purpose runtimes cannot compromise on performance or resource management.',
      tr: 'C++’ı; hassas kaynak kontrolü ve deterministik yürütme hızı gerektiren performans kritik modüller geliştirmek için kullanıyorum. Bellek verimli yerel sistem yardımcıları ve algoritmalar oluşturuyor, gerektiğinde donanıma yakın bileşenlerle etkileşime geçebiliyorum. Çok iş parçacıklı işlemeyi destekleyen ve hassas yürütme yollarında gecikmeyi en aza indiren kararlı düşük seviye kod yazmaya odaklanıyorum. Bu, genel amaçlı çalışma zamanlarının performans veya kaynak yönetiminden ödün veremeyeceği senaryolar için güvenilir çözümler sunmamı sağlar.',
    },
    ecosystems: ['STL', 'CMake', 'Native Win32/POSIX APIs', 'Multithreading'],
  },
  {
    name: 'Java',
    categoryBadge: { ar: 'الخلفية المؤسسية الموزعة', en: 'Distributed Enterprise Backend', tr: 'Dağıtık Kurumsal Arka Uç' },
    detailedDescription: {
      ar: 'أستخدم Java لبناء خدمات خلفية مؤسسية موزعة تدعم المعالجة متعددة المسارات والتعامل الموثوق مع المعاملات. أركز على تصميم معماريات خادم مرنة وقابلة للتوسع تعمل بثبات ضمن بيئة JVM عبر منصات متعددة. أطور تكاملات وخدمات تعتمد على قواعد بيانات علائقية مع اهتمام بالأمان والاتساق والأداء تحت الأحمال. يساعدني ذلك على تقديم حلول خلفية مناسبة للأنظمة التي تتطلب استمرارية تشغيلية وقدرة على النمو المنظم.',
      en: 'I use Java to build distributed enterprise backend services that support multithreaded processing and reliable transaction handling. I focus on designing resilient, scalable server architectures that run consistently on the JVM across platforms. I develop database-backed integrations and services with attention to security, consistency, and performance under load. This enables backend solutions suited for systems that require operational continuity and structured growth.',
      tr: 'Java’yı; çok iş parçacıklı işlemeyi ve güvenilir işlem (transaction) yönetimini destekleyen dağıtık kurumsal arka uç servisleri oluşturmak için kullanıyorum. Platformlar arasında JVM üzerinde tutarlı çalışan dayanıklı ve ölçeklenebilir sunucu mimarileri tasarlamaya odaklanıyorum. Yük altında güvenlik, tutarlılık ve performansa dikkat ederek veritabanı destekli entegrasyonlar ve servisler geliştiriyorum. Bu, operasyonel süreklilik ve yapılandırılmış büyüme gerektiren sistemler için uygun arka uç çözümleri sunmamı sağlar.',
    },
    ecosystems: ['Spring Boot', 'JVM', 'Maven', 'JDBC', 'Microservices'],
  },
  {
    name: 'Kotlin',
    categoryBadge: { ar: 'تطبيقات Android وخدمات JVM', en: 'Android & JVM Services', tr: 'Android ve JVM Servisleri' },
    detailedDescription: {
      ar: 'أستخدم Kotlin لتطوير تطبيقات Android حديثة بتركيز على الأمان من القيم الفارغة ووضوح البنية وسلاسة التجربة. أعتمد على Coroutines لإدارة العمليات غير المتزامنة بشكل منظم وفعال داخل التطبيقات والخدمات الخلفية على JVM. أحرص على كتابة كود موجز وقابل للصيانة يدعم التطوير السريع مع الحفاظ على الجودة. يتيح لي Kotlin بناء حلول متنقلة وخدمية عملية تستفيد من نظام Android وبيئة JVM الحديثة.',
      en: 'I use Kotlin to develop modern Android applications with a focus on null safety, clear structure, and smooth user experiences. I rely on coroutines to manage asynchronous operations efficiently and predictably in mobile apps and JVM backend services. I prioritize concise, maintainable code that supports rapid development without sacrificing quality. Kotlin enables me to build practical mobile and service solutions that leverage the Android ecosystem and modern JVM capabilities.',
      tr: 'Kotlin’i; null güvenliği, net yapı ve akıcı kullanıcı deneyimine odaklanarak modern Android uygulamaları geliştirmek için kullanıyorum. Mobil uygulamalarda ve JVM arka uç servislerinde eşzamansız işlemleri verimli ve öngörülebilir biçimde yönetmek için coroutine’lerden yararlanıyorum. Kaliteden ödün vermeden hızlı geliştirmeyi destekleyen öz ve bakımı kolay kod yazmaya öncelik veriyorum. Kotlin, Android ekosistemi ve modern JVM yeteneklerinden faydalanan pratik mobil ve servis çözümleri oluşturmamı sağlar.',
    },
    ecosystems: ['Android SDK', 'Coroutines', 'Jetpack', 'Ktor', 'Gradle'],
  },
  {
    name: 'Swift',
    categoryBadge: { ar: 'تطوير منظومة Apple الآمن', en: 'Secure Apple Ecosystem Development', tr: 'Güvenli Apple Ekosistemi Geliştirme' },
    detailedDescription: {
      ar: 'أستخدم Swift لتطوير أدوات أصلية ضمن منظومة Apple مع التركيز على الأمان، الأداء، واستجابة الواجهات. أبني تكاملات على مستوى الجهاز للمصادقة البيومترية والعمليات التشفيرية لضمان حماية البيانات الحساسة محليًا. أحرص على تصميم واجهات سلسة وتجارب استخدام متوافقة مع معايير الأنظمة الحديثة. يتيح لي ذلك تقديم تطبيقات وخدمات موثوقة تستفيد من قدرات المنصة الأصلية بشكل كامل.',
      en: 'I use Swift to develop native utilities within the Apple ecosystem, focusing on security, performance, and responsive interfaces. I build device-level integrations for biometric authentication and cryptographic operations to help protect sensitive data locally. I emphasize smooth interfaces and user experiences aligned with modern platform standards. This enables reliable applications and services that take full advantage of native platform capabilities.',
      tr: 'Swift’i; güvenlik, performans ve duyarlı arayüzlere odaklanarak Apple ekosistemi içinde yerel yardımcı araçlar geliştirmek için kullanıyorum. Hassas verilerin yerelde korunmasına yardımcı olmak amacıyla biyometrik kimlik doğrulama ve kriptografik işlemler için cihaz düzeyinde entegrasyonlar oluşturuyorum. Modern platform standartlarıyla uyumlu akıcı arayüzler ve kullanıcı deneyimleri tasarlamaya önem veriyorum. Bu, yerel platform yeteneklerinden tam olarak yararlanan güvenilir uygulama ve servisler sunmamı sağlar.',
    },
    ecosystems: ['SwiftUI', 'Combine', 'CryptoKit', 'LocalAuthentication'],
  },
  {
    name: 'SQL',
    categoryBadge: { ar: 'هندسة قواعد البيانات', en: 'Database Engineering', tr: 'Veritabanı Mühendisliği' },
    detailedDescription: {
      ar: 'أستخدم SQL لتصميم مخططات قواعد بيانات علائقية متينة تدعم سلامة البيانات والمعاملات المتوافقة مع مبادئ ACID في الأنظمة التشغيلية والمالية. أبني فهارس بحث نصي كامل عالي السرعة (مثل SQLite FTS5) وأحسن الاستعلامات لضمان استرجاع سريع حتى مع نمو البيانات. أعمل على تنظيم طبقات التخزين المحلية والخدمية مع مراعاة الأمان والنسخ الاحتياطي والاتساق. يتيح لي ذلك بناء أساس بيانات موثوق يدعم أداء التطبيقات واستقرارها على المدى الطويل.',
      en: 'I use SQL to design robust relational database schemas that support data integrity and ACID-compliant transactions in operational and financial systems. I build high-speed full-text search indexing (such as SQLite FTS5) and optimize queries to ensure fast retrieval as data grows. I organize local and server-side storage layers with attention to security, backup, and consistency. This provides a reliable data foundation that supports long-term application performance and stability.',
      tr: 'SQL’i; operasyonel ve finansal sistemlerde veri bütünlüğünü ve ACID uyumlu işlemleri destekleyen sağlam ilişkisel veritabanı şemaları tasarlamak için kullanıyorum. Veriler büyüdükçe hızlı erişimi garanti etmek amacıyla SQLite FTS5 gibi yüksek hızlı tam metin arama indeksleri oluşturuyor ve sorguları optimize ediyorum. Güvenlik, yedekleme ve tutarlılığı gözeterek yerel ve sunucu tarafı depolama katmanlarını düzenliyorum. Bu, uzun vadede uygulama performansını ve kararlılığını destekleyen güvenilir bir veri temeli sağlar.',
    },
    ecosystems: ['SQLite (FTS5)', 'PostgreSQL', 'MySQL', 'Query Optimization'],
  },
  {
    name: 'Dart',
    categoryBadge: { ar: 'تطبيقات متعددة المنصات', en: 'Cross-Platform Applications', tr: 'Çok Platformlu Uygulamalar' },
    detailedDescription: {
      ar: 'أستخدم Dart لبناء تطبيقات متعددة المنصات للهواتف وسطح المكتب من قاعدة برمجية تفاعلية موحدة. أركز على تصميم واجهات مخصصة سلسة بأداء عالٍ يصل إلى 60 إطارًا في الثانية مع إدارة حالة واضحة ومنظمة. أتكامل مع خدمات REST وFirebase لتوفير تدفقات بيانات موثوقة وتجارب استخدام متصلة. يتيح لي ذلك تقديم منتجات متسقة عبر الأنظمة المختلفة مع تقليل زمن التطوير والصيانة.',
      en: 'I use Dart to build cross-platform mobile and desktop applications from a single reactive codebase. I focus on crafting smooth custom interfaces targeting 60fps performance with clear, structured state management. I integrate with REST services and Firebase to provide reliable data flows and connected user experiences. This enables consistent products across platforms while reducing development and maintenance effort.',
      tr: 'Dart’ı; tek bir reaktif kod tabanından mobil ve masaüstü için çok platformlu uygulamalar geliştirmek amacıyla kullanıyorum. Net ve yapılandırılmış durum yönetimiyle 60fps hedefleyen akıcı özel arayüzler oluşturmaya odaklanıyorum. Güvenilir veri akışları ve bağlantılı kullanıcı deneyimleri sağlamak için REST servisleri ve Firebase ile entegrasyon yapıyorum. Bu, geliştirme ve bakım eforunu azaltırken platformlar arasında tutarlı ürünler sunmamı sağlar.',
    },
    ecosystems: ['Flutter', 'Dart Async', 'Material/Cupertino', 'REST & Firebase'],
  },
]
