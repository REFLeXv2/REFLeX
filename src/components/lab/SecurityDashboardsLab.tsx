import { useEffect, useMemo, useRef, useState } from 'react'
import { sha256Hex } from '../../utils/hash'
import { useApp } from '../../context/AppContext'

const shell = 'rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40'
const btn = 'min-h-[42px] rounded-md border border-teal-600/30 bg-teal-600/10 px-3 py-1.5 text-xs font-semibold text-teal-800 transition active:scale-95 hover:bg-teal-600 hover:text-white dark:text-teal-200'

async function sha256(text: string) {
  return sha256Hex(text)
}
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const R = 6371000
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function Demo06() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'نظام الحضور الجغرافي والبيومتري', fp: 'بصمة الجهاز (SHA-256)', compute: 'جارٍ الحساب…', geo: 'التحقق من النطاق الجغرافي', real: 'استخدام GPS الحقيقي', sim: 'محاكاة إحداثيات بغداد', dist: 'المسافة', radius: 'نصف القطر', inside: 'داخل النطاق', outside: 'خارج النطاق', verify: 'تحقق وأصدر رمز حضور', token: 'رمز الحضور الموقّع (JSON)', denied: 'تعذر الوصول للموقع، تم استخدام المحاكاة.' },
    en: { title: 'Geolocation & Biometric Attendance System', fp: 'Device fingerprint (SHA-256)', compute: 'Computing…', geo: 'Geofence verification', real: 'Use real GPS', sim: 'Simulate Baghdad coords', dist: 'Distance', radius: 'Radius', inside: 'Inside geofence', outside: 'Outside geofence', verify: 'Verify & Issue Attendance Token', token: 'Signed attendance token (JSON)', denied: 'Location unavailable, using simulation.' },
    tr: { title: 'Konum ve Biyometrik Yoklama Sistemi', fp: 'Cihaz parmak izi (SHA-256)', compute: 'Hesaplanıyor…', geo: 'Coğrafi sınır doğrulaması', real: 'Gerçek GPS kullan', sim: 'Bağdat koordinatlarını simüle et', dist: 'Mesafe', radius: 'Yarıçap', inside: 'Sınır içinde', outside: 'Sınır dışında', verify: 'Doğrula ve Yoklama Jetonu Üret', token: 'İmzalı yoklama jetonu (JSON)', denied: 'Konum alınamadı, simülasyon kullanılıyor.' },
  }[lang]
  const TARGET = { lat: 33.3152, lon: 44.3661 }
  const R = 250
  const [fingerprint, setFingerprint] = useState('')
  const [mode, setMode] = useState<'sim' | 'real'>('sim')
  const [simLat, setSimLat] = useState(33.314)
  const [simLon, setSimLon] = useState(44.365)
  const [real, setReal] = useState<{ lat: number; lon: number } | null>(null)
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState('')
  const entropy = useMemo(() => ({
    ua: navigator.userAgent, plat: (navigator as any).platform, lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone, screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    dpr: window.devicePixelRatio, cores: (navigator as any).hardwareConcurrency, mem: (navigator as any).deviceMemory, touch: (navigator as any).maxTouchPoints,
  }), [])
  useEffect(() => { sha256(JSON.stringify(entropy)).then(setFingerprint) }, [entropy])
  const coord = mode === 'real' && real ? real : { lat: simLat, lon: simLon }
  const dist = haversine(coord.lat, coord.lon, TARGET.lat, TARGET.lon)
  const inside = dist <= R
  const useReal = () => {
    setMode('real'); setMsg('')
    if (!navigator.geolocation) { setMsg(L.denied); return }
    navigator.geolocation.getCurrentPosition(
      (p) => setReal({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => setMsg(L.denied),
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }
  const verify = async () => {
    const payload = { deviceFingerprint: fingerprint, issuedAt: new Date().toISOString(), location: coord, target: TARGET, radiusM: R, distanceM: +dist.toFixed(2), geofence: inside ? 'INSIDE' : 'OUTSIDE', decision: inside ? 'ACCEPTED' : 'REJECTED' }
    const sig = await sha256(JSON.stringify(payload))
    setToken(JSON.stringify({ ...payload, signature: sig }, null, 2))
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#06 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.fp}</div>
          <div className="break-all rounded border border-teal-600/30 bg-teal-600/10 p-2 font-mono text-[11px] text-teal-800 dark:text-teal-200">{fingerprint || L.compute}</div>
          <pre className="max-h-28 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all font-mono text-[10px] text-stone-500">{JSON.stringify(entropy, null, 2)}</pre>
        </div>
        <div className={`${shell} space-y-2`}>
          <div className="text-xs font-semibold">{L.geo}</div>
          <div className="flex flex-wrap gap-2">
            <button className={`${btn} ${mode === 'sim' ? '' : '!bg-transparent'}`} onClick={() => setMode('sim')}>{L.sim}</button>
            <button className={`${btn} ${mode === 'real' ? '' : '!bg-transparent'}`} onClick={useReal}>{L.real}</button>
          </div>
          {msg && <div className="text-xs text-amber-700 dark:text-amber-300">{msg}</div>}
          <label className="block text-xs">Lat: {coord.lat.toFixed(5)}<input type="range" min={33.25} max={33.38} step={0.0005} value={coord.lat} onChange={(e) => { setMode('sim'); setSimLat(+e.target.value) }} className="w-full accent-teal-600" /></label>
          <label className="block text-xs">Lon: {coord.lon.toFixed(5)}<input type="range" min={44.30} max={44.43} step={0.0005} value={coord.lon} onChange={(e) => { setMode('sim'); setSimLon(+e.target.value) }} className="w-full accent-teal-600" /></label>
          <div className={`rounded p-2 text-xs font-semibold ${inside ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>{L.dist}: {dist.toFixed(2)} m · {L.radius}: {R} m · {inside ? L.inside : L.outside}</div>
          <button className={`${btn} w-full`} onClick={verify} disabled={!fingerprint}>{L.verify}</button>
        </div>
      </div>
      {token && <pre className="max-h-48 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-lg border border-[#DCD6CA] bg-slate-950 p-3 font-mono text-[11px] text-emerald-300 dark:border-slate-800">{token}</pre>}
    </div>
  )
}

function Demo07() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'بوابة RBAC وسجل التدقيق', role: 'الدور النشط', route: 'اختبار مسار محمي', result: 'النتيجة', audit: 'سجل تدقيق غير قابل للتعديل', append: 'تم التسجيل' },
    en: { title: 'Multi-Role RBAC & Audit Log Gateway', role: 'Active role', route: 'Test protected route', result: 'Result', audit: 'Immutable audit log', append: 'logged' },
    tr: { title: 'Çok Rollü RBAC ve Denetim Günlüğü Ağ Geçidi', role: 'Aktif rol', route: 'Korumalı rotayı test et', result: 'Sonuç', audit: 'Değiştirilemez denetim günlüğü', append: 'kaydedildi' },
  }[lang]
  const roles = ['Admin', 'Senior Counsel', 'Clerk', 'Auditor'] as const
  const routes = [
    { path: 'GET /cases', allow: ['Admin', 'Senior Counsel', 'Clerk', 'Auditor'] },
    { path: 'POST /cases', allow: ['Admin', 'Senior Counsel', 'Clerk'] },
    { path: 'DELETE /cases/:id', allow: ['Admin'] },
    { path: 'GET /audit/export', allow: ['Admin', 'Auditor'] },
    { path: 'PATCH /roles', allow: ['Admin'] },
  ]
  const [role, setRole] = useState<(typeof roles)[number]>('Clerk')
  const [logs, setLogs] = useState<string[]>(['[INIT] gateway online — policy engine loaded'])
  const hit = (path: string, allowed: boolean) => {
    const code = allowed ? 200 : 403
    const line = `${new Date().toLocaleTimeString()} actor=${role} route="${path}" -> ${code} ${allowed ? 'OK' : 'FORBIDDEN'}`
    setLogs((v) => [line, ...v].slice(0, 12))
  }
  const matrix = useMemo(() => routes.map((r) => ({ ...r, ok: r.allow.includes(role) })), [role])
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#07 — {L.title}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={`${shell} space-y-3`}>
          <div className="text-xs font-semibold">{L.role}</div>
          <div className="flex flex-wrap gap-2">{roles.map((r) => <button key={r} className={`${btn} ${role === r ? '' : '!bg-transparent'}`} onClick={() => { setRole(r); setLogs((v)=>[`${new Date().toLocaleTimeString()} actor switch -> ${r}`, ...v].slice(0,12)) }}>{r}</button>)}</div>
          <div className="text-xs font-semibold">{L.route}</div>
          <div className="space-y-1.5">
            {matrix.map((m) => (
              <div key={m.path} className="flex items-center justify-between gap-2 rounded border border-[#E6E1D8] bg-white/60 px-2 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-950/30">
                <code className="text-stone-700 dark:text-stone-200">{m.path}</code>
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold ${m.ok ? 'text-emerald-600' : 'text-red-600'}`}>{m.ok ? '200 OK' : '403 FORBIDDEN'}</span>
                  <button className={btn} onClick={() => hit(m.path, m.ok)}>Test</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold">{L.audit}</div>
          <pre className="mt-2 max-h-72 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded bg-slate-950 p-2 font-mono text-[11px] text-emerald-300">{logs.join('\n')}</pre>
        </div>
      </div>
    </div>
  )
}

function Demo08() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'مرسل Webhook وطابور الإشعارات', dispatch: 'إرسال حدث', outage: 'محاكاة تعطل النهاية (503)', on: 'مفعّل', off: 'متوقف', queue: 'حالة الطابور', delivered: 'تم التسليم', retry: 'إعادة محاولة', fail: 'فشل مؤقت' },
    en: { title: 'Webhook & External Notification Dispatcher', dispatch: 'Dispatch event', outage: 'Simulate endpoint outage (503)', on: 'ON', off: 'OFF', queue: 'Queue status', delivered: 'Delivered', retry: 'Retry', fail: 'Transient failure' },
    tr: { title: 'Webhook ve Harici Bildirim Dağıtıcısı', dispatch: 'Olay gönder', outage: 'Uç nokta kesintisini simüle et (503)', on: 'AÇIK', off: 'KAPALI', queue: 'Kuyruk durumu', delivered: 'Teslim edildi', retry: 'Yeniden dene', fail: 'Geçici hata' },
  }[lang]
  type Job = { id: number; attempt: number; status: string; delay: number }
  const [outage, setOutage] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [log, setLog] = useState<string[]>([])
  const timers = useRef<number[]>([])
  useEffect(() => () => { timers.current.forEach((t) => clearTimeout(t)) }, [])

  const dispatch = () => {
    const id = Date.now()
    setJobs((v) => [{ id, attempt: 0, status: 'queued', delay: 0 }, ...v].slice(0, 8))
    setLog((v) => [`[${new Date().toLocaleTimeString()}] event=${id} enqueued`, ...v].slice(0, 20))
    attempt(id, 0)
  }
  const attempt = (id: number, n: number) => {
    const delay = [1000, 2000, 4000][n] ?? 4000
    setJobs((v) => v.map((j) => j.id === id ? { ...j, attempt: n + 1, status: n === 0 ? 'sending' : 'retrying', delay } : j))
    const t = window.setTimeout(() => {
      const fail = outage && n < 2
      if (fail) {
        setLog((v) => [`[${new Date().toLocaleTimeString()}] event=${id} attempt=${n + 1} -> 503 ${L.fail} (backoff ${delay}ms→next)`, ...v].slice(0, 20))
        setJobs((v) => v.map((j) => j.id === id ? { ...j, status: `503 backoff ${[1,2,4][n+1] || 4}s` } : j))
        attempt(id, n + 1)
      } else {
        setLog((v) => [`[${new Date().toLocaleTimeString()}] event=${id} attempt=${n + 1} -> 200 ${L.delivered}`, ...v].slice(0, 20))
        setJobs((v) => v.map((j) => j.id === id ? { ...j, status: 'delivered' } : j))
      }
    }, Math.min(delay, 1800))
    timers.current.push(t)
  }
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#08 — {L.title}</div>
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={dispatch}>{L.dispatch}</button>
        <button className={`${btn} ${outage ? '!bg-red-500/20 !text-red-700 dark:!text-red-300' : ''}`} onClick={() => setOutage((v) => !v)}>{L.outage}: {outage ? L.on : L.off}</button>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className={shell}>
          <div className="text-xs font-semibold mb-2">{L.queue}</div>
          <div className="space-y-1.5 text-xs">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between rounded border border-[#E6E1D8] bg-white/60 px-2 py-1.5 dark:border-slate-800 dark:bg-slate-950/30">
                <span className="font-mono">#{String(j.id).slice(-5)}</span>
                <span>attempt {j.attempt}</span>
                <span className={j.status === 'delivered' ? 'font-semibold text-emerald-600' : 'text-amber-600'}>{j.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={shell}>
          <div className="text-xs font-semibold mb-2">Log</div>
          <pre className="max-h-56 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded bg-slate-950 p-2 font-mono text-[11px] text-emerald-300">{log.join('\n') || '—'}</pre>
        </div>
      </div>
    </div>
  )
}

