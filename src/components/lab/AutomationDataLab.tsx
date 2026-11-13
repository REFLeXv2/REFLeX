import { useEffect, useMemo, useRef, useState } from 'react'
import { sha256Hex } from '../../utils/hash'
import { useApp } from '../../context/AppContext'

const shell = 'rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40'
const input = 'min-h-[42px] w-full rounded border border-[#DCD6CA] bg-white/70 px-2 py-1.5 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-[var(--color-ink-dark)]'
const btn = 'min-h-[42px] rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200'

async function sha256(text: string) {
  return sha256Hex(text)
}

function Demo10() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'معالج وسائط دفعي ونِسَب أبعاد', ratio: 'نسبة الأبعاد', watermark: 'نص العلامة المائية', apply: 'تطبيق/تحديث المعاينة', download: 'تنزيل PNG', items: 'عناصر الدفعة', ready: 'جاهز' },
    en: { title: 'Autonomous Batch Media & Aspect-Ratio Processor', ratio: 'Aspect ratio', watermark: 'Watermark text', apply: 'Apply / Update preview', download: 'Download PNG', items: 'Batch items', ready: 'Ready' },
    tr: { title: 'Otonom Toplu Medya ve En-Boy İşleyici', ratio: 'En-boy oranı', watermark: 'Filigran metni', apply: 'Uygula / Önizlemeyi güncelle', download: 'PNG indir', items: 'Toplu öğeler', ready: 'Hazır' },
  }[lang]
  const ratios = { '9:16 Vertical': [720, 1280], '1:1 Square': [1080, 1080], '16:9 Wide': [1280, 720] } as const
  const [ratio, setRatio] = useState<keyof typeof ratios>('1:1 Square')
  const [watermark, setWatermark] = useState('Portfolio Lab · عبدالرزاق')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const batch = ['Product A', 'Product B', 'Service C', 'Announcement D']
  const draw = () => {
    const c = canvasRef.current
    if (!c) return
    const [w, h] = ratios[ratio]
    c.width = w; c.height = h
    const ctx = c.getContext('2d')!
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#0f766e'); g.addColorStop(1, '#0f172a')
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(247,245,240,0.92)'
    const pad = Math.round(w * 0.08)
    ctx.fillRect(pad, pad, w - pad * 2, h - pad * 2)
    ctx.fillStyle = '#0f172a'
    ctx.font = `bold ${Math.round(w * 0.06)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('Brand Frame', w / 2, h * 0.42)
    ctx.font = `${Math.round(w * 0.04)}px sans-serif`
    ctx.fillText(ratio, w / 2, h * 0.52)
    ctx.fillStyle = 'rgba(13,148,136,0.85)'
    ctx.font = `600 ${Math.round(w * 0.035)}px sans-serif`
    ctx.fillText(watermark, w / 2, h - pad - 20)
  }
  useEffect(() => { draw() }, [ratio])
  const download = () => {
    const c = canvasRef.current; if (!c) return
    const a = document.createElement('a')
    a.href = c.toDataURL('image/png')
    a.download = `batch-${ratio.replace(/[^a-z0-9]/gi, '_')}.png`
    a.click()
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#10 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <label className="block text-xs font-semibold">{L.ratio}
            <select className={`${input} mt-1`} value={ratio} onChange={(e) => setRatio(e.target.value as any)}>
              {Object.keys(ratios).map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="block text-xs font-semibold">{L.watermark}
            <input className={`${input} mt-1`} value={watermark} onChange={(e) => setWatermark(e.target.value)} />
          </label>
          <div className="flex flex-wrap gap-2">
            <button className={btn} onClick={draw}>{L.apply}</button>
            <button className={btn} onClick={download}>{L.download}</button>
          </div>
          <div className="text-xs font-semibold">{L.items}</div>
          <ul className="space-y-1 text-xs">{batch.map((b) => <li key={b} className="flex justify-between rounded border border-[#E6E1D8] px-2 py-1 dark:border-slate-800"><span>{b}</span><span className="text-emerald-600">{L.ready}</span></li>)}</ul>
        </div>
        <div className={`${shell} flex items-center justify-center overflow-x-auto bg-slate-200/50 dark:bg-slate-950/40`}>
          <canvas ref={canvasRef} className="h-auto max-h-80 w-full max-w-full rounded shadow-sm" />
        </div>
      </div>
    </div>
  )
}

function Demo11() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'وكيل النشر المجدول متعدد القنوات', content: 'محتوى المنشور', schedule: 'جدولة ونشر', queue: 'طابور الإرسال (محدود المعدل)', platform: 'المنصة', status: 'الحالة', delivered: 'تم التسليم', queued: 'في الطابور', sending: 'جارٍ الإرسال' },
    en: { title: 'Cross-Platform Scheduled Publishing Agent', content: 'Post content', schedule: 'Schedule & publish', queue: 'Rate-limited dispatch queue', platform: 'Platform', status: 'Status', delivered: 'Delivered', queued: 'Queued', sending: 'Sending' },
    tr: { title: 'Çapraz Platform Zamanlanmış Yayın Aracısı', content: 'Gönderi içeriği', schedule: 'Zamanla ve yayınla', queue: 'Hız sınırlı gönderim kuyruğu', platform: 'Platform', status: 'Durum', delivered: 'Teslim edildi', queued: 'Kuyrukta', sending: 'Gönderiliyor' },
  }[lang]
  const platforms = ['X / Twitter', 'LinkedIn', 'Telegram', 'Website']
  type Job = { id: number; platform: string; status: string }
  const [content, setContent] = useState('Weekly legal tech update / تحديث تقني قانوني أسبوعي')
  const [jobs, setJobs] = useState<Job[]>([])
  const timers = useRef<number[]>([])
  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])
  const schedule = () => {
    const batch = platforms.map((p, i) => ({ id: Date.now() + i, platform: p, status: L.queued }))
    setJobs((v) => [...batch, ...v].slice(0, 12))
    batch.forEach((j, i) => {
      const t1 = window.setTimeout(() => setJobs((v) => v.map((x) => x.id === j.id ? { ...x, status: L.sending } : x)), 400 + i * 700)
      const t2 = window.setTimeout(() => setJobs((v) => v.map((x) => x.id === j.id ? { ...x, status: L.delivered } : x)), 1200 + i * 700)
      timers.current.push(t1, t2)
    })
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#11 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <textarea className={`${input} h-24`} value={content} onChange={(e) => setContent(e.target.value)} />
          <button className={btn} onClick={schedule}>{L.schedule}</button>
          <div className="text-xs text-stone-500">{platforms.join(' · ')}</div>
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold mb-2">{L.queue}</div>
          <div className="space-y-1.5 text-xs">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between rounded border border-[#E6E1D8] bg-white/60 px-2 py-1.5 dark:border-slate-800 dark:bg-slate-950/30">
                <span>{j.platform}</span>
                <span className={j.status === L.delivered ? 'font-semibold text-emerald-600' : j.status === L.sending ? 'text-amber-600' : 'text-stone-500'}>{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Demo12() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'مفهرس بحث نصي كامل (FTS5 محاكاة)', q: 'ابحث في الأرشيف...', time: 'زمن التنفيذ', hits: 'نتيجة', corpus: 'سجلات مفهرسة' },
    en: { title: 'Full-Text Local & Cloud Storage Indexer (FTS5 sim)', q: 'Search archive...', time: 'Execution time', hits: 'hits', corpus: 'indexed records' },
    tr: { title: 'Tam Metin Yerel ve Bulut Depolama İndeksleyici (FTS5 sim)', q: 'Arşivde ara...', time: 'Çalışma süresi', hits: 'sonuç', corpus: 'indeksli kayıt' },
  }[lang]
  const corpus = useMemo(() => {
    const dirs = ['/legal', '/finance', '/hr', '/contracts']
    const types = ['PDF', 'DOCX', 'TXT']
    const subjects = ['case hearing minutes محضر جلسة', 'invoice payment فاتورة دفع', 'employee attendance حضور موظف', 'contract amendment تعديل عقد', 'audit report تقرير تدقيق', 'property deed سند ملكية', 'legal memo مذكرة قانونية', 'tax notice إشعار ضريبة', 'meeting agenda جدول أعمال', 'archive receipt سند أرشفة']
    return Array.from({ length: 42 }, (_, i) => ({
      path: `${dirs[i % dirs.length]}/record_${1000 + i}.${types[i % types.length].toLowerCase()}`,
      type: types[i % types.length],
      text: `${subjects[i % subjects.length]} #${1000 + i} — ${i % 2 ? 'Baghdad office ملف بغداد' : 'Basra branch فرع البصرة'} status ${i % 3 === 0 ? 'approved' : 'pending'}`,
    }))
  }, [])
  const [q, setQ] = useState('عقد')
  const res = useMemo(() => {
    const t0 = performance.now()
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    const hits = terms.length ? corpus.filter((r) => terms.every((t) => `${r.path} ${r.text}`.toLowerCase().includes(t))) : corpus
    return { hits, ms: performance.now() - t0 }
  }, [q, corpus])
  const mark = (text: string) => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    if (!terms.length) return text
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    return text.split(re).map((p, i) => re.test(p) ? <mark key={i} className="bg-teal-500/25 text-teal-900 dark:text-teal-100">{p}</mark> : <span key={i}>{p}</span>)
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#12 — {L.title}</div>
      <input className={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={L.q} />
      <div className="flex flex-wrap gap-3 text-xs font-medium">
        <span className="rounded-full border border-teal-600/30 bg-teal-600/10 px-2 py-1 text-teal-800 dark:text-teal-200">{L.time}: {res.ms.toFixed(3)} ms</span>
        <span>{res.hits.length} {L.hits} / {corpus.length} {L.corpus}</span>
      </div>
      <div className={`${shell} max-h-72 space-y-1.5 overflow-auto`}>
        {res.hits.map((r, i) => (
          <div key={i} className="rounded border border-[#E6E1D8] bg-white/60 px-2 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-950/30">
            <div className="font-mono text-teal-700 dark:text-teal-300">{r.path} <span className="text-stone-400">[{r.type}]</span></div>
            <div className="mt-0.5 text-stone-700 dark:text-stone-300">{mark(r.text)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Demo13() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'خادم مزامنة ونسخ احتياطي متعدد الأدلة', file: 'ملف', local: 'تجزئة محلية', remote: 'تجزئة بعيدة', state: 'الحالة', edit: 'تعديل', sync: 'تشغيل دورة المزامنة', unchanged: 'بدون تغيير (تخطي)', synced: 'تمت مزامنة الدلتا', cycle: 'سجل الدورة' },
    en: { title: 'Multi-Directory Cloud Sync & Backup Daemon', file: 'File', local: 'Local hash', remote: 'Remote hash', state: 'State', edit: 'Edit', sync: 'Trigger sync cycle', unchanged: 'Unchanged (skipped)', synced: 'Delta synced', cycle: 'Sync cycle log' },
    tr: { title: 'Çok Dizinli Bulut Senkronizasyon ve Yedekleme', file: 'Dosya', local: 'Yerel özet', remote: 'Uzak özet', state: 'Durum', edit: 'Düzenle', sync: 'Senkronizasyon döngüsü çalıştır', unchanged: 'Değişmedi (atlandı)', synced: 'Delta senkronize edildi', cycle: 'Senkronizasyon günlüğü' },
  }[lang]
  type F = { name: string; content: string; local: string; remote: string }
  const init: F[] = [
    { name: '/docs/case-01.pdf.txt', content: 'Case notes v1', local: '', remote: '' },
    { name: '/docs/contract-07.txt', content: 'Contract draft', local: '', remote: '' },
    { name: '/media/photo-a.txt', content: 'Binary meta A', local: '', remote: '' },
    { name: '/finance/ledger.csv', content: 'amount,100', local: '', remote: '' },
  ]
  const [files, setFiles] = useState<F[]>(init)
  const [log, setLog] = useState<string[]>([])
  useEffect(() => { (async () => {
    const ready = await Promise.all(init.map(async (f) => { const h = await sha256(f.content); return { ...f, local: h, remote: h } }))
    setFiles(ready)
  })() }, [])
  const edit = async (name: string, content: string) => {
    const h = await sha256(content)
    setFiles((v) => v.map((f) => f.name === name ? { ...f, content, local: h } : f))
  }
  const sync = async () => {
    const lines: string[] = []
    const next = await Promise.all(files.map(async (f) => {
      if (f.local === f.remote) { lines.push(`SKIP ${f.name} — checksum match`); return f }
      lines.push(`SYNC ${f.name} — delta uploaded (${f.local.slice(0, 8)}… )`); return { ...f, remote: f.local }
    }))
    setFiles(next)
    setLog((v) => [`[${new Date().toLocaleTimeString()}] cycle complete`, ...lines.reverse(), ...v].slice(0, 14))
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#13 — {L.title}</div>
      <button className={btn} onClick={sync}>{L.sync}</button>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          {files.map((f) => {
            const same = f.local === f.remote
            return (
              <div key={f.name} className="rounded border border-[#E6E1D8] p-2 text-xs dark:border-slate-800">
                <div className="font-mono text-teal-700 dark:text-teal-300">{f.name}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <input className={`${input} !py-1`} value={f.content} onChange={(e) => edit(f.name, e.target.value)} />
                  <span className={same ? 'text-stone-500' : 'font-semibold text-amber-600'}>{same ? L.unchanged : L.synced.replace('Delta synced', 'modified')}</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-stone-500">L:{f.local.slice(0,12)}… R:{f.remote.slice(0,12)}…</div>
              </div>
            )
          })}
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold mb-1">{L.cycle}</div>
          <pre className="max-h-72 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded bg-slate-950 p-2 font-mono text-[11px] text-emerald-300">{log.join('\n') || '—'}</pre>
        </div>
      </div>
    </div>
  )
}

function Demo14() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'إطار الجلسات الافتراضية وتدوير البروكسي', spin: 'تشغيل جلسة افتراضية', rotate: 'تدوير بروكسي SOCKS5', session: 'الجلسة', proxy: 'البروكسي', health: 'الصحة', latency: 'الكمون' },
    en: { title: 'Distributed Virtual Session & Proxy Rotation Framework', spin: 'Spin up virtual session', rotate: 'Rotate SOCKS5 proxy', session: 'Session', proxy: 'Proxy', health: 'Health', latency: 'Latency' },
    tr: { title: 'Dağıtık Sanal Oturum ve Proxy Döndürme Çerçevesi', spin: 'Sanal oturum başlat', rotate: 'SOCKS5 proxy döndür', session: 'Oturum', proxy: 'Proxy', health: 'Sağlık', latency: 'Gecikme' },
  }[lang]
  const proxies = ['socks5://10.0.3.12:1080', 'socks5://10.0.7.21:1080', 'socks5://10.0.9.44:1080', 'socks5://10.0.2.8:1080']
  type S = { id: string; proxy: string; health: number; latency: number }
  const [sessions, setSessions] = useState<S[]>([{ id: 'vs-1', proxy: proxies[0], health: 98, latency: 42 }])
  useEffect(() => {
    const t = setInterval(() => setSessions((v) => v.map((s) => ({ ...s, health: Math.max(70, Math.min(100, s.health + (Math.random() * 6 - 3))), latency: Math.max(20, Math.round(s.latency + (Math.random() * 20 - 10))) }))), 1200)
    return () => clearInterval(t)
  }, [])
  const spin = () => setSessions((v) => [...v, { id: `vs-${v.length + 1}`, proxy: proxies[v.length % proxies.length], health: 90 + Math.random() * 10, latency: 30 + Math.round(Math.random() * 40) }].slice(0, 8))
  const rotate = (id: string) => setSessions((v) => v.map((s) => s.id === id ? { ...s, proxy: proxies[(proxies.indexOf(s.proxy) + 1) % proxies.length], latency: 30 + Math.round(Math.random() * 50) } : s))
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#14 — {L.title}</div>
      <button className={btn} onClick={spin}>{L.spin}</button>
      <div className={`${shell} grid gap-2 sm:grid-cols-2`}>
        {sessions.map((s) => (
          <div key={s.id} className="rounded border border-[#E6E1D8] bg-white/60 p-2 text-xs dark:border-slate-800 dark:bg-slate-950/30">
            <div className="flex items-center justify-between"><span className="font-semibold">{L.session} {s.id}</span><button className={`${btn} !px-2 !py-1`} onClick={() => rotate(s.id)}>{L.rotate}</button></div>
            <div className="mt-1 font-mono text-teal-700 dark:text-teal-300">{s.proxy}</div>
            <div className="mt-1 flex justify-between"><span>{L.health}: {s.health.toFixed(0)}%</span><span>{L.latency}: {s.latency} ms</span></div>
            <div className="mt-1 h-1.5 rounded bg-stone-200 dark:bg-slate-800"><div className={`h-1.5 rounded ${s.health > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${s.health}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Demo15() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'مستخرج OCR دفعي للوثائق القانونية', sample: 'اختر وثيقة نموذجية', scan: 'تشغيل مسح OCR', scanning: 'جارٍ المسح...', out: 'حقول JSON المستخرجة' },
    en: { title: 'Batch OCR Legal Document Extractor', sample: 'Select sample scanned record', scan: 'Run OCR scan pass', scanning: 'Scanning…', out: 'Extracted structured JSON fields' },
    tr: { title: 'Toplu OCR Hukuki Belge Çıkarıcı', sample: 'Örnek taranmış kaydı seçin', scan: 'OCR taramasını çalıştır', scanning: 'Taranıyor…', out: 'Çıkarılan yapılandırılmış JSON alanları' },
  }[lang]
  const samples = [
    { name: 'Claim_AR_01', text: 'رقم القضية: 408/2026\nالمدعي: شركة النور\nالمبلغ: 2,500,000 د.ع\nالتاريخ: 2026-10-12', json: { caseNo: '408/2026', plaintiff: 'شركة النور', amountIQD: 2500000, date: '2026-10-12', lang: 'ar' } },
    { name: 'Contract_EN_02', text: 'Contract Ref: CT-771\nParty A: Al-Rafidain Trading\nParty B: Karrada Services\nValue: $12,000\nSigned: 2026-09-01', json: { ref: 'CT-771', partyA: 'Al-Rafidain Trading', partyB: 'Karrada Services', valueUSD: 12000, signed: '2026-09-01', lang: 'en' } },
    { name: 'Receipt_AR_03', text: 'سند قبض: 1245\nالمستلم: أحمد علي\nالمبلغ: 350,000 د.ع\nالسبب: أتعاب محاماة', json: { receipt: 1245, recipient: 'أحمد علي', amountIQD: 350000, reason: 'أتعاب محاماة', lang: 'ar' } },
  ]
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const timer = useRef<number | null>(null)
  const run = () => {
    setProgress(0); setDone(false)
    if (timer.current) clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { if (timer.current) clearInterval(timer.current); setDone(true); return 100 }
        return p + 8
      })
    }, 120)
  }
  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])
  const s = samples[idx]
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#15 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <label className="block text-xs font-semibold">{L.sample}
            <select className={`${input} mt-1`} value={idx} onChange={(e) => { setIdx(+e.target.value); setDone(false); setProgress(0) }}>
              {samples.map((x, i) => <option key={x.name} value={i}>{x.name}</option>)}
            </select>
          </label>
          <div className="relative overflow-hidden rounded border border-[#DCD6CA] bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed opacity-80">{s.text}</pre>
            {progress > 0 && progress < 100 && <div className="pointer-events-none absolute inset-x-0 bg-teal-400/20" style={{ top: 0, height: `${progress}%`, borderBottom: '2px solid rgba(13,148,136,0.7)' }} />}
          </div>
          <button className={btn} onClick={run}>{progress > 0 && progress < 100 ? L.scanning : L.scan}</button>
          {progress > 0 && <div className="h-2 rounded bg-stone-200 dark:bg-slate-800"><div className="h-2 rounded bg-teal-500 transition-all" style={{ width: `${progress}%` }} /></div>}
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold mb-1">{L.out}</div>
          <pre className="max-h-72 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded bg-slate-950 p-2 font-mono text-[11px] text-emerald-300">{done ? JSON.stringify(s.json, null, 2) : '—'}</pre>
        </div>
      </div>
    </div>
  )
}

export function AutomationDataLab({ projectId }: { projectId: number }) {
  if (projectId === 10) return <Demo10 />
  if (projectId === 11) return <Demo11 />
  if (projectId === 12) return <Demo12 />
  if (projectId === 13) return <Demo13 />
  if (projectId === 14) return <Demo14 />
  return <Demo15 />
}
