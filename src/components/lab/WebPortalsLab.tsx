import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'

const shell = 'rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40'
const input = 'min-h-[42px] w-full rounded border border-[#DCD6CA] bg-white/70 px-2 py-1.5 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-[var(--color-ink-dark)]'
const btn = 'min-h-[42px] rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200'

function Demo16() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'بوابة مصنع القمة المؤسسية', cat: 'فئة المنتج', all: 'الكل', specs: 'المواصفات التقنية', quote: 'طلب عرض سعر B2B', company: 'اسم الشركة', qty: 'الكمية', submit: 'إرسال الطلب', preview: 'معاينة الطلب', sent: 'تم إنشاء الطلب', ref: 'مرجع' },
    en: { title: 'Al-Qimma Factory Corporate Portal', cat: 'Product category', all: 'All', specs: 'Technical specs', quote: 'B2B Quote Request', company: 'Company name', qty: 'Quantity', submit: 'Submit request', preview: 'Request preview', sent: 'Request generated', ref: 'Reference' },
    tr: { title: 'Al-Qimma Fabrikası Kurumsal Portalı', cat: 'Ürün kategorisi', all: 'Tümü', specs: 'Teknik özellikler', quote: 'B2B Teklif Talebi', company: 'Şirket adı', qty: 'Miktar', submit: 'Talebi gönder', preview: 'Talep önizleme', sent: 'Talep oluşturuldu', ref: 'Referans' },
  }[lang]
  const products = [
    { name: 'Industrial Pump P-200', cat: 'Pumps', specs: ['Flow: 200 L/min', 'Head: 45m', 'Material: SS316'] },
    { name: 'Control Valve CV-50', cat: 'Valves', specs: ['DN50', 'PN16', 'Actuator: Pneumatic'] },
    { name: 'Steel Panel SP-4', cat: 'Panels', specs: ['1.2m x 2.4m', 'Zinc coated', 'Fire rated'] },
    { name: 'Cooling Fan CF-90', cat: 'Cooling', specs: ['900 CFM', 'IP55', '3-phase 380V'] },
  ]
  const cats = ['all', ...Array.from(new Set(products.map((p) => p.cat)))]
  const [cat, setCat] = useState('all')
  const [sel, setSel] = useState(products[0])
  const [company, setCompany] = useState('Al-Rafidain Co.')
  const [qty, setQty] = useState(10)
  const [preview, setPreview] = useState<any>(null)
  const list = products.filter((p) => cat === 'all' || p.cat === cat)
  const submit = () => setPreview({ ref: `BQ-${Date.now().toString().slice(-6)}`, company, product: sel.name, qty, status: L.sent, ts: new Date().toISOString() })
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#16 — {L.title}</div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => <button key={c} className={`${btn} ${cat === c ? '' : '!bg-transparent'}`} onClick={() => setCat(c)}>{c === 'all' ? L.all : c}</button>)}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          {list.map((p) => (
            <button key={p.name} onClick={() => setSel(p)} className={`w-full rounded border px-3 py-2 text-left text-sm ${sel.name === p.name ? 'border-teal-600 bg-teal-600/10' : 'border-[#E6E1D8] dark:border-slate-800'}`}>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-stone-500">{p.cat}</div>
            </button>
          ))}
          <div className="text-xs font-semibold mt-2">{L.specs}: {sel.name}</div>
          <ul className="list-disc ps-5 text-xs text-stone-700 dark:text-stone-300">{sel.specs.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.quote}</div>
          <input className={input} value={company} onChange={(e) => setCompany(e.target.value)} placeholder={L.company} />
          <label className="block text-xs">{L.qty}<input type="number" className={input} value={qty} onChange={(e) => setQty(+e.target.value || 1)} /></label>
          <button className={btn} onClick={submit}>{L.submit}</button>
          {preview && (
            <div className="rounded border border-teal-600/20 bg-teal-600/5 p-2 text-xs">
              <div className="font-semibold text-teal-700 dark:text-teal-300">{L.preview} — {preview.ref}</div>
              <pre className="mt-1 whitespace-pre-wrap font-mono">{JSON.stringify(preview, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Demo17() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'بوابة الهوية الرقمية والاستشارات القانونية', area: 'مجال الممارسة', book: 'حجز استشارة', name: 'الاسم', date: 'التاريخ المفضل', ticket: 'تذكرة الموعد المرجعية', ref: 'المرجع' },
    en: { title: 'Legal Advocacy Digital Identity & Consultation Portal', area: 'Practice area', book: 'Book consultation', name: 'Name', date: 'Preferred date', ticket: 'Instant appointment ticket', ref: 'Reference' },
    tr: { title: 'Hukuki Savunuculuk Dijital Kimlik ve Danışmanlık Portalı', area: 'Uygulama alanı', book: 'Danışmanlık rezervasyonu', name: 'Ad', date: 'Tercih edilen tarih', ticket: 'Anında randevu bileti', ref: 'Referans' },
  }[lang]
  const areas = [
    { id: 'civil', ar: 'القانون المدني', en: 'Civil Law', tr: 'Medeni Hukuk', desc: { ar: 'نزاعات العقود والملكية والتعويضات.', en: 'Contracts, property, and compensation disputes.', tr: 'Sözleşme, mülkiyet ve tazminat uyuşmazlıkları.' } },
    { id: 'commercial', ar: 'القانون التجاري', en: 'Commercial Law', tr: 'Ticaret Hukuku', desc: { ar: 'تأسيس الشركات والمعاملات التجارية.', en: 'Company formation and commercial transactions.', tr: 'Şirket kuruluşu ve ticari işlemler.' } },
    { id: 'labor', ar: 'قانون العمل', en: 'Labor Law', tr: 'İş Hukuku', desc: { ar: 'حقوق العاملين وإنهاء الخدمات.', en: 'Employee rights and termination matters.', tr: 'Çalışan hakları ve fesih konuları.' } },
    { id: 'admin', ar: 'القانون الإداري', en: 'Administrative Law', tr: 'İdare Hukuku', desc: { ar: 'الطعن بالقرارات والإجراءات الحكومية.', en: 'Appeals against administrative decisions.', tr: 'İdari kararlara itirazlar.' } },
  ]
  const [area, setArea] = useState(areas[0])
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10))
  const [ticket, setTicket] = useState<any>(null)
  const book = () => {
    const ref = `APT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setTicket({ ref, name: name || '—', area: area[lang], date, status: 'CONFIRMED' })
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#17 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.area}</div>
          {areas.map((a) => (
            <button key={a.id} onClick={() => setArea(a)} className={`w-full rounded border px-3 py-2 text-left ${area.id === a.id ? 'border-teal-600 bg-teal-600/10' : 'border-[#E6E1D8] dark:border-slate-800'}`}>
              <div className="text-sm font-semibold">{a[lang]}</div>
              <div className="text-xs text-stone-500">{a.desc[lang]}</div>
            </button>
          ))}
        </div>
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.book}</div>
          <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={L.name} />
          <input type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
          <button className={btn} onClick={book}>{L.book}</button>
          {ticket && (
            <div className="rounded-lg border border-teal-600/30 bg-white/80 p-3 text-sm dark:bg-slate-100 dark:text-slate-900">
              <div className="text-xs font-bold uppercase text-teal-700">{L.ticket}</div>
              <div className="mt-1 font-mono text-lg font-bold">{ticket.ref}</div>
              <div className="text-xs">{ticket.name} · {ticket.area}</div>
              <div className="text-xs">{ticket.date} · {ticket.status}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Demo18() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'الجدول الإجرائي التفاعلي وحاسبة الرسوم', category: 'فئة القضية', amount: 'قيمة المطالبة', urgency: 'مستوى الاستعجال', normal: 'عادي', urgent: 'مستعجل', timeline: 'الجدول الزمني القانوني', fees: 'الرسوم الإدارية المفصلة', days: 'يوم', total: 'الإجمالي' },
    en: { title: 'Interactive Procedural Timeline & Fee Calculator', category: 'Case category', amount: 'Claim amount', urgency: 'Urgency level', normal: 'Normal', urgent: 'Urgent', timeline: 'Statutory timeline', fees: 'Itemized administrative fees', days: 'days', total: 'Total' },
    tr: { title: 'Etkileşimli Usul Zaman Çizelgesi ve Ücret Hesaplayıcı', category: 'Dava kategorisi', amount: 'Talep tutarı', urgency: 'Aciliyet düzeyi', normal: 'Normal', urgent: 'Acil', timeline: 'Yasal zaman çizelgesi', fees: 'Kalemli idari ücretler', days: 'gün', total: 'Toplam' },
  }[lang]
  const cats = {
    civil: { label: { ar: 'مدني', en: 'Civil', tr: 'Medeni' }, base: 45, fee: 0.02 },
    commercial: { label: { ar: 'تجاري', en: 'Commercial', tr: 'Ticari' }, base: 30, fee: 0.03 },
    labor: { label: { ar: 'عمالي', en: 'Labor', tr: 'İş' }, base: 21, fee: 0.015 },
  } as const
  const [cat, setCat] = useState<keyof typeof cats>('civil')
  const [amount, setAmount] = useState(1000000)
  const [urgent, setUrgent] = useState(false)
  const c = cats[cat]
  const days = urgent ? Math.max(7, Math.round(c.base * 0.6)) : c.base
  const filing = 25000
  const pct = Math.round(amount * c.fee)
  const service = urgent ? 15000 : 5000
  const total = filing + pct + service
  const stages = [
    { name: { ar: 'قيد الدعوى', en: 'Filing', tr: 'Dava açma' }, d: 0 },
    { name: { ar: 'تبليغ', en: 'Notification', tr: 'Tebligat' }, d: Math.round(days * 0.25) },
    { name: { ar: 'جلسة أولى', en: 'First hearing', tr: 'İlk duruşma' }, d: Math.round(days * 0.55) },
    { name: { ar: 'مرافعة/قرار', en: 'Pleading/Decision', tr: 'Savunma/Karar' }, d: days },
  ]
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#18 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <label className="block text-xs font-semibold">{L.category}
            <select className={`${input} mt-1`} value={cat} onChange={(e) => setCat(e.target.value as any)}>
              {Object.entries(cats).map(([k, v]) => <option key={k} value={k}>{v.label[lang]}</option>)}
            </select>
          </label>
          <label className="block text-xs font-semibold">{L.amount} (IQD)
            <input type="number" className={`${input} mt-1`} value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} /> {L.urgency}: {urgent ? L.urgent : L.normal}
          </label>
          <div className="text-xs font-semibold">{L.timeline} — {days} {L.days}</div>
          <div className="space-y-1">
            {stages.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] text-white">{i + 1}</span><span>{s.name[lang]}</span><span className="ms-auto font-mono">+{s.d}d</span></div>
            ))}
          </div>
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold mb-2">{L.fees}</div>
          <table className="w-full text-xs"><tbody>
            <tr className="border-b border-[#E6E1D8] dark:border-slate-800"><td className="py-1">Filing</td><td className="text-right font-mono">{filing.toLocaleString()}</td></tr>
            <tr className="border-b border-[#E6E1D8] dark:border-slate-800"><td className="py-1">Percentage ({(c.fee * 100).toFixed(1)}%)</td><td className="text-right font-mono">{pct.toLocaleString()}</td></tr>
            <tr className="border-b border-[#E6E1D8] dark:border-slate-800"><td className="py-1">Service / Urgency</td><td className="text-right font-mono">{service.toLocaleString()}</td></tr>
            <tr><td className="py-2 font-semibold">{L.total}</td><td className="text-right font-mono font-semibold text-teal-700 dark:text-teal-300">{total.toLocaleString()} IQD</td></tr>
          </tbody></table>
        </div>
      </div>
    </div>
  )
}

function Demo19() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'تشخيصات المحفظة الهندسية المنشورة على الحافة', runtime: 'تشخيصات وقت التشغيل', dir: 'اتجاه DOM', locale: 'اللغة الحالية', viewport: 'أبعاد العرض', edge: 'رؤوس حافة Cloudflare (محاكاة)' },
    en: { title: 'Edge-Deployed Trilingual Engineering Portfolio Diagnostics', runtime: 'Runtime diagnostics', dir: 'DOM dir', locale: 'Active locale', viewport: 'Viewport metrics', edge: 'Simulated Cloudflare Edge cache headers' },
    tr: { title: 'Edge\'e Dağıtılmış Üç Dilli Portföy Tanılamaları', runtime: 'Çalışma zamanı tanılamaları', dir: 'DOM dir', locale: 'Aktif yerel ayar', viewport: 'Görünüm alanı ölçüleri', edge: 'Simüle Cloudflare Edge önbellek başlıkları' },
  }[lang]
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useMemo(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  const domDir = document.documentElement.dir || 'ltr'
  const domLang = document.documentElement.lang || lang
  const headers = {
    'cf-cache-status': 'HIT',
    'cf-ray': `${Math.random().toString(16).slice(2, 10)}-BGW`,
    'age': String(Math.floor(Math.random() * 120)),
    'x-edge-location': 'BGW (Baghdad)',
    'content-language': domLang,
    'cache-control': 'public, max-age=0, must-revalidate',
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#19 — {L.title}</div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className={shell}><div className="text-xs font-semibold">{L.dir}</div><div className="mt-1 font-mono text-lg text-teal-700 dark:text-teal-300">{domDir.toUpperCase()}</div></div>
        <div className={shell}><div className="text-xs font-semibold">{L.locale}</div><div className="mt-1 font-mono text-lg text-teal-700 dark:text-teal-300">{domLang}</div></div>
        <div className={shell}><div className="text-xs font-semibold">{L.viewport}</div><div className="mt-1 font-mono text-sm">{vp.w} × {vp.h}</div></div>
        <div className={shell}><div className="text-xs font-semibold">dpr</div><div className="mt-1 font-mono text-sm">{window.devicePixelRatio}</div></div>
      </div>
      <div className={shell}>
        <div className="text-xs font-semibold mb-2">{L.edge}</div>
        <pre className="overflow-auto rounded bg-slate-950 p-2 font-mono text-[11px] text-emerald-300">{Object.entries(headers).map(([k, v]) => `${k}: ${v}`).join('\n')}</pre>
      </div>
    </div>
  )
}

export function WebPortalsLab({ projectId }: { projectId: number }) {
  if (projectId === 16) return <Demo16 />
  if (projectId === 17) return <Demo17 />
  if (projectId === 18) return <Demo18 />
  return <Demo19 />
}
