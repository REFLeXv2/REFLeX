import { useEffect, useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'

type NodeId = 'ui' | 'ipc' | 'core' | 'sqlite' | 'queue'

const copy = {
  ar: {
    demo: 'مخطط معماري تفاعلي يوضح تدفق البيانات في تطبيق Rust + Tauri يعمل دون اتصال (SQLite WAL) مع طابور Webhook وإعادة محاولات أسية. انقر على أي عقدة لعرض المواصفات وتمييز مسارات البيانات.',
    specs: 'المواصفات التقنية', flow: 'مسار البيانات النشط', simulate: 'محاكاة كتابة دون اتصال ومزامنة', step: 'الخطوة',
    idle: 'انقر على عقدة لعرض التفاصيل التقنية.',
    steps: ['كتابة محلية في واجهة المستخدم', 'تمرير الحمولة عبر جسر Tauri IPC (تسلسل آمن)', 'معالجة في نواة Rust/ Tokio مع ضمانات سلامة الذاكرة', 'التزام في SQLite بوضع WAL (موثوق دون اتصال)', 'إدراج في طابور Webhook للمزامنة مع إعادة محاولة أسية'],
  },
  en: {
    demo: 'Interactive architecture diagram showing data flow in an offline-first Rust + Tauri app (SQLite WAL) with an outbound Webhook queue and exponential retry backoff. Click a node to view specs and highlight data paths.',
    specs: 'Technical specs', flow: 'Active data-flow path', simulate: 'Simulate Offline Write & Sync', step: 'Step',
    idle: 'Click a node to view its technical details.',
    steps: ['Local write in Frontend UI', 'Payload crosses Tauri IPC bridge (safe serialization)', 'Processed in Rust async core / Tokio with memory-safety guarantees', 'Committed to encrypted SQLite WAL (durable offline)', 'Enqueued to outbound Webhook queue for sync with exponential backoff'],
  },
  tr: {
    demo: 'Çevrimdışı öncelikli Rust + Tauri uygulamasında (SQLite WAL) giden Webhook kuyruğu ve üstel yeniden deneme ile veri akışını gösteren etkileşimli mimari diyagram. Ayrıntıları görmek ve veri yollarını vurgulamak için bir düğüme tıklayın.',
    specs: 'Teknik özellikler', flow: 'Aktif veri akışı yolu', simulate: 'Çevrimdışı Yazma ve Senkronizasyonu Simüle Et', step: 'Adım',
    idle: 'Teknik ayrıntıları görmek için bir düğüme tıklayın.',
    steps: ['Ön uç arayüzünde yerel yazma', 'Yük Tauri IPC köprüsünden geçer (güvenli serileştirme)', 'Rust async çekirdeği / Tokio içinde bellek güvenliği garantileriyle işlenir', 'Şifreli SQLite WAL\'a işlenir (çevrimdışı dayanıklılık)', 'Üstel geri çekilme ile senkronizasyon için giden Webhook kuyruğuna eklenir'],
  },
}

const NODES: { id: NodeId; x: number; y: number; label: { ar: string; en: string; tr: string }; specs: { ar: string[]; en: string[]; tr: string[] } }[] = [
  {
    id: 'ui', x: 12, y: 50, label: { ar: 'واجهة المستخدم', en: 'Frontend UI', tr: 'Ön Uç Arayüzü' },
    specs: {
      ar: ['واجهة React/Vite سريعة الاستجابة', 'تحقق من المدخلات محلياً', 'حالة تفاؤلية مع طابور عمليات معلقة'],
      en: ['Responsive React/Vite interface', 'Local input validation', 'Optimistic state with pending operations queue'],
      tr: ['Duyarlı React/Vite arayüzü', 'Yerel girdi doğrulama', 'Bekleyen işlem kuyruğu ile iyimser durum'],
    },
  },
  {
    id: 'ipc', x: 32, y: 50, label: { ar: 'جسر Tauri IPC', en: 'Tauri IPC Bridge', tr: 'Tauri IPC Köprüsü' },
    specs: {
      ar: ['تسلسل/إلغاء تسلسل آمن للأوامر والأحداث', 'عزل قوي بين الويب والنواة الأصلية', 'واجهات أوامر محددة الصلاحيات (Capabilities)'],
      en: ['Safe command/event serialization', 'Strong isolation between webview and native core', 'Capability-scoped command interfaces'],
      tr: ['Güvenli komut/olay serileştirmesi', 'Web görünümü ve yerel çekirdek arasında güçlü izolasyon', 'Yetenek kapsamlı komut arayüzleri'],
    },
  },
  {
    id: 'core', x: 52, y: 50, label: { ar: 'نواة Rust / Tokio', en: 'Rust Async Core / Tokio', tr: 'Rust Async Çekirdek / Tokio' },
    specs: {
      ar: ['ضمانات سلامة الذاكرة دون GC', 'تنفيذ غير متزامن عالي الإنتاجية عبر Tokio', 'تحقق من قواعد العمل وتوقيع الحمولة'],
      en: ['Memory-safety guarantees without GC', 'High-throughput async execution via Tokio', 'Business-rule validation and payload signing'],
      tr: ['GC olmadan bellek güvenliği garantileri', 'Tokio ile yüksek verimli asenkron yürütme', 'İş kuralı doğrulama ve yük imzalama'],
    },
  },
  {
    id: 'sqlite', x: 78, y: 30, label: { ar: 'SQLite مشفر (WAL)', en: 'Encrypted SQLite WAL', tr: 'Şifreli SQLite WAL' },
    specs: {
      ar: ['تسجيل WAL لضمان المتانة والكتابة دون اتصال', 'تشفير على مستوى التخزين للبيانات الحساسة', 'معاملات ذرية واسترجاع بعد الأعطال'],
      en: ['WAL journaling for durability and offline writes', 'At-rest encryption for sensitive data', 'Atomic transactions and crash recovery'],
      tr: ['Dayanıklılık ve çevrimdışı yazmalar için WAL günlüğü', 'Hassas veriler için durağan şifreleme', 'Atomik işlemler ve kilitlenme kurtarma'],
    },
  },
  {
    id: 'queue', x: 78, y: 70, label: { ar: 'طابور Webhook', en: 'Outbound Webhook Queue', tr: 'Giden Webhook Kuyruğu' },
    specs: {
      ar: ['تسليم مضمون عند استعادة الاتصال', 'إعادة محاولة أسية مع حدود وJitter', 'سجل حالات التسليم والتأكد (Idempotency)'],
      en: ['Guaranteed delivery when connectivity returns', 'Exponential retry backoff with bounds and jitter', 'Delivery state tracking and idempotency'],
      tr: ['Bağlantı döndüğünde garantili teslimat', 'Sınırlar ve jitter ile üstel yeniden deneme', 'Teslimat durumu takibi ve idempotency'],
    },
  },
]

const EDGES: { from: NodeId; to: NodeId }[] = [
  { from: 'ui', to: 'ipc' },
  { from: 'ipc', to: 'core' },
  { from: 'core', to: 'sqlite' },
  { from: 'core', to: 'queue' },
  { from: 'queue', to: 'ipc' },
]

const PATH: NodeId[] = ['ui', 'ipc', 'core', 'sqlite', 'queue']

function edgeKey(a: NodeId, b: NodeId) { return `${a}-${b}` }

export function ArchitectureExplorerLab() {
  const { lang } = useApp()
  const c = copy[lang]
  const [active, setActive] = useState<NodeId | null>(null)
  const [simStep, setSimStep] = useState(-1)

  useEffect(() => {
    if (simStep < 0) return
    if (simStep >= PATH.length) return
    const t = setTimeout(() => setSimStep((s) => s + 1), 900)
    return () => clearTimeout(t)
  }, [simStep])

  const activeEdges = useMemo(() => {
    const set = new Set<string>()
    if (active) {
      EDGES.forEach((e) => { if (e.from === active || e.to === active) set.add(edgeKey(e.from, e.to)) })
    }
    if (simStep >= 0) {
      for (let i = 0; i < Math.min(simStep, PATH.length - 1); i++) set.add(edgeKey(PATH[i], PATH[i + 1] as NodeId))
      if (simStep >= PATH.length) set.add(edgeKey('core', 'queue'))
    }
    return set
  }, [active, simStep])

  const activeNodes = useMemo(() => {
    const set = new Set<NodeId>()
    if (active) {
      set.add(active)
      EDGES.forEach((e) => { if (e.from === active) set.add(e.to); if (e.to === active) set.add(e.from) })
    }
    if (simStep >= 0) PATH.slice(0, Math.min(simStep + 1, PATH.length)).forEach((n) => set.add(n))
    return set
  }, [active, simStep])

  const selected = active ? NODES.find((n) => n.id === active) : null
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NodeId, (typeof NODES)[number]>

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{c.demo}</p>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
          <svg viewBox="0 0 100 100" className="h-auto max-h-80 w-full max-w-full sm:h-80" preserveAspectRatio="xMidYMid meet">
            {EDGES.map((e) => {
              const a = byId[e.from], b = byId[e.to]
              const on = activeEdges.has(edgeKey(e.from, e.to))
              return (
                <line key={edgeKey(e.from, e.to)} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={on ? '#0d9488' : '#94a3b8'} strokeWidth={on ? 1.8 : 0.8} strokeOpacity={on ? 1 : 0.5}
                  markerEnd="url(#arrow)" />
              )
            })}
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
              </marker>
            </defs>
            {NODES.map((n) => {
              const on = activeNodes.has(n.id)
              const sel = active === n.id
              return (
                <g key={n.id} onClick={() => { setActive(n.id); setSimStep(-1) }} className="cursor-pointer">
                  <rect x={n.x - 11} y={n.y - 7} width={22} height={14} rx={3}
                    fill={sel ? '#0d9488' : on ? 'rgba(13,148,136,0.15)' : 'rgba(148,163,184,0.12)'}
                    stroke={on ? '#0d9488' : '#94a3b8'} strokeWidth={sel ? 1.2 : 0.8} />
                  <text x={n.x} y={n.y + 1} textAnchor="middle" fontSize="3.2" fill={sel ? '#ffffff' : 'currentColor'} className="fill-stone-800 dark:fill-stone-100" style={{ pointerEvents: 'none' }}>
                    {n.label[lang].length > 18 ? n.label.en : n.label[lang]}
                  </text>
                </g>
              )
            })}
          </svg>
          <button type="button" onClick={() => { setActive(null); setSimStep(0) }} className="mt-2 w-full rounded-lg border border-teal-600/30 bg-teal-600/15 px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-600 hover:text-white dark:text-teal-200">
            {c.simulate}
          </button>
          {simStep >= 0 && (
            <div className="mt-2 rounded border border-[#DCD6CA] bg-white/60 p-2 text-xs dark:border-slate-800 dark:bg-slate-950/30">
              <div className="font-semibold text-teal-700 dark:text-teal-300">{c.step} {Math.min(simStep + 1, c.steps.length)} / {c.steps.length}</div>
              <div className="mt-1 text-stone-700 dark:text-stone-300">{c.steps[Math.min(simStep, c.steps.length - 1)]}{simStep >= c.steps.length ? ' — ✓' : '…'}</div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">{c.specs}</div>
          {selected ? (
            <div className="mt-2">
              <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">{selected.label[lang]}</div>
              <ul className="mt-2 list-disc space-y-1.5 ps-5 text-sm text-stone-700 dark:text-stone-300">
                {selected.specs[lang].map((s, i) => <li key={i}>{s}</li>)}
              </ul>
              <div className="mt-3 text-xs font-semibold text-stone-700 dark:text-stone-300">{c.flow}</div>
              <p className="mt-1 text-xs text-stone-600 dark:text-[var(--color-muted-dark)]">
                {EDGES.filter((e) => e.from === selected.id || e.to === selected.id).map((e) => `${byId[e.from].label.en} → ${byId[e.to].label.en}`).join(' · ')}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-stone-500 dark:text-[var(--color-muted-dark)]">{c.idle}</p>
          )}
        </div>
      </div>
    </div>
  )
}
