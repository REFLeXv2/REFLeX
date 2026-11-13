import { useMemo, useRef, useState } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { sha256Hex } from '../../utils/hash'
import { useApp } from '../../context/AppContext'

const shell = 'rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40'
const input = 'min-h-[42px] w-full rounded border border-[#DCD6CA] bg-white/70 px-2 py-1.5 text-base sm:text-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-[var(--color-ink-dark)]'
const btn = 'min-h-[42px] rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200'

async function sha256(text: string) {
  return sha256Hex(text)
}

function Demo20() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'أداة ترحيل لقطة مخطط قاعدة البيانات (CLI)', prompt: 'اكتب أمراً أو اضغط زر', run: 'تنفيذ', help: 'الأوامر: migrate status | migrate snapshot | migrate up | migrate rollback' },
    en: { title: 'Database Schema Migration & Snapshot CLI', prompt: 'Type a command or click', run: 'Run', help: 'Commands: migrate status | migrate snapshot | migrate up | migrate rollback' },
    tr: { title: 'Veritabanı Şema Geçişi ve Anlık Görüntü CLI', prompt: 'Komut yazın veya tıklayın', run: 'Çalıştır', help: 'Komutlar: migrate status | migrate snapshot | migrate up | migrate rollback' },
  }[lang]
  const migrations = ['001_init', '002_add_cases', '003_add_audit', '004_add_indexes']
  const [version, setVersion] = useState(2)
  const [snapshots, setSnapshots] = useState<string[]>(['snapshot_v2_2026-11-01.sql'])
  const [lines, setLines] = useState<string[]>(['$ migrate status', 'schema_version: 2 (002_add_cases)', 'pending: 2'])
  const [cmd, setCmd] = useState('')
  const run = (c?: string) => {
    const command = (c ?? cmd).trim()
    if (!command) return
    const out: string[] = [`$ ${command}`]
    if (command === 'migrate status') {
      out.push(`schema_version: ${version} (${migrations[version - 1] || 'none'})`)
      out.push(`applied: ${version}  pending: ${Math.max(0, migrations.length - version)}`)
      out.push(`snapshots: ${snapshots.length}`)
    } else if (command === 'migrate snapshot') {
      const snap = `snapshot_v${version}_${new Date().toISOString().slice(0, 10)}.sql`
      setSnapshots((s) => [snap, ...s].slice(0, 6))
      out.push(`created ${snap}`)
      out.push(`tables: users,cases,documents,hearings (${version} migrations applied)`) 
    } else if (command === 'migrate up') {
      if (version >= migrations.length) out.push('nothing to migrate (already at head)')
      else { setVersion((v) => v + 1); out.push(`applying ${migrations[version]} ... OK`); out.push(`schema_version: ${version + 1}`) }
    } else if (command === 'migrate rollback') {
      if (version <= 0) out.push('nothing to rollback')
      else { out.push(`rolling back ${migrations[version - 1]} ... OK`); setVersion((v) => v - 1); out.push(`schema_version: ${version - 1}`) }
    } else {
      out.push(`unknown command: ${command}`)
      out.push(L.help)
    }
    setLines((v) => [...out, ...v].slice(0, 18))
    setCmd('')
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#20 — {L.title}</div>
      <div className="flex flex-wrap gap-2">
        {['migrate status', 'migrate snapshot', 'migrate up', 'migrate rollback'].map((c) => (
          <button key={c} className={btn} onClick={() => run(c)}>{c}</button>
        ))}
      </div>
      <div className={`${shell} bg-slate-950 text-emerald-300`}>
        <div className="mb-2 flex flex-col gap-2 sm:flex-row">
          <input value={cmd} onChange={(e) => setCmd(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && run()} placeholder={L.prompt} className="min-h-[42px] flex-1 rounded border border-slate-700 bg-slate-900 px-2 py-1.5 font-mono text-base text-emerald-200 sm:text-xs" />
          <button className="rounded bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white" onClick={() => run()}>{L.run}</button>
        </div>
        <pre className="max-h-64 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed">{lines.join('\n')}</pre>
        <div className="mt-2 text-[10px] text-slate-400">{L.help}</div>
      </div>
    </div>
  )
}

