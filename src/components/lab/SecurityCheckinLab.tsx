import { useEffect, useMemo, useState } from 'react'
import { sha256Hex } from '../../utils/hash'
import { useApp } from '../../context/AppContext'

const copy = {
  ar: {
    demo: 'يحسب بصمة جهاز تشفيرية SHA-256 حقيقية من معلمات المتصفح/الجهاز، ويحاكي التحقق الجغرافي (Haversine) وإصدار حمولة تسجيل حضور موقعة.',
    entropy: 'معلمات الإنتروبيا', fingerprint: 'بصمة الجهاز (SHA-256)', computing: 'جارٍ الحساب…',
    geo: 'التحقق الجغرافي', useReal: 'استخدام موقع المتصفح', useSim: 'استخدام محاكاة بغداد', lat: 'خط العرض', lon: 'خط الطول',
    target: 'المحيط المستهدف', radius: 'نصف القطر (متر)', distance: 'المسافة المحسوبة', inside: 'داخل النطاق', outside: 'خارج النطاق',
    verify: 'تحقق وأصدر رمز تسجيل الدخول', token: 'حمولة الحضور الموقعة (JSON)', geoDenied: 'تعذر الحصول على الموقع، تم استخدام المحاكاة.',
  },
  en: {
    demo: 'Computes a real SHA-256 cryptographic device signature from browser/hardware entropy and simulates geofence verification (Haversine) with a signed check-in payload.',
    entropy: 'Entropy parameters', fingerprint: 'Device fingerprint (SHA-256)', computing: 'Computing…',
    geo: 'Geofence verification', useReal: 'Use browser location', useSim: 'Use Baghdad simulation', lat: 'Latitude', lon: 'Longitude',
    target: 'Target perimeter', radius: 'Radius (m)', distance: 'Computed distance', inside: 'Inside geofence', outside: 'Outside geofence',
    verify: 'Verify Geofence & Generate Check-In Token', token: 'Signed attendance payload (JSON)', geoDenied: 'Location unavailable, using simulation.',
  },
  tr: {
    demo: 'Tarayıcı/donanım entropisinden gerçek SHA-256 kriptografik cihaz imzası hesaplar ve imzalı check-in yükü ile coğrafi sınır doğrulamasını (Haversine) simüle eder.',
    entropy: 'Entropi parametreleri', fingerprint: 'Cihaz parmak izi (SHA-256)', computing: 'Hesaplanıyor…',
    geo: 'Coğrafi sınır doğrulaması', useReal: 'Tarayıcı konumunu kullan', useSim: 'Bağdat simülasyonunu kullan', lat: 'Enlem', lon: 'Boylam',
    target: 'Hedef çevre', radius: 'Yarıçap (m)', distance: 'Hesaplanan mesafe', inside: 'Sınır içinde', outside: 'Sınır dışında',
    verify: 'Coğrafi Sınırı Doğrula ve Check-In Jetonu Üret', token: 'İmzalı yoklama yükü (JSON)', geoDenied: 'Konum alınamadı, simülasyon kullanılıyor.',
  },
}

const TARGET = { lat: 33.3152, lon: 44.3661 }
const RADIUS = 250

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

