import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'

const shell = 'rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40'
const input = 'min-h-[42px] w-full rounded border border-[#DCD6CA] bg-white/70 px-2 py-1.5 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-[var(--color-ink-dark)]'
const btn = 'min-h-[42px] rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200'

function hashish(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(8, '0')
}

function Demo01() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'محاكي سجل القضايا دون اتصال', name: 'اسم القضية', client: 'العميل', create: 'إنشاء قضية', search: 'بحث في القضايا...', lock: 'قفل تشفير AES-256', locked: 'مقفّل', unlocked: 'مفتوح', wal: 'سجل التزام SQLite WAL', audit: 'سجل التدقيق', none: 'لا توجد نتائج', status: 'الحالة', open: 'مفتوحة', review: 'قيد المراجعة' },
    en: { title: 'Offline Case Docket Simulator', name: 'Case name', client: 'Client', create: 'Create case', search: 'Search cases...', lock: 'AES-256 Encryption Lock', locked: 'Locked', unlocked: 'Unlocked', wal: 'SQLite WAL Commit Log', audit: 'Audit Entries', none: 'No results', status: 'Status', open: 'Open', review: 'In Review' },
    tr: { title: 'Çevrimdışı Dava Dosyası Simülatörü', name: 'Dava adı', client: 'Müvekkil', create: 'Dava oluştur', search: 'Davalarda ara...', lock: 'AES-256 Şifreleme Kilidi', locked: 'Kilitli', unlocked: 'Açık', wal: 'SQLite WAL Commit Günlüğü', audit: 'Denetim Kayıtları', none: 'Sonuç yok', status: 'Durum', open: 'Açık', review: 'İncelemede' },
  }[lang]
  const [cases, setCases] = useState([
    { id: 'C-1001', name: 'Commercial dispute / نزاع تجاري', client: 'Al-Noor Co.', status: L.open },
    { id: 'C-1002', name: 'Property claim / مطالبة عقارية', client: 'H. Karim', status: L.review },
  ])
  const [name, setName] = useState('')
  const [client, setClient] = useState('')
  const [q, setQ] = useState('')
  const [locked, setLocked] = useState(true)
  const [wal, setWal] = useState<string[]>(['WAL: checkpoint LSN=1042 committed', 'WAL: frame write cases(rowid=1002)'])
  const [audit, setAudit] = useState<string[]>(['[INIT] encrypted store mounted (AES-256-GCM)'])

  const filtered = useMemo(() => cases.filter((c) => `${c.id} ${c.name} ${c.client} ${c.status}`.toLowerCase().includes(q.toLowerCase())), [cases, q])

  const add = () => {
    if (!name.trim() || !client.trim()) return
    const id = `C-${1000 + cases.length + 1}`
    const row = { id, name: name.trim(), client: client.trim(), status: L.open }
    setCases((v) => [row, ...v])
    const ts = new Date().toLocaleTimeString()
    setWal((v) => [`WAL: COMMIT tx=${hashish(id + ts)} row=${id} durable`, `WAL: page append cases(${id})`, ...v].slice(0, 8))
    setAudit((v) => [`[${ts}] CREATE case=${id} actor=admin enc=${locked ? 'on' : 'off'}`, ...v].slice(0, 8))
    setName(''); setClient('')
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#01 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={L.name} />
            <input className={input} value={client} onChange={(e) => setClient(e.target.value)} placeholder={L.client} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className={btn} onClick={add}>{L.create}</button>
            <button className={btn} onClick={() => { setLocked((v) => !v); setAudit((a) => [`[${new Date().toLocaleTimeString()}] SECURITY lock=${!locked ? 'AES-256' : 'off'}`, ...a].slice(0,8)) }}>{L.lock}: {locked ? L.locked : L.unlocked}</button>
          </div>
          <input className={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={L.search} />
          <div className="max-h-44 space-y-1 overflow-auto">
            {filtered.length === 0 ? <div className="text-xs text-stone-500">{L.none}</div> : filtered.map((c) => (
              <div key={c.id} className="rounded border border-[#E6E1D8] bg-white/60 px-2 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-950/30">
                <div className="font-semibold text-stone-800 dark:text-stone-100">{c.id} — {c.name}</div>
                <div className="text-stone-500 dark:text-stone-400">{c.client} · {L.status}: {c.status}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className={shell}>
            <div className="text-xs font-semibold text-stone-700 dark:text-stone-200">{L.wal}</div>
            <pre className="mt-1 max-h-28 overflow-auto font-mono text-[11px] text-emerald-700 dark:text-emerald-300">{wal.join('\n')}</pre>
          </div>
          <div className={shell}>
            <div className="text-xs font-semibold text-stone-700 dark:text-stone-200">{L.audit}</div>
            <pre className="mt-1 max-h-28 overflow-auto font-mono text-[11px] text-stone-600 dark:text-stone-400">{audit.join('\n')}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

function Demo02() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'بوابة تتبع الدعاوى للعملاء', code: 'رمز التتبع', lookup: 'عرض الحالة', timeline: 'المراحل والإجراءات', hearing: 'موعد الجلسة', notFound: 'لم يتم العثور على ملف بهذا الرمز.' },
    en: { title: 'Public Suit Tracking Portal', code: 'Tracking code', lookup: 'View status', timeline: 'Procedural stages', hearing: 'Hearing date', notFound: 'No case found for this code.' },
    tr: { title: 'Kamu Dava Takip Portalı', code: 'Takip kodu', lookup: 'Durumu görüntüle', timeline: 'Usul aşamaları', hearing: 'Duruşma tarihi', notFound: 'Bu kod için dava bulunamadı.' },
  }[lang]
  const db: Record<string, { stages: { name: string; done: boolean }[]; hearing: string }> = {
    'IRQ-2026-408': { hearing: '2026-11-20 09:30', stages: [{ name: 'Filed / قيدت', done: true }, { name: 'Review / تدقيق', done: true }, { name: 'Hearing scheduled / جلسة محددة', done: true }, { name: 'Judgment / حكم', done: false }] },
    'IRQ-2026-221': { hearing: '2026-12-02 11:00', stages: [{ name: 'Filed', done: true }, { name: 'Notification', done: true }, { name: 'First hearing', done: false }, { name: 'Decision', done: false }] },
  }
  const [code, setCode] = useState('IRQ-2026-408')
  const [sel, setSel] = useState(code)
  const item = db[sel.toUpperCase()]
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#02 — {L.title}</div>
      <div className={`${shell} space-y-3`}>
        <div className="flex flex-wrap gap-2">
          <input className={`${input} max-w-xs`} value={code} onChange={(e) => setCode(e.target.value)} placeholder={L.code} />
          <button className={btn} onClick={() => setSel(code.trim().toUpperCase())}>{L.lookup}</button>
          {Object.keys(db).map((k) => <button key={k} className={`${btn} !bg-transparent`} onClick={() => { setCode(k); setSel(k) }}>{k}</button>)}
        </div>
        {!item ? <p className="text-sm text-red-600 dark:text-red-300">{L.notFound}</p> : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-xs font-semibold">{L.timeline}</div>
              <ol className="space-y-2">
                {item.stages.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${s.done ? 'bg-emerald-500 text-white' : 'bg-stone-300 text-stone-700 dark:bg-slate-700 dark:text-stone-200'}`}>{i + 1}</span>
                    <span className={s.done ? 'text-stone-800 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}>{s.name}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-md border border-teal-600/20 bg-teal-600/5 p-3 text-sm">
              <div className="text-xs font-semibold text-teal-700 dark:text-teal-300">{L.hearing}</div>
              <div className="mt-1 font-mono text-stone-800 dark:text-stone-100">{item.hearing}</div>
              <div className="mt-2 text-xs text-stone-500">Status: {item.stages.filter((s) => s.done).length}/{item.stages.length}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Demo03() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'سجل الأرشفة والوثائق الإلكترونية', subject: 'موضوع الوثيقة', dir: 'الاتجاه', incoming: 'وارد', outgoing: 'صادر', add: 'تسجيل وثيقة', filter: 'تصفية السجل...', serial: 'الرقم الأرشيفي', barcode: 'معاينة الباركود' },
    en: { title: 'Electronic Document Registry & Archiving', subject: 'Document subject', dir: 'Direction', incoming: 'Incoming', outgoing: 'Outgoing', add: 'Log document', filter: 'Filter registry...', serial: 'Archive serial', barcode: 'Barcode preview' },
    tr: { title: 'Elektronik Belge Kayıt ve Arşivleme', subject: 'Belge konusu', dir: 'Yön', incoming: 'Gelen', outgoing: 'Giden', add: 'Belge kaydet', filter: 'Kayıtları filtrele...', serial: 'Arşiv seri no', barcode: 'Barkod önizleme' },
  }[lang]
  type Row = { serial: string; subject: string; dir: string; date: string }
  const [rows, setRows] = useState<Row[]>([
    { serial: 'ARC-2026-0001', subject: 'Procurement letter / كتاب مشتريات', dir: L.incoming, date: '2026-11-01' },
    { serial: 'ARC-2026-0002', subject: 'Contract dispatch / إرسال عقد', dir: L.outgoing, date: '2026-11-05' },
  ])
  const [subject, setSubject] = useState('')
  const [dir, setDir] = useState(L.incoming)
  const [q, setQ] = useState('')
  const filtered = rows.filter((r) => `${r.serial} ${r.subject} ${r.dir}`.toLowerCase().includes(q.toLowerCase()))
  const add = () => {
    if (!subject.trim()) return
    const serial = `ARC-2026-${String(rows.length + 1).padStart(4, '0')}`
    setRows((v) => [{ serial, subject: subject.trim(), dir, date: new Date().toISOString().slice(0, 10) }, ...v])
    setSubject('')
  }
  const bars = (s: string) => s.split('').map((c) => (c.charCodeAt(0) % 7) + 2)
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#03 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <input className={input} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={L.subject} />
          <div className="flex flex-wrap gap-2">
            <select className={input} value={dir} onChange={(e) => setDir(e.target.value)}>
              <option>{L.incoming}</option><option>{L.outgoing}</option>
            </select>
            <button className={btn} onClick={add}>{L.add}</button>
          </div>
          <input className={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={L.filter} />
        </div>
        <div className={`${shell}`}>
          <div className="text-xs font-semibold">{L.barcode}: {rows[0]?.serial}</div>
          <div className="mt-2 flex h-16 items-end gap-[2px] rounded bg-white p-2 dark:bg-slate-100">
            {bars(rows[0]?.serial || 'ARC').map((w, i) => <span key={i} className="bg-slate-900" style={{ width: 2, height: `${w * 12}%` }} />)}
          </div>
          <div className="mt-1 font-mono text-[10px] text-stone-500">{rows[0]?.serial}</div>
        </div>
      </div>
        <div className={`${shell} max-h-48 overflow-x-auto overflow-y-auto`}>
          <table className="w-full min-w-[480px] text-left text-xs">
          <thead className="text-stone-500"><tr><th className="py-1">{L.serial}</th><th>{L.subject}</th><th>{L.dir}</th><th>Date</th></tr></thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.serial} className="border-t border-[#E6E1D8] dark:border-slate-800"><td className="py-1 font-mono text-teal-700 dark:text-teal-300">{r.serial}</td><td>{r.subject}</td><td>{r.dir}</td><td>{r.date}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Demo04() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'دفتر الأتعاب والمالية', client: 'العميل', contract: 'قيمة العقد', type: 'النوع', payment: 'دفعة', expense: 'مصروف', amount: 'المبلغ', add: 'تسجيل', remaining: 'الرصيد المتبقي', receipt: 'معاينة إيصال رسمي' },
    en: { title: 'Office Retainer & Financial Ledger', client: 'Client', contract: 'Contract total', type: 'Type', payment: 'Payment', expense: 'Expense', amount: 'Amount', add: 'Record', remaining: 'Remaining balance', receipt: 'Official receipt preview' },
    tr: { title: 'Vekalet ve Finans Defteri', client: 'Müvekkil', contract: 'Sözleşme toplamı', type: 'Tür', payment: 'Ödeme', expense: 'Gider', amount: 'Tutar', add: 'Kaydet', remaining: 'Kalan bakiye', receipt: 'Resmi makbuz önizleme' },
  }[lang]
  type Tx = { id: number; kind: 'payment' | 'expense'; amount: number; note: string }
  const [client, setClient] = useState('Al-Rafidain Trading')
  const [total, setTotal] = useState(5000)
  const [kind, setKind] = useState<'payment' | 'expense'>('payment')
  const [amount, setAmount] = useState(500)
  const [txs, setTxs] = useState<Tx[]>([{ id: 1, kind: 'payment', amount: 1000, note: 'Initial retainer' }])
  const paid = txs.filter((t) => t.kind === 'payment').reduce((s, t) => s + t.amount, 0)
  const expenses = txs.filter((t) => t.kind === 'expense').reduce((s, t) => s + t.amount, 0)
  const remaining = total - paid + expenses
  const add = () => { if (amount <= 0) return; setTxs((v) => [{ id: Date.now(), kind, amount, note: kind === 'payment' ? L.payment : L.expense }, ...v]) }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#04 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <input className={input} value={client} onChange={(e) => setClient(e.target.value)} placeholder={L.client} />
          <label className="block text-xs">{L.contract}<input type="number" className={input} value={total} onChange={(e) => setTotal(+e.target.value || 0)} /></label>
          <div className="flex gap-2">
            <select className={input} value={kind} onChange={(e) => setKind(e.target.value as any)}><option value="payment">{L.payment}</option><option value="expense">{L.expense}</option></select>
            <input type="number" className={input} value={amount} onChange={(e) => setAmount(+e.target.value || 0)} placeholder={L.amount} />
            <button className={btn} onClick={add}>{L.add}</button>
          </div>
          <div className="rounded border border-teal-600/20 bg-teal-600/5 p-2 text-sm font-semibold text-teal-800 dark:text-teal-200">{L.remaining}: ${remaining.toFixed(2)}</div>
          <ul className="max-h-32 space-y-1 overflow-auto text-xs">{txs.map((t) => <li key={t.id} className="flex justify-between border-b border-[#E6E1D8] py-1 dark:border-slate-800"><span>{t.note}</span><span className={t.kind === 'payment' ? 'text-emerald-600' : 'text-amber-600'}>{t.kind === 'payment' ? '+' : '-'}${t.amount}</span></li>)}</ul>
        </div>
        <div className={`${shell} bg-white/80 dark:bg-slate-100 dark:text-slate-900`}>
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{L.receipt}</div>
          <div className="mt-2 border-b border-slate-300 pb-2 text-sm font-semibold">Receipt / إيصال — #{String(txs[0]?.id || 0).slice(-6)}</div>
          <div className="mt-2 space-y-1 text-xs text-slate-700">
            <div><b>Client:</b> {client}</div>
            <div><b>Contract:</b> ${total.toFixed(2)}</div>
            <div><b>Paid:</b> ${paid.toFixed(2)}</div>
            <div><b>Expenses:</b> ${expenses.toFixed(2)}</div>
            <div className="pt-1 font-semibold text-slate-900"><b>{L.remaining}:</b> ${remaining.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Demo05() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'مجدول الجلسات والمواعيد الإجرائية', case: 'القضية', date: 'تاريخ الجلسة', add: 'إضافة', countdown: 'العد التنازلي', days: 'يوم', conflict: 'تنبيه تعارض', noConflict: 'لا يوجد تعارض', dueSoon: 'موعد قريب جداً', ok: 'ضمن المدة النظامية' },
    en: { title: 'Court Hearing & Deadline Scheduler', case: 'Case', date: 'Hearing date', add: 'Add', countdown: 'Countdown', days: 'days', conflict: 'Conflict alert', noConflict: 'No conflicts', dueSoon: 'Due soon', ok: 'Within statutory window' },
    tr: { title: 'Duruşma ve Süre Planlayıcı', case: 'Dava', date: 'Duruşma tarihi', add: 'Ekle', countdown: 'Geri sayım', days: 'gün', conflict: 'Çakışma uyarısı', noConflict: 'Çakışma yok', dueSoon: 'Süre yaklaşıyor', ok: 'Yasal süre içinde' },
  }[lang]
  type H = { id: number; caseName: string; date: string }
  const [items, setItems] = useState<H[]>([
    { id: 1, caseName: 'C-1001 Commercial', date: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10) },
    { id: 2, caseName: 'C-1002 Property', date: new Date(Date.now() + 12 * 86400000).toISOString().slice(0, 10) },
  ])
  const [caseName, setCaseName] = useState('')
  const [date, setDate] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10))
  const add = () => { if (!caseName.trim()) return; setItems((v) => [...v, { id: Date.now(), caseName: caseName.trim(), date }]); setCaseName('') }
  const daysUntil = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
  const conflicts = useMemo(() => {
    const map = new Map<string, number>()
    items.forEach((i) => map.set(i.date, (map.get(i.date) || 0) + 1))
    return items.filter((i) => (map.get(i.date) || 0) > 1)
  }, [items])
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#05 — {L.title}</div>
      <div className={`${shell} space-y-2`}>
        <div className="flex flex-wrap gap-2">
          <input className={`${input} max-w-xs`} value={caseName} onChange={(e) => setCaseName(e.target.value)} placeholder={L.case} />
          <input type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
          <button className={btn} onClick={add}>{L.add}</button>
        </div>
        <div className={`rounded p-2 text-xs font-semibold ${conflicts.length ? 'bg-red-500/10 text-red-700 dark:text-red-300' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'}`}>
          {L.conflict}: {conflicts.length ? conflicts.map((c) => `${c.caseName} (${c.date})`).join(', ') : L.noConflict}
        </div>
      </div>
      <div className={`${shell} space-y-2`}>
        {items.sort((a,b)=>a.date.localeCompare(b.date)).map((i) => {
          const d = daysUntil(i.date)
          const warn = d <= 5
          return (
            <div key={i.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#E6E1D8] bg-white/60 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950/30">
              <div><div className="font-medium">{i.caseName}</div><div className="text-xs text-stone-500">{i.date}</div></div>
              <div className="text-right text-xs">
                <div className="font-mono font-semibold">{L.countdown}: {d} {L.days}</div>
                <div className={warn ? 'text-amber-600 dark:text-amber-300' : 'text-emerald-600 dark:text-emerald-300'}>{warn ? L.dueSoon : L.ok}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function DesktopSystemsLab({ projectId }: { projectId: number }) {
  if (projectId === 1) return <Demo01 />
  if (projectId === 2) return <Demo02 />
  if (projectId === 3) return <Demo03 />
  if (projectId === 4) return <Demo04 />
  return <Demo05 />
}