function Demo21() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'مصحح تطبيع النص العربي (Tokenizer)', raw: 'النص الخام', step: 'خطوات التطبيع', tokens: 'الرموز النهائية', input: 'أدخل نصاً عربياً مع تشكيل وهمزات...' },
    en: { title: 'Arabic Text Normalization & Search Tokenizer', raw: 'Raw text', step: 'Normalization steps', tokens: 'Final tokens', input: 'Enter Arabic text with diacritics/hamzas...' },
    tr: { title: 'Arapça Metin Normalizasyonu ve Arama Belirteçleyici', raw: 'Ham metin', step: 'Normalizasyon adımları', tokens: 'Son belirteçler', input: 'Harekeler/hamzalar içeren Arapça metin girin...' },
  }[lang]
  const [text, setText] = useState('مُحَمَّد أَحْمَد إِبْرَاهِيم — عَلَى الْمَحْكَمَةِ فِي بَغْدَاد')
  const info = useMemo(() => {
    const raw = text
    const noDiacritics = raw.replace(/[\u064B-\u065F\u0670\u0610-\u061A]/g, '')
    const unified = noDiacritics.replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ـ/g, '')
    const cleaned = unified.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim()
    const tokens = cleaned ? cleaned.split(' ').filter(Boolean) : []
    const stepList = [
      { label: '1. raw', value: raw },
      { label: '2. strip tashkil/diacritics', value: noDiacritics },
      { label: '3. unify أ/إ/آ → ا, ة → ه, ى → ي', value: unified },
      { label: '4. punctuation & whitespace cleanup', value: cleaned },
    ]
    return { stepList, tokens }
  }, [text])
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#21 — {L.title}</div>
      <textarea className={`${input} h-20`} value={text} onChange={(e) => setText(e.target.value)} placeholder={L.input} dir="auto" />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.step}</div>
          {info.stepList.map((s) => (
            <div key={s.label} className="rounded border border-[#E6E1D8] bg-white/60 p-2 dark:border-slate-800 dark:bg-slate-950/30">
              <div className="font-mono text-[10px] font-semibold text-teal-700 dark:text-teal-300">{s.label}</div>
              <div className="mt-1 break-words font-mono text-xs text-stone-700 dark:text-stone-200" dir="auto">{s.value || '—'}</div>
            </div>
          ))}
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold">{L.tokens} ({info.tokens.length})</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {info.tokens.map((tok, i) => (
              <span key={`${tok}-${i}`} className="rounded-full border border-teal-600/30 bg-teal-600/10 px-2 py-0.5 font-mono text-xs text-teal-800 dark:text-teal-200">{tok}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Demo22() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'خدمة ختم QR والتحقق', ref: 'رقم مرجع الوثيقة', entity: 'اسم الجهة', subject: 'المبلغ / الموضوع', gen: 'إنشاء ختم تشفيري', hash: 'تجزئة SHA-256', payload: 'حمولة JSON', dlPng: 'تنزيل PNG', dlSvg: 'تنزيل SVG' },
    en: { title: 'Verification QR & Receipt Stamp Microservice', ref: 'Document Reference Number', entity: 'Entity Name', subject: 'Amount / Subject', gen: 'Generate cryptographic stamp', hash: 'SHA-256 hash', payload: 'JSON payload', dlPng: 'Download PNG', dlSvg: 'Download SVG' },
    tr: { title: 'Doğrulama QR ve Makbuz Damgası Mikroservisi', ref: 'Belge Referans Numarası', entity: 'Kurum Adı', subject: 'Tutar / Konu', gen: 'Kriptografik damga oluştur', hash: 'SHA-256 karması', payload: 'JSON yükü', dlPng: 'PNG indir', dlSvg: 'SVG indir' },
  }[lang]
  const [refNo, setRefNo] = useState('DOC-2026-00991')
  const [entity, setEntity] = useState(lang === 'ar' ? 'مكتب عبدالرزاق' : 'Abdulrazzaq Office')
  const [subject, setSubject] = useState('Retainer receipt / إيصال أتعاب')
  const [res, setRes] = useState<{ hash: string; payload: string } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<HTMLDivElement>(null)
  const gen = async () => {
    const base = { refNo, entity, subject, issuedAt: new Date().toISOString() }
    const hash = await sha256(JSON.stringify(base))
    setRes({ hash, payload: JSON.stringify({ ...base, alg: 'SHA-256', hash }, null, 2) })
  }
  const dlPng = () => {
    const c = canvasRef.current?.querySelector('canvas') as HTMLCanvasElement | null
    if (!c) return
    const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = `stamp-${refNo}.png`; a.click()
  }
  const dlSvg = () => {
    const s = svgRef.current?.querySelector('svg') as SVGSVGElement | null
    if (!s) return
    const blob = new Blob([new XMLSerializer().serializeToString(s)], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `stamp-${refNo}.svg`; a.click(); URL.revokeObjectURL(url)
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#22 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <input className={input} value={refNo} onChange={(e) => setRefNo(e.target.value)} placeholder={L.ref} />
          <input className={input} value={entity} onChange={(e) => setEntity(e.target.value)} placeholder={L.entity} />
          <input className={input} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={L.subject} />
          <button className={btn} onClick={gen}>{L.gen}</button>
          {res && <>
            <div className="text-xs font-semibold">{L.hash}</div>
            <div className="break-all rounded border border-teal-600/30 bg-teal-600/10 p-2 font-mono text-[11px] text-teal-800 dark:text-teal-200">{res.hash}</div>
          </>}
        </div>
        <div className={shell}>
          {res ? (
            <div className="space-y-2">
              <div className="flex flex-wrap justify-center gap-4 overflow-x-auto rounded bg-white p-3">
                <div ref={canvasRef} className="text-center"><QRCodeCanvas value={res.payload} size={170} level="H" includeMargin marginSize={2} className="mx-auto h-auto w-full max-w-[170px]" /><div className="text-[10px] text-stone-500">Canvas/PNG</div></div>
                <div ref={svgRef} className="text-center"><QRCodeSVG value={res.payload} size={170} level="H" includeMargin marginSize={2} className="mx-auto h-auto w-full max-w-[170px]" /><div className="text-[10px] text-stone-500">SVG</div></div>
              </div>
              <div className="flex gap-2"><button className={btn} onClick={dlPng}>{L.dlPng}</button><button className={btn} onClick={dlSvg}>{L.dlSvg}</button></div>
              <div className="text-xs font-semibold">{L.payload}</div>
              <pre className="max-h-36 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded bg-slate-950 p-2 font-mono text-[10px] text-emerald-300">{res.payload}</pre>
            </div>
          ) : <div className="text-sm text-stone-500">—</div>}
        </div>
      </div>
    </div>
  )
}