function Demo09() {
  const { lang } = useApp()
  const L = {
    ar: { title: 'لوحة قياس صحة النظام', latency: 'زمن استجابة API (ms)', queue: 'عمق طابور العمال', storage: 'صحة التخزين', spike: 'محاكاة ذروة حركة', normal: 'عودة للوضع الطبيعي' },
    en: { title: 'System Health & Telemetry Dashboard', latency: 'API latency (ms)', queue: 'Worker queue depth', storage: 'Storage health', spike: 'Simulate Traffic Spike', normal: 'Return to normal' },
    tr: { title: 'Sistem Sağlığı ve Telemetri Panosu', latency: 'API gecikmesi (ms)', queue: 'İşçi kuyruğu derinliği', storage: 'Depolama sağlığı', spike: 'Trafik Artışı Simüle Et', normal: 'Normale dön' },
  }[lang]
  const [spike, setSpike] = useState(false)
  const [points, setPoints] = useState<number[]>(() => Array.from({ length: 20 }, () => 40 + Math.random() * 30))
  const [qDepth, setQDepth] = useState(12)
  const [storage, setStorage] = useState(96)
  useEffect(() => {
    const t = setInterval(() => {
      setPoints((p) => {
        const base = spike ? 180 : 45
        const jitter = spike ? 80 : 25
        return [...p.slice(-19), Math.max(10, base + Math.random() * jitter)]
      })
      setQDepth((v) => Math.max(0, Math.min(500, v + (spike ? Math.round(Math.random() * 18) : -Math.round(Math.random() * 6)))))
      setStorage((v) => Math.max(60, Math.min(100, v + (spike ? -Math.random() * 1.2 : Math.random() * 0.4))))
    }, 800)
    return () => clearInterval(t)
  }, [spike])
  const max = Math.max(200, ...points)
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-teal-700 dark:text-teal-300">#09 — {L.title}</div>
      <button className={`${btn} ${spike ? '!bg-amber-500/20 !text-amber-700 dark:!text-amber-300' : ''}`} onClick={() => setSpike((v) => !v)}>{spike ? L.normal : L.spike}</button>
      <div className="grid gap-3 lg:grid-cols-3">
        <div className={`${shell} lg:col-span-2`}>
          <div className="text-xs font-semibold mb-2">{L.latency}</div>
          <div className="flex h-28 w-full max-w-full items-end gap-1 overflow-hidden">
            {points.map((v, i) => (
              <div key={i} className={`flex-1 rounded-t ${v > 120 ? 'bg-red-500/70' : v > 80 ? 'bg-amber-500/70' : 'bg-teal-500/70'}`} style={{ height: `${(v / max) * 100}%` }} title={`${v.toFixed(0)}ms`} />
            ))}
          </div>
          <div className="mt-1 text-right font-mono text-xs text-stone-500">{points[points.length - 1].toFixed(0)} ms</div>
        </div>
        <div className="space-y-3">
          <div className={shell}>
            <div className="text-xs font-semibold">{L.queue}</div>
            <div className="mt-2 h-3 w-full rounded bg-stone-200 dark:bg-slate-800"><div className={`h-3 rounded ${qDepth > 200 ? 'bg-red-500' : qDepth > 80 ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${Math.min(100, qDepth / 5)}%` }} /></div>
            <div className="mt-1 font-mono text-sm">{qDepth} jobs</div>
          </div>
          <div className={shell}>
            <div className="text-xs font-semibold">{L.storage}</div>
            <div className="mt-2 h-3 w-full rounded bg-stone-200 dark:bg-slate-800"><div className={`h-3 rounded ${storage < 75 ? 'bg-red-500' : storage < 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${storage}%` }} /></div>
            <div className="mt-1 font-mono text-sm">{storage.toFixed(1)}% OK</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SecurityDashboardsLab({ projectId }: { projectId: number }) {
  if (projectId === 6) return <Demo06 />
  if (projectId === 7) return <Demo07 />
  if (projectId === 8) return <Demo08 />
  return <Demo09 />
}