export function SecurityCheckinLab() {
  const { lang } = useApp()
  const c = copy[lang]
  const [fingerprint, setFingerprint] = useState('')
  const [mode, setMode] = useState<'sim' | 'real'>('sim')
  const [simLat, setSimLat] = useState(33.314)
  const [simLon, setSimLon] = useState(44.365)
  const [realCoord, setRealCoord] = useState<{ lat: number; lon: number } | null>(null)
  const [geoMsg, setGeoMsg] = useState('')
  const [token, setToken] = useState('')

  const entropy = useMemo(() => {
    const nav: any = navigator
    return {
      userAgent: navigator.userAgent,
      platform: nav.platform || 'unknown',
      language: navigator.language,
      languages: (navigator.languages || []).join(','),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      pixelRatio: window.devicePixelRatio,
      cores: nav.hardwareConcurrency || 0,
      memory: nav.deviceMemory || 0,
      touch: nav.maxTouchPoints || 0,
    }
  }, [])

  useEffect(() => {
    let alive = true
    sha256(JSON.stringify(entropy)).then((h) => { if (alive) setFingerprint(h) })
    return () => { alive = false }
  }, [entropy])

  const coord = mode === 'real' && realCoord ? realCoord : { lat: simLat, lon: simLon }
  const distance = haversine(coord.lat, coord.lon, TARGET.lat, TARGET.lon)
  const inside = distance <= RADIUS

  const requestReal = () => {
    setMode('real')
    setGeoMsg('')
    if (!navigator.geolocation) { setGeoMsg(c.geoDenied); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => setRealCoord({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setGeoMsg(c.geoDenied),
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  const generate = async () => {
    const payload = {
      type: 'attendance_checkin',
      issuedAt: new Date().toISOString(),
      deviceFingerprint: fingerprint,
      location: { lat: +coord.lat.toFixed(6), lon: +coord.lon.toFixed(6) },
      target: TARGET,
      radiusMeters: RADIUS,
      distanceMeters: +distance.toFixed(2),
      geofence: inside ? 'INSIDE' : 'OUTSIDE',
      decision: inside ? 'ACCEPTED' : 'REJECTED',
    }
    const signature = await sha256(JSON.stringify(payload))
    setToken(JSON.stringify({ ...payload, signature }, null, 2))
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600 dark:text-[var(--color-muted-dark)]">{c.demo}</p>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">{c.entropy}</div>
          <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] text-stone-600 dark:text-[var(--color-muted-dark)]">{JSON.stringify(entropy, null, 2)}</pre>
          <div className="mt-3 text-xs font-semibold text-stone-800 dark:text-stone-200">{c.fingerprint}</div>
          <div className="mt-1 break-all rounded border border-teal-600/30 bg-teal-600/10 p-2 font-mono text-[11px] text-teal-800 dark:text-teal-200">
            {fingerprint || c.computing}
          </div>
        </div>

        <div className="rounded-lg border border-[#DCD6CA] bg-[#F7F5F0]/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">{c.geo}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => { setMode('sim'); setGeoMsg('') }} className={`rounded-full px-3 py-1 text-xs font-semibold ${mode === 'sim' ? 'bg-[var(--color-accent)] text-white' : 'border border-[#DCD6CA] dark:border-slate-700'}`}>{c.useSim}</button>
            <button type="button" onClick={requestReal} className={`rounded-full px-3 py-1 text-xs font-semibold ${mode === 'real' ? 'bg-[var(--color-accent)] text-white' : 'border border-[#DCD6CA] dark:border-slate-700'}`}>{c.useReal}</button>
          </div>
          {geoMsg && <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">{geoMsg}</p>}

          <div className="mt-3 space-y-2 text-xs">
            <label className="block">
              <span className="text-stone-600 dark:text-[var(--color-muted-dark)]">{c.lat}: {coord.lat.toFixed(5)}</span>
              <input type="range" min={33.25} max={33.38} step={0.0005} value={mode === 'sim' ? simLat : (realCoord?.lat ?? simLat)} onChange={(e) => { setMode('sim'); setSimLat(parseFloat(e.target.value)) }} className="mt-1 w-full accent-teal-600" />
            </label>
            <label className="block">
              <span className="text-stone-600 dark:text-[var(--color-muted-dark)]">{c.lon}: {coord.lon.toFixed(5)}</span>
              <input type="range" min={44.30} max={44.43} step={0.0005} value={mode === 'sim' ? simLon : (realCoord?.lon ?? simLon)} onChange={(e) => { setMode('sim'); setSimLon(parseFloat(e.target.value)) }} className="mt-1 w-full accent-teal-600" />
            </label>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-[#DCD6CA] p-2 dark:border-slate-800">
              <div className="text-stone-500 dark:text-[var(--color-muted-dark)]">{c.target}</div>
              <div className="font-mono text-stone-800 dark:text-stone-200">{TARGET.lat}, {TARGET.lon}</div>
              <div className="text-stone-500">{c.radius}: {RADIUS}</div>
            </div>
            <div className={`rounded border p-2 ${inside ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200' : 'border-red-500/40 bg-red-500/10 text-red-800 dark:text-red-200'}`}>
              <div>{c.distance}</div>
              <div className="font-mono font-semibold">{distance.toFixed(2)} m</div>
              <div className="font-semibold">{inside ? c.inside : c.outside}</div>
            </div>
          </div>

          <button type="button" onClick={generate} disabled={!fingerprint} className="mt-3 w-full rounded-lg bg-[var(--color-accent)] px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
            {c.verify}
          </button>
        </div>
      </div>

      {token && (
        <div>
          <div className="mb-1 text-xs font-semibold text-stone-800 dark:text-stone-200">{c.token}</div>
          <pre className="max-h-56 overflow-auto rounded-lg border border-[#DCD6CA] bg-slate-950 p-3 font-mono text-[11px] text-emerald-300 dark:border-slate-800">{token}</pre>
        </div>
      )}
    </div>
  )
}