function Demo23() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'أداة نقل ملفات LAN بدون إعداد (CLI)', discover: 'اكتشاف أقران mDNS', peer: 'الأقران المكتشفون', send: 'بدء نقل مجزأ HTTP', progress: 'التقدم', verify: 'تحقق سلامة SHA-256', verified: 'تم التحقق: التطابق', idle: 'خامل', transferring: 'جارٍ النقل...', done: 'اكتمل' },
    en: { title: 'Zero-Config Local LAN File Transfer CLI', discover: 'Discover mDNS peers', peer: 'Discovered peers', send: 'Start chunked HTTP transfer', progress: 'Progress', verify: 'Verify SHA-256 integrity', verified: 'Verified: checksums match', idle: 'Idle', transferring: 'Transferring…', done: 'Complete' },
    tr: { title: 'Sıfır Yapılandırmalı Yerel LAN Dosya Aktarım CLI', discover: 'mDNS eşlerini keşfet', peer: 'Keşfedilen eşler', send: 'Parçalı HTTP aktarımını başlat', progress: 'İlerleme', verify: 'SHA-256 bütünlüğünü doğrula', verified: 'Doğrulandı: özetler eşleşiyor', idle: 'Boşta', transferring: 'Aktarılıyor…', done: 'Tamamlandı' },
  }[lang]
  const allPeers = [
    { name: 'workstation-baghdad.local', type: 'Linux', ip: '192.168.1.20' },
    { name: 'android-field.local', type: 'Android', ip: '192.168.1.44' },
    { name: 'laptop-archive.local', type: 'Windows', ip: '192.168.1.31' },
  ]
  const [peers, setPeers] = useState<typeof allPeers>([])
  const [sel, setSel] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(L.idle)
  const [hash, setHash] = useState('')
  const [verified, setVerified] = useState('')
  const timer = useRef<number | null>(null)
  const discover = () => { setPeers([]); setStatus('mDNS browsing _lanxfer._tcp ...'); setTimeout(() => { setPeers(allPeers); setStatus(L.idle) }, 700) }
  const send = () => {
    if (!peers.length) return
    setProgress(0); setStatus(L.transferring); setVerified(''); setHash('')
    if (timer.current) clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { if (timer.current) clearInterval(timer.current); setStatus(L.done); return 100 }
        return p + 5
      })
    }, 120)
  }
  const verify = async () => {
    if (progress < 100) return
    const h = await sha256(`transfer:${peers[sel]?.name}:archive.zip:sha256`)
    setHash(h)
    setVerified(L.verified)
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#23 — {L.title}</div>
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={discover}>{L.discover}</button>
        <button className={btn} onClick={send} disabled={!peers.length}>{L.send}</button>
        <button className={btn} onClick={verify} disabled={progress < 100}>{L.verify}</button>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={shell}>
          <div className="text-xs font-semibold mb-2">{L.peer}</div>
          <div className="space-y-1.5">
            {peers.map((p, i) => (
              <button key={p.name} onClick={() => setSel(i)} className={`w-full rounded border px-3 py-2 text-left text-xs ${sel === i ? 'border-teal-600 bg-teal-600/10' : 'border-[#E6E1D8] dark:border-slate-800'}`}>
                <div className="font-mono font-semibold">{p.name}</div>
                <div className="text-stone-500">{p.ip} · {p.type}</div>
              </button>
            ))}
            {!peers.length && <div className="text-xs text-stone-500">—</div>}
          </div>
        </div>
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.progress}: {progress}% — {status}</div>
          <div className="h-3 rounded bg-stone-200 dark:bg-slate-800"><div className="h-3 rounded bg-teal-500 transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="overflow-x-auto whitespace-pre-wrap break-all rounded bg-slate-950 p-2 font-mono text-[11px] text-emerald-300">
            {peers[sel] ? `$ lanxfer send archive.zip -> ${peers[sel].name}\nchunks: ${Math.ceil(progress / 10)}/10` : '$ lanxfer discover'}
          </div>
          {hash && <div className="break-all rounded border border-teal-600/30 bg-teal-600/10 p-2 font-mono text-[11px] text-teal-800 dark:text-teal-200">SHA-256: {hash}</div>}
          {verified && <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">{verified}</div>}
        </div>
      </div>
    </div>
  )
}

export function CliToolingLab({ projectId }: { projectId: number }) {
  if (projectId === 20) return <Demo20 />
  if (projectId === 21) return <Demo21 />
  if (projectId === 22) return <Demo22 />
  return <Demo23 />
}
