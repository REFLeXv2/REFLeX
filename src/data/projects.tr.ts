import type { ProjectCaseStudy } from '../types'

export const projectsTr: ProjectCaseStudy[] = [
  {
    id: 1,
    index: '#01',
    category: 'desktop-systems',
    stack: ['Rust', 'Tauri', 'TypeScript', 'SQLite'],
    title: 'Hukuki Dava ve Dosya Yönetim Sistemi',
    problemContext:
      'Hukuk bürolarında dava dosyaları, müvekkil kayıtları, duruşma tarihleri ve destekleyici belgeler çoğu zaman kâğıt arşivler, elektronik tablolar ve birbirinden kopuk araçlar arasında dağınık şekilde yönetilir; bu durum bilgi parçalanmasına, tutarsız kayıtlara ve kritik sürelerin kaçırılmasına yol açar. Özellikle toplantılar sırasında veya internet erişiminin sınırlı olduğu ortamlarda eksiksiz bir dava geçmişine hızlıca ulaşmak zorlaşır. Genel amaçlı araçlar hukuki verilerin hassasiyetini, rol bazlı erişim ihtiyaçlarını ve denetlenebilir değişiklik izlerini çoğu zaman yeterince karşılamaz. Bu operasyonel boşluklar gecikmelere, zayıf hesap verebilirliğe ve ölçekli, tutarlı bir dava yönetimi sunma güçlüğüne neden olur.',
    systemArchitecture:
      'Sistem, Rust yerel arka ucu ve TypeScript tabanlı etkileşimli arayüzüyle Tauri kullanılarak çevrimdışı öncelikli (offline-first) bir masaüstü uygulaması olarak tasarlanmıştır. Kullanıcı işlemleri güvenli IPC komutları üzerinden girdileri doğrulayan, dava/müvekkil/duruşma/görev iş mantığını uygulayan ve verileri yerel SQLite veritabanına yazan Rust servislerine akar. Mimari; sunum, alan mantığı ve depolama katmanlarını ayırarak bakım kolaylığı ve öngörülebilir veri işleme sağlar. Dava bazlı yapılandırılmış belge arşivleme akışı ve yerel hatırlatmaları destekleyen zamanlama mantığı, harici altyapıya bağımlı olmadan izlenebilirlik için hassas işlemleri yerel denetim kayıtlarına işler.',
    databaseAndSecurity:
      'Tüm dava, müvekkil ve duruşma verileri, ağ bağlantısı olmadan tam çalışma imkânı sunarken cihaz üzerinde hassas bilgileri korumak için şifreli yerel bir SQLite veritabanında saklanır. Avukat, asistan ve yönetici rollerini kapsayan çok rollü erişim kontrolü modeli, görüntüleme/düzenleme/arşivleme yetkilerini en az ayrıcalık ilkesiyle sınırlar. Oluşturma, güncelleme, silme ve dışa aktarma gibi hassas işlemler, hesap verebilirlik ve inceleme desteği için kronolojik yerel denetim izine yazılır. Arayüz ve yerel servis katmanlarındaki girdi doğrulamaları, veri bütünlüğünü korumaya ve dava yaşam döngüsü boyunca tutarsız kayıtları azaltmaya yardımcı olur.',
    keyFeatures: [
      { title: 'Uçtan Uca Dava Yaşam Döngüsü Yönetimi', explanation: 'Dava, müvekkil, duruşma ve belgeleri tek bir veri modelinde ilişkilendirerek durumu ve prosedür aşamasını tek ekrandan izlemeyi sağlar.' },
      { title: 'Çevrimdışı Öncelikli Şifreli SQLite Depolama', explanation: 'Tüm operasyonel verileri yerelde tutarak düşük bağlantılı ortamlarda hızlı okuma/yazma ve kesintisiz çalışma sunar.' },
      { title: 'Çok Rollü Erişim Kontrolü', explanation: 'Avukat, asistan ve yönetici için ayrıntılı izinler uygulayarak hassas kayıtları korur ve değiştirme yetkilerini denetler.' },
      { title: 'Otomatik Belge Arşivleme', explanation: 'Ekleri dava kayıtlarıyla yapılandırılmış şekilde ilişkilendirerek manuel dosyalama yükünü azaltır ve erişimi hızlandırır.' },
      { title: 'Yerel Görev ve Duruşma Zamanlama', explanation: 'Süreler ve randevular için yerel hatırlatmalar oluşturarak ekibin prosedür takvimine uyumunu destekler.' },
      { title: 'Denetlenebilir İşlem Kayıtları', explanation: 'Hassas işlemleri yerel denetim izinde tutarak iç inceleme ve değişiklik izlenebilirliği sağlar.' },
      { title: 'Hafif Tauri/TypeScript Arayüzü', explanation: 'Daha ağır çalışma zamanlarına kıyasla düşük kaynak tüketimiyle hızlı ve duyarlı bir masaüstü deneyimi sunar.' },
    ],
    operationalImpact:
      'Sistem dava bilgilerini merkezileştirerek belge ve müvekkil ayrıntılarına erişim süresini azalttı. Yerel zamanlama ve denetim izleri, duruşma ve operasyonel eylemlerin takibini daha güvenilir hale getirdi. Çevrimdışı depolama ve rol tabanlı kontroller veri gizliliğini ve günlük iş sürekliliğini güçlendirdi. Genel olarak dağınık ve hataya açık süreçler, daha disiplinli ve denetlenebilir bir dijital iş akışına dönüştü.'
  },
  {
    id: 2,
    index: '#02',
    category: 'desktop-systems',
    stack: ['React', 'TypeScript', 'Firebase', 'Cloud Functions'],
    title: 'Elektronik Dava Takip Web Platformu',
    problemContext:
      'Müvekkiller dava ilerlemesini zamanında göremediklerinde, personel zamanını tüketen ve kritik güncellemeleri geciktiren tekrarlı arama ve mesaj trafiği ortaya çıkar. Birleşik bir dijital kanal olmadığında duruşma, dosyalama veya durum değişiklikleri gibi prosedürel gelişmeler tutarlı biçimde iletilemez. Manuel durum bildirimi hukuk ekiplerinin operasyonel yükünü artırır ve şeffaflıkta boşluklara yol açabilir. Bu koşullar, güvenli ve bulut tabanlı bir portal ile gerçek zamanlı görünürlük ve anlamlı olaylarda otomatik bildirim ihtiyacını doğurur.',
    systemArchitecture:
      'Platform, net ve duyarlı bir müvekkil deneyimi için React ve TypeScript ön yüzüyle bulut üzerinde barındırılan bir web uygulaması olarak geliştirilmiştir. Firebase kimlik doğrulama ve gerçek zamanlı veri senkronizasyonu sağlarken, Cloud Functions dava durumu değişikliklerine tepki veren arka uç iş akışı mantığını yürütür. Yöneticiler kayıtları güncellediğinde değişiklikler bulut veri deposuna akar ve sunucu taraflı fonksiyonlar bildirim üretir, iş akışı kurallarını uygular ve güncellemeleri tutarlı şekilde müvekkillere yansıtır. İstemci arayüzü, yönetilen veri servisleri ve olay güdümlü fonksiyonların ayrımı manuel iletişim yükünü azaltır ve durum tutarlılığını korur.',
    databaseAndSecurity:
      'Erişim, kullanıcı kimliği ve sahiplik temelinde okuma/yazma işlemlerini kısıtlayan Firebase Authentication ve güvenlik kurallarıyla yönetilir; böylece müvekkiller yalnızca yetkili oldukları dava bilgilerini görüntüler. Gerçek zamanlı veri depolama, güncellemelerin izlenebilirliğini destekleyen olay kayıtlarıyla senkronize bir durum sunar. Hassas bildirim ve iş akışı mantığı yalnızca istemciye bırakılmayıp denetimli Cloud Functions ortamında çalıştırılır. Bu yapı, dava gizliliğini korurken onaylı bilgilere güvenilir ve düşük gecikmeli erişim sağlar.',
    keyFeatures: [
      { title: 'Gerçek Zamanlı Dava Durumu Görünürlüğü', explanation: 'Dava güncellemelerini müvekkil portalına anında senkronize ederek manuel takip ihtiyacı olmadan güncel prosedür durumunu gösterir.' },
      { title: 'Otomatik Prosedürel Bildirimler', explanation: 'Dava durumu veya önemli olaylar değiştiğinde Cloud Functions ile uyarılar tetikleyerek iletişim zamanlamasını iyileştirir.' },
      { title: 'Güvenli Müvekkil Kimlik Doğrulama ve Erişim', explanation: 'Firebase Authentication ve kapsamlı erişim kontrolleriyle her kullanıcının yalnızca yetkili kayıtlara ulaşmasını sağlar.' },
      { title: 'Yönetim Güncelleme İş Akışı', explanation: 'Personelin aşamaları ve ilgili bilgileri yapılandırılmış şekilde güncellemesini ve bunların tutarlı biçimde yansımasını sağlar.' },
      { title: 'Olay Geçmişi ve Güncelleme İzlenebilirliği', explanation: 'Değişiklikleri kronolojik olarak kaydederek davanın zaman içindeki ilerleyişinin hızlıca incelenmesine imkân verir.' },
      { title: 'Duyarlı Web Deneyimi', explanation: 'Cihazlar arasında netlik ve hız odaklı, React/TypeScript ile geliştirilmiş erişilebilir bir arayüz sunar.' },
    ],
    operationalImpact:
      'Portal, tekrarlayan durum sorgularını azaltarak uygulama ile müvekkiller arasındaki şeffaflığı artırdı. Otomatik bildirimler ve gerçek zamanlı senkronizasyon, prosedürel iletişimin doğruluğunu ve hızını iyileştirdi. Güvenlik kuralları ve kimlik doğrulama hassas dava verilerini korurken onaylı erişimi kolaylaştırdı. Sonuç olarak müvekkil iletişim iş akışı daha verimli ve hizmet deneyimi daha tutarlı hale geldi.'
  },
  {
    id: 3,
    index: '#03',
    category: 'desktop-systems',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL'],
    title: 'Elektronik Belge Kayıt ve Arşivleme Sistemi',
    problemContext:
      'Yüksek hacimli gelen ve giden yazışmaları yöneten kurumlar, arşivler manuel veya gevşek yapılandırılmış sistemlerde tutulduğunda yavaş erişim, belirsiz yönlendirme geçmişi ve yinelenen kayıtlarla karşılaşır. Bir belgenin yaşam döngüsünü—kimin aldığı, ne zaman iletildiği ve hangi işlemlerin yapıldığı—izlemek, farklı kayıtlar arasında zaman alıcı aramalar gerektirebilir. Tutarlı tanımlayıcıların ve denetlenebilir bir zaman çizelgesinin yokluğu operasyonel riski artırır ve hesap verebilirliği zorlaştırır. Yapılandırılmış indeksleme, barkod etiketleme ve hızlı arama sunan merkezi bir elektronik kayıt sistemi, idari belge akışlarının kontrol altında tutulması için gereklidir.',
    systemArchitecture:
      'Sistem, idari yazışmaları PostgreSQL üzerinde indekslemek ve yönetmekten sorumlu Node.js ve TypeScript tabanlı bir arka uç servisi olarak uygulanmıştır. Her işlem yapılandırılmış meta verilerle kaydedilir ve fiziksel belge ile dijital kaydı tutarlı şekilde ilişkilendirmek için benzersiz bir barkod tanımlayıcısı atanır. Veri akışı; gelen/giden kayıtların alınması, ana alanların indekslenmesi, optimize edilmiş indekslere sahip ilişkisel tablolarda kalıcılık ve hızlı arama/erişim arayüzlerinin sunulmasını kapsar. Mimari, istek işleme, iş kuralları ve veri erişimini ayırırken her durum değişikliği ve hareket için kronolojik denetim geçmişi tutarak izlenebilirliği sağlar.',
    databaseAndSecurity:
      'PostgreSQL; yazışma kayıtlarını, meta verileri ve denetim girdilerini bütünlük ve sorgu performansı için hedefli indeksler ve kısıtlarla tasarlanmış ilişkisel bir şemada saklar. Referans bütünlüğü kuralları sahipsiz kayıtları ve yinelenen tanımlayıcıları önlemeye yardımcı olur. Kayıt oluşturma, değiştirme veya görüntüleme erişimi, operasyonel sorumluluklarla uyumlu olacak şekilde servis katmanında kontrol edilir. Kronolojik denetim izi, hareketleri ve değişiklikleri kaydederek iç inceleme, hesap verebilirlik ve prosedürel uygunluğun doğrulanması için güvenilir bir temel sunar.',
    keyFeatures: [
      { title: 'Yapılandırılmış Gelen/Giden İndeksleme', explanation: 'Yazışmaları tutarlı meta verilerle ilişkisel modelde yakalayarak düzenli sınıflandırma ve hızlı erişim sağlar.' },
      { title: 'İşlem Başına Barkod Etiketleme', explanation: 'Fiziksel belgeleri dijital kayıtlarla ilişkilendiren benzersiz tanımlayıcılar üreterek eşleşme hatalarını azaltır ve takibi hızlandırır.' },
      { title: 'Yüksek Performanslı Arama ve Erişim', explanation: 'Arşiv hacmi büyüdükçe bile kayıtları hızlı bulmak için PostgreSQL sorguları ve indekslerinden yararlanır.' },
      { title: 'Kronolojik Denetim İzi', explanation: 'Her dosya için hareket ve durum değişikliklerini kaydederek hesap verebilirlik ve prosedür incelemesini destekler.' },
      { title: 'Net Servis API’leri', explanation: 'Bakımı kolay Node.js/TypeScript yapısı içinde ön yüzler veya diğer sistemlerle entegrasyon için yapılandırılmış arayüzler sunar.' },
      { title: 'Veri Bütünlüğü Kontrolleri', explanation: 'Yinelenmeyi önlemek ve tutarlı belge geçmişini korumak için ilişkisel kısıtlar ve benzersiz tanımlayıcılar uygular.' },
    ],
    operationalImpact:
      'Sistem, gelen ve giden yazışmalarda arama ve izleme süresini belirgin şekilde azalttı. Barkod etiketleme ve denetim geçmişi belge hareketlerinin ve sorumlulukların netliğini artırdı. Merkezi indeksleme, dağınık manuel arşivlere bağımlılığı ve kayıt kaybı/çoğalma riskini düşürdü. Genel olarak operasyonel verimlilik ve iç denetimlere hazır olma düzeyi güçlendi.'
  },
  {
    id: 4,
    index: '#04',
    category: 'desktop-systems',
    stack: ['Tauri', 'React', 'SQLite'],
    title: 'Ofis Vekalet ve Finans Defteri Uygulaması',
    problemContext:
      'Vekalet ücretleri, taksitler, giderler ve makbuzların manuel defterler veya bağlantısız elektronik tablolarla izlenmesi hesaplama hatalarına, geciken takiplerine ve belirsiz bakiye görünümüne yol açar. Müşteri ve sözleşme sayısı arttıkça kalan ödemeleri ve vade tarihlerini izlemek zaman alıcı ve gözden kaçırmaya açık hale gelir. Birleşik bir yerel defter olmadığında doğru özetler veya yazdırılabilir makbuzlar talep üzerine üretmek zorlaşır. Bu zorluklar, sözleşme ve finans kayıtlarını tek yerde toplayan ve sürekli bağlantı gerektirmeyen güvenilir bir masaüstü aracı gerektirir.',
    systemArchitecture:
      'Uygulama, duyarlı veri girişi ve inceleme için React arayüzüne sahip bir Tauri masaüstü uygulaması olarak geliştirilmiş ve yerel SQLite defteriyle desteklenmiştir. Sözleşme, ödeme, gider ve makbuz girdileri; hesaplama ve mutabakat kurallarını uygulayan iş mantığından geçerek veritabanına kalıcı olarak yazılır. Tasarım; müşteri, sözleşme, işlem ve makbuz gibi varlıkları ayırarak net ilişkiler ve verimli sorgular sağlar. Kayıtlı verilerden doğrudan makbuz ve kısa finansal özet üreten yazdırmaya hazır şablonlar entegre edilerek bağımsız bir çevrimdışı iş akışı sunulur.',
    databaseAndSecurity:
      'Finansal ve sözleşmeye dayalı veriler; tutarlılığı ve doğru bakiyeleri korumak için yapılandırılmış ilişkisel bir düzende (müşteriler, sözleşmeler, ödemeler, giderler, makbuzlar) yerel SQLite’ta saklanır. Arayüz ve mantık katmanlarındaki doğrulama kontrolleri geçersiz değerleri engellemeye ve giriş hatalarını azaltmaya yardımcı olur. Verilerin cihazda tutulması hassas finans bilgilerinin gizliliğini destekler ve gerektiğinde dosya tabanlı yedeklemeyi kolaylaştırır. Hesaplama mantığının sunumdan ayrılması, mutabakat hatası olasılığını düşürerek zaman içinde güvenilir kayıtlar sağlar.',
    keyFeatures: [
      { title: 'Bütünleşik Yerel Finans Defteri', explanation: 'Sözleşme, taksit, gider ve makbuzları tutarlı muhasebe ve kolay inceleme için tek bir SQLite deposunda kaydeder.' },
      { title: 'Vade ve Bakiye Takibi', explanation: 'Sözleşme bazında kalan tutarları ve zamanlamayı göstererek kaçırılan ödemeleri azaltır ve takibi iyileştirir.' },
      { title: 'Yazdırılabilir Makbuz ve Özetler', explanation: 'Net dokümantasyon ve müvekkile teslim için talep üzerine makbuz ve finansal özet şablonları üretir.' },
      { title: 'Tam Çevrimdışı Çalışma', explanation: 'İnternet bağımlılığı olmadan tamamen yerelde çalışarak kararlı performans ve sürekli erişilebilirlik sağlar.' },
      { title: 'Duyarlı React Tabanlı Arayüz', explanation: 'Günlük kullanım için net formlar ve anlık geri bildirimle veri girişini ve finansal görünümü kolaylaştırır.' },
      { title: 'Doğruluk İçin Girdi Doğrulama', explanation: 'Tutar, tarih ve zorunlu alan kontrolleri uygulayarak insan hatasını azaltır ve kayıt güvenilirliğini korur.' },
    ],
    operationalImpact:
      'Uygulama, hataya açık manuel hesaplamaların yerini alarak bakiye, taksit ve gider takibinin doğruluğunu artırdı. Makbuz ve rapor üretimi daha hızlı ve tutarlı hale gelerek finansal dokümantasyonu netleştirdi. Çevrimdışı yerel depolama gizliliği güçlendirdi ve bağlantı olmayan ortamlarda süreklilik sağladı. Genel olarak günlük finans yönetimi kolaylaştı ve sözleşme kaynaklı nakit akışı üzerindeki kontrol arttı.'
  },
  {
    id: 5,
    index: '#05',
    category: 'desktop-systems',
    stack: ['Next.js', 'TypeScript', 'Firebase'],
    title: 'Duruşma ve Süre Sonu Zamanlayıcı Sistemi',
    problemContext:
      'Hukuk ve idari ekipler duruşmaları, prosedürel süre sonlarını ve dağıtık görevleri parçalı takvimler ve anlık mesajlar üzerinden koordine ettiğinde çakışma ve kritik tarihleri kaçırma riski artar. Paylaşılan ve güncel bir görünüm olmadığında sorumluluk atama ve mevcut durumun anlaşılması, özellikle birden fazla ekip üyesi arasında belirsizleşir. Yaklaşan yükümlülüklerin geç fark edilmesi ciddi prosedürel ve operasyonel sonuçlar doğurabilir. Zaman hassasiyetine sahip işleri disiplin ve koordinasyonla yönetmek için gerçek zamanlı senkronizasyon ve otomatik hatırlatmalar sunan merkezi bir zamanlama sistemine ihtiyaç vardır.',
    systemArchitecture:
      'Sistem, hızlı ve yapılandırılmış bir web arayüzü için Next.js ve TypeScript ile geliştirilmiş; bulut depolama ve kullanıcılar arasında gerçek zamanlı senkronizasyon için Firebase kullanılmıştır. İş akışı; duruşma, süre sonu ve görev oluşturmayı, sorumlu atamayı ve güncellemelerin bağlı istemcilere anında yayıldığı merkezi bir takvimi destekler. Arayüz; takvim, görev ve uyarı görünümlerini paylaşılan senkronize veri durumuna bağlayarak ekip üyeleri arasındaki bilgi sapmasını azaltır. Bu mimari, duyarlı istemci sunumunu yönetilen gerçek zamanlı veri servisleriyle dengeler ve zamanlamaların tutarlı kalmasını sağlar.',
    databaseAndSecurity:
      'Zamanlama verileri, atamalar ve kullanıcıya ilişkin kayıtlar; kimliği doğrulanmış kullanıcı ve role göre okuma/yazma erişimini denetleyen güvenlik kurallarıyla Firebase üzerinde yönetilir. Bulut tabanlı kimlik doğrulama, eylemleri doğrulanmış kullanıcılarla ilişkilendirerek görev sahipliği ve takvim değişikliklerinde hesap verebilirliği destekler. Gerçek zamanlı senkronizasyon, eşzamanlı güncellemelerde çakışan görünümleri azaltmaya yardımcı olur. Bu yapı, operasyonel takvim bilgisini korurken yetkili iş birliği ve zamanında görünürlük sağlar.',
    keyFeatures: [
      { title: 'Merkezi Paylaşılan Takvim', explanation: 'Duruşma, süre sonu ve görevleri tek görünümde toplayarak yaklaşan yükümlülüklere anında farkındalık sağlar.' },
      { title: 'Gerçek Zamanlı Firebase Senkronizasyonu', explanation: 'Takvim değişikliklerini tüm kullanıcılara anında yansıtarak güncel olmayan bilgi ve koordinasyon hatalarını azaltır.' },
      { title: 'Görev Atama ve Sorumluluk Takibi', explanation: 'Sorumlulukları belirli üyelere atar ve durum görünürlüğü sağlayarak hesap verebilirliği ve ilerlemeyi netleştirir.' },
      { title: 'Otomatik Süre Sonu Hatırlatmaları', explanation: 'Kritik tarihler ve duruşmalar için zamanında uyarılar üreterek prosedürel gerekliliklerin kaçırılma riskini düşürür.' },
      { title: 'Çoklu Ekip Takvim Görünürlüğü', explanation: 'Görev ve etkinlikleri tek sistemde düzenli tutarken gruplar arası koordineli görünüm sağlar.' },
      { title: 'Duyarlı Next.js Arayüzü', explanation: 'Günlük planlama ve inceleme için cihazlar genelinde hızlı ve erişilebilir etkileşim sunar.' },
    ],
    operationalImpact:
      'Sistem, birleşik takvim ve otomatik hatırlatmalar sayesinde kaçırılan kritik süreleri azalttı. Gerçek zamanlı senkronizasyon ve net görev sahipliği ekip içi koordinasyon ve hesap verebilirliği iyileştirdi. Duruşma ve son tarihlere paylaşılan görünürlük daha iyi planlama ve daha az çakışma sağladı. Genel olarak tekrarlayan prosedürel yükümlülüklerin yönetiminde zaman disiplini ve operasyonel verimlilik arttı.'
  },
  {
    id: 6,
    index: '#06',
    category: 'security-dashboards',
    stack: ['TypeScript', 'WebAuthn', 'Geolocation API', 'Firebase'],
    title: 'Coğrafi Konum ve Biyometrik Yoklama Sistemi',
    problemContext:
      'Geleneksel yoklama yöntemleri güvenilmez olabilir veya kolayca atlatılabilir; bu da personelin gerçekten onaylı konumlarda bulunup bulunmadığını doğrulamayı zorlaştırır. Çok lokasyonlu veya saha odaklı ortamlarda, yetkili sınırlar içinde varlığı doğrulamak sürekli bir operasyonel zorluktur. Kimlik, cihaz ve konum sinyalleri ayrı veya zayıf şekilde ele alındığında yoklama kayıtları yeterli kanıt sunmayabilir ve denetlenmesi güçleşir. Güvenilir ve incelenebilir yoklama kanıtı üretmek için coğrafi sınır doğrulama, güçlü kullanıcı kimlik doğrulaması ve merkezi kayıt yönetiminin birlikte ele alınması gerekir.',
    systemArchitecture:
      'Sistem, çoklu sinyallerle varlığı doğrulayan bir web paneli olarak sunulur: Geolocation API onaylı saha sınırlarına karşı coğrafi çitleme (geofencing) uygular, WebAuthn ise cihaz destekli kriptografik (biyometri uyumlu) kimlik doğrulaması gerçekleştirir. Konum kontrolleri, kimlik doğrulama sonuçları ve bağlamsal tanımlayıcılar Firebase’e aktarılır; burada saklama, senkronizasyon ve denetim görünürlüğü sağlanır. Mimari; istemci tarafı sinyal toplama, politika değerlendirme ve merkezi kayıt yönetimini ayırarak yoklama girişiminden doğrulanmış ve denetlenebilir kayda net bir akış sunar.',
    databaseAndSecurity:
      'Yoklama kayıtları ve ilgili doğrulama meta verileri, role göre (çalışan, denetçi, yönetici) erişimi kısıtlayan ve yetkisiz değişiklikleri engelleyen Firebase güvenlik kurallarıyla saklanır. WebAuthn, ham biyometrik verileri sunucuda depolamadan cihazda tutulan kimlik bilgileriyle kimliğe bürünmeye dirençli güçlü doğrulama sağlar. Her yoklama denemesi zaman damgası ve sonuç bilgisiyle kaydedilerek denetim ve uyuşmazlık incelemesine destek olur. Coğrafi sınır doğrulama ile güçlü kimlik doğrulamanın birleşimi, sahte kayıt riskini azaltır ve yoklama verisinin bütünlüğünü güçlendirir.',
    keyFeatures: [
      { title: 'Onaylı Saha Coğrafi Sınır Kontrolü', explanation: 'Kullanıcı koordinatlarını tanımlı sınırlarla karşılaştırarak yoklamanın yalnızca yetkili konumlarda kaydedilmesini sağlar.' },
      { title: 'WebAuthn ile Biyometrik/Cihaz Doğrulama', explanation: 'Kimliğe bürünmeye dayanıklı güçlü doğrulama için cihaz destekli kriptografik kimlik bilgilerini kullanır.' },
      { title: 'Çoklu Sinyal ile Varlık Doğrulama', explanation: 'Konum, kimlik ve cihaz bağlamını tek yoklama kaydında birleştirerek kanıt güvenilirliğini artırır.' },
      { title: 'Gerçek Zamanlı Kayıt ve Senkronizasyon', explanation: 'Yoklama girişlerini Firebase’de saklayıp senkronize ederek denetçilere anında merkezi görünürlük sağlar.' },
      { title: 'Role Dayalı İnceleme Erişimi', explanation: 'Denetçi ve yöneticilerin kayıtları geniş değiştirme yetkisi olmadan inceleyebilmesi için rol kapsamlı izinler uygular.' },
      { title: 'Zaman Damgalı Denetim İzi', explanation: 'Deneme zamanlarını ve doğrulama sonuçlarını kaydederek operasyonel denetim ve incelemeleri destekler.' },
    ],
    operationalImpact:
      'Çözüm, yetkisiz veya saha dışı yoklama girişlerini azaltarak kayıt güvenilirliğini artırdı. Denetçiler varlık verilerine zamanında ve merkezi erişim sağlayarak gözetim ve müdahaleyi iyileştirdi. Yapılandırılmış çoklu sinyal kayıtları manuel doğrulama yükünü azaltırken denetlenebilirliği artırdı. Genel olarak operasyonel disiplin ve yoklama raporlamasının güvenilirliği güçlendi.'
  },
  {
    id: 7,
    index: '#07',
    category: 'security-dashboards',
    stack: ['Node.js', 'PostgreSQL', 'JWT'],
    title: 'Çok Rollü RBAC ve Denetim Günlüğü Ağ Geçidi',
    problemContext:
      'Hassas veri ve yetkili işlemleri yöneten sistemlerde, kaynaklara kimlerin erişebileceği veya değişiklik yapabileceği üzerinde hassas kontrol gerekir. Net bir yetkilendirme modeli ve güvenilir denetim izi olmadığında hesap verebilirlik zayıflar, olay incelemesi zorlaşır ve kötüye kullanım ya da kazara değişiklik riski artar. Karmaşık ve değişen rolleri geçici kontrollerle yönetmek tutarsız uygulamalara ve boşluklara yol açabilir. Ayrıntılı RBAC uygulayan ve değiştirilemez kronolojik denetim olaylarını kaydeden merkezi bir ağ geçidi güvenlik ve yönetişim için gereklidir.',
    systemArchitecture:
      'Ağ geçidi, kullanıcılar, roller, izinler ve denetim kayıtlarını PostgreSQL’de tutan bir Node.js servisi olarak uygulanmıştır. İstek akışı; kimlik doğrulama ve yetkilendirme taleplerini taşıyan JWT üretimi, ardından hassas işlemler yürütülmeden önce belirteçleri doğrulayan ve rol tabanlı politikaları uygulayan ara katman (middleware) adımlarından geçer. Tasarım; kimlik yönetimi, yetkilendirme mantığı ve denetim kalıcılığını ayırarak uç noktalar arasında tutarlı uygulama sağlar. Kimlik doğrulama olayları, izin değişiklikleri ve korunan kaynak erişimleri gibi hassas eylemler yapılandırılmış, zaman sıralı bir denetim izinde yakalanır.',
    databaseAndSecurity:
      'PostgreSQL; roller, izinler ve ilişkileri için referans bütünlüğü kısıtları içeren ilişkisel bir model tutarak yetkilendirme verisinin tutarlılığını korur. JWT tabanlı yetkilendirme, doğrulanabilir talepler ve işlem düzeyinde kapsamlı erişim kontrolleriyle istekleri güvence altına alır. Denetim günlüğü, inceleme ve soruşturmayı desteklemek ve fark edilmeden müdahaleyi zorlaştırmak için kronolojik ve yapılandırılmış şekilde tasarlanmıştır. En az ayrıcalık ilkeleri, girdi doğrulama ve net tanımlı API sınırları saldırı yüzeyini azaltır ve öngörülebilir erişim kontrol davranışı sağlar.',
    keyFeatures: [
      { title: 'Ayrıntılı Rol Tabanlı Erişim Kontrolü (RBAC)', explanation: 'Hassas kaynaklara ve işlemlere erişimi denetlemek için roller ve izinleri hassas eşlemelerle tanımlar.' },
      { title: 'JWT ile Kimlik Doğrulama ve Yetkilendirme', explanation: 'API isteklerini güvenceye almak ve tutarlı yetki kontrolleri uygulamak için kapsamlı talepler içeren imzalı belirteçler kullanır.' },
      { title: 'Kronolojik Denetim Günlüğü', explanation: 'Hesap verebilirlik ve olay incelemesi için aktör, zaman ve bağlam bilgisiyle hassas eylemleri kaydeder.' },
      { title: 'Merkezi Politika Uygulama Ara Katmanı', explanation: 'Yürütmeden önce tek tip belirteç ve izin doğrulaması uygulayarak yinelenen veya tutarsız kontrolleri azaltır.' },
      { title: 'Yönetilen Roller ve İzin Politikaları', explanation: 'Operasyonel gereksinimler değiştikçe yetkilendirme yapılarının tek noktadan güncellenmesini sağlar.' },
      { title: 'Tutarlı Yetkilendirme Veri Modeli', explanation: 'Kullanıcı, rol ve izinler arasındaki bütünlüğü korumak için PostgreSQL ilişkisel kısıtlarından yararlanır.' },
    ],
    operationalImpact:
      'Ağ geçidi, yetkili erişim üzerindeki kontrolü güçlendirerek aşırı izinlerle ilişkili riskleri azalttı. Net denetim izi, hassas işlemlere görünürlüğü artırdı ve inceleme ile olay müdahalesini kolaylaştırdı. Merkezi uygulama, servisler ve uç noktalar arasında güvenlik politikalarının tutarlılığını yükseltti. Genel olarak yönetişim, hesap verebilirlik ve operasyonel güvenlik duruşu iyileşti.'
  },
  {
    id: 8,
    index: '#08',
    category: 'security-dashboards',
    stack: ['Rust', 'Tokio', 'REST API'],
    title: 'Webhook ve Harici Bildirim Dağıtım Motoru',
    problemContext:
      'Olay güdümlü entegrasyonlar zamanında bildirimlere dayanır; ancak aşağı akış uç noktaları yavaş, kullanılamaz veya aralıklı erişilemez olduğunda eşzamanlı ve doğrudan teslim kırılgan hale gelir. Kaçırılan veya geciken uyarılar sistemler arasında tutarsız duruma, daha yavaş müdahaleye ve artan manuel mutabakata yol açar. Yapılandırılmış yeniden denemeler ve teslim takibi olmadan operatörler neyin gönderildiğini, neyin başarısız olduğunu ve neyin yeniden işlenmesi gerektiğini göremez. Gerçek ağ koşullarında güvenilir olay teslimi için kuyruklama, geri çekilme (backoff) ve durum takibi sunan dayanıklı bir dağıtım motoru gerekir.',
    systemArchitecture:
      'Dağıtım motoru, verimli eşzamanlılık için Tokio kullanan Rust tabanlı eşzamansız bir arka plan servisi olarak geliştirilmiştir. Olaylar REST API üzerinden alınır, işleme için kuyruğa konur ve eşzamansız çalışanlar tarafından harici webhook veya bildirim uç noktalarına teslim edilir. Akış; iş başına teslim denemeleri, geçici hatalarda üstel geri çekilme ve her bildirim yaşam döngüsü aşaması için durum takibini içerir. Alımı teslimattan ayırmak ve hataları iş bazında izole etmek, tek bir başarısız hedefin tüm kuyruğu bloke etmesini önler ve verimi korur.',
    databaseAndSecurity:
      'Servis; gözlemlenebilirlik ve kontrollü yeniden işleme desteği için teslim durumunu, deneme sayılarını ve sonuç kayıtlarını tutar. REST uç noktaları, yetkisiz veya hatalı olay alımını azaltmak için dağıtım sınırında istek doğrulama ve erişim kontrolleriyle tasarlanır. Yeniden deneme politikaları ve izolasyon sınırları sınırsız hata döngülerini önlemeye ve sistem kaynaklarını korumaya yardımcı olur. Teslim durumu ve hataların yapılandırılmış kaydı, genel dağıtım sürekliliğini bozmadan izleme ve sorun gidermeye operasyonel temel sağlar.',
    keyFeatures: [
      { title: 'Eşzamansız Yüksek Güvenilirlikli Kuyruk', explanation: 'Olay alımını teslim yürütmesinden ayırırken bildirim işlerini eşzamanlı işlemek için Rust/Tokio kullanır.' },
      { title: 'Üstel Geri Çekilmeli Yeniden Denemeler', explanation: 'Geçici hatalarda uç noktaları yormadan teslim başarı şansını artırmak için kontrollü yeniden deneme aralıkları uygular.' },
      { title: 'İş Başına Teslim Durumu Takibi', explanation: 'Her bildirim için deneme ve sonuçları kaydederek izleme, doğrulama ve hedefli kurtarma imkânı sağlar.' },
      { title: 'Hata İzolasyonu', explanation: 'Hataları tekil iş veya hedeflerle sınırlar; böylece bir başarısızlık tüm dağıtım hattını durdurmaz.' },
      { title: 'REST API Entegrasyon Yüzeyi', explanation: 'İç ve dış sistemlerin olayları güvenilir biçimde göndermesi için standart bir alım arayüzü sunar.' },
      { title: 'Hata Toleranslı Teslim Tasarımı', explanation: 'Ağ değişkenliği ve kısmi kesintileri üretim entegrasyonlarına uygun dayanıklı işleme desenleriyle ele alır.' },
    ],
    operationalImpact:
      'Dağıtım motoru, sessiz kayıpları ve yönetilemeyen gecikmeleri azaltarak sistemler arası bildirim güvenilirliğini ve tutarlılığını artırdı. Yapılandırılmış yeniden denemeler ve durum takibi, geçici arızalarda manuel müdahaleyi düşürdü. Hata izolasyonu, belirli hedefler bozulsa bile genel servis sürekliliğini korudu. Sonuç olarak bağımlı sistemler daha doğru olay güdümlü durum ve daha hızlı operasyonel tepki elde etti.'
  },
  {
    id: 9,
    index: '#09',
    category: 'security-dashboards',
    stack: ['React', 'TypeScript', 'WebSockets'],
    title: 'Sistem Sağlığı ve Telemetri Panosu',
    problemContext:
      'Operasyon ekipleri, metrikler araçlara dağılmış veya gecikmeli raporlandığında servis sağlığına ilişkin birleşik ve gerçek zamanlı bir görünüme çoğu zaman sahip olmaz. Gecikme artışları, kuyruk birikmeleri veya depolama bozulmaları fark edilmeden büyüyebilir; bu da olay etkisini ve müdahale süresini artırır. Periyodik raporlar, kesintilerden önce gelen hızlı değişimleri tespit etmek için yetersiz kalır. Kritik sinyalleri anında görünür kılan ve bilinçli operasyonel kararları destekleyen canlı, konsolide bir telemetri panosuna ihtiyaç vardır.',
    systemArchitecture:
      'Pano, WebSockets üzerinden canlı metrik akışlarını tüketen etkileşimli bir izleme arayüzü olarak React ve TypeScript ile geliştirilmiştir. API gecikmesi, arka plan işçi kuyruğu durumu ve depolama sağlığı gibi metrikler izleme kaynaklarından akış kanalına yayımlanır ve gerçek zamanlı görünürlük için özel arayüz bileşenlerinde işlenir. Uygulama, bağlantı/durum yönetimini görselleştirme bileşenlerinden ayırarak güncellemeleri verimli ve bakımı kolay tutar. Bu akış yaklaşımı sürekli yoklama yükünden kaçınırken sistem durumu değişikliklerini birleşik görünümde anında yansıtır.',
    databaseAndSecurity:
      'Pano, WebSocket kanalları üzerinden iletilen telemetriyi tüketip sunmaya odaklanır; görünürlüğü yetkili kullanıcılarla sınırlandırmak için metrik ağ geçidi veya yayın katmanındaki erişim kontrolleri ve kimlik doğrulamaya dayanır. İstemci tarafı işleme, yeniden bağlanma veya geçici kesintiler sırasında tutarlı görüntülemeyi korumak için gelen güncellemeleri doğrular ve düzenler. Görselleştirmenin metrik toplama ve depolama sistemlerinden ayrılması, sorumlulukları netleştirir ve maruziyeti sınırlar. Sonuç, güvenli operasyonel erişim kalıplarıyla uyumlu, hafif ve duyarlı bir izleme yüzeyidir.',
    keyFeatures: [
      { title: 'WebSockets ile Canlı Metrik Akışı', explanation: 'Yoklama gecikmeleri olmadan mevcut sistem koşullarını yansıtmak için performans güncellemelerini gerçek zamanlı alır.' },
      { title: 'API Gecikmesi İzleme', explanation: 'Bozulmayı erken tespit etmeye ve incelemeyi önceliklendirmeye yardımcı olmak için yanıt süresi eğilimlerini ve ani artışları gösterir.' },
      { title: 'İşçi Kuyruğu Görünürlüğü', explanation: 'Kullanıcıları etkilemeden önce darboğazları belirlemek için arka plan işlerindeki birikme ve işleme sinyallerini izler.' },
      { title: 'Depolama ve Servis Sağlığı Göstergeleri', explanation: 'Hızlı durum değerlendirmesi için temel sağlık sinyallerini tek arayüzde birleştirir.' },
      { title: 'Birleşik ve Okunabilir Pano Düzeni', explanation: 'Günlük izleme ve olay müdahalesini desteklemek için kritik telemetriyi net görsel bileşenlerde düzenler.' },
      { title: 'Dayanıklı Güncelleme İşleme', explanation: 'Geçici kesintiler sırasında kararlı görselleştirmeyi korumak için bağlantı durumunu ve gelen akışları yönetir.' },
    ],
    operationalImpact:
      'Pano, servis performansına anında ve konsolide görünürlük sağlayarak anormalliklerin daha hızlı tespit edilmesini mümkün kıldı. Ekipler gecikme artışlarına ve kuyruk birikmesine daha geniş olaylara dönüşmeden önce müdahale edebildi. Kritik telemetrinin merkezileştirilmesi birden fazla izleme kaynağı arasında geçiş ihtiyacını azalttı. Genel olarak operasyonel hazır olma düzeyi yükseldi ve sistem sağlığını değerlendirip aksiyon alma süresi kısaldı.'
  },
  {
    id: 10,
    index: '#10',
    category: 'automation-data',
    stack: ['Python', 'FFmpeg', 'Pillow'],
    title: 'Otonom Toplu Medya ve En-Boy Oranı İşleyici',
    problemContext:
      'Görsel varlıkları birden fazla yayın kanalı için hazırlamak, manuel yapıldığında yavaş ve tutarsız sonuçlar doğuran tekrarlı yeniden boyutlandırma, kırpma ve yeniden çerçeveleme işlemleri gerektirir. Medya hacmi arttıkça çıktılar arasında tek tip boyut ve kaliteyi korumak zorlaşır; bu da uyumsuz varlıklara ve yeniden işe yol açar. Standart şablonlar olmadan aynı çerçeveleme kurallarını zaman içinde güvenilir şekilde yeniden üretmek güçtür. Büyük görüntü ve video kümelerini minimum manuel müdahaleyle tutarlı, kanala hazır formatlara dönüştürmek için otomatik bir toplu işleme hattına ihtiyaç vardır.',
    systemArchitecture:
      'Çözüm, video işleme için FFmpeg’i ve görüntü işleme için Pillow’u orkestre eden bir Python toplu işleme hattı olarak uygulanmıştır. Belirlenen dizinlerden giriş medyası keşfedilir, çıktı şablonlarına (ör. dikey ve kare en-boy oranları) eşlenir, tutarlı yeniden boyutlandırma/kırpma/doldurma parametreleriyle işlenir ve düzenli çıktı konumlarına yazılır. Mimari; şablon seçimi, medya türü işleme ve yürütme adımlarını ayırarak aynı kuralların partiler arasında tekrarlanabilir şekilde uygulanmasını sağlar. Bu deterministik akış öngörülebilir sonuçlar üretir ve hattı yeniden tasarlamadan çerçeveleme veya kodlama ayarlarının güncellenmesini kolaylaştırır.',
    databaseAndSecurity:
      'İşleyici yerel giriş ve çıkış yolları üzerinde çalışır; kaynak varlıkların istenmeden üzerine yazılmasını önlemek için güvenli dosya işleme ve düzenli çıktı üretimine odaklanır. İşleme parametreleri ve şablonlar, aynı girdiler üzerinde tekrarlanabilir dönüşümler için kontrollü yapılandırma görevi görür. Varlıklar varsayılan olarak yerel yürütme ortamında işlendiğinden harici işleme servislerine kıyasla maruziyet azalır. Dosya bazlı hata işleme, tekil öğeler desteklenmediğinde veya bozuk olduğunda parti sürekliliğini koruyarak genel iş akışı güvenilirliğini sürdürür.',
    keyFeatures: [
      { title: 'Toplu Video ve Görüntü İşleme', explanation: 'Tekrarlayan manuel düzenleme işlerini ortadan kaldırmak için FFmpeg ve Pillow ile büyük ölçekli dönüşümleri otomatikleştirir.' },
      { title: 'Tutarlı Çerçeveleme Şablonları', explanation: 'Partiler arasında tek tip dikey ve kare çıktılar üretmek için standart en-boy oranı ve çerçeveleme kuralları uygular.' },
      { title: 'Yapılandırılabilir Çıktı Parametreleri', explanation: 'Tutarlılığı korurken yayın gereksinimlerini karşılamak için boyut ve kodlama/kalite ayarlarını kontrol eder.' },
      { title: 'Düzenli Çıktı Yönetimi', explanation: 'İşlenen varlıkları izleme, inceleme ve sonraki kullanım için yapılandırılmış dizinlere yazar.' },
      { title: 'Tekrarlanabilir Deterministik Hat', explanation: 'Tanımlı işleme adımları ve şablonları kullanarak yeni partilerde sonuçların güvenilir şekilde yeniden üretilmesini sağlar.' },
      { title: 'İnsan Hatasının Azaltılması', explanation: 'Yeniden boyutlandırma ve kırpma mantığını otomatikleştirerek manuel medya hazırlığının getirdiği değişkenliği azaltır.' },
    ],
    operationalImpact:
      'Hat, medya varlıklarını birden fazla format için hazırlamak üzere gereken zaman ve çabayı belirgin şekilde azalttı. Standart şablonlar sayesinde çıktı tutarlılığı iyileşti ve kanallar arasında daha tek tip bir sunum desteklendi. Çerçeveleme ve boyutlandırmadaki manuel hatalar azalarak yeniden iş oranı düştü. Genel olarak daha büyük partiler için öngörülebilir kalitede, ölçeklenebilir ve tekrarlanabilir medya işleme sağlandı.'
  },
  {
    id: 11,
    index: '#11',
    category: 'automation-data',
    stack: ['Node.js', 'Python', 'Redis'],
    title: 'Platformlar Arası Zamanlanmış Yayınlama Aracısı',
    problemContext:
      'Birden fazla platformda zamanlanmış içerik yayınını koordine etmek; zamanlama, yeniden deneme ve teslim onayı manuel yönetildiğinde zordur. Hız sınırları ve geçici hatalar farklılık gösterdiğinde kaçırılan gönderiler, yinelenen yayınlar veya tutarsız yayın durumları ortaya çıkabilir. Merkezi kuyruk ve doğrulama mekanizması olmadan her işin durumunu izlemek belirsiz ve operasyonel olarak maliyetli hale gelir. Zamanlama, kuyruklama, hız kontrolü ve teslim kontrollerini yöneten kalıcı bir arka plan aracısı, güvenilir ve zamanında dağıtım için gereklidir.',
    systemArchitecture:
      'Araç, yayın işlerini zamanlamak ve yürütmek için Node.js ve Python bileşenlerini birleştiren kalıcı bir arka plan çalışanı olarak uygulanmıştır. Redis; kuyruklar, geciktirilmiş işler ve hız sınırlama durumu için koordinasyon katmanı görevi görerek çalışanların görevleri doğru zamanda ve tempoda almasını sağlar. Yürütme akışı; iş oluşturma ve zamanlama, platform bağlayıcılarına dağıtım, sonuç yakalama ve iş başına teslim doğrulamasını kapsar. Zamanlama, kuyruk yönetimi ve yürütmenin ayrılması, kontrollü verim korunurken eşzamanlı iş yüklerini destekler ve izlenebilir sonuçlar üretir.',
    databaseAndSecurity:
      'Redis; kuyruk durumunu, zamanlanmış görev meta verilerini ve her işin yaşam döngüsü boyunca izlenmesi için gereken ara yürütme sinyallerini saklar. Entegrasyon kimlik bilgileri ve platform erişim yapılandırması, sırların maruziyetini sınırlamak için kontrollü çalışma zamanı ayarlarında yönetilir. Hız sınırlama ve kontrollü dağıtım davranışı, harici platformlara aşırı isteklerden kaynaklanan hata modlarını azaltır. Deneme sonuçlarının ve doğrulama durumunun kaydedilmesi, manuel kontrole dayanmadan teslimata operasyonel görünürlük sağlar.',
    keyFeatures: [
      { title: 'Güvenilir Zamanlanmış İş Yürütme', explanation: 'Platformlar arasında tutarlı teslim programlarını korumak için yayın görevlerini tanımlı zamanlarda kuyruğa alır ve tetikler.' },
      { title: 'Redis Tabanlı Kuyruklar ve Koordinasyon', explanation: 'Ölçeklenebilir arka plan işleme için iş kuyrukları, geciktirilmiş yürütme ve paylaşılan durum yönetiminde Redis kullanır.' },
      { title: 'Hız Sınırı Farkındalıklı Dağıtım', explanation: 'Platform kısıtlarıyla uyumlu istek temposu sağlayarak önlenebilir yayın hatalarını azaltır.' },
      { title: 'İş Başına Teslim Doğrulama', explanation: 'Yayın durumuna net görünürlük sağlamak için her görev için yürütme sonuçlarını yakalar ve kontrol eder.' },
      { title: 'Kalıcı Arka Plan Çalışanı Modeli', explanation: 'Zamanlanmış ve ertelenmiş işleri tekrarlı manuel müdahale olmadan işlemek için sürekli çalışır.' },
      { title: 'Genişletilebilir Çok Platformlu İş Akışı', explanation: 'Zamanlama ve yürütme mantığını ayırarak ek platform bağlayıcılarının tutarlı şekilde entegre edilmesini sağlar.' },
    ],
    operationalImpact:
      'Araç manuel koordinasyon çabasını azalttı ve planlanan yayın programlarına uyumu iyileştirdi. Kuyruklama, hız kontrolü ve doğrulama güvenilirliği artırdı ve hataların tespit edilip ele alınmasını kolaylaştırdı. Ekipler platformlar genelinde iş durumu ve teslim sonuçlarına daha net görünürlük kazandı. Genel olarak daha düşük operasyonel yükle daha tutarlı dağıtım sağlandı.'
  },
  {
    id: 12,
    index: '#12',
    category: 'automation-data',
    stack: ['Python', 'SQLite FTS5', 'Google Drive API'],
    title: 'Yerel ve Bulut Depolama Tam Metin Dizinleyici',
    problemContext:
      'Yerelde ve bulut sürücülerinde depolanan binlerce iç içe dosya içinde belirli bilgiyi bulmak, aramalar indekslenmemiş taramalara veya sınırlı format desteğine dayandığında son derece yavaş olabilir. PDF ve Word dosyalarından oluşan büyük koleksiyonlara sahip belge yoğun ortamlarda manuel göz atma veya temel dosya adı araması ilgili içeriği verimli şekilde ortaya çıkaramaz. Yerel dizinler ve Google Drive arasında dağınık depolama, birleşik keşfi daha da zorlaştırır. Kaynakları toplamak, içerik çıkarmak ve büyük veri kümeleri üzerinde hızlı, tutarlı arama sağlamak için tam metin indeksleme motoru gerekir.',
    systemArchitecture:
      'Dizinleyici, yerel dosya sistemlerinden ve Google Drive API üzerinden buluttan içerik toplamak için Python ile geliştirilmiştir. İşleme hattı desteklenen dosyaları keşfeder, metin çıkarır (PDF ve Word dahil), içeriği normalize eder ve aranabilir belirteçler ile meta verileri yerel bir SQLite FTS5 indeksinde saklar. Sorgular düşük gecikmeli sonuçlar için yerel FTS indeksine karşı çalıştırılır; alma, çıkarma, indeksleme ve arama aşamaları bakım kolaylığı için modüler tutulur. Bu tasarım, büyük depolarda artımlı indekslemeyi ve heterojen depolama konumlarında birleşik arama yüzeyi sağlamayı destekler.',
    databaseAndSecurity:
      'Arama indeksi ve çıkarılan metin meta verileri, verimli tam metin sorgu performansı sağlamak için FTS5 uzantısını kullanan SQLite içinde yerelde saklanır. Bulut içeriğine erişim, gerekli alma işlemleriyle kapsamlandırılmış Google Drive API yetkilendirmesi üzerinden sağlanır. Dosya işleme ve indeksleme yerel çalışma zamanı ortamında gerçekleşerek indekslenen veriler üzerinde kontrolü destekler. Dosya bazlı hata işleme, çıkarma veya erişim sorunlarını izole ederek basamaklı hatalar olmadan veri kümesinin geri kalanında indekslemeye devam edilmesini sağlar.',
    keyFeatures: [
      { title: 'Yüksek Hızlı Tam Metin Arama', explanation: 'Büyük metin kümelerinde yaygın aramalar için düşük gecikmeli yanıtlar sunmak üzere SQLite FTS5 ile indeksleme ve sorgulama yapar.' },
      { title: 'Birleşik Yerel ve Bulut İndeksleme', explanation: 'Google Drive API aracılığıyla yerel dizinler ve Google Drive içeriklerini tek aranabilir indekste toplar.' },
      { title: 'PDF ve Word Metin Çıkarma', explanation: 'Daha önce aranması zor içeriği anahtar kelimeyle keşfedilebilir kılmak için yaygın belge formatlarını işler.' },
      { title: 'Ölçeklenebilir Artımlı İndeksleme', explanation: 'Her çalıştırmada tam yeniden tarama gerektirmeden büyük arşivler (500GB+) için yapılandırılmış alma iş akışlarını destekler.' },
      { title: 'Düşük Gecikmeli Yerel Sorgu Yürütme', explanation: 'Depolama konumlarının isteğe bağlı yavaş taranmasını önlemek için aramaları yerel FTS indeksinde çalıştırır.' },
      { title: 'Dayanıklı Dosya Bazlı İşleme', explanation: 'Büyük ve karışık veri kümelerinde ilerlemeyi korumak için çıkarma veya erişim hatalarını dosya düzeyinde ele alır.' },
    ],
    operationalImpact:
      'Dizinleyici, büyük ve dağıtık belge koleksiyonlarında bilgi bulma süresini önemli ölçüde azalttı. Yerel ve bulut kaynakları arasında birleşik arama günlük üretkenliği artırdı ve bağlam değiştirmeyi azalttı. PDF ve Word içeriğinin aranabilir hale gelmesi daha önce gömülü bilgilere erişimi mümkün kıldı. Genel olarak bilgiye erişim verimliliği ve depolanan arşivlerin pratik değeri yükseldi.'
  },
  {
    id: 13,
    index: '#13',
    category: 'automation-data',
    stack: ['Rust', 'SHA-256', 'Systemd'],
    title: 'Çok Dizinli Bulut Senkronizasyon ve Yedekleme Arka Plan Hizmeti',
    problemContext:
      'Manuel yedekleme rutinleri unutulmaya, tutarsızlığa ve aktarım sonrası dosya bütünlüğü doğrulanmadığında sessiz veri bozulmasına açıktır. Önemli veriler birden fazla dizine yayıldığında neyin değiştiğini izlemek ve zamanında senkronizasyon sağlamak operasyonel olarak zahmetli hale gelir. Zamanlanmış otomasyon ve bütünlük kontrolleri olmadan kurtarma noktaları güncel olmayabilir veya güvenilirliği düşük kalabilir. Verileri sürekli ve öngörülebilir şekilde korumak için doğrulanabilir dosya bütünlüğüne sahip kalıcı, artımlı bir yedekleme arka plan hizmeti gerekir.',
    systemArchitecture:
      'Araç, Systemd üzerinden zamanlanan ve yönetilen bir Rust arka plan hizmeti (daemon) olarak uygulanmıştır. Birden fazla yapılandırılmış kaynak yolu izler, artımlı senkronizasyon için değişen dosyaları belirler, güncellemeleri hedef konuma aktarır ve bütünlüğü doğrulamak için aktarım öncesi/sonrası SHA-256 sağlama toplamlarını hesaplar. Tasarım; zamanlama/yaşam döngüsü yönetimini (Systemd) senkronizasyon ve doğrulama mantığından ayırarak güvenilir gözetimsiz çalışma sağlar. Bu yapı, net doğrulama adımları ve çoklu dizinlerin kontrollü yönetimiyle tekrarlanabilir yedekleme döngülerini destekler.',
    databaseAndSecurity:
      'Veri bütünlüğü, senkronizasyon döngüleri sırasında bozulma veya eksik aktarımları tespit etmek için SHA-256 sağlama toplamı karşılaştırmasıyla sağlanır. Dosya işlemleri, istenmeyen erişim veya yazmaları azaltmak için işletim sistemi izinleri altında yapılandırılmış kaynak ve hedef yollarla sınırlandırılır. Yönetilen bir Systemd servisi olarak çalışma, kontrollü başlatma, yeniden başlatma davranışı ve tutarlı yürütme politikalarını destekler. Bu yaklaşım, aktarılan verinin doğru olduğu varsayılmak yerine doğrulanabilir olmasını sağlayarak güvenilir yedekleme ve kurtarılabilirliğe öncelik verir.',
    keyFeatures: [
      { title: 'Artımlı Çok Yollu Senkronizasyon', explanation: 'Aktarım süresini ve kaynak kullanımını azaltmak için birden fazla dizindeki yalnızca değişen dosyaları yedekler.' },
      { title: 'Systemd ile Zamanlanmış Servis Çalışması', explanation: 'Güvenilir gözetimsiz yedeklemeler için zamanlanmış yürütme ve yaşam döngüsü kontrolü sağlayan yönetilen bir arka plan hizmeti olarak çalışır.' },
      { title: 'SHA-256 Bütünlük Doğrulaması', explanation: 'Bozulma veya eksik kopyaları tespit etmek için aktarım öncesi ve sonrası sağlama toplamlarını hesaplar ve karşılaştırır.' },
      { title: 'Güvenilir Rust Tabanlı Arka Plan Hizmeti', explanation: 'Arka plan servislerine uygun kararlı ve verimli uzun süreli dosya/süreç işlemleri için Rust kullanır.' },
      { title: 'Yedekleme Sapmasının Azaltılması', explanation: 'Düzenli otomatik çalıştırmalar yedek kopyaları güncel duruma yakın tutarak olası veri kaybı penceresini küçültür.' },
      { title: 'Yapılandırılabilir Kaynak ve Hedef Yollar', explanation: 'Esnek yedekleme senaryoları için birden fazla dizin ve hedefin net şekilde yönetilmesini destekler.' },
    ],
    operationalImpact:
      'Hizmet, artımlı çalıştırmaları otomatikleştirerek ve her döngüde dosya bütünlüğünü doğrulayarak yedekleme güvenilirliğini artırdı. Sağlama toplamı doğrulaması sayesinde güncel olmayan veya sessizce bozulmuş kopyalara güvenme riski azaldı. Otomatik zamanlama sürekli operasyonel çabayı düşürdü ve koruma tutarlılığını iyileştirdi. Genel olarak kurtarma hazır olma düzeyi ve zaman içinde yedeklere duyulan güven güçlendi.'
  },
  {
    id: 14,
    index: '#14',
    category: 'automation-data',
    stack: ['Python', 'Playwright', 'Docker', 'SOCKS5'],
    title: 'Dağıtık Sanal Oturum ve Proxy Rotasyon Çerçevesi',
    problemContext:
      'Otomasyon veya test için izole tarayıcı oturumları çalıştırmak, oturum durumu, ortam yapılandırması ve ağ yönlendirmesi manuel yönetildiğinde karmaşık hale gelir. Sıkı izolasyon olmadığında çerezler, depolama ve çalışma zamanı bağlamı çalıştırmalar arasında sızabilir; bu da tekrarlanabilirliği azaltır ve hata ayıklamayı zorlaştırır. Proxy rotasyonu ve oturum başına yapılandırmanın ölçekte koordine edilmesi ek operasyonel yük getirir. İzole oturumları ve yapılandırılabilir SOCKS5 yönlendirmesini standartlaştıran konteyner tabanlı bir çerçeve, tekrarlanabilir ve paralel tarayıcı iş akışlarını güvenilir şekilde yürütmek için gereklidir.',
    systemArchitecture:
      'Çerçeve, tekrarlanabilir ve izole tarayıcı ortamları sağlamak için Docker konteynerleri içinde çalışan Python ve Playwright ile geliştirilmiştir. Her çalıştırma bağımsız bir oturum profili oluşturur, tarayıcı otomasyonunu bir konteyner içinde başlatır ve görev parametrelerine göre yapılandırılabilir SOCKS5 proxy yönlendirmesini uygular. Mimari; konteyner yaşam döngüsü yönetimi, oturum/profil kurulumu ve otomasyon mantığını ayırarak çoklu izole oturumların paralel çalışmasını ve çapraz kirlenmenin en aza indirilmesini sağlar. Yapılandırma güdümlü yürütme, senaryoların farklı ana makinelerde ve çalıştırmalarda tutarlı biçimde yeniden üretilmesini destekler.',
    databaseAndSecurity:
      'İzolasyon, konteyner sınırları ve ayrı tarayıcı profilleriyle sağlanarak oturumlar arasında çerez, yerel depolama ve çalışma zamanı artefaktlarının istenmeyen paylaşımı sınırlandırılır. Ağ yönlendirmesi ve proxy ayarları, bağlantı davranışını oturum başına açık tutmak için kontrollü yapılandırma olarak ele alınır. Her çalıştırma için temiz, atılabilir ortamlar oluşturulabilmesi ve kalıcı paylaşılan durumun en aza indirilmesi operasyonel güvenliği destekler. Bu tasarım, geniş ve örtük sistem erişimi yerine öngörülebilir yürütme sınırlarına ve kontrollü oturum verisi işlemeye odaklanır.',
    keyFeatures: [
      { title: 'Konteyner İzole Tarayıcı Oturumları', explanation: 'Çalıştırmalar arasında durum sızıntısını önlemek için her otomasyon bağlamını kendi Docker ortamı ve profilinde çalıştırır.' },
      { title: 'Yapılandırılabilir SOCKS5 Proxy Rotasyonu', explanation: 'Kontrollü ağ yolu değişimi için oturum veya görev bazında ayarlanabilir proxy yönlendirme politikaları uygular.' },
      { title: 'Tekrarlanabilir Playwright Otomasyonu', explanation: 'Yeniden üretilebilirlik gerektiren test ve otomasyon senaryoları için betikli tarayıcı iş akışlarını deterministik şekilde yürütür.' },
      { title: 'Oturum Yaşam Döngüsü Yönetimi', explanation: 'Temiz yürütme ortamlarını korumak için oturumları ve konteynerleri yapılandırılmış şekilde oluşturur, çalıştırır ve sonlandırır.' },
      { title: 'Paralel İzole Yürütme', explanation: 'Profillerin ve çalışma zamanı durumunun ayrımını korurken birden fazla oturumun eşzamanlı çalışmasını destekler.' },
      { title: 'Taşınabilir Yapılandırma Güdümlü Kurulum', explanation: 'Davranışı ortamlar arasında tutarlı şekilde yeniden üretmek için standart konteyner ve parametre yapılandırması kullanır.' },
    ],
    operationalImpact:
      'Çerçeve, izole tarayıcı oturumlarının yönetimini basitleştirdi ve proxy/ortam yapılandırması için gereken manuel kurulumu azalttı. Tutarlı konteyner tabanlı yürütme ve temiz oturum sınırları sayesinde tekrarlanabilirlik iyileşti. Ekipler, oturumlar arası etkileşim riski daha düşük şekilde paralel otomasyon senaryoları çalıştırabildi. Genel olarak kontrollü ve tekrarlanabilir tarayıcı ortamları gerektiren iş akışlarında verimlilik ve güvenilirlik arttı.'
  },
  {
    id: 15,
    index: '#15',
    category: 'automation-data',
    stack: ['Python', 'Tesseract OCR', 'PyMuPDF'],
    title: 'Toplu OCR Hukuki Belge Çıkarıcı',
    problemContext:
      'Taranmış kayıtlar ve görüntü tabanlı PDF’lerden oluşan büyük arşivler, içerikleri metin olarak aranamadığında veya indekslenemediğinde fiilen erişilemez hale gelir. Belirli hükümleri, isimleri veya tarihleri bulmak için sayfaları manuel incelemek yavaş, hataya açık ve büyüyen arşivler için pratik değildir. Makine tarafından okunabilir çıktının yokluğu, arama, denetim veya veri düzenleme iş akışlarıyla sonraki entegrasyonu da sınırlar. Taranmış belgeleri güvenilir ve ölçekli biçimde aranabilir metne ve yapılandırılmış meta verilere dönüştürmek için toplu bir OCR hattına ihtiyaç vardır.',
    systemArchitecture:
      'Çıkarıcı, PDF/sayfa işleme için PyMuPDF ve optik karakter tanıma için Tesseract OCR’yi birleştiren bir Python toplu işleme hattı olarak uygulanmıştır. İş akışı; taranmış PDF veya görüntü partilerini alır, gerektiğinde sayfa girdilerini hazırlar, metni elde etmek için OCR çalıştırır ve sonuçları aranabilir metin ile yapılandırılmış JSON meta verisi (kaynak dosya, sayfa sayıları, çıktı referansları gibi) olarak dışa aktarır. Girdi işleme, çıkarma, OCR ve dışa aktarma aşamalarının ayrılması tekrarlanabilir çalıştırmalar ve dosya bazlı hata izolasyonu sağlar. Bu modüler akış, tekil hatalarda tüm partiyi durdurmadan karışık belge kümelerinin tutarlı şekilde dijitalleştirilmesini destekler.',
    databaseAndSecurity:
      'Araç yerel giriş ve çıkış yolları üzerinde çalışır; çıkarılan metin ve JSON meta verilerini daha sonra indeksleme ve incelemeyi desteklemek için düzenli bir çıktı yapısında saklar. Belgeleri varsayılan olarak yerel çalışma zamanı ortamında işlemek, çıkarım sırasında hassas kayıtlar üzerindeki kontrolün korunmasına yardımcı olur. Dosya düzeyinde hata işleme ve doğrulama, bozuk veya desteklenmeyen girdilerin genel parti tamamlanması üzerindeki etkisini azaltır. Çıktılar ile kaynak dosyalar arasındaki net ilişki, çıkarılan içeriğin izlenebilirliğini ve doğrulanmasını destekler.',
    keyFeatures: [
      { title: 'Tarama ve PDF’lerden OCR Çıkarımı', explanation: 'Görüntü tabanlı sayfaları makine tarafından okunabilir metne dönüştürmek için PyMuPDF ve Tesseract OCR kullanır.' },
      { title: 'Büyük Kümeler için Toplu İşleme', explanation: 'Arşiv dijitalleştirmesini hızlandırmak amacıyla tek çalıştırmada birden fazla belgeyi otomatik olarak işler.' },
      { title: 'Aranabilir Metin Çıktıları', explanation: 'Belge içeriklerinin daha hızlı bulunmasını sağlayacak şekilde indekslenip sorgulanabilen metin artefaktları üretir.' },
      { title: 'Yapılandırılmış JSON Meta Verisi', explanation: 'Kaynak referansları ve işleme ayrıntıları gibi bağlamı korumak için metnin yanında meta veriyi dışa aktarır.' },
      { title: 'Dosya Bazlı Hata İzolasyonu', explanation: 'Partinin geri kalanını durdurmadan tekil dosyalardaki çıkarım hatalarını ele alır.' },
      { title: 'İzlenebilir Çıktı Düzeni', explanation: 'İnceleme için çıkarılan içeriği özgün belgelerle ilişkilendiren yapılandırılmış bir sonuç düzeni sağlar.' },
    ],
    operationalImpact:
      'Çıkarıcı, daha önce aranamayan taranmış arşivleri erişilebilir metin tabanlı varlıklara dönüştürerek bilgiye erişim süresini önemli ölçüde azalttı. İçerik aranabilir ve indekslenebilir hale geldikçe sayfa sayfa manuel inceleme ihtiyacı düştü. Yapılandırılmış meta veri, dijitalleştirilmiş kayıtların düzenini ve sonraki kullanımını iyileştirdi. Genel olarak kayıt erişimi, denetim ve bilgi yönetimi iş akışlarında verimlilik arttı.'
  },
  {
    id: 16,
    index: '#16',
    category: 'web-portals',
    stack: ['HTML5', 'Tailwind CSS', 'TypeScript', 'Cloudflare Pages'],
    title: 'Al-Qimma Fabrikası Kurumsal Portalı',
    problemContext:
      'Endüstriyel işletmeler ürünleri, teknik özellikleri ve iletişim kanallarını sunmak için net bir dijital varlığa ihtiyaç duyar; ancak birçok işletme erişimi ve güvenilirliği sınırlayan dağınık veya güncelliğini yitirmiş materyallere dayanır. Hızlı ve iyi yapılandırılmış bir web sitesi olmadan potansiyel müşteriler, sunulanlar ve yetkinlikler hakkında doğru bilgiye cihazlar arasında kolayca ulaşamaz. Yavaş veya karmaşık sayfalar ilk izlenimi zayıflatabilir ve talep dönüşümünü azaltabilir. Ürün bilgisini etkili biçimde iletmek ve doğrudan müşteri etkileşimini mümkün kılmak için hafif, yüksek performanslı bir kurumsal portala ihtiyaç vardır.',
    systemArchitecture:
      'Portal; HTML5, Tailwind CSS ve TypeScript kullanılarak yüksek performanslı statik bir web sitesi olarak geliştirilmiş ve edge dağıtımı ile düşük gecikmeli erişim için Cloudflare Pages üzerinde yayınlanmıştır. İçerik; ürünler, teknik özellikler, kurum bilgileri ve doğrudan talep yolları için yapılandırılmış bölümlere ayrılmış, hızlı yükleme sürelerini desteklemek üzere varlıklar optimize edilmiştir. Mimari, statik sunumu ve minimum istemci tarafı karmaşıklığını tercih ederek sunum stilini (Tailwind) küçük etkileşim davranışlarından (TypeScript) ayırır; bu da sitenin bakımı kolay ve duyarlı kalmasını sağlar. Edge dağıtımı ziyaretçiler için bölgeler arasında tutarlı erişilebilirlik ve performans sunar.',
    databaseAndSecurity:
      'Statik olarak dağıtılan bir site olması nedeniyle portal, temel içerik sunumu için dinamik bir veritabanına ihtiyaç duymaz; bu da saldırı yüzeyini ve operasyonel karmaşıklığı azaltırken güvenilirliği artırır. Varlıklar, güvenli ve dağıtık edge altyapısının avantajlarıyla Cloudflare Pages üzerinden sunulur. İletişim veya talep entegrasyonları, çekirdek sayfa sunumuna bağlı olmadan dağıtım ihtiyaçlarına göre kapsamlandırılıp doğrulanabilir. Bu yaklaşım; sadelik, varlık bütünlüğü ve kamusal kurumsal bilgilere hızlı, kararlı erişime öncelik verir.',
    keyFeatures: [
      { title: 'Hızlı Edge Yayınlı Statik Site', explanation: 'Optimize edilmiş statik varlıkları Cloudflare Pages üzerinden sunarak düşük gecikmeli yükleme ve yüksek erişilebilirlik sağlar.' },
      { title: 'Yapılandırılmış Ürün ve Özellik Vitrini', explanation: 'Endüstriyel ürünleri ve teknik ayrıntıları müşterilerin hızlı değerlendirmesini destekleyen net bir düzende sunar.' },
      { title: 'Duyarlı Çoklu Cihaz Tasarımı', explanation: 'Mobil, tablet ve masaüstü ekranlarda tutarlı ve kullanılabilir sunum için Tailwind CSS kullanır.' },
      { title: 'Hafif ve Performans Odaklı Ön Yüz', explanation: 'Kurumsal sitenin hızını, netliğini ve bakım kolaylığını korumak için gereksiz karmaşıklığı en aza indirir.' },
      { title: 'Doğrudan Talep Kanalları', explanation: 'Potansiyel müşterilerin bilgi talep etmesi veya iletişim başlatması için net yollar sağlar.' },
      { title: 'Bakımı Kolay Statik İçerik Yapısı', explanation: 'Ürün, özellik ve kurum bilgileri güncellemelerini kolaylaştırmak için sayfa ve bileşenleri düzenli şekilde yapılandırır.' },
    ],
    operationalImpact:
      'Portal, fabrikanın dijital varlığını güçlendirdi ve ürün bilgilerinin müşteriler tarafından daha kolay bulunup anlaşılmasını sağladı. Hızlı ve duyarlı sunum kullanıcı deneyimini ve profesyonel algıyı iyileştirdi. Net talep yolları potansiyel müşterilerle daha doğrudan etkileşimi destekledi. Genel olarak endüstriyel yetkinlikleri çevrimiçi sunmak için etkili ve düşük bakım gerektiren bir kanal oluşturdu.'
  },
  {
    id: 17,
    index: '#17',
    category: 'web-portals',
    stack: ['React', 'Vite', 'Cloudflare Pages'],
    title: 'Hukuki Danışmanlık Dijital Kimlik ve Başvuru Portalı',
    problemContext:
      'Hukuk uygulamaları; hizmetleri açıklayan, prosedürleri özetleyen ve müvekkillerin sürtünmesiz danışmanlık talebinde bulunmasını sağlayan net bir dijital kimlikten faydalanır. Bilgi dağınık veya gezinmesi zor olduğunda potansiyel müvekkiller belirsizlik yaşar ve personel tekrarlayan prosedürel sorular alır. Yavaş veya belirsiz web deneyimleri güveni azaltabilir ve etkileşimi düşürebilir. Çalışma alanlarını ve rehberliği açık biçimde sunarken randevu ve danışmanlık alımını kolaylaştıran odaklı bir portala ihtiyaç vardır.',
    systemArchitecture:
      'Portal, hızlı ve bileşen odaklı bir ön yüz için React ve Vite ile geliştirilmiş, güvenilir edge barındırma için Cloudflare Pages üzerinde yayınlanmıştır. Uygulama yapısı; çalışma alanları, prosedür rehberleri ve danışmanlık/randevu talep formlarını netlik ve hızlı erişim için düzenlenmiş bölümler halinde içerir. Mimari, hedefli ve bakımı kolay etkileşim davranışlarıyla hafif istemci tarafı sunumunu vurgular. Bu yaklaşım; performans, duyarlılık ve gelişen hizmet bilgilerinin güncellenme kolaylığı arasında denge kurar.',
    databaseAndSecurity:
      'Temel içerik sunumu, birincil gezinme deneyimi için arka uç karmaşıklığını ve maruziyeti azaltan statik/edge barındırmalı varlıklara dayanır. Form gönderimleri veya entegrasyonlar, veri kalitesini artırmak ve hatalı girdileri azaltmak için istemci tarafı doğrulamayla tanımlı kanallara kapsamlandırılabilir. Tasarım, hassas bilgilerin minimum toplanmasını ve gönderimlerin işlendiği yerlerde güvenli aktarımı tercih eder. Genel olarak portal, danışmanlık taleplerinin kontrollü işlenmesiyle birlikte hızlı ve güvenilir bir kamusal arayüze öncelik verir.',
    keyFeatures: [
      { title: 'Net Çalışma Alanı Sunumu', explanation: 'Ziyaretçilerin uzmanlık alanlarını hızlıca anlaması için hukuki hizmetleri erişilebilir bölümlerde düzenler.' },
      { title: 'Prosedür Rehberleri ve Bilgilendirme', explanation: 'Karmaşayı ve tekrarlayan ön soruları azaltmak için yaygın süreçlere ilişkin yapılandırılmış rehberlik sunar.' },
      { title: 'Danışmanlık ve Randevu Alım Formları', explanation: 'İlk müşteri etkileşimini kolaylaştırmak için temel talep ayrıntılarını düzenli formlarla toplar.' },
      { title: 'Hızlı ve Duyarlı React/Vite Arayüzü', explanation: 'Bilgilere cihazlar genelinde rahat erişim için hafif ve hızlı yüklenen bir deneyim sağlar.' },
      { title: 'Güvenilir Edge Dağıtımı', explanation: 'Tutarlı erişilebilirlik ve performanslı küresel içerik dağıtımı için Cloudflare Pages kullanır.' },
      { title: 'Bakımı Kolay İçerik Yapısı', explanation: 'Hizmet, rehber ve iletişim yollarının güncellenmesini kolaylaştırmak için bölüm ve bileşenleri ayırır.' },
    ],
    operationalImpact:
      'Portal, daha net bir profesyonel dijital kimlik oluşturarak müvekkillerin hizmet ve prosedür bilgilerini keşfetmesini iyileştirdi. Yapılandırılmış rehberler ve alım akışları tekrarlayan soruları azalttı ve ilk iletişimi kolaylaştırdı. Hızlı edge dağıtımı erişilebilirliği ve kullanıcı deneyimini artırdı. Genel olarak daha verimli danışmanlık alımı ve daha güçlü, güven veren bir çevrimiçi varlık desteklendi.'
  },
  {
    id: 18,
    index: '#18',
    category: 'web-portals',
    stack: ['TypeScript', 'React'],
    title: 'Etkileşimli Prosedür Zaman Çizelgesi ve Ücret Hesaplayıcı',
    problemContext:
      'Prosedürel süreleri ve ilgili ücretleri tahmin etmek, hesaplamalar birden fazla dava parametresine bağlıyken ve manuel yapıldığında kafa karıştırıcı ve zaman alıcı olabilir. Statik tablolar veya geçici açıklamalar çoğu zaman tutarsız tahminlere yol açar ve tekrarlanan netleştirmeler gerektirir. Etkileşimli bir araç olmadan kullanıcılar senaryoları hızlıca keşfedemez, personel ise ön hesaplamalara gereksiz zaman harcar. Tanımlı kuralları anında uygulayan istemci taraflı bir hesaplayıcı, kullanıcı girdilerine dayalı net ve hızlı tahminler sunmak için gereklidir.',
    systemArchitecture:
      'Araç, hesaplama mantığı ve prosedürel kuralların tarayıcıda yürütüldüğü tamamen istemci taraflı bir React ve TypeScript uygulaması olarak geliştirilmiştir. Kullanıcının sağladığı parametreler, tahmini zaman çizelgesi ve ücret dökümünü türeten tipli hesaplama fonksiyonlarına ve koşullu mantığa akar; sonuçlar arayüzde anında görüntülenir. Mimari, modüler bileşenler ve durum yönetimi aracılığıyla hesaplamayı sunumdan ayırarak girdiler değiştikçe duyarlı güncellemeler sağlar. Temel hesaplamalar için arka uç bağımlılığından kaçınmak, aracın hızlı, taşınabilir ve dağıtımı kolay olmasını sağlar.',
    databaseAndSecurity:
      'Temel hesaplamalar, kullanıcı girdilerini sunucu tarafı bir veritabanına kalıcı olarak yazmadan tamamen tarayıcıda çalışır; bu da dava ile ilişkili verilerin gereksiz aktarımını azaltır. İstemci tarafı doğrulama, girdilerin beklenen aralık ve biçimde olmasını sağlayarak üretilen tahminlerin güvenilirliğini artırır. Güvenlik duruşu, deterministik yerel hesaplamaya odaklanan minimum çalışma zamanı yüzeyinden faydalanır. Bu yaklaşım, uygulanan kuralların netliği ve tutarlılığı korunurken gizlilik dostu, düşük gecikmeli tahmin sağlamaya öncelik verir.',
    keyFeatures: [
      { title: 'Anında İstemci Tarafı Hesaplamalar', explanation: 'Ağ gecikmesi olmadan anlık geri bildirim için zaman çizelgesi ve ücret tahminlerini yerel olarak tarayıcıda hesaplar.' },
      { title: 'Parametre Güdümlü Etkileşimli Girdiler', explanation: 'Kullanıcılar dava parametrelerini ayarladıkça sonuçları gerçek zamanlı güncelleyerek hızlı senaryo keşfine imkân verir.' },
      { title: 'Net Tahmin Dökümü', explanation: 'Prosedürel süreleri ve ücret bileşenlerini daha iyi anlaşılması için yapılandırılmış ve okunabilir biçimde sunar.' },
      { title: 'Girdi Doğrulama ve Koruma Kontrolleri', explanation: 'Geçersiz girdileri azaltmak ve tahmin güvenilirliğini artırmak için değerleri ve zorunlu alanları kontrol eder.' },
      { title: 'Temel Mantık için Arka Uç Gerektirmez', explanation: 'Sunucu altyapısından bağımsız çalışarak dağıtımı basitleştirir ve erişilebilirliği artırır.' },
      { title: 'Bakımı Kolay Tipli Hesaplama Mantığı', explanation: 'Prosedürel gereksinimler değiştikçe güncellemeyi kolaylaştırmak için kuralları modüler TypeScript içinde uygular.' },
    ],
    operationalImpact:
      'Hesaplayıcı, manuel hesaplama olmadan hızlı ve tutarlı ön tahminler sağladı. Prosedürel süreleri ve olası maliyetleri inceleyen kullanıcılar için şeffaflığı artırdı. Personelin tekrarlayan tahmin görevlerine harcadığı süre azaldı ve girdi doğrulaması önlenebilir hesaplama hatalarını düşürdü. Genel olarak erken aşama bilgilendirmesi kolaylaştı ve prosedürel bilginin netliği iyileşti.'
  },
  {
    id: 19,
    index: '#19',
    category: 'web-portals',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
    title: 'Edge Üzerinde Yayınlanan Üç Dilli Mühendislik Portföyü',
    problemContext:
      'Derin teknik vaka çalışmalarını birden fazla dilde ve yazdırmaya hazır bir formatta sunan geniş bir mühendislik portföyünü göstermek, basit bir tanıtım sayfasından fazlasını gerektirir. Zorluk; hızlı gezinme, yapılandırılmış proje ayrıntısı, doğru yönlendirme ile Arapça/İngilizce/Türkçe desteği ve performans ile netlikten ödün vermeden tutarlı bir yazdırılabilir dosya sağlamaktır. Parçalı içerik veya yüzeysel özetler, gözden geçirenlerin gerçek mühendislik derinliğini değerlendirmesini zorlaştırır. 23 üretim odaklı projeyi çok dilli erişim, keşfedilebilirlik ve profesyonel dokümantasyonla birleştirmek için hafif, edge üzerinde yayınlanan bir platform gerekir.',
    systemArchitecture:
      'Portföy; edge performansı için Cloudflare Pages üzerinde yayınlanan bir React, TypeScript ve Tailwind CSS uygulaması olarak geliştirilmiştir. Proje verileri, profil, temel yetkinlikler, filtreler/arama, proje kartları, ayrıntılı modal/akordeon görünümleri ve özel A4 yazdırma düzeni için arayüz bileşenleri tarafından tüketilen dile özgü yapılandırılmış vaka çalışmaları halinde organize edilmiştir. Durum ve bağlam (context) yönetimi; dil, yön (RTL/LTR) ve tema tercihlerini tutarlı bir deneyim sunacak şekilde ele alır. Mimari; veri, sunum ve etkileşim mantığını ayırarak ölçeklenebilir içerik genişlemesini ve gezinme ile yazdırma modlarında tutarlı görüntülemeyi sağlar.',
    databaseAndSecurity:
      'Platform, çalışma zamanı veritabanından kaçınarak arka uç karmaşıklığını ve maruziyeti azaltan, uygulamayla birlikte paketlenmiş yapılandırılmış statik içerik üzerinde çalışır. Dil ve tema gibi kullanıcı tercihleri, kişisel veri aktarımı olmadan kullanılabilirliği artırmak için tarayıcıda yerel olarak saklanır. Cloudflare Pages üzerinden edge dağıtımı, statik varlıkların güvenilir ve güvenli şekilde sunulmasını sağlar. Bu yaklaşım; minimum saldırı yüzeyi, yüksek erişilebilirlik ve hızlı erişime öncelik verirken zengin çok dilli ve yazdırmaya hazır sunumu destekler.',
    keyFeatures: [
      { title: 'RTL/LTR Destekli Üç Dilli Arayüz', explanation: 'Doğru dil ve metin yönü yönetimiyle Arapça, İngilizce ve Türkçe arasında anında geçiş sağlar.' },
      { title: 'Anında Arama ve Kategori Filtreleme', explanation: 'Duyarlı istemci tarafı filtreleme ile 23 projeyi alan, teknoloji ve anahtar kelimelere göre verimli keşfi mümkün kılar.' },
      { title: 'Derin Vaka Çalışması Proje Görünümleri', explanation: 'Sorun, mimari, güvenlik/veri, özellikler ve etki ayrıntılarını kartlar, akordeonlar ve modallar aracılığıyla yapılandırılmış biçimde sunar.' },
      { title: 'Profesyonel A4 Yazdırma Dosyası Modu', explanation: 'PDF veya kâğıt çıktısı için tüm proje ayrıntılarını eksiksiz ve kesilmeden işleyen özel bir yazdırma düzeni uygular.' },
      { title: 'Cloudflare Pages Üzerinde Edge Dağıtımı', explanation: 'Bölgeler arasında hızlı yükleme süreleri ve güvenilir erişilebilirlik için statik varlıkları edge üzerinden sunar.' },
      { title: 'Temalı ve Etkileşimli Sunum', explanation: 'Okunabilirlik ve performansı korurken koyu/açık modları ve etkileşimli arka planı destekler.' },
    ],
    operationalImpact:
      'Portföy, kapsamlı mühendislik çalışmalarının üç dilde net ve yüksek performanslı bir sunumunu sağladı. Gözden geçirenler arama, filtreleme ve genişletilebilir ayrıntı görünümleri aracılığıyla ilgili projeleri hızla keşfedip inceleyebilir. Yazdırma dosyası, tüm proje setinin profesyonel çevrimdışı paylaşımını mümkün kılar. Genel olarak profesyonel görünürlüğü güçlendirdi ve teknik derinliği yapılandırılmış, erişilebilir bir biçimde iletti.'
  },
  {
    id: 20,
    index: '#20',
    category: 'cli-tooling',
    stack: ['Rust', 'Clap', 'SQLite'],
    title: 'Veritabanı Şema Taşıma ve Anlık Görüntü CLI Aracı',
    problemContext:
      'Veritabanı şemalarını ortamlar ve sürümler arasında manuel olarak geliştirmek, değişiklikler tutarsız uygulandığında veya kontrollü bir taşıma geçmişi olmadığında risklidir. Taşıma öncesi yedek alınmadan yapılan doğrudan değişiklikler, bir taşıma başarısız olduğunda veri kaybı veya uyumluluk bozulması olasılığını artırır. Adımları elle tekrarlamak, aynı dönüşümlerin her yerde aynı sırayla çalıştırılacağını garanti etmeyi de zorlaştırır. Yerel SQLite veritabanlarında herhangi bir yapısal değişiklikten önce deterministik taşımalar yürüten ve güvenlik anlık görüntüleri alan güvenilir bir CLI aracına ihtiyaç vardır.',
    systemArchitecture:
      'Araç, argüman ayrıştırma ve net bir komut arayüzü için Clap kullanan bir Rust komut satırı uygulaması olarak geliştirilmiştir. İş akışı; sıralı taşıma tanımlarını okur, hedef SQLite veritabanındaki mevcut şema durumunu inceler, taşıma öncesi bir anlık görüntü oluşturur ve ardından taşımaları deterministik biçimde sıralı uygularken ortaya çıkan durumu kaydeder. Tasarım; CLI etkileşimi, taşıma yürütme mantığı ve SQLite veri erişimini ayırarak tekrarlanabilir çalıştırmalar ve öngörülebilir sonuçlar sağlar. Güvenilirlik, açık durum bildirimi ve taşıma adımlarının güncellemeler boyunca güvenli işlenmesine vurgu yapılır.',
    databaseAndSecurity:
      'CLI, sıralamayı koruyan ve tutarlı şema durum takibini sürdüren kontrollü taşıma adımlarıyla SQLite veritabanları üzerinde çalışır. Güncellemelerden önce alınan otomatik anlık görüntüler, taşıma hatayla karşılaşırsa veya beklenmeyen sonuçlar üretirse kurtarma noktası sağlar. Operasyonel güvenlik; girdi/yol doğrulaması ve manuel şema düzenlemelerine kıyasla insan hatasını azaltan deterministik davranışla desteklenir. Bu yaklaşım, yerelde saklanan verilerin bütünlüğünü korurken şema evriminde güveni artırır.',
    keyFeatures: [
      { title: 'Deterministik Sıralı Taşımalar', explanation: 'Çalıştırmalar ve ortamlar arasında veritabanı durumunu tutarlı tutmak için şema değişikliklerini sabit, tekrarlanabilir bir sırayla yürütür.' },
      { title: 'Güncelleme Öncesi Veritabanı Anlık Görüntüleri', explanation: 'Gerektiğinde güvenli geri alma veya kurtarma imkânı sağlamak için taşımadan önce SQLite veritabanlarının yedek anlık görüntülerini oluşturur.' },
      { title: 'Clap ile Net CLI Arayüzü', explanation: 'Taşıma ve yönetim iş akışlarını kolaylaştırmak için yapılandırılmış komutlar, argümanlar ve yardım çıktısı sunar.' },
      { title: 'Taşıma Durumu Takibi', explanation: 'Şema durumunu doğrulamak ve adımların istenmeden yeniden yürütülmesini önlemek için uygulanan taşımaları kaydeder.' },
      { title: 'Güvenilir Yüksek Performanslı Rust Yürütme', explanation: 'Kararlı dosya ve veritabanı işlemleri için Rust’ın güvenlik ve performans özelliklerinden yararlanır.' },
      { title: 'Manuel Değişiklik Riskinin Azaltılması', explanation: 'Geçici şema güncellemeleriyle ilişkili hataları en aza indirmek için doğrulama ve yürütme adımlarını otomatikleştirir.' },
    ],
    operationalImpact:
      'CLI, deterministik taşımaları otomatik güncelleme öncesi anlık görüntülerle birleştirerek şema güncellemelerinin riskini azalttı. Geliştirme ve bakım sırasında SQLite şema evrimini yönetmede güven ve tutarlılığı artırdı. Tekrarlayan manuel güncelleme prosedürlerine harcanan süre ve ilgili hata oranları düştü. Genel olarak veritabanı değişiklikleri için daha güvenli ve disiplinli bir iş akışı sağladı.'
  },
  {
    id: 21,
    index: '#21',
    category: 'cli-tooling',
    stack: ['TypeScript', 'Rust'],
    title: 'Arapça Metin Normalizasyonu ve Arama Tokenizer Kütüphanesi',
    problemContext:
      'Arapça metin arama kalitesi, karakter biçimi varyasyonları (farklı elif/ye/te marbuta temsilleri gibi) ve harekelerin varlığı nedeniyle sıklıkla düşer; bu durum ilgili belgelerin tam dize eşlemesiyle kaçırılmasına neden olur. İndeksleme ve sorgulama bu farklılıkları normalize etmediğinde, anlamsal olarak eşdeğer terimler için bile kapsam (recall) azalır. Bu, belge arşivlerinden uygulama içi aramaya kadar Arapça içerik üzerinde etkili erişime dayanan uygulamaları etkiler. Biçimleri standartlaştırmak ve arama tutarlılığını iyileştirmek için hafif, yüksek performanslı bir normalizasyon ve tokenizasyon kütüphanesi gerekir.',
    systemArchitecture:
      'Kütüphane, indeksleme ve arama hatlarına entegre edilebilen, TypeScript ve Rust’u birleştiren hafif bir metin işleme modülü olarak tasarlanmıştır. İşleme akışı ham Arapça metni alır, normalizasyon kurallarını uygular (yaygın karakter varyantlarını birleştirme ve uygun olduğunda hareke/esas olmayan işaretleri kaldırma) ve indeksleme ile sorgulama için optimize edilmiş tokenlar üretir. Normalizasyon ve tokenizasyon aşamalarının ayrılması, kütüphanenin farklı arama motorlarına veya veri iş akışlarına gömülmesini sağlar. Tasarım, büyük metin hacimleri üzerinde sık çalıştırılabilmesi için deterministik davranış ve performansa öncelik verir.',
    databaseAndSecurity:
      'Kütüphane, metin hatları içinde bir işleme katmanı olarak çalışır ve kendi kalıcı depolamasını gerektirmez; veri sahipliği entegre eden sisteme bırakılır. Güvenilirlik, deterministik normalizasyon kuralları ve çeşitli metinler üzerinde öngörülebilir davranan girdi işleme ile desteklenir. Verimli uygulama (uygun yerlerde Rust bileşenleri dahil) yüksek hacimli işleme sırasında kaynak kullanımını kontrol altında tutmaya yardımcı olur. Bu yaklaşım, ağır operasyonel bağımlılıklar eklemeden veya veri saldırı yüzeyini genişletmeden erişim kalitesini artırır.',
    keyFeatures: [
      { title: 'Arapça Karakter Varyant Normalizasyonu', explanation: 'Sorgular ile indekslenmiş içerik arasındaki eşleşme oranlarını artırmak için yaygın elif, ye ve te marbuta biçimlerini birleştirir.' },
      { title: 'Hareke ve İşaret Temizleme', explanation: 'Aranabilir metin yapısını korurken tam eşleşmeyi zorlaştıran şekilsel varyasyonu azaltmak için hareke/tatvil kaynaklı farklılıkları kaldırır.' },
      { title: 'Arama Odaklı Token Üretimi', explanation: 'Daha tutarlı ve etkili Arapça sorguları desteklemek için indeksleme hatlarına uygun tokenlar üretir.' },
      { title: 'Hafif Yüksek Performanslı İşleme', explanation: 'Sık veya büyük ölçekli metin iş yükleri için hızlı normalizasyon sağlamak üzere TypeScript ve Rust’u birleştirir.' },
      { title: 'Bileştirilebilir Hat Entegrasyonu', explanation: 'Normalizasyon ve tokenizasyon adımlarını ayırarak kütüphanenin farklı arama ve depolama sistemlerine bağlanmasını sağlar.' },
      { title: 'Geliştirilmiş Arapça Arama Kapsamı', explanation: 'Ortografik varyasyonun etkisini azaltarak ilgili içeriğin daha güvenilir şekilde bulunmasına yardımcı olur.' },
    ],
    operationalImpact:
      'Kütüphane, yaygın karakter ve hareke farklılıklarının eşleşme üzerindeki etkisini azaltarak Arapça arama kapsamını iyileştirdi. Arapça içeriğin daha tutarlı indekslenmesini sağlayarak ilgili bilgilere erişimi kolaylaştırdı. Hafif performans özellikleri, önemli ek yük olmadan birden fazla uygulamaya entegrasyona imkân verdi. Genel olarak Arapça veri iş akışlarında arama kalitesi ve kullanıcı deneyimi geliştirildi.'
  },
  {
    id: 22,
    index: '#22',
    category: 'cli-tooling',
    stack: ['Node.js', 'Express', 'SVG'],
    title: 'Doğrulama QR ve Makbuz Damgası Mikroservisi',
    problemContext:
      'Makbuz düzenleme ve arşivlenmiş işlem iş akışları, bir belgeyi kaynak kaydıyla ilişkilendiren hızlı ve güvenilir doğrulama işaretlerinden faydalanır. Yalnızca düz metin tanımlayıcılara dayanmak manuel kontrolleri yavaşlatır ve yazım veya arama hatası olasılığını artırır. Tutarsız veya düşük kaliteli kod üretimi, taranması zor ya da baskı düzenlerine yerleştirilmesi güç işaretlere yol açabilir. Makbuz ve belge hatlarına kolayca entegre edilebilen standart, yüksek çözünürlüklü doğrulama QR kodları üretmek için özel bir mikroservise ihtiyaç vardır.',
    systemArchitecture:
      'Servis, işlem veya doğrulama yüklerini HTTP üzerinden alan ve yüksek DPI QR kodlarını SVG olarak döndüren bir Node.js ve Express REST mikroservisi olarak uygulanmıştır. İstek akışı; girdileri doğrular, sağlanan doğrulama verisini bir QR yüküne kodlar, ölçeklenebilir bir SVG çıktısı üretir ve makbuzlar ile arşiv belgelerine gömülebilir bir artefakt olarak yanıtlar. Taşıma/API kaygılarını üretim mantığından ayırmak, servisin birden fazla düzenleyici sistemle basitçe entegre edilmesini sağlar. SVG çıktısı, ek dönüştürme adımları olmadan ekran ve baskı bağlamlarında net görüntüleme sunar.',
    databaseAndSecurity:
      'Mikroservis, sağlanan girdilerden isteğe bağlı üretime odaklanır ve işlem içeriklerinin kalıcı depolanmasını zorunlu kılmaz; bu da veri saklama kapsamını azaltır. İstek doğrulama ve yük kısıtları hatalı girdileri ve kötüye kullanımı sınırlamaya yardımcı olur. Dağıtımda REST arayüzü, entegre edilen ortama uygun kimlik doğrulama ve erişim kontrolleriyle korunabilir. Ölçeklenebilir SVG üretimi, işleme yolunu basit ve öngörülebilir tutarken kaliteyi korur.',
    keyFeatures: [
      { title: 'Yüksek DPI SVG QR Üretimi', explanation: 'Makbuzlara ve resmi belgelere gömüldüğünde net kalan, ölçeklenebilir ve baskıya hazır doğrulama kodları üretir.' },
      { title: 'Basit REST Entegrasyon API’si', explanation: 'Makbuz ve arşivleme sistemlerinin kodları minimum çabayla talep edip yerleştirmesi için net HTTP uç noktaları sunar.' },
      { title: 'Girdi Doğrulama ve Yük İşleme', explanation: 'Doğru QR kodlamasını sağlamak ve geçersiz ya da kullanılamaz üretim isteklerini azaltmak için gelen verileri kontrol eder.' },
      { title: 'Belgeler için Gömülebilir Çıktı', explanation: 'Ek dönüşüm gerektirmeden dijital veya basılı şablonlara doğrudan dahil edilebilecek SVG artefaktları döndürür.' },
      { title: 'Hafif Node.js/Express Servisi', explanation: 'Servis odaklı yapılarda dağıtımı ve işletimi kolay, küçük ve bakımı yapılabilir bir ayak izi korur.' },
      { title: 'Standartlaştırılmış Doğrulama İşaretleri', explanation: 'Farklı işlem belgelerinde doğrulama uygulamalarını birleştirmek için tutarlı QR üretimi sağlar.' },
    ],
    operationalImpact:
      'Mikroservis, makbuzlara ve arşivlenmiş işlemlere güvenilir doğrulama işaretleri ekleme sürecini kolaylaştırdı. Yüksek kaliteli SVG çıktısı resmi belgelerde taranabilirliği ve baskı netliğini iyileştirdi. Standartlaştırılmış üretim arayüzü sistemler arasında yinelenen uygulama çabasını azalttı. Genel olarak belge-kayıt doğrulamasını güçlendirdi ve doğrulama iş akışlarını daha hızlı ve tutarlı hale getirdi.'
  },
  {
    id: 23,
    index: '#23',
    category: 'cli-tooling',
    stack: ['Rust', 'HTTP', 'mDNS'],
    title: 'Sıfır Yapılandırmalı Yerel Ağ Dosya Aktarım CLI Aracı',
    problemContext:
      'Yerel ağdaki cihazlar arasında dosya aktarmak, manuel IP yapılandırması, paylaşılan klasör izinleri veya basit LAN aktarımları için gereksiz üçüncü taraf servisler gibi zahmetli kurulum adımlarını sıkça gerektirir. Kullanılabilir eşleri keşfetmek ve hızlı, doğrudan bir aktarım başlatmak; özellikle karışık masaüstü ve mobil ortamlarda yavaş ve hataya açık olabilir. Yerel paylaşım için harici veya bulut aracılarına güvenmek, gereksiz gizlilik ve gecikme kaygıları doğurabilir. Eşleri otomatik keşfeden ve dosyaları yerel ağ içinde hızlıca taşıyan sıfır yapılandırmalı bir CLI aracına ihtiyaç vardır.',
    systemArchitecture:
      'Araç, yerel ağda otomatik eş keşfi için mDNS’yi ve doğrudan, yüksek hızlı dosya aktarımı için HTTP’yi birleştiren çok platformlu bir Rust komut satırı uygulaması olarak geliştirilmiştir. İş akışı; mDNS üzerinden kullanılabilir cihazları duyurur/keşfeder, kullanıcının hedef seçmesine izin verir ve dosyaları kontrollü yerel yollara göndermek/almak için bir HTTP aktarım oturumu kurar. Mimari; keşif, aktarım ve CLI etkileşim katmanlarını ayırarak önceden manuel ağ yapılandırması olmadan basit, komut güdümlü bir deneyim sağlar. Bu tasarım, yerel aktarımlar için iyi bilinen protokollerden yararlanırken işlemleri doğrudan ve şeffaf tutar.',
    databaseAndSecurity:
      'Araç yerel ağ sınırları içinde çalışır ve tipik LAN kullanımında harici aracılar gerektirmeden eşler arası benzeri aktarımlar gerçekleştirir. Aktarım işleme, yanlış dosya yerleşimini azaltmak için açık oturum akışını ve kullanıcı tarafından yönlendirilen hedef yolları vurgular. Maruziyet; ana makine/ağ kontrolleri ve aracın yalnızca gerektiğinde çalıştırılmasıyla yönetilebilirken, protokol yığınının sadeliği operasyonel karmaşıklığı sınırlar. Yaklaşım, aktarılan veriler üzerinde kullanıcı kontrolünü ve minimum kurulumla pratik, hızlı yerel paylaşımı önceliklendirir.',
    keyFeatures: [
      { title: 'mDNS ile Otomatik Eş Keşfi', explanation: 'Manuel IP girişi veya ön yapılandırma olmadan yerel ağdaki kullanılabilir cihazları bulur.' },
      { title: 'HTTP Üzerinden Yüksek Hızlı Aktarım', explanation: 'LAN içinde doğrudan dosya gönderme ve alma için basit ve verimli bir aktarım yolu kullanır.' },
      { title: 'Sıfır Yapılandırma ile Çalışma', explanation: 'Yerel ortamlarda aktarımları hızlı başlatmak için kurulum adımlarını en aza indirir.' },
      { title: 'Çok Platformlu Rust CLI', explanation: 'Sistemler arasında güçlü performans özellikleriyle hafif ve güvenilir bir komut satırı aracı sunar.' },
      { title: 'Ayrıştırılmış Keşif ve Aktarım Katmanları', explanation: 'Eş bulmayı dosya aktarımı ve oturum yönetiminden izole eden net bir mimari korur.' },
      { title: 'Kullanıcı Kontrollü Alım Yolları', explanation: 'Aktarımları düzenli ve öngörülebilir tutmak için gelen dosyaların nereye kaydedileceğinin açıkça yönetilmesini sağlar.' },
    ],
    operationalImpact:
      'CLI, yaygın LAN aktarım görevlerinden karmaşık kurulum ve gereksiz aracı servisleri kaldırarak yerel dosya paylaşımını basitleştirdi. Otomatik keşif ve doğrudan HTTP aktarımı, cihazlar arasında dosya taşımanın süresini ve sürtünmesini azalttı. Kullanıcılar tekrarlanan yerel aktarımlar için hızlı ve kontrol edilebilir bir iş akışı kazandı. Genel olarak yerel ağda cihazlar arası dosya değişiminde günlük verimlilik ve kolaylık arttı.'
  },
]
